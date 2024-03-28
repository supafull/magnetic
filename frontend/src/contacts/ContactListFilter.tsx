import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import { Box, Chip } from "@mui/material";
import { Box } from "@mui/material";
import {
  endOfYesterday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetIdentity,
  // useGetList,
} from "react-admin";

import { Status } from "../misc/Status";

export const ContactListFilter = () => {
  const { identity } = useGetIdentity();
  // const { data } = useGetList("tags", {
  //   pagination: { page: 1, perPage: 10 },
  //   sort: { field: "name", order: "ASC" },
  // });
  return (
    <Box width="13em" minWidth="13em" order={-1} mr={2} mt={7}>
      <FilterLiveSearch
        // source="fts@fts"
        source="first_name"
        sx={{
          display: "block",
          "& .MuiFilledInput-root": { width: "100%" },
        }}
      />
      <FilterList label="Last seen" icon={<AccessTimeIcon />}>
        <FilterListItem
          label="Today"
          value={{
            last_seen: { gte: endOfYesterday().toISOString() },
          }}
        />
        <FilterListItem
          label="This week"
          value={{
            last_seen: { gte: startOfWeek(new Date()).toISOString() },
          }}
        />
        <FilterListItem
          label="Last week"
          value={{
            last_seen: {
              gte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
              lte: startOfWeek(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="This month"
          value={{
            last_seen: {
              gte: startOfMonth(new Date()).toISOString(),
              lte: undefined,
            },
          }}
        />
        <FilterListItem
          label="Last month"
          value={{
            last_seen: {
              gte: subMonths(startOfMonth(new Date()), 1).toISOString(),
              lte: startOfMonth(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="Earlier"
          value={{
            last_seen: {
              gte: undefined,
              lte: subMonths(startOfMonth(new Date()), 1).toISOString(),
            },
          }}
        />
      </FilterList>
      <FilterList label="Status" icon={<TrendingUpIcon />}>
        <FilterListItem
          label={
            <>
              Cold <Status status="cold" />
            </>
          }
          value={{ status: "cold" }}
        />
        <FilterListItem
          label={
            <>
              Warm <Status status="warm" />
            </>
          }
          value={{ status: "warm" }}
        />
        <FilterListItem
          label={
            <>
              Hot <Status status="hot" />
            </>
          }
          value={{ status: "hot" }}
        />
        <FilterListItem
          label={
            <>
              In contract <Status status="in-contract" />
            </>
          }
          value={{ status: "in-contract" }}
        />
      </FilterList>
      {/* <FilterList label="Tags" icon={<LocalOfferIcon />}>
        {data &&
          data.map((record) => (
            <FilterListItem
              key={record.id}
              label={
                <Chip
                  label={record?.name}
                  size="small"
                  style={{
                    backgroundColor: record?.color,
                    border: 0,
                    cursor: "pointer",
                  }}
                />
              }
              value={{ tags: `{${record.id}}` }}
            />
          ))}
      </FilterList> */}
      <FilterList label="Account manager" icon={<SupervisorAccountIcon />}>
        <FilterListItem
          label="Me"
          value={{ sales_id: identity && identity.id }}
        />
      </FilterList>
    </Box>
  );
};
