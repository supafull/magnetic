import { faker } from "@faker-js/faker/locale/en";
import { v4 as uuidv4 } from "uuid";

export const JANE_DOE = {
  id: uuidv4(),
  first_name: "Jane",
  last_name: "Doe",
  email: "janedoe@atomic.dev",
};

export function weightedArrayElement(values: any[], weights: any) {
  return faker.helpers.arrayElement(
    values.reduce(
      (acc, value, index) => acc.concat(new Array(weights[index]).fill(value)),
      []
    )
  );
}

export function weightedBoolean(likelyhood: number) {
  return faker.number.int(99) < likelyhood;
}

export function randomDate(minDate?: Date, maxDate?: Date) {
  const minTs =
    minDate instanceof Date
      ? minDate.getTime()
      : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = faker.number.int({ max: range });
  // move it more towards today to account for traffic increase
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
}

export function randomFloat(min: number, max: number) {
  return parseFloat(
    faker.number.float({ min, max, precision: 0.01 }).toFixed(2)
  );
}
