import { faker } from "@faker-js/faker/locale/en_US";
import { v4 as uuidv4 } from "uuid";
import { JANE_DOE } from "./utils";

const { person, internet } = faker;

export function generateSales() {
  const randomSales = Array.from(Array(10).keys()).map(() => {
    const first_name = person.firstName();
    const last_name = person.lastName();
    const email = internet.email({
      firstName: first_name,
      lastName: last_name,
    });

    return {
      id: uuidv4(),
      first_name,
      last_name,
      email,
    };
  });
  return [JANE_DOE, ...randomSales];
}
