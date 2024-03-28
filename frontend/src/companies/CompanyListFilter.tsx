import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box } from "@mui/material";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetIdentity,
} from "react-admin";

import { sectors } from "./sectors";
import { sizes } from "./sizes";

export const CompanyListFilter = () => {
  const { identity } = useGetIdentity();
  return (
    <Box width="13em" minWidth="13em" order={-1} mr={2} mt={7}>
      <FilterLiveSearch source="name" />

      <FilterList label="Size" icon={<BusinessIcon />}>
        {sizes.map((size) => (
          <FilterListItem
            key={size.id}
            label={size.name}
            value={{ size: size.id }}
          />
        ))}
      </FilterList>

      <FilterList label="Sector" icon={<LocalShippingIcon />}>
        {sectors.map((sector) => (
          <FilterListItem
            key={sector.id}
            label={sector.name}
            value={{ sector: sector.id }}
          />
        ))}
      </FilterList>

      <FilterList label="Account manager" icon={<SupervisorAccountIcon />}>
        <FilterListItem
          label="Me"
          value={{
            sales_id: identity && identity.id,
          }}
        />
      </FilterList>
    </Box>
  );
};
