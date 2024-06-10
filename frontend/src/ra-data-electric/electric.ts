import { LIB_VERSION } from "electric-sql/version";
import { makeElectricContext } from "electric-sql/react";
import { schema, Electric } from "../generated/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseJWT } from "../utils";

export const { ElectricProvider, useElectric } =
  makeElectricContext<Electric>();

const DEV_MODE = import.meta.env.DEV;
const DEBUG_ENV = import.meta.env.DEBUG;
const CLIENT_DB: "wa-sqlite" | "pglite" =
  import.meta.env.VITE_ELECTRIC_CLIENT_DB || "wa-sqlite";

const discriminator = "magnetic";
const electricUrl = import.meta.env.VITE_ELECTRIC_URL;

// We can override the debug mode with a query param: ?debug=true or ?debug=false
const searchParams = new URLSearchParams(window.location.search);
const debugParam = searchParams.get("debug");

// DEBUG defaults to true in dev mode, false in prod mode
export const DEBUG = debugParam ? debugParam === "true" : DEV_MODE || DEBUG_ENV;

// We export dbName so that we can delete the database if the schema changes
export let dbName: string;

const config = {
  url: electricUrl,
  // debug: DEBUG,
  debug: false,
};

const initPGlite = async () => {
  const { electrify } = await import("electric-sql/pglite");
  const { PGlite } = await import("@electric-sql/pglite");

  dbName = `idb://${discriminator}-${LIB_VERSION}.db`;

  const conn = new PGlite(dbName);
  await conn.waitReady;
  const electric = await electrify(conn, schema, config);
  return {
    electric,
    conn,
    config,
  };
};

const initWaSqlite = async () => {
  const { electrify, ElectricDatabase } = await import(
    "electric-sql/wa-sqlite"
  );

  dbName = `${discriminator}-${LIB_VERSION}.db`;
  console.log("dbName", dbName);

  const conn = await ElectricDatabase.init(dbName);
  const electric = await electrify(conn, schema, config);
  return {
    electric,
    conn,
    config,
  };
};

export async function initElectric(authToken: string) {
  const { electric, conn, config } =
    CLIENT_DB === "wa-sqlite" ? await initWaSqlite() : await initPGlite();
  if (DEBUG) {
    console.log("initElectric");
    console.log("dbName", dbName);
    console.log("conn", conn);
    console.log("schema", schema);
    console.log("config", config);
  }

  await electric.connect(authToken);

  window.electric = electric;
  return electric;
}

export async function bootstrapElectric(supabase: SupabaseClient) {
  if (window.electric) {
    return window.electric;
  }
  let jwt: string = "";
  while (!jwt) {
    try {
      jwt = await getSupabaseJWT(supabase);
    } catch (e) {
      console.debug("Waiting for JWT", e);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  const elec = await initElectric(jwt);
  // Simply sync everything as an example
  const tableSyncs = Object.keys(schema.tables).map((table) => {
    // @ts-ignore
    return elec.db[table].sync();
  });
  const syncs = await Promise.all(tableSyncs);
  await Promise.all(
    syncs.map((sync: { synced: Promise<undefined> }) => sync.synced)
  );
  return elec;
}
