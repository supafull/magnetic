import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";

import { Contact } from "../../frontend/src/types";
import { Db } from "./types";
import { randomDate, weightedBoolean } from "./utils";

const {
  person,
  internet,
  helpers,
  company: fakerCompany,
  phone,
  lorem,
} = faker;

const genders = ["male", "female"];
const status = ["cold", "cold", "cold", "warm", "warm", "hot", "in-contract"];
const maxContacts = {
  1: 1,
  10: 4,
  50: 12,
  250: 25,
  500: 50,
};

export function generateContacts(
  db: Pick<Db, "companies" | "tags">
): Contact[] {
  const nbAvailblePictures = 223;
  let numberOfContacts = 0;

  return Array.from(Array(500).keys()).map(() => {
    const has_avatar =
      weightedBoolean(25) && numberOfContacts < nbAvailblePictures;
    const gender = helpers.arrayElement(genders);
    const first_name = person.firstName(gender as any);
    const last_name = person.lastName();
    const email = internet.email({
      firstName: first_name,
      lastName: last_name,
    });
    const avatar = has_avatar
      ? "https://marmelab.com/posters/avatar-" +
        (223 - numberOfContacts) +
        ".jpeg"
      : undefined;
    const title = fakerCompany.buzzAdjective();

    if (has_avatar) {
      numberOfContacts++;
    }

    // choose company with people left to know
    let company;
    do {
      company = helpers.arrayElement(db.companies);
    } while (company.nb_contacts >= maxContacts[company.size]);
    company.nb_contacts++;

    const first_seen = randomDate(new Date(company.created_at)).toISOString();
    const last_seen = first_seen;

    return {
      id: uuidv4(),
      first_name,
      last_name,
      gender,
      title: title.charAt(0).toUpperCase() + title.substr(1),
      company_id: company.id,
      email,
      phone_number1: phone.number(),
      phone_number2: phone.number(),
      background: lorem.sentence(),
      acquisition: helpers.arrayElement(["inbound", "outbound"]),
      avatar,
      first_seen: first_seen,
      last_seen: last_seen,
      has_newsletter: weightedBoolean(30),
      status: helpers.arrayElement(status),
      tags: helpers
        .arrayElements(db.tags, helpers.arrayElement([0, 0, 0, 1, 1, 2]))
        .map((tag) => tag.id), // finalize
      sales_id: company.sales_id,
    };
  });
}
