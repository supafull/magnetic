import {
  CreateButton,
  ExportButton,
  List,
  Pagination,
  TopToolbar,
  useGetIdentity,
} from "react-admin";

import { CompanyListFilter } from "./CompanyListFilter";
import { ImageList } from "./GridList";

export const CompanyList = () => {
  const { identity } = useGetIdentity();
  if (!identity) return null;
  return (
    <List
      actions={<CompanyListActions />}
      aside={<CompanyListFilter />}
      filterDefaultValues={{ sales_id: identity?.id }}
      pagination={<Pagination rowsPerPageOptions={[15, 25, 50, 100]} />}
      perPage={25}
      sort={{ field: "name", order: "ASC" }}
      component="div"
    >
      <ImageList />
    </List>
  );
};

const CompanyListActions = () => {
  return (
    <TopToolbar>
      <ExportButton />
      <CreateButton
        variant="contained"
        label="New Company"
        sx={{ marginLeft: 2 }}
      />
    </TopToolbar>
  );
};
