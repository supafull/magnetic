import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { supabase } from "../supabase";
import GoldenRetriever from "@uppy/golden-retriever";

export default function Uploader({
  companyId,
  refresh,
}: {
  companyId: string;
  refresh: () => void;
}) {
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  // HOWEVER! We must set each companyId or if you try and upload the same file to a different company
  // it will NOT actually upload, as Uppy will think it's the same upload attempt, so not redo a successful upload.
  const [uppy] = useState(
    () =>
      new Uppy({
        debug: false,
        // logger: debugLogger,
        id: companyId,
      })
  );
  const supabaseStorageURL = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/upload/resumable`;
  useEffect(() => {
    if (!uppy) return;
    (async () => {
      uppy
        .use(Tus, {
          endpoint: supabaseStorageURL,
          headers: {
            authorization: `Bearer ${
              (await supabase.auth.getSession()).data?.session?.access_token
            }`,
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
      uppy.on("file-added", (file) => {
        const supabaseMetadata = {
          bucketName: "uploads",
          objectName: `${companyId}/${file.name}`,
          contentType: file.type,
        };

        file.meta = {
          ...file.meta,
          ...supabaseMetadata,
        };
      });

      uppy.on("complete", (result) => {
        console.debug(`Upload complete`, result);
        refresh();
      });
      uppy.on("error", (error) => {
        console.error("Unable to upload file due to", error);
      });
    })();
  }, [uppy, supabaseStorageURL, companyId]);

  return <Dashboard uppy={uppy} />;
}
