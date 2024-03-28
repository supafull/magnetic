import { makeElectricContext } from "electric-sql/react";

import type {
  Companies,
  Contact_notes,
  Contacts,
  Deal_notes,
  Deals,
  Electric,
  Sales,
  Tags,
  Tasks,
} from "./generated/client";
export { schema } from "./generated/client";
export type {
  Companies,
  Contact_notes,
  Contacts,
  Deal_notes,
  Deals,
  Electric,
  Sales,
  Tags,
  Tasks,
};
export const { ElectricProvider, useElectric } =
  makeElectricContext<Electric>();
