import { Identifier, RaRecord } from "react-admin";

export interface Sale extends RaRecord {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Company extends RaRecord {
  name: string;
  logo: string;
  sector: string;
  size: 1 | 10 | 50 | 250 | 500;
  linked_in: string;
  website: string;
  phone_number: string;
  address: string;
  zipcode: string;
  city: string;
  state_abbr: string;
  sales_id: Identifier;
  created_at: string;
}

export interface Contact extends RaRecord {
  first_name: string;
  last_name: string;
  title: string;
  company_id: Identifier;
  email: string;
  avatar?: string;
  first_seen: string;
  last_seen: string;
  has_newsletter: boolean;
  tags: Identifier[];
  gender: string;
  sales_id: Identifier;
}

export interface ContactNote extends RaRecord {
  contact_id: Identifier;
  type: string;
  text: string;
  date: string;
  sales_id: Identifier;
  status: string;
}

export interface Deal extends RaRecord {
  name: string;
  company_id: Identifier;
  contact_ids: Identifier[];
  type: string;
  stage: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
  sales_id: Identifier;
  anindex: number;
}

export interface Tag extends RaRecord {
  name: string;
  color: string;
}
