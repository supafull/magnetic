CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
);
ALTER TABLE sales ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);
ALTER TABLE tags ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    sector TEXT NOT NULL,
    size SMALLINT NOT NULL,
    linked_in TEXT NOT NULL,
    website TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    city TEXT NOT NULL,
    state_abbr TEXT NOT NULL,
    sales_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);
ALTER TABLE companies ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT,
    title TEXT,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    phone_number1 TEXT,
    phone_number2 TEXT,
    background TEXT,
    acquisition TEXT,
    avatar TEXT NULL,
    first_seen TIMESTAMP NOT NULL,
    last_seen TIMESTAMP NOT NULL,
    has_newsletter BOOLEAN,
    status TEXT NOT NULL,
    tags JSONB NULL,
    sales_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE
);
ALTER TABLE contacts ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS contact_notes (
    id UUID PRIMARY KEY NOT NULL,
    date TIMESTAMP NOT NULL,
    type TEXT NOT NULL,
    text TEXT NOT NULL,
    sales_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL
);
ALTER TABLE contact_notes ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY NOT NULL,
    due_date TIMESTAMP,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    sales_id UUID REFERENCES sales(id) ON DELETE SET NULL,
    text TEXT,
    type TEXT
);
ALTER TABLE tasks ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY NOT NULL,
    created_at TIMESTAMP NOT NULL,
    name TEXT NOT NULL,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    contact_ids JSONB NULL,
    type TEXT NOT NULL,
    stage TEXT NOT NULL,
    description TEXT,
    amount INTEGER NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    start_at TIMESTAMP,
    sales_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    anindex INTEGER NOT NULL
);
ALTER TABLE deals ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS deal_notes (
    id UUID PRIMARY KEY NOT NULL,
    date TIMESTAMP NOT NULL,
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    sales_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    text TEXT NOT NULL
);
ALTER TABLE deal_notes ENABLE ELECTRIC;
