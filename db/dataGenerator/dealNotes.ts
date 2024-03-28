import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";

import { Db } from "./types";
import { randomDate } from "./utils";
const { lorem, helpers, number } = faker;
const type = ["Email", "Call", "Call", "Call", "Call", "Meeting", "Reminder"];

export function generateDealNotes(db: Pick<Db, "companies" | "deals">) {
  return Array.from(Array(300).keys()).map(() => {
    const deal = helpers.arrayElement(db.deals);
    return {
      id: uuidv4(),
      deal_id: deal.id,
      type: helpers.arrayElement(type),
      text: lorem.paragraphs(number.int({ min: 1, max: 4 })),
      date: randomDate(
        new Date(
          db.companies.find((company) => company.id == deal.company_id)
            ?.created_at || new Date()
        )
      ).toISOString(),
      sales_id: deal.sales_id,
    };
  });
}
