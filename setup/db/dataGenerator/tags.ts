import { v4 as uuidv4 } from "uuid";

const tags = [
  { id: uuidv4(), name: "football-fan", color: "#eddcd2" },
  { id: uuidv4(), name: "holiday-card", color: "#fff1e6" },
  { id: uuidv4(), name: "influencer", color: "#fde2e4" },
  { id: uuidv4(), name: "manager", color: "#fad2e1" },
  { id: uuidv4(), name: "musician", color: "#c5dedd" },
  { id: uuidv4(), name: "vip", color: "#dbe7e4" },
];

export function generateTags() {
  return [...tags];
}
