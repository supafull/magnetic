import { SupabaseClient } from "@supabase/supabase-js";
import { ElectricDatabase, electrify } from "electric-sql/wa-sqlite";
import * as _ from "lodash-es";
import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from "react-admin";
import { v4 as uuidv4 } from "uuid";

import { schema } from "../generated/client";
import { getSupabaseJWT } from "../utils";

type AnyParams =
  | GetListParams
  | GetOneParams
  | GetManyParams
  | CreateParams
  | UpdateParams
  | UpdateManyParams
  | DeleteParams
  | DeleteManyParams;

type ElectricDataProviderParams = {
  supabase: SupabaseClient;
};
const config = {
  debug: false, //import.meta.env.DEV,
  url: import.meta.env.VITE_ELECTRIC_URL,
};

const scopedDbName = `basic-0.10.1-hello.db`;
const conn = await ElectricDatabase.init(scopedDbName, "");
export const electric = await electrify(conn, schema, config);

type TableName = keyof typeof schema.tables;

export type RequestOptions = {
  method: keyof DataProvider;
  collection: TableName;
  params: any;
};

function raQueryToElectricQuery(params: AnyParams) {
  const electricQuery: any = {};
  electricQuery.where = "filter" in params ? params["filter"] : {};
  if ("sort" in params) {
    electricQuery.orderBy = [
      {
        [params["sort"].field]: params["sort"].order.toLowerCase(),
      },
    ];
  }
  if ("pagination" in params) {
    electricQuery.take = params["pagination"].perPage;
    electricQuery.skip =
      (params["pagination"].page - 1) * params["pagination"].perPage;
  }
  return electricQuery;
}

export default function ElectricDataProvider(
  params: ElectricDataProviderParams
): DataProvider {
  const loaded = (async () => {
    await electric.connect(await getSupabaseJWT(params.supabase));
    // This is a simplification for now until we have "shapes"
    const tableSyncs = Object.keys(schema.tables).map((table) => {
      // @ts-ignore
      return electric.db[table].sync();
    });
    const syncs = await Promise.all(tableSyncs);
    await Promise.all(
      syncs.map((sync: { synced: Promise<undefined> }) => sync.synced)
    );
  })();

  async function getData(options: RequestOptions) {
    await loaded;
    const tableName = _.snakeCase(options.collection);
    const { take, skip, where, orderBy } = options.params;
    try {
      if (take) {
        // @ts-ignore
        const data = await electric.db[tableName][options.method]({
          where,
          orderBy,
        });
        if (data) {
          return { data: data.slice(skip, skip + take), total: data.length };
        }
      } else {
        // @ts-ignore
        const data = await electric.db[tableName][options.method](
          options.params
        );
        if (data) {
          return data;
        }
      }
      throw new Error("No data returned");
    } catch (e) {
      console.log("error", tableName, options.method, e);
    }
  }
  return {
    getList: async (resource: TableName, params: GetListParams) => {
      const data = await getData({
        method: "findMany",
        collection: resource,
        params: raQueryToElectricQuery(params),
      });
      return data;
    },
    getOne: async (resource: TableName, params: GetOneParams) => {
      const data = await getData({
        method: "findUnique",
        collection: resource,
        params: { where: { id: params.id } },
      });
      return { data };
    },
    getMany: async (resource: TableName, params: GetManyParams) => {
      const data = await getData({
        method: "findMany",
        collection: resource,
        params: { where: { id: { in: params.ids } } },
      });
      return { data };
    },
    getManyReference: async (
      resource: TableName,
      params: GetManyReferenceParams
    ) => {
      const electricQuery = raQueryToElectricQuery(params);
      electricQuery.where = {
        ...electricQuery.where,
        [params.target]: { equals: params.id },
      };
      const data = await getData({
        method: "findMany",
        collection: resource,
        params: electricQuery,
      });
      return data;
    },
    create: async (resource: TableName, params: CreateParams) => {
      const indata = {
        id: uuidv4(),
        ...params.data,
      };
      const data = await getData({
        method: "create",
        collection: resource,
        params: { data: indata },
      });
      return { data };
    },
    update: async (resource: TableName, params: UpdateParams) => {
      const data = await getData({
        method: "update",
        collection: resource,
        params: {
          where: {
            id: params.previousData.id,
          },
          data: params.data,
        },
      });
      return { data };
    },
    updateMany: async (resource: TableName, params: UpdateManyParams) => {
      // FIXME: this has not been properly tested!!!
      // prisma
      // await prisma.email.updateMany({
      //   where: {
      //     user: {
      //       id: 10,
      //     },
      //     unread: true,
      //   },
      //   data: {
      //     unread: false,
      //   },
      // })

      const data = await getData({
        method: "updateMany",
        collection: resource,
        params: {
          where: {
            id: { in: params.ids },
          },
          data: params.data,
        },
      });
      return { data, total: data.length };
    },
    delete: async (resource: TableName, params: DeleteParams) => {
      const data = await getData({
        method: "delete",
        collection: resource,
        params: { where: { id: params.id } },
      });
      return { data: data.id };
    },
    deleteMany: async (resource: TableName, params: DeleteManyParams) => {
      const data = await getData({
        method: "deleteMany",
        collection: resource,
        params: { where: { id: { in: params.ids } } },
      });
      if (data.count === params.ids.length) {
        return { data: params.ids };
      } else {
        throw new Error("Count mismatch");
      }
    },
  } as DataProvider;
}
