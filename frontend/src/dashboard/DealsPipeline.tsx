import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Box, Card, Link } from "@mui/material";
import {
  ReferenceField,
  SimpleList,
  useGetIdentity,
  useGetList,
} from "react-admin";
import { Link as RouterLink } from "react-router-dom";

import { CompanyAvatar } from "../companies/CompanyAvatar";
import { stageNames, stages } from "../deals/stages";
import { Deals } from "../generated/client";

export const DealsPipeline = () => {
  const { identity } = useGetIdentity();
  const { data, total, isLoading } = useGetList<Deals>(
    "deals",
    {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "updated_at", order: "DESC" },
      filter: { stage: { not: "lost" }, sales_id: identity?.id },
    },
    { enabled: !!identity?.id }
  );

  const getOrderedDeals = (data?: Deals[]): Deals[] | undefined => {
    if (!data) {
      return;
    }
    const deals: Deals[] = [];
    stages
      .filter((stage) => stage !== "won")
      .forEach((stage) =>
        data
          .filter((deal) => deal.stage === stage)
          .forEach((deal) => deals.push(deal))
      );
    return deals;
  };

  return (
    <>
      <Box display="flex" alignItems="center" marginBottom="1em">
        <Box ml={2} mr={2} display="flex">
          <MonetizationOnIcon color="disabled" fontSize="large" />
        </Box>
        <Link
          underline="none"
          variant="h5"
          color="textSecondary"
          component={RouterLink}
          to="/deals"
          id="deals-pipeline"
        >
          Deals Pipeline
        </Link>
      </Box>
      <Card>
        <SimpleList<Deals>
          aria-describedby="deals-pipeline"
          resource="deals"
          linkType="show"
          data={getOrderedDeals(data)}
          total={total}
          isLoading={isLoading}
          primaryText={(deal) => deal.name}
          secondaryText={(deal) =>
            `${deal.amount.toLocaleString("en-US", {
              notation: "compact",
              style: "currency",
              currency: "USD",
              currencyDisplay: "narrowSymbol",
              minimumSignificantDigits: 3,
              // @ts-ignore
            })} , ${stageNames[deal.stage]}`
          }
          leftAvatar={(deal) => (
            <ReferenceField
              source="company_id"
              record={deal}
              reference="companies"
              resource="deals"
              link={false}
            >
              <CompanyAvatar size="small" />
            </ReferenceField>
          )}
        />
      </Card>
    </>
  );
};
