import { faker } from "@faker-js/faker/locale/en_US";
import { add } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { Db } from "./types";
import { Deal } from "../../frontend/src/types";
import { randomDate } from "./utils";

const type = [
  "Other",
  "Copywriting",
  "Print project",
  "UI Design",
  "Website design",
];
const stages = [
  "opportunity",
  "proposal-sent",
  "in-negociation",
  "won",
  "lost",
  "delayed",
];
const { lorem, helpers, number } = faker;

export function generateDeals(db: Pick<Db, "companies" | "contacts">): Deal[] {
  const deals = Array.from(Array(50).keys()).map(() => {
    const company = helpers.arrayElement(db.companies);
    company.nb_deals++;
    const contacts = helpers.arrayElements(
      db.contacts.filter((contact) => contact.company_id === company.id),
      number.int({ min: 1, max: 3 })
    );
    const lowercaseName = lorem.words();
    const created_at = randomDate(new Date(company.created_at)).toISOString();
    return {
      id: uuidv4(),
      name: lowercaseName[0].toUpperCase() + lowercaseName.slice(1),
      company_id: company.id,
      contact_ids: contacts.map((contact) => contact.id),
      type: helpers.arrayElement(type),
      stage: helpers.arrayElement(stages),
      description: lorem.paragraphs(number.int({ min: 1, max: 4 })),
      amount: number.int(1000) * 100,
      created_at: created_at,
      updated_at: randomDate(new Date(created_at)).toISOString(),
      start_at: randomDate(
        new Date(),
        add(new Date(), { months: 6 })
      ).toISOString(),
      sales_id: company.sales_id,
      anindex: 0,
    };
  });
  // compute index based on stage
  stages.forEach((stage) => {
    deals
      .filter((deal) => deal.stage === stage)
      .forEach((deal, index) => {
        deals.find((x) => x.id === deal.id)!.anindex = index;
      });
  });
  return deals;
}
