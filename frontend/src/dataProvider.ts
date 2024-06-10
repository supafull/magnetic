import Uppy, { debugLogger } from "@uppy/core";
import GoldenRetriever from "@uppy/golden-retriever";
import Tus from "@uppy/tus";
import { withLifecycleCallbacks } from "react-admin";

import electricDataProvider from "./ra-data-electric";
import { supabase } from "./supabase";

async function beforeSave(params: any) {
  const session = await supabase.auth.getSession();
  if (!session.data.session?.user) throw new Error("No user found");

  const updateFile = params.logo ? params.logo : params.avatar;
  const property = params.logo ? "logo" : "avatar";
  if (!updateFile || !updateFile.src.startsWith("blob")) return params;
  const companyId = params.id;
  const STORAGE_BUCKET = "logos";

  const supabaseStorageURL = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/upload/resumable`;

  const uppy = new Uppy({
    debug: false,
    logger: debugLogger,
    autoProceed: true,
    id: "logo",
    restrictions: {
      allowedFileTypes: ["image/*"],
    },
  })
    .use(Tus, {
      endpoint: supabaseStorageURL,
      headers: {
        authorization: `Bearer ${session.data.session?.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        "x-upsert": "true",
      },
      uploadDataDuringCreation: true,
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
    .use(GoldenRetriever);
  const objectName = `${companyId}.${updateFile.rawFile.name.split(".").pop()}`;
  const destinationName = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/logos/${objectName}`;

  uppy.on("file-added", (file) => {
    const supabaseMetadata = {
      bucketName: STORAGE_BUCKET,
      objectName,
      contentType: file.type,
    };

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    };
  });

  uppy.on("complete", (result) => {
    console.debug(`Upload of ${updateFile.name} complete`, result.successful);
  });
  uppy.on("error", (error) => {
    console.error("Unable to upload file due to", error);
  });
  uppy.addFile({
    name: updateFile.title,
    type: updateFile.rawFile.type,
    data: updateFile.rawFile,
    source: "Local",
    isRemote: false,
  });
  return {
    ...params,
    [property]: {
      src: destinationName,
      title: updateFile.title,
    },
  };
}

export const dataProvider = withLifecycleCallbacks(
  electricDataProvider({ supabase }),
  [
    {
      resource: "contacts",
      beforeSave,
    },
    {
      resource: "companies",
      beforeSave,
    },
  ]
);
