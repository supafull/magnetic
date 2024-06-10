import { Box, Divider, Link, Typography } from "@mui/material";
import {
  DateField,
  EditButton,
  FunctionField,
  ReferenceField,
  ShowButton,
  TextField,
  useRecordContext,
} from "react-admin";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Uploader from "./Uploader";
import { Companies, Sales } from "../generated/client";
import useImageSource from "../misc/ImageSource";

interface CompanyAsideProps {
  link?: string;
}

async function listFiles(companyId: string) {
  const { data, error } = await supabase.storage
    .from("uploads")
    .list(companyId, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    console.error("Error listing company files", error);
  }
  return [...(data?.values() || [])].map((file) => file.name);
}

export const CompanyAside = ({ link = "edit" }: CompanyAsideProps) => {
  const record = useRecordContext<Companies>();
  const [files, setFiles] = useState<string[] | null>(null);
  const logoSrc = useImageSource(record);
  useEffect(() => {
    if (!record) return;
    listFiles(record.id.toString()).then(setFiles);
  }, [record]);
  if (!record) return null;
  return (
    <Box ml={4} width={250} minWidth={250}>
      <Box textAlign="center" mb={2}>
        {link === "edit" ? (
          <EditButton label="Edit Company" />
        ) : (
          <ShowButton label="Show Company" />
        )}
      </Box>

      <Typography variant="subtitle2">Company info</Typography>
      <Divider />

      <Box mt={2}>
        <Typography variant="body2">
          Website: <Link href={record.website}>{record.website}</Link>
          <br />
          LinkedIn: <Link href={record.linked_in}>LinkedIn</Link>
        </Typography>
      </Box>

      <Box mt={1}>
        <TextField source="phone_number" />{" "}
        <Typography variant="body2" color="textSecondary" component="span">
          Main
        </Typography>
      </Box>

      <Box mt={1} mb={3}>
        <TextField source="address" />
        <br />
        <TextField source="city" /> <TextField source="zipcode" />{" "}
        <TextField source="stateAbbr" />
      </Box>

      <Typography variant="subtitle2">Background</Typography>
      <Divider />

      <Box mt={1}>
        <Typography variant="body2" color="textSecondary" component="span">
          Added on
        </Typography>{" "}
        <DateField
          source="created_at"
          options={{ year: "numeric", month: "long", day: "numeric" }}
          color="textSecondary"
        />
        <br />
        <Typography component="span" variant="body2" color="textSecondary">
          Followed by
        </Typography>{" "}
        <ReferenceField source="sales_id" reference="sales">
          <FunctionField<Sales>
            source="last_name"
            render={(record) =>
              record ? `${record.first_name} ${record.last_name}` : ""
            }
          />
        </ReferenceField>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary" component="span">
          Files
        </Typography>
        <br />
        {files?.map((file) => (
          <div key={file}>
            <a
              href="#"
              onClick={async () => {
                const { data } = await supabase.storage
                  .from("uploads")
                  .download(`${record.id}/${file}`);
                if (data) {
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(data);
                  link.download = file;
                  link.click();
                  URL.revokeObjectURL(link.href);
                }
              }}
            >
              {file}
            </a>
          </div>
        ))}
        <Uploader
          companyId={record.id.toString()}
          refresh={() => {
            listFiles(record.id.toString()).then((fs) => setFiles(fs));
          }}
        />
        {logoSrc.startsWith("http") && (
          // demonstrate imgproxy working
          <>
            <Box sx={{ paddingTop: "10px" }}>
              <img
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                src={
                  supabase.storage
                    .from("logos")
                    .getPublicUrl(logoSrc.split("/").slice(-1)[0], {
                      transform: {
                        width: 80,
                        height: 80,
                      },
                    }).data?.publicUrl
                }
              />
            </Box>
            <span>{logoSrc}</span>
          </>
        )}
      </Box>
    </Box>
  );
};
