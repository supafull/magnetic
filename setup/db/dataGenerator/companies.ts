import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";

import { Company } from "../../../frontend/src/types";
import { Db } from "./types";
import { JANE_DOE, randomDate } from "./utils";

const sectors = [
  "Communication Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Information Technology",
  "Materials",
  "Real Estate",
  "Utilities",
];
const { company, internet, location, phone, helpers, number } = faker;
const sizes = [1, 10, 50, 250, 500];
const regex = /\W+/;

export function generateCompanies(db: Pick<Db, "sales">): Company[] {
  return Array.from(Array(55).keys()).map((i) => {
    const name = company.name();
    const id = uuidv4();
    return {
      id,
      name: name,
      logo: { src: `/logos/${i}.png`, title: name },
      sector: helpers.arrayElement(sectors),
      size: helpers.arrayElement(sizes) as 1 | 10 | 50 | 250 | 500,
      linked_in: `https://www.linkedin.com/company/${name
        .toLowerCase()
        .replace(regex, "_")}`,
      website: internet.url(),
      phone_number: phone.number(),
      address: location.streetAddress(),
      zipcode: location.zipCode(),
      city: location.city(),
      state_abbr: location.state({ abbreviated: true }),
      // nb_contacts: 0,
      // nb_deals: 0,
      // at least 1/3rd of companies for Jane Doe
      sales_id:
        number.int(2) === 0
          ? db.sales.find((x) => x.email === JANE_DOE.email)!.id
          : helpers.arrayElement(db.sales).id,
      created_at: randomDate().toISOString(),
    };
  });
}
