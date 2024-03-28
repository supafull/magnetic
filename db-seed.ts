import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

import { generateCompanies } from "./db/dataGenerator/companies";
import { generateContactNotes } from "./db/dataGenerator/contactNotes";
import { generateContacts } from "./db/dataGenerator/contacts";
import { generateDealNotes } from "./db/dataGenerator/dealNotes";
import { generateDeals } from "./db/dataGenerator/deals";
import { generateSales } from "./db/dataGenerator/sales";
import { generateTags } from "./db/dataGenerator/tags";
import { generateTasks } from "./db/dataGenerator/tasks";
import { ContactNote } from "./frontend/src/types";
import { removeDupes } from "./frontend/src/utils";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
dotenv.config();

console.log(
  "Seeding data...",
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

export async function seed() {
  // reseed data, first delete all data
  const deleteResults = await Promise.all([
    supabase
      .from("sales")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("tags")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("companies")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("contacts")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("contact_notes")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("deals")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("deal_notes")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
    supabase
      .from("tasks")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"),
  ]);

  for (const result of deleteResults) {
    if (result.error) {
      throw result.error;
    }
  }

  await new Promise((r) => setTimeout(r, 1000));

  const users = await supabase.auth.admin.listUsers();
  // console.log("Deleting users...", users);
  const deleteUsers = await Promise.all(
    users.data?.users.map((user) =>
      supabase.auth.admin.deleteUser(user.id, false)
    )
  );
  for (const result of deleteUsers) {
    if (result.error) {
      throw result.error;
    }
  }

  console.log("Deleted existing data... Now adding new data...");
  // supabase needs to think for a bit unfortunately ;-(
  await new Promise((r) => setTimeout(r, 1000));

  const sales = generateSales();
  console.log(`Adding ${sales.length} sales...`);
  const { data: persistedSales, error: errorSales } = await supabase
    .from("sales")
    .insert(sales)
    .select();

  if (errorSales) {
    throw errorSales;
  }

  const tags = generateTags();
  console.log(`Adding ${tags.length} tags...`);
  const { data: persistedTags, error: errorTags } = await supabase
    .from("tags")
    .insert(tags)
    .select();

  if (errorTags) {
    throw errorTags;
  }

  const companies = generateCompanies({ sales: persistedSales });
  console.log(`Adding ${companies.length} companies...`);
  const { data: persistedCompanies, error: errorCompanies } = await supabase
    .from("companies")
    .insert(companies)
    .select();

  if (errorCompanies) {
    throw errorCompanies;
  }

  const contacts = generateContacts({
    tags: persistedTags,
    companies: persistedCompanies,
  });
  console.log(`Adding ${contacts.length} contacts...`);
  const { data: persistedContacts, error: errorContacts } = await supabase
    .from("contacts")
    .insert(contacts)
    .select();

  if (errorContacts) {
    throw errorContacts;
  }

  const contactNotes = generateContactNotes({
    contacts: persistedContacts,
  });
  console.log(`Adding ${contactNotes.length} contact notes...`);
  const { data: persistedContactNotes, error: errorContactNotes } =
    await supabase.from("contact_notes").insert(contactNotes).select();

  if (errorContactNotes) {
    throw errorContactNotes;
  }

  const updatedContacts = removeDupes(
    (persistedContactNotes as ContactNote[])
      .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
      .map((note) =>
        persistedContacts.find((contact) => contact.id === note.contact_id)
      )
      .map((contact) => ({
        ...contact,
        status: persistedContactNotes.find(
          (note) => note.contact_id === contact.id
        ).status,
      }))
  );

  console.log(`Updating ${updatedContacts.length} contacts statuses...`);
  const { error } = await supabase.from("contacts").upsert(updatedContacts);
  if (error) {
    throw error;
  }

  const deals = generateDeals({
    companies: persistedCompanies,
    contacts: persistedContacts,
  });
  console.log(`Adding ${deals.length} deals...`);
  const { data: persistedDeals, error: errorDeals } = await supabase
    .from("deals")
    .insert(deals)
    .select();

  if (errorDeals) {
    throw errorDeals;
  }

  const dealNotes = generateDealNotes({
    companies: persistedCompanies,
    deals: persistedDeals,
  });
  console.log(`Adding ${dealNotes.length} deal notes...`);
  const { error: errorDealNotes } = await supabase
    .from("deal_notes")
    .insert(dealNotes);

  if (errorDealNotes) {
    throw errorDealNotes;
  }

  const tasks = generateTasks({
    contacts: persistedContacts,
  });
  console.log(`Adding ${tasks.length} tasks...`);
  const { error: errorTasks } = await supabase.from("tasks").insert(tasks);

  if (errorTasks) {
    throw errorTasks;
  }

  console.log(`Adding ${sales.length} users...`);
  for (const sale of sales) {
    const users = await supabase.auth.admin.listUsers();
    if (!users.data?.users.find((user) => user.email === sale.email)) {
      // console.log("Adding user...", sale);
      const { error } = await supabase.auth.admin.createUser({
        email: sale.email,
        password: "a_good_password",
        email_confirm: true,
      });

      if (error) {
        throw error;
      }
    }
  }

  console.log("Data seeded successfully");
}

seed().catch((error) => {
  console.error(error);

  process.exit(1);
});
