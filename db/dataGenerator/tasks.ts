import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";

import { Db } from "./types";
import { randomDate } from "./utils";

const { lorem, helpers } = faker;

const type = [
  "Email",
  "Email",
  "Email",
  "Email",
  "Email",
  "Email",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Call",
  "Demo",
  "Lunch",
  "Meeting",
  "Follow-up",
  "Follow-up",
  "Thank you",
  "Ship",
  "None",
];

export function generateTasks(db: Pick<Db, "contacts">) {
  return Array.from(Array(400).keys()).map(() => {
    const contact = helpers.arrayElement(db.contacts);
    return {
      id: uuidv4(),
      contact_id: contact.id,
      type: helpers.arrayElement(type),
      text: lorem.sentence(),
      due_date: randomDate(new Date(contact.first_seen)),
      sales_id: contact.sales_id,
    };
  });
}
