import { Dialog } from "@mui/material";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useDataProvider,
  useGetIdentity,
  useRedirect,
} from "react-admin";

import { Deals } from "../generated/client";
import { stageChoices } from "./stages";
import { typeChoices } from "./types";

const validateRequired = required();

export const DealCreate = ({ open }: { open: boolean }) => {
  const redirect = useRedirect();
  const { identity } = useGetIdentity();
  const dataProvider = useDataProvider();
  const handleClose = () => {
    redirect("/deals");
  };

  const onSuccess = (deal: Deals) => {
    redirect("/deals");
    // increase the index of all deals in the same stage as the new deal
    dataProvider
      .getList("deals", {
        pagination: { page: 1, perPage: 50 },
        sort: { field: "id", order: "ASC" },
        filter: { stage: deal.stage },
      })
      .then(({ data: deals }) =>
        Promise.all(
          deals
            .filter((oldDeal) => oldDeal.id !== deal.id)
            .map((oldDeal) =>
              dataProvider.update("deals", {
                id: oldDeal.id,
                data: { anindex: oldDeal.anindex + 1 },
                previousData: oldDeal,
              })
            )
        )
      );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Create<Deals>
        resource="deals"
        transform={(data: Deals) => ({
          ...data,
          start_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          sales_id: identity?.id,
        })}
        mutationOptions={{ onSuccess }}
        sx={{ width: 500, "& .RaCreate-main": { mt: 0 } }}
      >
        <SimpleForm defaultValues={{ anindex: 0 }}>
          <TextInput
            source="name"
            label="Deal name"
            fullWidth
            validate={validateRequired}
          />
          <TextInput source="description" multiline rows={3} fullWidth />
          <ReferenceInput source="company_id" reference="companies">
            <AutocompleteInput
              optionText="name"
              fullWidth
              validate={validateRequired}
            />
          </ReferenceInput>
          <SelectInput
            source="stage"
            choices={stageChoices}
            fullWidth
            validate={validateRequired}
            defaultValue="opportunity"
          />
          <SelectInput source="type" choices={typeChoices} fullWidth />
          <NumberInput source="amount" fullWidth defaultValue={0} />
        </SimpleForm>
      </Create>
    </Dialog>
  );
};
