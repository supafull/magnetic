import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";

import { ContactNote } from "../../frontend/src/types";
import { Db } from "./types";
import { randomDate } from "./utils";

const type = ["Email", "Call", "Call", "Call", "Call", "Meeting", "Reminder"];
const status = ["cold", "cold", "cold", "warm", "warm", "hot", "in-contract"];

const { lorem, helpers, number } = faker;

export function generateContactNotes(db: Pick<Db, "contacts">): ContactNote[] {
  return Array.from(Array(500).keys()).map(() => {
    const contact = helpers.arrayElement(db.contacts);
    const date = randomDate(new Date(contact.first_seen)).toISOString();
    contact.last_seen = date > contact.last_seen ? date : contact.last_seen;
    return {
      id: uuidv4(),
      contact_id: contact.id,
      type: helpers.arrayElement(type),
      text: lorem.paragraphs(number.int({ min: 1, max: 4 })),
      date,
      sales_id: contact.sales_id,
      status: helpers.arrayElement(status),
    };
  });
}
