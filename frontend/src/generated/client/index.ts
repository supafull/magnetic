// @ts-nocheck
import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null;


export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.null(),
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = JsonValue
  .nullable();

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.null(),
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CompaniesScalarFieldEnumSchema = z.enum(['id','name','logo','sector','size','linked_in','website','phone_number','address','zipcode','city','state_abbr','sales_id','created_at']);

export const Contact_notesScalarFieldEnumSchema = z.enum(['id','date','type','text','sales_id','status','contact_id']);

export const ContactsScalarFieldEnumSchema = z.enum(['id','first_name','last_name','gender','title','company_id','email','phone_number1','phone_number2','background','acquisition','avatar','first_seen','last_seen','has_newsletter','status','tags','sales_id']);

export const Deal_notesScalarFieldEnumSchema = z.enum(['id','date','deal_id','sales_id','type','text']);

export const DealsScalarFieldEnumSchema = z.enum(['id','created_at','name','company_id','contact_ids','type','stage','description','amount','updated_at','start_at','sales_id','anindex']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',])

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SalesScalarFieldEnumSchema = z.enum(['id','first_name','last_name','email']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TagsScalarFieldEnumSchema = z.enum(['id','name','color']);

export const TasksScalarFieldEnumSchema = z.enum(['id','due_date','contact_id','sales_id','text','type']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COMPANIES SCHEMA
/////////////////////////////////////////

export const CompaniesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number().int().gte(-32768).lte(32767),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  sales_id: z.string().uuid(),
  created_at: z.coerce.date(),
})

export type Companies = z.infer<typeof CompaniesSchema>

/////////////////////////////////////////
// CONTACT NOTES SCHEMA
/////////////////////////////////////////

export const Contact_notesSchema = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales_id: z.string().uuid(),
  status: z.string(),
  contact_id: z.string().uuid().nullable(),
})

export type Contact_notes = z.infer<typeof Contact_notesSchema>

/////////////////////////////////////////
// CONTACTS SCHEMA
/////////////////////////////////////////

export const ContactsSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().nullable(),
  title: z.string().nullable(),
  company_id: z.string().uuid(),
  email: z.string(),
  phone_number1: z.string().nullable(),
  phone_number2: z.string().nullable(),
  background: z.string().nullable(),
  acquisition: z.string().nullable(),
  avatar: z.string().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().nullable(),
  status: z.string(),
  tags: NullableJsonValue.optional(),
  sales_id: z.string().uuid(),
})

export type Contacts = z.infer<typeof ContactsSchema>

/////////////////////////////////////////
// DEAL NOTES SCHEMA
/////////////////////////////////////////

export const Deal_notesSchema = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  deal_id: z.string().uuid(),
  sales_id: z.string().uuid(),
  type: z.string(),
  text: z.string(),
})

export type Deal_notes = z.infer<typeof Deal_notesSchema>

/////////////////////////////////////////
// DEALS SCHEMA
/////////////////////////////////////////

export const DealsSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string().uuid(),
  contact_ids: NullableJsonValue.optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().nullable(),
  sales_id: z.string().uuid(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647),
})

export type Deals = z.infer<typeof DealsSchema>

/////////////////////////////////////////
// SALES SCHEMA
/////////////////////////////////////////

export const SalesSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
})

export type Sales = z.infer<typeof SalesSchema>

/////////////////////////////////////////
// TAGS SCHEMA
/////////////////////////////////////////

export const TagsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string(),
})

export type Tags = z.infer<typeof TagsSchema>

/////////////////////////////////////////
// TASKS SCHEMA
/////////////////////////////////////////

export const TasksSchema = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().nullable(),
  contact_id: z.string().uuid().nullable(),
  sales_id: z.string().uuid().nullable(),
  text: z.string().nullable(),
  type: z.string().nullable(),
})

export type Tasks = z.infer<typeof TasksSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COMPANIES
//------------------------------------------------------

export const CompaniesIncludeSchema: z.ZodType<Prisma.CompaniesInclude> = z.object({
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsFindManyArgsSchema)]).optional(),
  deals: z.union([z.boolean(),z.lazy(() => DealsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompaniesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompaniesArgsSchema: z.ZodType<Prisma.CompaniesArgs> = z.object({
  select: z.lazy(() => CompaniesSelectSchema).optional(),
  include: z.lazy(() => CompaniesIncludeSchema).optional(),
}).strict();

export const CompaniesCountOutputTypeArgsSchema: z.ZodType<Prisma.CompaniesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CompaniesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompaniesCountOutputTypeSelectSchema: z.ZodType<Prisma.CompaniesCountOutputTypeSelect> = z.object({
  contacts: z.boolean().optional(),
  deals: z.boolean().optional(),
}).strict();

export const CompaniesSelectSchema: z.ZodType<Prisma.CompaniesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  logo: z.boolean().optional(),
  sector: z.boolean().optional(),
  size: z.boolean().optional(),
  linked_in: z.boolean().optional(),
  website: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  address: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  city: z.boolean().optional(),
  state_abbr: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsFindManyArgsSchema)]).optional(),
  deals: z.union([z.boolean(),z.lazy(() => DealsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompaniesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT NOTES
//------------------------------------------------------

export const Contact_notesIncludeSchema: z.ZodType<Prisma.Contact_notesInclude> = z.object({
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()

export const Contact_notesArgsSchema: z.ZodType<Prisma.Contact_notesArgs> = z.object({
  select: z.lazy(() => Contact_notesSelectSchema).optional(),
  include: z.lazy(() => Contact_notesIncludeSchema).optional(),
}).strict();

export const Contact_notesSelectSchema: z.ZodType<Prisma.Contact_notesSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  type: z.boolean().optional(),
  text: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  status: z.boolean().optional(),
  contact_id: z.boolean().optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()

// CONTACTS
//------------------------------------------------------

export const ContactsIncludeSchema: z.ZodType<Prisma.ContactsInclude> = z.object({
  contact_notes: z.union([z.boolean(),z.lazy(() => Contact_notesFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompaniesArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ContactsArgsSchema: z.ZodType<Prisma.ContactsArgs> = z.object({
  select: z.lazy(() => ContactsSelectSchema).optional(),
  include: z.lazy(() => ContactsIncludeSchema).optional(),
}).strict();

export const ContactsCountOutputTypeArgsSchema: z.ZodType<Prisma.ContactsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ContactsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ContactsCountOutputTypeSelectSchema: z.ZodType<Prisma.ContactsCountOutputTypeSelect> = z.object({
  contact_notes: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export const ContactsSelectSchema: z.ZodType<Prisma.ContactsSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  gender: z.boolean().optional(),
  title: z.boolean().optional(),
  company_id: z.boolean().optional(),
  email: z.boolean().optional(),
  phone_number1: z.boolean().optional(),
  phone_number2: z.boolean().optional(),
  background: z.boolean().optional(),
  acquisition: z.boolean().optional(),
  avatar: z.boolean().optional(),
  first_seen: z.boolean().optional(),
  last_seen: z.boolean().optional(),
  has_newsletter: z.boolean().optional(),
  status: z.boolean().optional(),
  tags: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  contact_notes: z.union([z.boolean(),z.lazy(() => Contact_notesFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompaniesArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEAL NOTES
//------------------------------------------------------

export const Deal_notesIncludeSchema: z.ZodType<Prisma.Deal_notesInclude> = z.object({
  deals: z.union([z.boolean(),z.lazy(() => DealsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()

export const Deal_notesArgsSchema: z.ZodType<Prisma.Deal_notesArgs> = z.object({
  select: z.lazy(() => Deal_notesSelectSchema).optional(),
  include: z.lazy(() => Deal_notesIncludeSchema).optional(),
}).strict();

export const Deal_notesSelectSchema: z.ZodType<Prisma.Deal_notesSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  deal_id: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  type: z.boolean().optional(),
  text: z.boolean().optional(),
  deals: z.union([z.boolean(),z.lazy(() => DealsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()

// DEALS
//------------------------------------------------------

export const DealsIncludeSchema: z.ZodType<Prisma.DealsInclude> = z.object({
  deal_notes: z.union([z.boolean(),z.lazy(() => Deal_notesFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompaniesArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DealsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DealsArgsSchema: z.ZodType<Prisma.DealsArgs> = z.object({
  select: z.lazy(() => DealsSelectSchema).optional(),
  include: z.lazy(() => DealsIncludeSchema).optional(),
}).strict();

export const DealsCountOutputTypeArgsSchema: z.ZodType<Prisma.DealsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => DealsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DealsCountOutputTypeSelectSchema: z.ZodType<Prisma.DealsCountOutputTypeSelect> = z.object({
  deal_notes: z.boolean().optional(),
}).strict();

export const DealsSelectSchema: z.ZodType<Prisma.DealsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  name: z.boolean().optional(),
  company_id: z.boolean().optional(),
  contact_ids: z.boolean().optional(),
  type: z.boolean().optional(),
  stage: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  start_at: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  anindex: z.boolean().optional(),
  deal_notes: z.union([z.boolean(),z.lazy(() => Deal_notesFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompaniesArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DealsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SALES
//------------------------------------------------------

export const SalesIncludeSchema: z.ZodType<Prisma.SalesInclude> = z.object({
  companies: z.union([z.boolean(),z.lazy(() => CompaniesFindManyArgsSchema)]).optional(),
  contact_notes: z.union([z.boolean(),z.lazy(() => Contact_notesFindManyArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsFindManyArgsSchema)]).optional(),
  deal_notes: z.union([z.boolean(),z.lazy(() => Deal_notesFindManyArgsSchema)]).optional(),
  deals: z.union([z.boolean(),z.lazy(() => DealsFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SalesArgsSchema: z.ZodType<Prisma.SalesArgs> = z.object({
  select: z.lazy(() => SalesSelectSchema).optional(),
  include: z.lazy(() => SalesIncludeSchema).optional(),
}).strict();

export const SalesCountOutputTypeArgsSchema: z.ZodType<Prisma.SalesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SalesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SalesCountOutputTypeSelectSchema: z.ZodType<Prisma.SalesCountOutputTypeSelect> = z.object({
  companies: z.boolean().optional(),
  contact_notes: z.boolean().optional(),
  contacts: z.boolean().optional(),
  deal_notes: z.boolean().optional(),
  deals: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export const SalesSelectSchema: z.ZodType<Prisma.SalesSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompaniesFindManyArgsSchema)]).optional(),
  contact_notes: z.union([z.boolean(),z.lazy(() => Contact_notesFindManyArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsFindManyArgsSchema)]).optional(),
  deal_notes: z.union([z.boolean(),z.lazy(() => Deal_notesFindManyArgsSchema)]).optional(),
  deals: z.union([z.boolean(),z.lazy(() => DealsFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAGS
//------------------------------------------------------

export const TagsSelectSchema: z.ZodType<Prisma.TagsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
}).strict()

// TASKS
//------------------------------------------------------

export const TasksIncludeSchema: z.ZodType<Prisma.TasksInclude> = z.object({
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()

export const TasksArgsSchema: z.ZodType<Prisma.TasksArgs> = z.object({
  select: z.lazy(() => TasksSelectSchema).optional(),
  include: z.lazy(() => TasksIncludeSchema).optional(),
}).strict();

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  due_date: z.boolean().optional(),
  contact_id: z.boolean().optional(),
  sales_id: z.boolean().optional(),
  text: z.boolean().optional(),
  type: z.boolean().optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SalesArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CompaniesWhereInputSchema: z.ZodType<Prisma.CompaniesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompaniesWhereInputSchema),z.lazy(() => CompaniesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompaniesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompaniesWhereInputSchema),z.lazy(() => CompaniesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sector: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  linked_in: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  website: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  zipcode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state_abbr: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsListRelationFilterSchema).optional(),
  deals: z.lazy(() => DealsListRelationFilterSchema).optional()
}).strict();

export const CompaniesOrderByWithRelationInputSchema: z.ZodType<Prisma.CompaniesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  sector: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  linked_in: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipcode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state_abbr: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByRelationAggregateInputSchema).optional(),
  deals: z.lazy(() => DealsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CompaniesWhereUniqueInputSchema: z.ZodType<Prisma.CompaniesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const CompaniesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompaniesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  sector: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  linked_in: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipcode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state_abbr: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompaniesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CompaniesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompaniesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompaniesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CompaniesSumOrderByAggregateInputSchema).optional()
}).strict();

export const CompaniesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompaniesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompaniesScalarWhereWithAggregatesInputSchema),z.lazy(() => CompaniesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompaniesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompaniesScalarWhereWithAggregatesInputSchema),z.lazy(() => CompaniesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sector: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  linked_in: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  website: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  zipcode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state_abbr: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Contact_notesWhereInputSchema: z.ZodType<Prisma.Contact_notesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Contact_notesWhereInputSchema),z.lazy(() => Contact_notesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Contact_notesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Contact_notesWhereInputSchema),z.lazy(() => Contact_notesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  contacts: z.union([ z.lazy(() => ContactsRelationFilterSchema),z.lazy(() => ContactsWhereInputSchema) ]).optional().nullable(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional(),
}).strict();

export const Contact_notesOrderByWithRelationInputSchema: z.ZodType<Prisma.Contact_notesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByWithRelationInputSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional()
}).strict();

export const Contact_notesWhereUniqueInputSchema: z.ZodType<Prisma.Contact_notesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const Contact_notesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Contact_notesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Contact_notesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Contact_notesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Contact_notesMinOrderByAggregateInputSchema).optional()
}).strict();

export const Contact_notesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Contact_notesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Contact_notesScalarWhereWithAggregatesInputSchema),z.lazy(() => Contact_notesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Contact_notesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Contact_notesScalarWhereWithAggregatesInputSchema),z.lazy(() => Contact_notesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ContactsWhereInputSchema: z.ZodType<Prisma.ContactsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactsWhereInputSchema),z.lazy(() => ContactsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactsWhereInputSchema),z.lazy(() => ContactsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  background: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  acquisition: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_seen: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  last_seen: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  has_newsletter: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => JsonNullableFilterSchema).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_notes: z.lazy(() => Contact_notesListRelationFilterSchema).optional(),
  companies: z.union([ z.lazy(() => CompaniesRelationFilterSchema),z.lazy(() => CompaniesWhereInputSchema) ]).optional(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional(),
  tasks: z.lazy(() => TasksListRelationFilterSchema).optional()
}).strict();

export const ContactsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone_number1: z.lazy(() => SortOrderSchema).optional(),
  phone_number2: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => SortOrderSchema).optional(),
  acquisition: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  first_seen: z.lazy(() => SortOrderSchema).optional(),
  last_seen: z.lazy(() => SortOrderSchema).optional(),
  has_newsletter: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesOrderByRelationAggregateInputSchema).optional(),
  companies: z.lazy(() => CompaniesOrderByWithRelationInputSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional(),
  tasks: z.lazy(() => TasksOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ContactsWhereUniqueInputSchema: z.ZodType<Prisma.ContactsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ContactsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone_number1: z.lazy(() => SortOrderSchema).optional(),
  phone_number2: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => SortOrderSchema).optional(),
  acquisition: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  first_seen: z.lazy(() => SortOrderSchema).optional(),
  last_seen: z.lazy(() => SortOrderSchema).optional(),
  has_newsletter: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContactsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContactsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  company_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone_number2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  background: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  acquisition: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  first_seen: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  last_seen: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  has_newsletter: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  sales_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Deal_notesWhereInputSchema: z.ZodType<Prisma.Deal_notesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Deal_notesWhereInputSchema),z.lazy(() => Deal_notesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Deal_notesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Deal_notesWhereInputSchema),z.lazy(() => Deal_notesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deal_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deals: z.union([ z.lazy(() => DealsRelationFilterSchema),z.lazy(() => DealsWhereInputSchema) ]).optional(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional(),
}).strict();

export const Deal_notesOrderByWithRelationInputSchema: z.ZodType<Prisma.Deal_notesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  deal_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  deals: z.lazy(() => DealsOrderByWithRelationInputSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional()
}).strict();

export const Deal_notesWhereUniqueInputSchema: z.ZodType<Prisma.Deal_notesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const Deal_notesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Deal_notesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  deal_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Deal_notesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Deal_notesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Deal_notesMinOrderByAggregateInputSchema).optional()
}).strict();

export const Deal_notesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Deal_notesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Deal_notesScalarWhereWithAggregatesInputSchema),z.lazy(() => Deal_notesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Deal_notesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Deal_notesScalarWhereWithAggregatesInputSchema),z.lazy(() => Deal_notesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deal_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DealsWhereInputSchema: z.ZodType<Prisma.DealsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DealsWhereInputSchema),z.lazy(() => DealsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DealsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DealsWhereInputSchema),z.lazy(() => DealsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_ids: z.lazy(() => JsonNullableFilterSchema).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stage: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  start_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  anindex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deal_notes: z.lazy(() => Deal_notesListRelationFilterSchema).optional(),
  companies: z.union([ z.lazy(() => CompaniesRelationFilterSchema),z.lazy(() => CompaniesWhereInputSchema) ]).optional(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional(),
}).strict();

export const DealsOrderByWithRelationInputSchema: z.ZodType<Prisma.DealsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  contact_ids: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  start_at: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesOrderByRelationAggregateInputSchema).optional(),
  companies: z.lazy(() => CompaniesOrderByWithRelationInputSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional()
}).strict();

export const DealsWhereUniqueInputSchema: z.ZodType<Prisma.DealsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const DealsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DealsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  contact_ids: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  start_at: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DealsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DealsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DealsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DealsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DealsSumOrderByAggregateInputSchema).optional()
}).strict();

export const DealsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DealsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DealsScalarWhereWithAggregatesInputSchema),z.lazy(() => DealsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DealsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DealsScalarWhereWithAggregatesInputSchema),z.lazy(() => DealsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  contact_ids: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stage: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  amount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  start_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  anindex: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SalesWhereInputSchema: z.ZodType<Prisma.SalesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SalesWhereInputSchema),z.lazy(() => SalesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesWhereInputSchema),z.lazy(() => SalesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companies: z.lazy(() => CompaniesListRelationFilterSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesListRelationFilterSchema).optional(),
  contacts: z.lazy(() => ContactsListRelationFilterSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesListRelationFilterSchema).optional(),
  deals: z.lazy(() => DealsListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TasksListRelationFilterSchema).optional()
}).strict();

export const SalesOrderByWithRelationInputSchema: z.ZodType<Prisma.SalesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  companies: z.lazy(() => CompaniesOrderByRelationAggregateInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesOrderByRelationAggregateInputSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByRelationAggregateInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesOrderByRelationAggregateInputSchema).optional(),
  deals: z.lazy(() => DealsOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TasksOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SalesWhereUniqueInputSchema: z.ZodType<Prisma.SalesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const SalesOrderByWithAggregationInputSchema: z.ZodType<Prisma.SalesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesMinOrderByAggregateInputSchema).optional()
}).strict();

export const SalesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SalesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SalesScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TagsWhereInputSchema: z.ZodType<Prisma.TagsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagsWhereInputSchema),z.lazy(() => TagsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagsWhereInputSchema),z.lazy(() => TagsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TagsOrderByWithRelationInputSchema: z.ZodType<Prisma.TagsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagsWhereUniqueInputSchema: z.ZodType<Prisma.TagsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const TagsOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagsMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagsScalarWhereWithAggregatesInputSchema),z.lazy(() => TagsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagsScalarWhereWithAggregatesInputSchema),z.lazy(() => TagsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TasksWhereInputSchema: z.ZodType<Prisma.TasksWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  due_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  contact_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contacts: z.union([ z.lazy(() => ContactsRelationFilterSchema),z.lazy(() => ContactsWhereInputSchema) ]).optional().nullable(),
  sales: z.union([ z.lazy(() => SalesRelationFilterSchema),z.lazy(() => SalesWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TasksOrderByWithRelationInputSchema: z.ZodType<Prisma.TasksOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  due_date: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByWithRelationInputSchema).optional(),
  sales: z.lazy(() => SalesOrderByWithRelationInputSchema).optional()
}).strict();

export const TasksWhereUniqueInputSchema: z.ZodType<Prisma.TasksWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const TasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.TasksOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  due_date: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TasksCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TasksMinOrderByAggregateInputSchema).optional()
}).strict();

export const TasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TasksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  due_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  contact_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CompaniesCreateInputSchema: z.ZodType<Prisma.CompaniesCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number().int().gte(-32768).lte(32767),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutCompaniesInputSchema),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutCompaniesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesUncheckedCreateInputSchema: z.ZodType<Prisma.CompaniesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number().int().gte(-32768).lte(32767),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  sales_id: z.string().uuid(),
  created_at: z.coerce.date(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesUpdateInputSchema: z.ZodType<Prisma.CompaniesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int().gte(-32768).lte(32767),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutCompaniesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesUncheckedUpdateInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int().gte(-32768).lte(32767),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesCreateManyInputSchema: z.ZodType<Prisma.CompaniesCreateManyInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number().int().gte(-32768).lte(32767),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  sales_id: z.string().uuid(),
  created_at: z.coerce.date()
}).strict();

export const CompaniesUpdateManyMutationInputSchema: z.ZodType<Prisma.CompaniesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int().gte(-32768).lte(32767),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompaniesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int().gte(-32768).lte(32767),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Contact_notesCreateInputSchema: z.ZodType<Prisma.Contact_notesCreateInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  status: z.string(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutContact_notesInputSchema).optional(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContact_notesInputSchema)
}).strict();

export const Contact_notesUncheckedCreateInputSchema: z.ZodType<Prisma.Contact_notesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales_id: z.string().uuid(),
  status: z.string(),
  contact_id: z.string().uuid().optional().nullable()
}).strict();

export const Contact_notesUpdateInputSchema: z.ZodType<Prisma.Contact_notesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUpdateOneWithoutContact_notesNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContact_notesNestedInputSchema).optional()
}).strict();

export const Contact_notesUncheckedUpdateInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Contact_notesCreateManyInputSchema: z.ZodType<Prisma.Contact_notesCreateManyInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales_id: z.string().uuid(),
  status: z.string(),
  contact_id: z.string().uuid().optional().nullable()
}).strict();

export const Contact_notesUpdateManyMutationInputSchema: z.ZodType<Prisma.Contact_notesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Contact_notesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactsCreateInputSchema: z.ZodType<Prisma.ContactsCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutContactsInputSchema).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutContactsInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContactsInputSchema),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string().uuid(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string().uuid(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutContactsInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUpdateInputSchema: z.ZodType<Prisma.ContactsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutContactsNestedInputSchema).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsCreateManyInputSchema: z.ZodType<Prisma.ContactsCreateManyInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string().uuid(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string().uuid()
}).strict();

export const ContactsUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ContactsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Deal_notesCreateInputSchema: z.ZodType<Prisma.Deal_notesCreateInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  deals: z.lazy(() => DealsCreateNestedOneWithoutDeal_notesInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutDeal_notesInputSchema)
}).strict();

export const Deal_notesUncheckedCreateInputSchema: z.ZodType<Prisma.Deal_notesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  deal_id: z.string().uuid(),
  sales_id: z.string().uuid(),
  type: z.string(),
  text: z.string()
}).strict();

export const Deal_notesUpdateInputSchema: z.ZodType<Prisma.Deal_notesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deals: z.lazy(() => DealsUpdateOneRequiredWithoutDeal_notesNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutDeal_notesNestedInputSchema).optional()
}).strict();

export const Deal_notesUncheckedUpdateInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deal_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Deal_notesCreateManyInputSchema: z.ZodType<Prisma.Deal_notesCreateManyInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  deal_id: z.string().uuid(),
  sales_id: z.string().uuid(),
  type: z.string(),
  text: z.string()
}).strict();

export const Deal_notesUpdateManyMutationInputSchema: z.ZodType<Prisma.Deal_notesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Deal_notesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deal_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DealsCreateInputSchema: z.ZodType<Prisma.DealsCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutDealsInputSchema).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutDealsInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutDealsInputSchema)
}).strict();

export const DealsUncheckedCreateInputSchema: z.ZodType<Prisma.DealsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string().uuid(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  sales_id: z.string().uuid(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutDealsInputSchema).optional()
}).strict();

export const DealsUpdateInputSchema: z.ZodType<Prisma.DealsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutDealsNestedInputSchema).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutDealsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsUncheckedUpdateInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anindex: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsCreateManyInputSchema: z.ZodType<Prisma.DealsCreateManyInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string().uuid(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  sales_id: z.string().uuid(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647)
}).strict();

export const DealsUpdateManyMutationInputSchema: z.ZodType<Prisma.DealsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DealsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anindex: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesCreateInputSchema: z.ZodType<Prisma.SalesCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateInputSchema: z.ZodType<Prisma.SalesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUpdateInputSchema: z.ZodType<Prisma.SalesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesCreateManyInputSchema: z.ZodType<Prisma.SalesCreateManyInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string()
}).strict();

export const SalesUpdateManyMutationInputSchema: z.ZodType<Prisma.SalesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagsCreateInputSchema: z.ZodType<Prisma.TagsCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string()
}).strict();

export const TagsUncheckedCreateInputSchema: z.ZodType<Prisma.TagsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string()
}).strict();

export const TagsUpdateInputSchema: z.ZodType<Prisma.TagsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagsUncheckedUpdateInputSchema: z.ZodType<Prisma.TagsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagsCreateManyInputSchema: z.ZodType<Prisma.TagsCreateManyInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string()
}).strict();

export const TagsUpdateManyMutationInputSchema: z.ZodType<Prisma.TagsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksCreateInputSchema: z.ZodType<Prisma.TasksCreateInput> = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutTasksInputSchema).optional(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export const TasksUncheckedCreateInputSchema: z.ZodType<Prisma.TasksUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().optional().nullable(),
  contact_id: z.string().uuid().optional().nullable(),
  sales_id: z.string().uuid().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const TasksUpdateInputSchema: z.ZodType<Prisma.TasksUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.lazy(() => ContactsUpdateOneWithoutTasksNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneWithoutTasksNestedInputSchema).optional()
}).strict();

export const TasksUncheckedUpdateInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TasksCreateManyInputSchema: z.ZodType<Prisma.TasksCreateManyInput> = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().optional().nullable(),
  contact_id: z.string().uuid().optional().nullable(),
  sales_id: z.string().uuid().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const TasksUpdateManyMutationInputSchema: z.ZodType<Prisma.TasksUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TasksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SalesRelationFilterSchema: z.ZodType<Prisma.SalesRelationFilter> = z.object({
  is: z.lazy(() => SalesWhereInputSchema).optional(),
  isNot: z.lazy(() => SalesWhereInputSchema).optional()
}).strict();

export const ContactsListRelationFilterSchema: z.ZodType<Prisma.ContactsListRelationFilter> = z.object({
  every: z.lazy(() => ContactsWhereInputSchema).optional(),
  some: z.lazy(() => ContactsWhereInputSchema).optional(),
  none: z.lazy(() => ContactsWhereInputSchema).optional()
}).strict();

export const DealsListRelationFilterSchema: z.ZodType<Prisma.DealsListRelationFilter> = z.object({
  every: z.lazy(() => DealsWhereInputSchema).optional(),
  some: z.lazy(() => DealsWhereInputSchema).optional(),
  none: z.lazy(() => DealsWhereInputSchema).optional()
}).strict();

export const ContactsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContactsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DealsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompaniesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompaniesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  sector: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  linked_in: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipcode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state_abbr: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompaniesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CompaniesAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompaniesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompaniesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  sector: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  linked_in: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipcode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state_abbr: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompaniesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompaniesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  sector: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  linked_in: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipcode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state_abbr: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompaniesSumOrderByAggregateInputSchema: z.ZodType<Prisma.CompaniesSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ContactsRelationFilterSchema: z.ZodType<Prisma.ContactsRelationFilter> = z.object({
  is: z.lazy(() => ContactsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ContactsWhereInputSchema).optional().nullable()
}).strict();

export const Contact_notesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Contact_notesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Contact_notesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Contact_notesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Contact_notesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Contact_notesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const Contact_notesListRelationFilterSchema: z.ZodType<Prisma.Contact_notesListRelationFilter> = z.object({
  every: z.lazy(() => Contact_notesWhereInputSchema).optional(),
  some: z.lazy(() => Contact_notesWhereInputSchema).optional(),
  none: z.lazy(() => Contact_notesWhereInputSchema).optional()
}).strict();

export const CompaniesRelationFilterSchema: z.ZodType<Prisma.CompaniesRelationFilter> = z.object({
  is: z.lazy(() => CompaniesWhereInputSchema).optional(),
  isNot: z.lazy(() => CompaniesWhereInputSchema).optional()
}).strict();

export const TasksListRelationFilterSchema: z.ZodType<Prisma.TasksListRelationFilter> = z.object({
  every: z.lazy(() => TasksWhereInputSchema).optional(),
  some: z.lazy(() => TasksWhereInputSchema).optional(),
  none: z.lazy(() => TasksWhereInputSchema).optional()
}).strict();

export const Contact_notesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Contact_notesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TasksOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone_number1: z.lazy(() => SortOrderSchema).optional(),
  phone_number2: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => SortOrderSchema).optional(),
  acquisition: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  first_seen: z.lazy(() => SortOrderSchema).optional(),
  last_seen: z.lazy(() => SortOrderSchema).optional(),
  has_newsletter: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone_number1: z.lazy(() => SortOrderSchema).optional(),
  phone_number2: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => SortOrderSchema).optional(),
  acquisition: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  first_seen: z.lazy(() => SortOrderSchema).optional(),
  last_seen: z.lazy(() => SortOrderSchema).optional(),
  has_newsletter: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone_number1: z.lazy(() => SortOrderSchema).optional(),
  phone_number2: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => SortOrderSchema).optional(),
  acquisition: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  first_seen: z.lazy(() => SortOrderSchema).optional(),
  last_seen: z.lazy(() => SortOrderSchema).optional(),
  has_newsletter: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DealsRelationFilterSchema: z.ZodType<Prisma.DealsRelationFilter> = z.object({
  is: z.lazy(() => DealsWhereInputSchema).optional(),
  isNot: z.lazy(() => DealsWhereInputSchema).optional()
}).strict();

export const Deal_notesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Deal_notesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  deal_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Deal_notesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Deal_notesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  deal_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Deal_notesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Deal_notesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  deal_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Deal_notesListRelationFilterSchema: z.ZodType<Prisma.Deal_notesListRelationFilter> = z.object({
  every: z.lazy(() => Deal_notesWhereInputSchema).optional(),
  some: z.lazy(() => Deal_notesWhereInputSchema).optional(),
  none: z.lazy(() => Deal_notesWhereInputSchema).optional()
}).strict();

export const Deal_notesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Deal_notesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DealsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  contact_ids: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  start_at: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DealsAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DealsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  start_at: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DealsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  start_at: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DealsSumOrderByAggregateInputSchema: z.ZodType<Prisma.DealsSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  anindex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const CompaniesListRelationFilterSchema: z.ZodType<Prisma.CompaniesListRelationFilter> = z.object({
  every: z.lazy(() => CompaniesWhereInputSchema).optional(),
  some: z.lazy(() => CompaniesWhereInputSchema).optional(),
  none: z.lazy(() => CompaniesWhereInputSchema).optional()
}).strict();

export const CompaniesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompaniesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesCountOrderByAggregateInputSchema: z.ZodType<Prisma.SalesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SalesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesMinOrderByAggregateInputSchema: z.ZodType<Prisma.SalesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagsCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagsMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksCountOrderByAggregateInputSchema: z.ZodType<Prisma.TasksCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  due_date: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  due_date: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksMinOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  due_date: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  sales_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutCompaniesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const ContactsCreateNestedManyWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsCreateNestedManyWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManyCompaniesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DealsCreateNestedManyWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsCreateNestedManyWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManyCompaniesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContactsUncheckedCreateNestedManyWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateNestedManyWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManyCompaniesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DealsUncheckedCreateNestedManyWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUncheckedCreateNestedManyWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManyCompaniesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SalesUpdateOneRequiredWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneRequiredWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutCompaniesInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutCompaniesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutCompaniesInputSchema) ]).optional(),
}).strict();

export const ContactsUpdateManyWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.ContactsUpdateManyWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactsUpsertWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => ContactsUpsertWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManyCompaniesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => ContactsUpdateWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactsUpdateManyWithWhereWithoutCompaniesInputSchema),z.lazy(() => ContactsUpdateManyWithWhereWithoutCompaniesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DealsUpdateManyWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.DealsUpdateManyWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DealsUpsertWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => DealsUpsertWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManyCompaniesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DealsUpdateWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => DealsUpdateWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DealsUpdateManyWithWhereWithoutCompaniesInputSchema),z.lazy(() => DealsUpdateManyWithWhereWithoutCompaniesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsUncheckedUpdateManyWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateManyWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactsUpsertWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => ContactsUpsertWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManyCompaniesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => ContactsUpdateWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactsUpdateManyWithWhereWithoutCompaniesInputSchema),z.lazy(() => ContactsUpdateManyWithWhereWithoutCompaniesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DealsUncheckedUpdateManyWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateManyWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsCreateWithoutCompaniesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutCompaniesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DealsUpsertWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => DealsUpsertWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManyCompaniesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DealsUpdateWithWhereUniqueWithoutCompaniesInputSchema),z.lazy(() => DealsUpdateWithWhereUniqueWithoutCompaniesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DealsUpdateManyWithWhereWithoutCompaniesInputSchema),z.lazy(() => DealsUpdateManyWithWhereWithoutCompaniesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsCreateNestedOneWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsCreateNestedOneWithoutContact_notesInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutContact_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutContact_notesInputSchema).optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutContact_notesInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContact_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutContact_notesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const ContactsUpdateOneWithoutContact_notesNestedInputSchema: z.ZodType<Prisma.ContactsUpdateOneWithoutContact_notesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutContact_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutContact_notesInputSchema).optional(),
  upsert: z.lazy(() => ContactsUpsertWithoutContact_notesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutContact_notesInputSchema) ]).optional(),
}).strict();

export const SalesUpdateOneRequiredWithoutContact_notesNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneRequiredWithoutContact_notesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContact_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutContact_notesInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutContact_notesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutContact_notesInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const Contact_notesCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateWithoutContactsInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompaniesCreateNestedOneWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesCreateNestedOneWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompaniesCreateOrConnectWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => CompaniesWhereUniqueInputSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutContactsInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const TasksCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.TasksCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksCreateWithoutContactsInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema),z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesUncheckedCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUncheckedCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateWithoutContactsInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TasksUncheckedCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.TasksUncheckedCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksCreateWithoutContactsInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema),z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const Contact_notesUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.Contact_notesUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateWithoutContactsInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Contact_notesUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => Contact_notesUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompaniesUpdateOneRequiredWithoutContactsNestedInputSchema: z.ZodType<Prisma.CompaniesUpdateOneRequiredWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompaniesCreateOrConnectWithoutContactsInputSchema).optional(),
  upsert: z.lazy(() => CompaniesUpsertWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => CompaniesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompaniesUpdateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutContactsInputSchema) ]).optional(),
}).strict();

export const SalesUpdateOneRequiredWithoutContactsNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneRequiredWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutContactsInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutContactsInputSchema) ]).optional(),
}).strict();

export const TasksUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.TasksUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksCreateWithoutContactsInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema),z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => TasksUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => TasksUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => TasksUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesUncheckedUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateWithoutContactsInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Contact_notesUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => Contact_notesUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TasksUncheckedUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksCreateWithoutContactsInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema),z.lazy(() => TasksCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => TasksUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => TasksUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => TasksUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DealsCreateNestedOneWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsCreateNestedOneWithoutDeal_notesInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutDeal_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DealsCreateOrConnectWithoutDeal_notesInputSchema).optional(),
  connect: z.lazy(() => DealsWhereUniqueInputSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutDeal_notesInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDeal_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutDeal_notesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const DealsUpdateOneRequiredWithoutDeal_notesNestedInputSchema: z.ZodType<Prisma.DealsUpdateOneRequiredWithoutDeal_notesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutDeal_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DealsCreateOrConnectWithoutDeal_notesInputSchema).optional(),
  upsert: z.lazy(() => DealsUpsertWithoutDeal_notesInputSchema).optional(),
  connect: z.lazy(() => DealsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DealsUpdateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutDeal_notesInputSchema) ]).optional(),
}).strict();

export const SalesUpdateOneRequiredWithoutDeal_notesNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneRequiredWithoutDeal_notesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDeal_notesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutDeal_notesInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutDeal_notesInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutDeal_notesInputSchema) ]).optional(),
}).strict();

export const Deal_notesCreateNestedManyWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesCreateNestedManyWithoutDealsInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateWithoutDealsInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManyDealsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompaniesCreateNestedOneWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesCreateNestedOneWithoutDealsInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutDealsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompaniesCreateOrConnectWithoutDealsInputSchema).optional(),
  connect: z.lazy(() => CompaniesWhereUniqueInputSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutDealsInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutDealsInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDealsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutDealsInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const Deal_notesUncheckedCreateNestedManyWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUncheckedCreateNestedManyWithoutDealsInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateWithoutDealsInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManyDealsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const Deal_notesUpdateManyWithoutDealsNestedInputSchema: z.ZodType<Prisma.Deal_notesUpdateManyWithoutDealsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateWithoutDealsInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutDealsInputSchema),z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutDealsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManyDealsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutDealsInputSchema),z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutDealsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Deal_notesUpdateManyWithWhereWithoutDealsInputSchema),z.lazy(() => Deal_notesUpdateManyWithWhereWithoutDealsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompaniesUpdateOneRequiredWithoutDealsNestedInputSchema: z.ZodType<Prisma.CompaniesUpdateOneRequiredWithoutDealsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutDealsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompaniesCreateOrConnectWithoutDealsInputSchema).optional(),
  upsert: z.lazy(() => CompaniesUpsertWithoutDealsInputSchema).optional(),
  connect: z.lazy(() => CompaniesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompaniesUpdateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutDealsInputSchema) ]).optional(),
}).strict();

export const SalesUpdateOneRequiredWithoutDealsNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneRequiredWithoutDealsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDealsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutDealsInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutDealsInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutDealsInputSchema) ]).optional(),
}).strict();

export const Deal_notesUncheckedUpdateManyWithoutDealsNestedInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateManyWithoutDealsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateWithoutDealsInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutDealsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutDealsInputSchema),z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutDealsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManyDealsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutDealsInputSchema),z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutDealsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Deal_notesUpdateManyWithWhereWithoutDealsInputSchema),z.lazy(() => Deal_notesUpdateManyWithWhereWithoutDealsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompaniesCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesCreateWithoutSalesInputSchema).array(),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompaniesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContactsCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.ContactsCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsCreateWithoutSalesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Deal_notesCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DealsCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.DealsCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsCreateWithoutSalesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TasksCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.TasksCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksCreateWithoutSalesInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema),z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesCreateWithoutSalesInputSchema).array(),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompaniesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContactsUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsCreateWithoutSalesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DealsUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.DealsUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsCreateWithoutSalesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TasksUncheckedCreateNestedManyWithoutSalesInputSchema: z.ZodType<Prisma.TasksUncheckedCreateNestedManyWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksCreateWithoutSalesInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema),z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManySalesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompaniesUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.CompaniesUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesCreateWithoutSalesInputSchema).array(),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompaniesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => CompaniesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompaniesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompaniesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => CompaniesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompaniesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => CompaniesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompaniesScalarWhereInputSchema),z.lazy(() => CompaniesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.Contact_notesUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Contact_notesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => Contact_notesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.ContactsUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsCreateWithoutSalesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactsUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => ContactsUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => ContactsUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactsUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => ContactsUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Deal_notesUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.Deal_notesUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Deal_notesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => Deal_notesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DealsUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.DealsUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsCreateWithoutSalesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DealsUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => DealsUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DealsUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => DealsUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DealsUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => DealsUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TasksUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.TasksUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksCreateWithoutSalesInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema),z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => TasksUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => TasksUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => TasksUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesCreateWithoutSalesInputSchema).array(),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => CompaniesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompaniesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => CompaniesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompaniesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompaniesWhereUniqueInputSchema),z.lazy(() => CompaniesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompaniesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => CompaniesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompaniesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => CompaniesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompaniesScalarWhereInputSchema),z.lazy(() => CompaniesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Contact_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Contact_notesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Contact_notesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Contact_notesWhereUniqueInputSchema),z.lazy(() => Contact_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Contact_notesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Contact_notesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => Contact_notesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsCreateWithoutSalesInputSchema).array(),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => ContactsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactsUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => ContactsUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactsCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactsWhereUniqueInputSchema),z.lazy(() => ContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => ContactsUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactsUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => ContactsUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateWithoutSalesInputSchema).array(),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema),z.lazy(() => Deal_notesCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Deal_notesUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Deal_notesCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Deal_notesWhereUniqueInputSchema),z.lazy(() => Deal_notesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => Deal_notesUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Deal_notesUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => Deal_notesUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DealsUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsCreateWithoutSalesInputSchema).array(),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema),z.lazy(() => DealsCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DealsUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => DealsUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DealsCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DealsWhereUniqueInputSchema),z.lazy(() => DealsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DealsUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => DealsUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DealsUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => DealsUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TasksUncheckedUpdateManyWithoutSalesNestedInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksCreateWithoutSalesInputSchema).array(),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema),z.lazy(() => TasksCreateOrConnectWithoutSalesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => TasksUpsertWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManySalesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema),z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutSalesInputSchema),z.lazy(() => TasksUpdateWithWhereUniqueWithoutSalesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutSalesInputSchema),z.lazy(() => TasksUpdateManyWithWhereWithoutSalesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.ContactsCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional()
}).strict();

export const SalesCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.SalesCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional()
}).strict();

export const ContactsUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.ContactsUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => ContactsUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const SalesUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.SalesUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesCreateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => SalesUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SalesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesUpdateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const SalesCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutCompaniesInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const ContactsCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutContactsInputSchema).optional(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContactsInputSchema),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutContactsInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsCreateOrConnectWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsCreateOrConnectWithoutCompaniesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const ContactsCreateManyCompaniesInputEnvelopeSchema: z.ZodType<Prisma.ContactsCreateManyCompaniesInputEnvelope> = z.object({
  data: z.lazy(() => ContactsCreateManyCompaniesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DealsCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutDealsInputSchema).optional(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutDealsInputSchema)
}).strict();

export const DealsUncheckedCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUncheckedCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  sales_id: z.string(),
  anindex: z.number(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutDealsInputSchema).optional()
}).strict();

export const DealsCreateOrConnectWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsCreateOrConnectWithoutCompaniesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const DealsCreateManyCompaniesInputEnvelopeSchema: z.ZodType<Prisma.DealsCreateManyCompaniesInputEnvelope> = z.object({
  data: z.lazy(() => DealsCreateManyCompaniesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SalesUpsertWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesUpsertWithoutCompaniesInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutCompaniesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutCompaniesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const SalesUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const ContactsUpsertWithWhereUniqueWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUpsertWithWhereUniqueWithoutCompaniesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContactsUpdateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutCompaniesInputSchema) ]),
  create: z.union([ z.lazy(() => ContactsCreateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const ContactsUpdateWithWhereUniqueWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUpdateWithWhereUniqueWithoutCompaniesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContactsUpdateWithoutCompaniesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutCompaniesInputSchema) ]),
}).strict();

export const ContactsUpdateManyWithWhereWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUpdateManyWithWhereWithoutCompaniesInput> = z.object({
  where: z.lazy(() => ContactsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContactsUpdateManyMutationInputSchema),z.lazy(() => ContactsUncheckedUpdateManyWithoutContactsInputSchema) ]),
}).strict();

export const ContactsScalarWhereInputSchema: z.ZodType<Prisma.ContactsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactsScalarWhereInputSchema),z.lazy(() => ContactsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  background: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  acquisition: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_seen: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  last_seen: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  has_newsletter: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => JsonNullableFilterSchema).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const DealsUpsertWithWhereUniqueWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUpsertWithWhereUniqueWithoutCompaniesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DealsUpdateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutCompaniesInputSchema) ]),
  create: z.union([ z.lazy(() => DealsCreateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const DealsUpdateWithWhereUniqueWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUpdateWithWhereUniqueWithoutCompaniesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DealsUpdateWithoutCompaniesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutCompaniesInputSchema) ]),
}).strict();

export const DealsUpdateManyWithWhereWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUpdateManyWithWhereWithoutCompaniesInput> = z.object({
  where: z.lazy(() => DealsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DealsUpdateManyMutationInputSchema),z.lazy(() => DealsUncheckedUpdateManyWithoutDealsInputSchema) ]),
}).strict();

export const DealsScalarWhereInputSchema: z.ZodType<Prisma.DealsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DealsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DealsScalarWhereInputSchema),z.lazy(() => DealsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_ids: z.lazy(() => JsonNullableFilterSchema).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stage: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  start_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  anindex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ContactsCreateWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsCreateWithoutContact_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutContactsInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContactsInputSchema),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateWithoutContact_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsCreateOrConnectWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsCreateOrConnectWithoutContact_notesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactsCreateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutContact_notesInputSchema) ]),
}).strict();

export const SalesCreateWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesCreateWithoutContact_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutContact_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutContact_notesInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContact_notesInputSchema) ]),
}).strict();

export const ContactsUpsertWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsUpsertWithoutContact_notesInput> = z.object({
  update: z.union([ z.lazy(() => ContactsUpdateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutContact_notesInputSchema) ]),
  create: z.union([ z.lazy(() => ContactsCreateWithoutContact_notesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutContact_notesInputSchema) ]),
}).strict();

export const ContactsUpdateWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsUpdateWithoutContact_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateWithoutContact_notesInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateWithoutContact_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const SalesUpsertWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesUpsertWithoutContact_notesInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutContact_notesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutContact_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContact_notesInputSchema) ]),
}).strict();

export const SalesUpdateWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesUpdateWithoutContact_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutContact_notesInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutContact_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const Contact_notesCreateWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesCreateWithoutContactsInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  status: z.string(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContact_notesInputSchema)
}).strict();

export const Contact_notesUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales_id: z.string(),
  status: z.string()
}).strict();

export const Contact_notesCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const Contact_notesCreateManyContactsInputEnvelopeSchema: z.ZodType<Prisma.Contact_notesCreateManyContactsInputEnvelope> = z.object({
  data: z.lazy(() => Contact_notesCreateManyContactsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompaniesCreateWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesCreateWithoutContactsInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutCompaniesInputSchema),
  deals: z.lazy(() => DealsCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  sales_id: z.string(),
  created_at: z.coerce.date(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => CompaniesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const SalesCreateWithoutContactsInputSchema: z.ZodType<Prisma.SalesCreateWithoutContactsInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const TasksCreateWithoutContactsInputSchema: z.ZodType<Prisma.TasksCreateWithoutContactsInput> = z.object({
  id: z.string(),
  due_date: z.coerce.date().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export const TasksUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.TasksUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  due_date: z.coerce.date().optional().nullable(),
  sales_id: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const TasksCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.TasksCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const TasksCreateManyContactsInputEnvelopeSchema: z.ZodType<Prisma.TasksCreateManyContactsInputEnvelope> = z.object({
  data: z.lazy(() => TasksCreateManyContactsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Contact_notesUpsertWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUpsertWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const Contact_notesUpdateWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUpdateWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Contact_notesUpdateWithoutContactsInputSchema),z.lazy(() => Contact_notesUncheckedUpdateWithoutContactsInputSchema) ]),
}).strict();

export const Contact_notesUpdateManyWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUpdateManyWithWhereWithoutContactsInput> = z.object({
  where: z.lazy(() => Contact_notesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Contact_notesUpdateManyMutationInputSchema),z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContact_notesInputSchema) ]),
}).strict();

export const Contact_notesScalarWhereInputSchema: z.ZodType<Prisma.Contact_notesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Contact_notesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Contact_notesScalarWhereInputSchema),z.lazy(() => Contact_notesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CompaniesUpsertWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesUpsertWithoutContactsInput> = z.object({
  update: z.union([ z.lazy(() => CompaniesUpdateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutContactsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const CompaniesUpdateWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const SalesUpsertWithoutContactsInputSchema: z.ZodType<Prisma.SalesUpsertWithoutContactsInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutContactsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const SalesUpdateWithoutContactsInputSchema: z.ZodType<Prisma.SalesUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const TasksUpsertWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.TasksUpsertWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TasksUpdateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => TasksCreateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const TasksUpdateWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.TasksUpdateWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateWithoutContactsInputSchema),z.lazy(() => TasksUncheckedUpdateWithoutContactsInputSchema) ]),
}).strict();

export const TasksUpdateManyWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.TasksUpdateManyWithWhereWithoutContactsInput> = z.object({
  where: z.lazy(() => TasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateManyMutationInputSchema),z.lazy(() => TasksUncheckedUpdateManyWithoutTasksInputSchema) ]),
}).strict();

export const TasksScalarWhereInputSchema: z.ZodType<Prisma.TasksScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereInputSchema),z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  due_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  contact_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  sales_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DealsCreateWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsCreateWithoutDeal_notesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutDealsInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutDealsInputSchema)
}).strict();

export const DealsUncheckedCreateWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsUncheckedCreateWithoutDeal_notesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  sales_id: z.string(),
  anindex: z.number()
}).strict();

export const DealsCreateOrConnectWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsCreateOrConnectWithoutDeal_notesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DealsCreateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutDeal_notesInputSchema) ]),
}).strict();

export const SalesCreateWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesCreateWithoutDeal_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutDeal_notesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutDeal_notesInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDeal_notesInputSchema) ]),
}).strict();

export const DealsUpsertWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsUpsertWithoutDeal_notesInput> = z.object({
  update: z.union([ z.lazy(() => DealsUpdateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutDeal_notesInputSchema) ]),
  create: z.union([ z.lazy(() => DealsCreateWithoutDeal_notesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutDeal_notesInputSchema) ]),
}).strict();

export const DealsUpdateWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsUpdateWithoutDeal_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutDealsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsUncheckedUpdateWithoutDeal_notesInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateWithoutDeal_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesUpsertWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesUpsertWithoutDeal_notesInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutDeal_notesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutDeal_notesInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDeal_notesInputSchema) ]),
}).strict();

export const SalesUpdateWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesUpdateWithoutDeal_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutDeal_notesInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutDeal_notesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const Deal_notesCreateWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesCreateWithoutDealsInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutDeal_notesInputSchema)
}).strict();

export const Deal_notesUncheckedCreateWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUncheckedCreateWithoutDealsInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  sales_id: z.string(),
  type: z.string(),
  text: z.string()
}).strict();

export const Deal_notesCreateOrConnectWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesCreateOrConnectWithoutDealsInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const Deal_notesCreateManyDealsInputEnvelopeSchema: z.ZodType<Prisma.Deal_notesCreateManyDealsInputEnvelope> = z.object({
  data: z.lazy(() => Deal_notesCreateManyDealsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompaniesCreateWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesCreateWithoutDealsInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date(),
  sales: z.lazy(() => SalesCreateNestedOneWithoutCompaniesInputSchema),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesUncheckedCreateWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesUncheckedCreateWithoutDealsInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  sales_id: z.string(),
  created_at: z.coerce.date(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesCreateOrConnectWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesCreateOrConnectWithoutDealsInput> = z.object({
  where: z.lazy(() => CompaniesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const SalesCreateWithoutDealsInputSchema: z.ZodType<Prisma.SalesCreateWithoutDealsInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutDealsInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutDealsInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutDealsInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutDealsInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const Deal_notesUpsertWithWhereUniqueWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUpsertWithWhereUniqueWithoutDealsInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedUpdateWithoutDealsInputSchema) ]),
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const Deal_notesUpdateWithWhereUniqueWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUpdateWithWhereUniqueWithoutDealsInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Deal_notesUpdateWithoutDealsInputSchema),z.lazy(() => Deal_notesUncheckedUpdateWithoutDealsInputSchema) ]),
}).strict();

export const Deal_notesUpdateManyWithWhereWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUpdateManyWithWhereWithoutDealsInput> = z.object({
  where: z.lazy(() => Deal_notesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Deal_notesUpdateManyMutationInputSchema),z.lazy(() => Deal_notesUncheckedUpdateManyWithoutDeal_notesInputSchema) ]),
}).strict();

export const Deal_notesScalarWhereInputSchema: z.ZodType<Prisma.Deal_notesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Deal_notesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Deal_notesScalarWhereInputSchema),z.lazy(() => Deal_notesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deal_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CompaniesUpsertWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesUpsertWithoutDealsInput> = z.object({
  update: z.union([ z.lazy(() => CompaniesUpdateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutDealsInputSchema) ]),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutDealsInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const CompaniesUpdateWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesUncheckedUpdateWithoutDealsInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const SalesUpsertWithoutDealsInputSchema: z.ZodType<Prisma.SalesUpsertWithoutDealsInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutDealsInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutDealsInputSchema),z.lazy(() => SalesUncheckedCreateWithoutDealsInputSchema) ]),
}).strict();

export const SalesUpdateWithoutDealsInputSchema: z.ZodType<Prisma.SalesUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutDealsInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const CompaniesCreateWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesCreateWithoutSalesInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutCompaniesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number(),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutCompaniesInputSchema).optional()
}).strict();

export const CompaniesCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => CompaniesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const CompaniesCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.CompaniesCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => CompaniesCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Contact_notesCreateWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesCreateWithoutSalesInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  status: z.string(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutContact_notesInputSchema).optional()
}).strict();

export const Contact_notesUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  status: z.string(),
  contact_id: z.string().optional().nullable()
}).strict();

export const Contact_notesCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const Contact_notesCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.Contact_notesCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => Contact_notesCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ContactsCreateWithoutSalesInputSchema: z.ZodType<Prisma.ContactsCreateWithoutSalesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutContactsInputSchema).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutContactsInputSchema),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutContactsInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.ContactsCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const ContactsCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.ContactsCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => ContactsCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Deal_notesCreateWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesCreateWithoutSalesInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  deals: z.lazy(() => DealsCreateNestedOneWithoutDeal_notesInputSchema)
}).strict();

export const Deal_notesUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  deal_id: z.string(),
  type: z.string(),
  text: z.string()
}).strict();

export const Deal_notesCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const Deal_notesCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.Deal_notesCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => Deal_notesCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DealsCreateWithoutSalesInputSchema: z.ZodType<Prisma.DealsCreateWithoutSalesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutDealsInputSchema).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutDealsInputSchema)
}).strict();

export const DealsUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.DealsUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutDealsInputSchema).optional()
}).strict();

export const DealsCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.DealsCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const DealsCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.DealsCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => DealsCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TasksCreateWithoutSalesInputSchema: z.ZodType<Prisma.TasksCreateWithoutSalesInput> = z.object({
  id: z.string(),
  due_date: z.coerce.date().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export const TasksUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.TasksUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string(),
  due_date: z.coerce.date().optional().nullable(),
  contact_id: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const TasksCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.TasksCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const TasksCreateManySalesInputEnvelopeSchema: z.ZodType<Prisma.TasksCreateManySalesInputEnvelope> = z.object({
  data: z.lazy(() => TasksCreateManySalesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompaniesUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => CompaniesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompaniesUpdateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => CompaniesCreateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const CompaniesUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => CompaniesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompaniesUpdateWithoutSalesInputSchema),z.lazy(() => CompaniesUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const CompaniesUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => CompaniesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompaniesUpdateManyMutationInputSchema),z.lazy(() => CompaniesUncheckedUpdateManyWithoutCompaniesInputSchema) ]),
}).strict();

export const CompaniesScalarWhereInputSchema: z.ZodType<Prisma.CompaniesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompaniesScalarWhereInputSchema),z.lazy(() => CompaniesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompaniesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompaniesScalarWhereInputSchema),z.lazy(() => CompaniesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sector: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  linked_in: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  website: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  zipcode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state_abbr: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sales_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Contact_notesUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Contact_notesUpdateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => Contact_notesCreateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const Contact_notesUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => Contact_notesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Contact_notesUpdateWithoutSalesInputSchema),z.lazy(() => Contact_notesUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const Contact_notesUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => Contact_notesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Contact_notesUpdateManyMutationInputSchema),z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContact_notesInputSchema) ]),
}).strict();

export const ContactsUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContactsUpdateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => ContactsCreateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const ContactsUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContactsUpdateWithoutSalesInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const ContactsUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => ContactsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContactsUpdateManyMutationInputSchema),z.lazy(() => ContactsUncheckedUpdateManyWithoutContactsInputSchema) ]),
}).strict();

export const Deal_notesUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Deal_notesUpdateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => Deal_notesCreateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const Deal_notesUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => Deal_notesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Deal_notesUpdateWithoutSalesInputSchema),z.lazy(() => Deal_notesUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const Deal_notesUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => Deal_notesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Deal_notesUpdateManyMutationInputSchema),z.lazy(() => Deal_notesUncheckedUpdateManyWithoutDeal_notesInputSchema) ]),
}).strict();

export const DealsUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.DealsUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DealsUpdateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => DealsCreateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const DealsUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.DealsUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => DealsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DealsUpdateWithoutSalesInputSchema),z.lazy(() => DealsUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const DealsUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.DealsUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => DealsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DealsUpdateManyMutationInputSchema),z.lazy(() => DealsUncheckedUpdateManyWithoutDealsInputSchema) ]),
}).strict();

export const TasksUpsertWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.TasksUpsertWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TasksUpdateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => TasksCreateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const TasksUpdateWithWhereUniqueWithoutSalesInputSchema: z.ZodType<Prisma.TasksUpdateWithWhereUniqueWithoutSalesInput> = z.object({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateWithoutSalesInputSchema),z.lazy(() => TasksUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const TasksUpdateManyWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.TasksUpdateManyWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => TasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateManyMutationInputSchema),z.lazy(() => TasksUncheckedUpdateManyWithoutTasksInputSchema) ]),
}).strict();

export const ContactsCreateWithoutTasksInputSchema: z.ZodType<Prisma.ContactsCreateWithoutTasksInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutContactsInputSchema).optional(),
  companies: z.lazy(() => CompaniesCreateNestedOneWithoutContactsInputSchema),
  sales: z.lazy(() => SalesCreateNestedOneWithoutContactsInputSchema)
}).strict();

export const ContactsUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.ContactsCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactsCreateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const SalesCreateWithoutTasksInputSchema: z.ZodType<Prisma.SalesCreateWithoutTasksInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.SalesUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  companies: z.lazy(() => CompaniesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedCreateNestedManyWithoutSalesInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedCreateNestedManyWithoutSalesInputSchema).optional()
}).strict();

export const SalesCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.SalesCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => SalesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesCreateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const ContactsUpsertWithoutTasksInputSchema: z.ZodType<Prisma.ContactsUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => ContactsUpdateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => ContactsCreateWithoutTasksInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const ContactsUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ContactsUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutContactsNestedInputSchema).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const SalesUpsertWithoutTasksInputSchema: z.ZodType<Prisma.SalesUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => SalesUpdateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => SalesCreateWithoutTasksInputSchema),z.lazy(() => SalesUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const SalesUpdateWithoutTasksInputSchema: z.ZodType<Prisma.SalesUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const SalesUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companies: z.lazy(() => CompaniesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutSalesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutSalesNestedInputSchema).optional()
}).strict();

export const ContactsCreateManyCompaniesInputSchema: z.ZodType<Prisma.ContactsCreateManyCompaniesInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.string().uuid()
}).strict();

export const DealsCreateManyCompaniesInputSchema: z.ZodType<Prisma.DealsCreateManyCompaniesInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  sales_id: z.string().uuid(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647)
}).strict();

export const ContactsUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutContactsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateManyWithoutContactsInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateManyWithoutContactsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DealsUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutDealsNestedInputSchema).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsUncheckedUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsUncheckedUpdateManyWithoutDealsInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateManyWithoutDealsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anindex: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Contact_notesCreateManyContactsInputSchema: z.ZodType<Prisma.Contact_notesCreateManyContactsInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  sales_id: z.string().uuid(),
  status: z.string()
}).strict();

export const TasksCreateManyContactsInputSchema: z.ZodType<Prisma.TasksCreateManyContactsInput> = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().optional().nullable(),
  sales_id: z.string().uuid().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const Contact_notesUpdateWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutContact_notesNestedInputSchema).optional()
}).strict();

export const Contact_notesUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Contact_notesUncheckedUpdateManyWithoutContact_notesInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateManyWithoutContact_notesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksUpdateWithoutContactsInputSchema: z.ZodType<Prisma.TasksUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales: z.lazy(() => SalesUpdateOneWithoutTasksNestedInputSchema).optional()
}).strict();

export const TasksUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TasksUncheckedUpdateManyWithoutTasksInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Deal_notesCreateManyDealsInputSchema: z.ZodType<Prisma.Deal_notesCreateManyDealsInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  sales_id: z.string().uuid(),
  type: z.string(),
  text: z.string()
}).strict();

export const Deal_notesUpdateWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SalesUpdateOneRequiredWithoutDeal_notesNestedInputSchema).optional()
}).strict();

export const Deal_notesUncheckedUpdateWithoutDealsInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateWithoutDealsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Deal_notesUncheckedUpdateManyWithoutDeal_notesInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateManyWithoutDeal_notesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompaniesCreateManySalesInputSchema: z.ZodType<Prisma.CompaniesCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string(),
  sector: z.string(),
  size: z.number().int().gte(-32768).lte(32767),
  linked_in: z.string(),
  website: z.string(),
  phone_number: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state_abbr: z.string(),
  created_at: z.coerce.date()
}).strict();

export const Contact_notesCreateManySalesInputSchema: z.ZodType<Prisma.Contact_notesCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  type: z.string(),
  text: z.string(),
  status: z.string(),
  contact_id: z.string().uuid().optional().nullable()
}).strict();

export const ContactsCreateManySalesInputSchema: z.ZodType<Prisma.ContactsCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  company_id: z.string().uuid(),
  email: z.string(),
  phone_number1: z.string().optional().nullable(),
  phone_number2: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  acquisition: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  has_newsletter: z.boolean().optional().nullable(),
  status: z.string(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const Deal_notesCreateManySalesInputSchema: z.ZodType<Prisma.Deal_notesCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  deal_id: z.string().uuid(),
  type: z.string(),
  text: z.string()
}).strict();

export const DealsCreateManySalesInputSchema: z.ZodType<Prisma.DealsCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  company_id: z.string().uuid(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.string(),
  stage: z.string(),
  description: z.string().optional().nullable(),
  amount: z.number().int().gte(-2147483648).lte(2147483647),
  updated_at: z.coerce.date(),
  start_at: z.coerce.date().optional().nullable(),
  anindex: z.number().int().gte(-2147483648).lte(2147483647)
}).strict();

export const TasksCreateManySalesInputSchema: z.ZodType<Prisma.TasksCreateManySalesInput> = z.object({
  id: z.string().uuid(),
  due_date: z.coerce.date().optional().nullable(),
  contact_id: z.string().uuid().optional().nullable(),
  text: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).strict();

export const CompaniesUpdateWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUpdateManyWithoutCompaniesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional(),
  deals: z.lazy(() => DealsUncheckedUpdateManyWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const CompaniesUncheckedUpdateManyWithoutCompaniesInputSchema: z.ZodType<Prisma.CompaniesUncheckedUpdateManyWithoutCompaniesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sector: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int().gte(-32768).lte(32767),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  linked_in: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  website: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state_abbr: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Contact_notesUpdateWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUpdateOneWithoutContact_notesNestedInputSchema).optional()
}).strict();

export const Contact_notesUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.Contact_notesUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactsUpdateWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUpdateManyWithoutContactsNestedInputSchema).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  background: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acquisition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_seen: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  has_newsletter: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  contact_notes: z.lazy(() => Contact_notesUncheckedUpdateManyWithoutContactsNestedInputSchema).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const Deal_notesUpdateWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deals: z.lazy(() => DealsUpdateOneRequiredWithoutDeal_notesNestedInputSchema).optional()
}).strict();

export const Deal_notesUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.Deal_notesUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DealsUpdateWithoutSalesInputSchema: z.ZodType<Prisma.DealsUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUpdateManyWithoutDealsNestedInputSchema).optional(),
  companies: z.lazy(() => CompaniesUpdateOneRequiredWithoutDealsNestedInputSchema).optional()
}).strict();

export const DealsUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.DealsUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_ids: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  start_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anindex: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deal_notes: z.lazy(() => Deal_notesUncheckedUpdateManyWithoutDealsNestedInputSchema).optional()
}).strict();

export const TasksUpdateWithoutSalesInputSchema: z.ZodType<Prisma.TasksUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.lazy(() => ContactsUpdateOneWithoutTasksNestedInputSchema).optional()
}).strict();

export const TasksUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  due_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CompaniesFindFirstArgsSchema: z.ZodType<Prisma.CompaniesFindFirstArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereInputSchema.optional(),
  orderBy: z.union([ CompaniesOrderByWithRelationInputSchema.array(),CompaniesOrderByWithRelationInputSchema ]).optional(),
  cursor: CompaniesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CompaniesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CompaniesFindFirstArgs>

export const CompaniesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompaniesFindFirstOrThrowArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereInputSchema.optional(),
  orderBy: z.union([ CompaniesOrderByWithRelationInputSchema.array(),CompaniesOrderByWithRelationInputSchema ]).optional(),
  cursor: CompaniesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CompaniesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CompaniesFindFirstOrThrowArgs>

export const CompaniesFindManyArgsSchema: z.ZodType<Prisma.CompaniesFindManyArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereInputSchema.optional(),
  orderBy: z.union([ CompaniesOrderByWithRelationInputSchema.array(),CompaniesOrderByWithRelationInputSchema ]).optional(),
  cursor: CompaniesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CompaniesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CompaniesFindManyArgs>

export const CompaniesAggregateArgsSchema: z.ZodType<Prisma.CompaniesAggregateArgs> = z.object({
  where: CompaniesWhereInputSchema.optional(),
  orderBy: z.union([ CompaniesOrderByWithRelationInputSchema.array(),CompaniesOrderByWithRelationInputSchema ]).optional(),
  cursor: CompaniesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompaniesAggregateArgs>

export const CompaniesGroupByArgsSchema: z.ZodType<Prisma.CompaniesGroupByArgs> = z.object({
  where: CompaniesWhereInputSchema.optional(),
  orderBy: z.union([ CompaniesOrderByWithAggregationInputSchema.array(),CompaniesOrderByWithAggregationInputSchema ]).optional(),
  by: CompaniesScalarFieldEnumSchema.array(),
  having: CompaniesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompaniesGroupByArgs>

export const CompaniesFindUniqueArgsSchema: z.ZodType<Prisma.CompaniesFindUniqueArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompaniesFindUniqueArgs>

export const CompaniesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompaniesFindUniqueOrThrowArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompaniesFindUniqueOrThrowArgs>

export const Contact_notesFindFirstArgsSchema: z.ZodType<Prisma.Contact_notesFindFirstArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereInputSchema.optional(),
  orderBy: z.union([ Contact_notesOrderByWithRelationInputSchema.array(),Contact_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Contact_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Contact_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesFindFirstArgs>

export const Contact_notesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Contact_notesFindFirstOrThrowArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereInputSchema.optional(),
  orderBy: z.union([ Contact_notesOrderByWithRelationInputSchema.array(),Contact_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Contact_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Contact_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesFindFirstOrThrowArgs>

export const Contact_notesFindManyArgsSchema: z.ZodType<Prisma.Contact_notesFindManyArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereInputSchema.optional(),
  orderBy: z.union([ Contact_notesOrderByWithRelationInputSchema.array(),Contact_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Contact_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Contact_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesFindManyArgs>

export const Contact_notesAggregateArgsSchema: z.ZodType<Prisma.Contact_notesAggregateArgs> = z.object({
  where: Contact_notesWhereInputSchema.optional(),
  orderBy: z.union([ Contact_notesOrderByWithRelationInputSchema.array(),Contact_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Contact_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesAggregateArgs>

export const Contact_notesGroupByArgsSchema: z.ZodType<Prisma.Contact_notesGroupByArgs> = z.object({
  where: Contact_notesWhereInputSchema.optional(),
  orderBy: z.union([ Contact_notesOrderByWithAggregationInputSchema.array(),Contact_notesOrderByWithAggregationInputSchema ]).optional(),
  by: Contact_notesScalarFieldEnumSchema.array(),
  having: Contact_notesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesGroupByArgs>

export const Contact_notesFindUniqueArgsSchema: z.ZodType<Prisma.Contact_notesFindUniqueArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Contact_notesFindUniqueArgs>

export const Contact_notesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Contact_notesFindUniqueOrThrowArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Contact_notesFindUniqueOrThrowArgs>

export const ContactsFindFirstArgsSchema: z.ZodType<Prisma.ContactsFindFirstArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ContactsFindFirstArgs>

export const ContactsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindFirstOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ContactsFindFirstOrThrowArgs>

export const ContactsFindManyArgsSchema: z.ZodType<Prisma.ContactsFindManyArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ContactsFindManyArgs>

export const ContactsAggregateArgsSchema: z.ZodType<Prisma.ContactsAggregateArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ContactsAggregateArgs>

export const ContactsGroupByArgsSchema: z.ZodType<Prisma.ContactsGroupByArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithAggregationInputSchema.array(),ContactsOrderByWithAggregationInputSchema ]).optional(),
  by: ContactsScalarFieldEnumSchema.array(),
  having: ContactsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ContactsGroupByArgs>

export const ContactsFindUniqueArgsSchema: z.ZodType<Prisma.ContactsFindUniqueArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsFindUniqueArgs>

export const ContactsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindUniqueOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsFindUniqueOrThrowArgs>

export const Deal_notesFindFirstArgsSchema: z.ZodType<Prisma.Deal_notesFindFirstArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereInputSchema.optional(),
  orderBy: z.union([ Deal_notesOrderByWithRelationInputSchema.array(),Deal_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Deal_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Deal_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesFindFirstArgs>

export const Deal_notesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Deal_notesFindFirstOrThrowArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereInputSchema.optional(),
  orderBy: z.union([ Deal_notesOrderByWithRelationInputSchema.array(),Deal_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Deal_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Deal_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesFindFirstOrThrowArgs>

export const Deal_notesFindManyArgsSchema: z.ZodType<Prisma.Deal_notesFindManyArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereInputSchema.optional(),
  orderBy: z.union([ Deal_notesOrderByWithRelationInputSchema.array(),Deal_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Deal_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Deal_notesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesFindManyArgs>

export const Deal_notesAggregateArgsSchema: z.ZodType<Prisma.Deal_notesAggregateArgs> = z.object({
  where: Deal_notesWhereInputSchema.optional(),
  orderBy: z.union([ Deal_notesOrderByWithRelationInputSchema.array(),Deal_notesOrderByWithRelationInputSchema ]).optional(),
  cursor: Deal_notesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesAggregateArgs>

export const Deal_notesGroupByArgsSchema: z.ZodType<Prisma.Deal_notesGroupByArgs> = z.object({
  where: Deal_notesWhereInputSchema.optional(),
  orderBy: z.union([ Deal_notesOrderByWithAggregationInputSchema.array(),Deal_notesOrderByWithAggregationInputSchema ]).optional(),
  by: Deal_notesScalarFieldEnumSchema.array(),
  having: Deal_notesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesGroupByArgs>

export const Deal_notesFindUniqueArgsSchema: z.ZodType<Prisma.Deal_notesFindUniqueArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Deal_notesFindUniqueArgs>

export const Deal_notesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Deal_notesFindUniqueOrThrowArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Deal_notesFindUniqueOrThrowArgs>

export const DealsFindFirstArgsSchema: z.ZodType<Prisma.DealsFindFirstArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereInputSchema.optional(),
  orderBy: z.union([ DealsOrderByWithRelationInputSchema.array(),DealsOrderByWithRelationInputSchema ]).optional(),
  cursor: DealsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DealsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DealsFindFirstArgs>

export const DealsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DealsFindFirstOrThrowArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereInputSchema.optional(),
  orderBy: z.union([ DealsOrderByWithRelationInputSchema.array(),DealsOrderByWithRelationInputSchema ]).optional(),
  cursor: DealsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DealsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DealsFindFirstOrThrowArgs>

export const DealsFindManyArgsSchema: z.ZodType<Prisma.DealsFindManyArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereInputSchema.optional(),
  orderBy: z.union([ DealsOrderByWithRelationInputSchema.array(),DealsOrderByWithRelationInputSchema ]).optional(),
  cursor: DealsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DealsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DealsFindManyArgs>

export const DealsAggregateArgsSchema: z.ZodType<Prisma.DealsAggregateArgs> = z.object({
  where: DealsWhereInputSchema.optional(),
  orderBy: z.union([ DealsOrderByWithRelationInputSchema.array(),DealsOrderByWithRelationInputSchema ]).optional(),
  cursor: DealsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DealsAggregateArgs>

export const DealsGroupByArgsSchema: z.ZodType<Prisma.DealsGroupByArgs> = z.object({
  where: DealsWhereInputSchema.optional(),
  orderBy: z.union([ DealsOrderByWithAggregationInputSchema.array(),DealsOrderByWithAggregationInputSchema ]).optional(),
  by: DealsScalarFieldEnumSchema.array(),
  having: DealsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DealsGroupByArgs>

export const DealsFindUniqueArgsSchema: z.ZodType<Prisma.DealsFindUniqueArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DealsFindUniqueArgs>

export const DealsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DealsFindUniqueOrThrowArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DealsFindUniqueOrThrowArgs>

export const SalesFindFirstArgsSchema: z.ZodType<Prisma.SalesFindFirstArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.SalesFindFirstArgs>

export const SalesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SalesFindFirstOrThrowArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.SalesFindFirstOrThrowArgs>

export const SalesFindManyArgsSchema: z.ZodType<Prisma.SalesFindManyArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.SalesFindManyArgs>

export const SalesAggregateArgsSchema: z.ZodType<Prisma.SalesAggregateArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SalesAggregateArgs>

export const SalesGroupByArgsSchema: z.ZodType<Prisma.SalesGroupByArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithAggregationInputSchema.array(),SalesOrderByWithAggregationInputSchema ]).optional(),
  by: SalesScalarFieldEnumSchema.array(),
  having: SalesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SalesGroupByArgs>

export const SalesFindUniqueArgsSchema: z.ZodType<Prisma.SalesFindUniqueArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SalesFindUniqueArgs>

export const SalesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SalesFindUniqueOrThrowArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SalesFindUniqueOrThrowArgs>

export const TagsFindFirstArgsSchema: z.ZodType<Prisma.TagsFindFirstArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereInputSchema.optional(),
  orderBy: z.union([ TagsOrderByWithRelationInputSchema.array(),TagsOrderByWithRelationInputSchema ]).optional(),
  cursor: TagsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TagsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const TagsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagsFindFirstOrThrowArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereInputSchema.optional(),
  orderBy: z.union([ TagsOrderByWithRelationInputSchema.array(),TagsOrderByWithRelationInputSchema ]).optional(),
  cursor: TagsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TagsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const TagsFindManyArgsSchema: z.ZodType<Prisma.TagsFindManyArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereInputSchema.optional(),
  orderBy: z.union([ TagsOrderByWithRelationInputSchema.array(),TagsOrderByWithRelationInputSchema ]).optional(),
  cursor: TagsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TagsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const TagsAggregateArgsSchema: z.ZodType<Prisma.TagsAggregateArgs> = z.object({
  where: TagsWhereInputSchema.optional(),
  orderBy: z.union([ TagsOrderByWithRelationInputSchema.array(),TagsOrderByWithRelationInputSchema ]).optional(),
  cursor: TagsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const TagsGroupByArgsSchema: z.ZodType<Prisma.TagsGroupByArgs> = z.object({
  where: TagsWhereInputSchema.optional(),
  orderBy: z.union([ TagsOrderByWithAggregationInputSchema.array(),TagsOrderByWithAggregationInputSchema ]).optional(),
  by: TagsScalarFieldEnumSchema.array(),
  having: TagsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const TagsFindUniqueArgsSchema: z.ZodType<Prisma.TagsFindUniqueArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereUniqueInputSchema,
}).strict() 

export const TagsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagsFindUniqueOrThrowArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereUniqueInputSchema,
}).strict() 

export const TasksFindFirstArgsSchema: z.ZodType<Prisma.TasksFindFirstArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TasksScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.TasksFindFirstArgs>

export const TasksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TasksFindFirstOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TasksScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.TasksFindFirstOrThrowArgs>

export const TasksFindManyArgsSchema: z.ZodType<Prisma.TasksFindManyArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TasksScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.TasksFindManyArgs>

export const TasksAggregateArgsSchema: z.ZodType<Prisma.TasksAggregateArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.TasksAggregateArgs>

export const TasksGroupByArgsSchema: z.ZodType<Prisma.TasksGroupByArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithAggregationInputSchema.array(),TasksOrderByWithAggregationInputSchema ]).optional(),
  by: TasksScalarFieldEnumSchema.array(),
  having: TasksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.TasksGroupByArgs>

export const TasksFindUniqueArgsSchema: z.ZodType<Prisma.TasksFindUniqueArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TasksFindUniqueArgs>

export const TasksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TasksFindUniqueOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TasksFindUniqueOrThrowArgs>

export const CompaniesCreateArgsSchema: z.ZodType<Prisma.CompaniesCreateArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  data: z.union([ CompaniesCreateInputSchema,CompaniesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompaniesCreateArgs>

export const CompaniesUpsertArgsSchema: z.ZodType<Prisma.CompaniesUpsertArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereUniqueInputSchema,
  create: z.union([ CompaniesCreateInputSchema,CompaniesUncheckedCreateInputSchema ]),
  update: z.union([ CompaniesUpdateInputSchema,CompaniesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompaniesUpsertArgs>

export const CompaniesCreateManyArgsSchema: z.ZodType<Prisma.CompaniesCreateManyArgs> = z.object({
  data: CompaniesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CompaniesCreateManyArgs>

export const CompaniesDeleteArgsSchema: z.ZodType<Prisma.CompaniesDeleteArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  where: CompaniesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompaniesDeleteArgs>

export const CompaniesUpdateArgsSchema: z.ZodType<Prisma.CompaniesUpdateArgs> = z.object({
  select: CompaniesSelectSchema.optional(),
  include: CompaniesIncludeSchema.optional(),
  data: z.union([ CompaniesUpdateInputSchema,CompaniesUncheckedUpdateInputSchema ]),
  where: CompaniesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompaniesUpdateArgs>

export const CompaniesUpdateManyArgsSchema: z.ZodType<Prisma.CompaniesUpdateManyArgs> = z.object({
  data: z.union([ CompaniesUpdateManyMutationInputSchema,CompaniesUncheckedUpdateManyInputSchema ]),
  where: CompaniesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompaniesUpdateManyArgs>

export const CompaniesDeleteManyArgsSchema: z.ZodType<Prisma.CompaniesDeleteManyArgs> = z.object({
  where: CompaniesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompaniesDeleteManyArgs>

export const Contact_notesCreateArgsSchema: z.ZodType<Prisma.Contact_notesCreateArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  data: z.union([ Contact_notesCreateInputSchema,Contact_notesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Contact_notesCreateArgs>

export const Contact_notesUpsertArgsSchema: z.ZodType<Prisma.Contact_notesUpsertArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereUniqueInputSchema,
  create: z.union([ Contact_notesCreateInputSchema,Contact_notesUncheckedCreateInputSchema ]),
  update: z.union([ Contact_notesUpdateInputSchema,Contact_notesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Contact_notesUpsertArgs>

export const Contact_notesCreateManyArgsSchema: z.ZodType<Prisma.Contact_notesCreateManyArgs> = z.object({
  data: Contact_notesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Contact_notesCreateManyArgs>

export const Contact_notesDeleteArgsSchema: z.ZodType<Prisma.Contact_notesDeleteArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  where: Contact_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Contact_notesDeleteArgs>

export const Contact_notesUpdateArgsSchema: z.ZodType<Prisma.Contact_notesUpdateArgs> = z.object({
  select: Contact_notesSelectSchema.optional(),
  include: Contact_notesIncludeSchema.optional(),
  data: z.union([ Contact_notesUpdateInputSchema,Contact_notesUncheckedUpdateInputSchema ]),
  where: Contact_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Contact_notesUpdateArgs>

export const Contact_notesUpdateManyArgsSchema: z.ZodType<Prisma.Contact_notesUpdateManyArgs> = z.object({
  data: z.union([ Contact_notesUpdateManyMutationInputSchema,Contact_notesUncheckedUpdateManyInputSchema ]),
  where: Contact_notesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Contact_notesUpdateManyArgs>

export const Contact_notesDeleteManyArgsSchema: z.ZodType<Prisma.Contact_notesDeleteManyArgs> = z.object({
  where: Contact_notesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Contact_notesDeleteManyArgs>

export const ContactsCreateArgsSchema: z.ZodType<Prisma.ContactsCreateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ContactsCreateArgs>

export const ContactsUpsertArgsSchema: z.ZodType<Prisma.ContactsUpsertArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
  create: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
  update: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ContactsUpsertArgs>

export const ContactsCreateManyArgsSchema: z.ZodType<Prisma.ContactsCreateManyArgs> = z.object({
  data: ContactsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ContactsCreateManyArgs>

export const ContactsDeleteArgsSchema: z.ZodType<Prisma.ContactsDeleteArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsDeleteArgs>

export const ContactsUpdateArgsSchema: z.ZodType<Prisma.ContactsUpdateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsUpdateArgs>

export const ContactsUpdateManyArgsSchema: z.ZodType<Prisma.ContactsUpdateManyArgs> = z.object({
  data: z.union([ ContactsUpdateManyMutationInputSchema,ContactsUncheckedUpdateManyInputSchema ]),
  where: ContactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ContactsUpdateManyArgs>

export const ContactsDeleteManyArgsSchema: z.ZodType<Prisma.ContactsDeleteManyArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ContactsDeleteManyArgs>

export const Deal_notesCreateArgsSchema: z.ZodType<Prisma.Deal_notesCreateArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  data: z.union([ Deal_notesCreateInputSchema,Deal_notesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Deal_notesCreateArgs>

export const Deal_notesUpsertArgsSchema: z.ZodType<Prisma.Deal_notesUpsertArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereUniqueInputSchema,
  create: z.union([ Deal_notesCreateInputSchema,Deal_notesUncheckedCreateInputSchema ]),
  update: z.union([ Deal_notesUpdateInputSchema,Deal_notesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Deal_notesUpsertArgs>

export const Deal_notesCreateManyArgsSchema: z.ZodType<Prisma.Deal_notesCreateManyArgs> = z.object({
  data: Deal_notesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Deal_notesCreateManyArgs>

export const Deal_notesDeleteArgsSchema: z.ZodType<Prisma.Deal_notesDeleteArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  where: Deal_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Deal_notesDeleteArgs>

export const Deal_notesUpdateArgsSchema: z.ZodType<Prisma.Deal_notesUpdateArgs> = z.object({
  select: Deal_notesSelectSchema.optional(),
  include: Deal_notesIncludeSchema.optional(),
  data: z.union([ Deal_notesUpdateInputSchema,Deal_notesUncheckedUpdateInputSchema ]),
  where: Deal_notesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Deal_notesUpdateArgs>

export const Deal_notesUpdateManyArgsSchema: z.ZodType<Prisma.Deal_notesUpdateManyArgs> = z.object({
  data: z.union([ Deal_notesUpdateManyMutationInputSchema,Deal_notesUncheckedUpdateManyInputSchema ]),
  where: Deal_notesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Deal_notesUpdateManyArgs>

export const Deal_notesDeleteManyArgsSchema: z.ZodType<Prisma.Deal_notesDeleteManyArgs> = z.object({
  where: Deal_notesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Deal_notesDeleteManyArgs>

export const DealsCreateArgsSchema: z.ZodType<Prisma.DealsCreateArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  data: z.union([ DealsCreateInputSchema,DealsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.DealsCreateArgs>

export const DealsUpsertArgsSchema: z.ZodType<Prisma.DealsUpsertArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereUniqueInputSchema,
  create: z.union([ DealsCreateInputSchema,DealsUncheckedCreateInputSchema ]),
  update: z.union([ DealsUpdateInputSchema,DealsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DealsUpsertArgs>

export const DealsCreateManyArgsSchema: z.ZodType<Prisma.DealsCreateManyArgs> = z.object({
  data: DealsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DealsCreateManyArgs>

export const DealsDeleteArgsSchema: z.ZodType<Prisma.DealsDeleteArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  where: DealsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DealsDeleteArgs>

export const DealsUpdateArgsSchema: z.ZodType<Prisma.DealsUpdateArgs> = z.object({
  select: DealsSelectSchema.optional(),
  include: DealsIncludeSchema.optional(),
  data: z.union([ DealsUpdateInputSchema,DealsUncheckedUpdateInputSchema ]),
  where: DealsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DealsUpdateArgs>

export const DealsUpdateManyArgsSchema: z.ZodType<Prisma.DealsUpdateManyArgs> = z.object({
  data: z.union([ DealsUpdateManyMutationInputSchema,DealsUncheckedUpdateManyInputSchema ]),
  where: DealsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DealsUpdateManyArgs>

export const DealsDeleteManyArgsSchema: z.ZodType<Prisma.DealsDeleteManyArgs> = z.object({
  where: DealsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DealsDeleteManyArgs>

export const SalesCreateArgsSchema: z.ZodType<Prisma.SalesCreateArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  data: z.union([ SalesCreateInputSchema,SalesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.SalesCreateArgs>

export const SalesUpsertArgsSchema: z.ZodType<Prisma.SalesUpsertArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereUniqueInputSchema,
  create: z.union([ SalesCreateInputSchema,SalesUncheckedCreateInputSchema ]),
  update: z.union([ SalesUpdateInputSchema,SalesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.SalesUpsertArgs>

export const SalesCreateManyArgsSchema: z.ZodType<Prisma.SalesCreateManyArgs> = z.object({
  data: SalesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.SalesCreateManyArgs>

export const SalesDeleteArgsSchema: z.ZodType<Prisma.SalesDeleteArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SalesDeleteArgs>

export const SalesUpdateArgsSchema: z.ZodType<Prisma.SalesUpdateArgs> = z.object({
  select: SalesSelectSchema.optional(),
  include: SalesIncludeSchema.optional(),
  data: z.union([ SalesUpdateInputSchema,SalesUncheckedUpdateInputSchema ]),
  where: SalesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SalesUpdateArgs>

export const SalesUpdateManyArgsSchema: z.ZodType<Prisma.SalesUpdateManyArgs> = z.object({
  data: z.union([ SalesUpdateManyMutationInputSchema,SalesUncheckedUpdateManyInputSchema ]),
  where: SalesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SalesUpdateManyArgs>

export const SalesDeleteManyArgsSchema: z.ZodType<Prisma.SalesDeleteManyArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SalesDeleteManyArgs>

export const TagsCreateArgsSchema: z.ZodType<Prisma.TagsCreateArgs> = z.object({
  select: TagsSelectSchema.optional(),
  data: z.union([ TagsCreateInputSchema,TagsUncheckedCreateInputSchema ]),
}).strict() 

export const TagsUpsertArgsSchema: z.ZodType<Prisma.TagsUpsertArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereUniqueInputSchema,
  create: z.union([ TagsCreateInputSchema,TagsUncheckedCreateInputSchema ]),
  update: z.union([ TagsUpdateInputSchema,TagsUncheckedUpdateInputSchema ]),
}).strict() 

export const TagsCreateManyArgsSchema: z.ZodType<Prisma.TagsCreateManyArgs> = z.object({
  data: TagsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const TagsDeleteArgsSchema: z.ZodType<Prisma.TagsDeleteArgs> = z.object({
  select: TagsSelectSchema.optional(),
  where: TagsWhereUniqueInputSchema,
}).strict() 

export const TagsUpdateArgsSchema: z.ZodType<Prisma.TagsUpdateArgs> = z.object({
  select: TagsSelectSchema.optional(),
  data: z.union([ TagsUpdateInputSchema,TagsUncheckedUpdateInputSchema ]),
  where: TagsWhereUniqueInputSchema,
}).strict() 

export const TagsUpdateManyArgsSchema: z.ZodType<Prisma.TagsUpdateManyArgs> = z.object({
  data: z.union([ TagsUpdateManyMutationInputSchema,TagsUncheckedUpdateManyInputSchema ]),
  where: TagsWhereInputSchema.optional(),
}).strict() 

export const TagsDeleteManyArgsSchema: z.ZodType<Prisma.TagsDeleteManyArgs> = z.object({
  where: TagsWhereInputSchema.optional(),
}).strict() 

export const TasksCreateArgsSchema: z.ZodType<Prisma.TasksCreateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  data: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.TasksCreateArgs>

export const TasksUpsertArgsSchema: z.ZodType<Prisma.TasksUpsertArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema,
  create: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
  update: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.TasksUpsertArgs>

export const TasksCreateManyArgsSchema: z.ZodType<Prisma.TasksCreateManyArgs> = z.object({
  data: TasksCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.TasksCreateManyArgs>

export const TasksDeleteArgsSchema: z.ZodType<Prisma.TasksDeleteArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TasksDeleteArgs>

export const TasksUpdateArgsSchema: z.ZodType<Prisma.TasksUpdateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  data: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
  where: TasksWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TasksUpdateArgs>

export const TasksUpdateManyArgsSchema: z.ZodType<Prisma.TasksUpdateManyArgs> = z.object({
  data: z.union([ TasksUpdateManyMutationInputSchema,TasksUncheckedUpdateManyInputSchema ]),
  where: TasksWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.TasksUpdateManyArgs>

export const TasksDeleteManyArgsSchema: z.ZodType<Prisma.TasksDeleteManyArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.TasksDeleteManyArgs>

interface CompaniesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.CompaniesArgs
  readonly type: Omit<Prisma.CompaniesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Contact_notesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Contact_notesArgs
  readonly type: Omit<Prisma.Contact_notesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ContactsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ContactsArgs
  readonly type: Omit<Prisma.ContactsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Deal_notesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Deal_notesArgs
  readonly type: Omit<Prisma.Deal_notesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface DealsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.DealsArgs
  readonly type: Omit<Prisma.DealsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface SalesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.SalesArgs
  readonly type: Omit<Prisma.SalesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface TagsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.TagsArgs
  readonly type: Omit<Prisma.TagsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface TasksGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.TasksArgs
  readonly type: Omit<Prisma.TasksGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

export const tableSchemas = {
  companies: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "logo",
        "TEXT"
      ],
      [
        "sector",
        "TEXT"
      ],
      [
        "size",
        "INT2"
      ],
      [
        "linked_in",
        "TEXT"
      ],
      [
        "website",
        "TEXT"
      ],
      [
        "phone_number",
        "TEXT"
      ],
      [
        "address",
        "TEXT"
      ],
      [
        "zipcode",
        "TEXT"
      ],
      [
        "city",
        "TEXT"
      ],
      [
        "state_abbr",
        "TEXT"
      ],
      [
        "sales_id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("sales", "sales_id", "id", "sales", "CompaniesToSales", "one"),
      new Relation("contacts", "", "", "contacts", "CompaniesToContacts", "many"),
      new Relation("deals", "", "", "deals", "CompaniesToDeals", "many"),
    ],
    modelSchema: (CompaniesCreateInputSchema as any)
      .partial()
      .or((CompaniesUncheckedCreateInputSchema as any).partial()),
    createSchema: CompaniesCreateArgsSchema,
    createManySchema: CompaniesCreateManyArgsSchema,
    findUniqueSchema: CompaniesFindUniqueArgsSchema,
    findSchema: CompaniesFindFirstArgsSchema,
    updateSchema: CompaniesUpdateArgsSchema,
    updateManySchema: CompaniesUpdateManyArgsSchema,
    upsertSchema: CompaniesUpsertArgsSchema,
    deleteSchema: CompaniesDeleteArgsSchema,
    deleteManySchema: CompaniesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof CompaniesUncheckedCreateInputSchema>,
    Prisma.CompaniesCreateArgs['data'],
    Prisma.CompaniesUpdateArgs['data'],
    Prisma.CompaniesFindFirstArgs['select'],
    Prisma.CompaniesFindFirstArgs['where'],
    Prisma.CompaniesFindUniqueArgs['where'],
    Omit<Prisma.CompaniesInclude, '_count'>,
    Prisma.CompaniesFindFirstArgs['orderBy'],
    Prisma.CompaniesScalarFieldEnum,
    CompaniesGetPayload
  >,
  contact_notes: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "date",
        "TIMESTAMP"
      ],
      [
        "type",
        "TEXT"
      ],
      [
        "text",
        "TEXT"
      ],
      [
        "sales_id",
        "UUID"
      ],
      [
        "status",
        "TEXT"
      ],
      [
        "contact_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("contacts", "contact_id", "id", "contacts", "Contact_notesToContacts", "one"),
      new Relation("sales", "sales_id", "id", "sales", "Contact_notesToSales", "one"),
    ],
    modelSchema: (Contact_notesCreateInputSchema as any)
      .partial()
      .or((Contact_notesUncheckedCreateInputSchema as any).partial()),
    createSchema: Contact_notesCreateArgsSchema,
    createManySchema: Contact_notesCreateManyArgsSchema,
    findUniqueSchema: Contact_notesFindUniqueArgsSchema,
    findSchema: Contact_notesFindFirstArgsSchema,
    updateSchema: Contact_notesUpdateArgsSchema,
    updateManySchema: Contact_notesUpdateManyArgsSchema,
    upsertSchema: Contact_notesUpsertArgsSchema,
    deleteSchema: Contact_notesDeleteArgsSchema,
    deleteManySchema: Contact_notesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Contact_notesUncheckedCreateInputSchema>,
    Prisma.Contact_notesCreateArgs['data'],
    Prisma.Contact_notesUpdateArgs['data'],
    Prisma.Contact_notesFindFirstArgs['select'],
    Prisma.Contact_notesFindFirstArgs['where'],
    Prisma.Contact_notesFindUniqueArgs['where'],
    Omit<Prisma.Contact_notesInclude, '_count'>,
    Prisma.Contact_notesFindFirstArgs['orderBy'],
    Prisma.Contact_notesScalarFieldEnum,
    Contact_notesGetPayload
  >,
  contacts: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "first_name",
        "TEXT"
      ],
      [
        "last_name",
        "TEXT"
      ],
      [
        "gender",
        "TEXT"
      ],
      [
        "title",
        "TEXT"
      ],
      [
        "company_id",
        "UUID"
      ],
      [
        "email",
        "TEXT"
      ],
      [
        "phone_number1",
        "TEXT"
      ],
      [
        "phone_number2",
        "TEXT"
      ],
      [
        "background",
        "TEXT"
      ],
      [
        "acquisition",
        "TEXT"
      ],
      [
        "avatar",
        "TEXT"
      ],
      [
        "first_seen",
        "TIMESTAMP"
      ],
      [
        "last_seen",
        "TIMESTAMP"
      ],
      [
        "has_newsletter",
        "BOOL"
      ],
      [
        "status",
        "TEXT"
      ],
      [
        "tags",
        "JSONB"
      ],
      [
        "sales_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("contact_notes", "", "", "contact_notes", "Contact_notesToContacts", "many"),
      new Relation("companies", "company_id", "id", "companies", "CompaniesToContacts", "one"),
      new Relation("sales", "sales_id", "id", "sales", "ContactsToSales", "one"),
      new Relation("tasks", "", "", "tasks", "ContactsToTasks", "many"),
    ],
    modelSchema: (ContactsCreateInputSchema as any)
      .partial()
      .or((ContactsUncheckedCreateInputSchema as any).partial()),
    createSchema: ContactsCreateArgsSchema,
    createManySchema: ContactsCreateManyArgsSchema,
    findUniqueSchema: ContactsFindUniqueArgsSchema,
    findSchema: ContactsFindFirstArgsSchema,
    updateSchema: ContactsUpdateArgsSchema,
    updateManySchema: ContactsUpdateManyArgsSchema,
    upsertSchema: ContactsUpsertArgsSchema,
    deleteSchema: ContactsDeleteArgsSchema,
    deleteManySchema: ContactsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ContactsUncheckedCreateInputSchema>,
    Prisma.ContactsCreateArgs['data'],
    Prisma.ContactsUpdateArgs['data'],
    Prisma.ContactsFindFirstArgs['select'],
    Prisma.ContactsFindFirstArgs['where'],
    Prisma.ContactsFindUniqueArgs['where'],
    Omit<Prisma.ContactsInclude, '_count'>,
    Prisma.ContactsFindFirstArgs['orderBy'],
    Prisma.ContactsScalarFieldEnum,
    ContactsGetPayload
  >,
  deal_notes: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "date",
        "TIMESTAMP"
      ],
      [
        "deal_id",
        "UUID"
      ],
      [
        "sales_id",
        "UUID"
      ],
      [
        "type",
        "TEXT"
      ],
      [
        "text",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("deals", "deal_id", "id", "deals", "Deal_notesToDeals", "one"),
      new Relation("sales", "sales_id", "id", "sales", "Deal_notesToSales", "one"),
    ],
    modelSchema: (Deal_notesCreateInputSchema as any)
      .partial()
      .or((Deal_notesUncheckedCreateInputSchema as any).partial()),
    createSchema: Deal_notesCreateArgsSchema,
    createManySchema: Deal_notesCreateManyArgsSchema,
    findUniqueSchema: Deal_notesFindUniqueArgsSchema,
    findSchema: Deal_notesFindFirstArgsSchema,
    updateSchema: Deal_notesUpdateArgsSchema,
    updateManySchema: Deal_notesUpdateManyArgsSchema,
    upsertSchema: Deal_notesUpsertArgsSchema,
    deleteSchema: Deal_notesDeleteArgsSchema,
    deleteManySchema: Deal_notesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Deal_notesUncheckedCreateInputSchema>,
    Prisma.Deal_notesCreateArgs['data'],
    Prisma.Deal_notesUpdateArgs['data'],
    Prisma.Deal_notesFindFirstArgs['select'],
    Prisma.Deal_notesFindFirstArgs['where'],
    Prisma.Deal_notesFindUniqueArgs['where'],
    Omit<Prisma.Deal_notesInclude, '_count'>,
    Prisma.Deal_notesFindFirstArgs['orderBy'],
    Prisma.Deal_notesScalarFieldEnum,
    Deal_notesGetPayload
  >,
  deals: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMP"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "company_id",
        "UUID"
      ],
      [
        "contact_ids",
        "JSONB"
      ],
      [
        "type",
        "TEXT"
      ],
      [
        "stage",
        "TEXT"
      ],
      [
        "description",
        "TEXT"
      ],
      [
        "amount",
        "INT4"
      ],
      [
        "updated_at",
        "TIMESTAMP"
      ],
      [
        "start_at",
        "TIMESTAMP"
      ],
      [
        "sales_id",
        "UUID"
      ],
      [
        "anindex",
        "INT4"
      ]
    ]),
    relations: [
      new Relation("deal_notes", "", "", "deal_notes", "Deal_notesToDeals", "many"),
      new Relation("companies", "company_id", "id", "companies", "CompaniesToDeals", "one"),
      new Relation("sales", "sales_id", "id", "sales", "DealsToSales", "one"),
    ],
    modelSchema: (DealsCreateInputSchema as any)
      .partial()
      .or((DealsUncheckedCreateInputSchema as any).partial()),
    createSchema: DealsCreateArgsSchema,
    createManySchema: DealsCreateManyArgsSchema,
    findUniqueSchema: DealsFindUniqueArgsSchema,
    findSchema: DealsFindFirstArgsSchema,
    updateSchema: DealsUpdateArgsSchema,
    updateManySchema: DealsUpdateManyArgsSchema,
    upsertSchema: DealsUpsertArgsSchema,
    deleteSchema: DealsDeleteArgsSchema,
    deleteManySchema: DealsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof DealsUncheckedCreateInputSchema>,
    Prisma.DealsCreateArgs['data'],
    Prisma.DealsUpdateArgs['data'],
    Prisma.DealsFindFirstArgs['select'],
    Prisma.DealsFindFirstArgs['where'],
    Prisma.DealsFindUniqueArgs['where'],
    Omit<Prisma.DealsInclude, '_count'>,
    Prisma.DealsFindFirstArgs['orderBy'],
    Prisma.DealsScalarFieldEnum,
    DealsGetPayload
  >,
  sales: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "first_name",
        "TEXT"
      ],
      [
        "last_name",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("companies", "", "", "companies", "CompaniesToSales", "many"),
      new Relation("contact_notes", "", "", "contact_notes", "Contact_notesToSales", "many"),
      new Relation("contacts", "", "", "contacts", "ContactsToSales", "many"),
      new Relation("deal_notes", "", "", "deal_notes", "Deal_notesToSales", "many"),
      new Relation("deals", "", "", "deals", "DealsToSales", "many"),
      new Relation("tasks", "", "", "tasks", "SalesToTasks", "many"),
    ],
    modelSchema: (SalesCreateInputSchema as any)
      .partial()
      .or((SalesUncheckedCreateInputSchema as any).partial()),
    createSchema: SalesCreateArgsSchema,
    createManySchema: SalesCreateManyArgsSchema,
    findUniqueSchema: SalesFindUniqueArgsSchema,
    findSchema: SalesFindFirstArgsSchema,
    updateSchema: SalesUpdateArgsSchema,
    updateManySchema: SalesUpdateManyArgsSchema,
    upsertSchema: SalesUpsertArgsSchema,
    deleteSchema: SalesDeleteArgsSchema,
    deleteManySchema: SalesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof SalesUncheckedCreateInputSchema>,
    Prisma.SalesCreateArgs['data'],
    Prisma.SalesUpdateArgs['data'],
    Prisma.SalesFindFirstArgs['select'],
    Prisma.SalesFindFirstArgs['where'],
    Prisma.SalesFindUniqueArgs['where'],
    Omit<Prisma.SalesInclude, '_count'>,
    Prisma.SalesFindFirstArgs['orderBy'],
    Prisma.SalesScalarFieldEnum,
    SalesGetPayload
  >,
  tags: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "color",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (TagsCreateInputSchema as any)
      .partial()
      .or((TagsUncheckedCreateInputSchema as any).partial()),
    createSchema: TagsCreateArgsSchema,
    createManySchema: TagsCreateManyArgsSchema,
    findUniqueSchema: TagsFindUniqueArgsSchema,
    findSchema: TagsFindFirstArgsSchema,
    updateSchema: TagsUpdateArgsSchema,
    updateManySchema: TagsUpdateManyArgsSchema,
    upsertSchema: TagsUpsertArgsSchema,
    deleteSchema: TagsDeleteArgsSchema,
    deleteManySchema: TagsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof TagsUncheckedCreateInputSchema>,
    Prisma.TagsCreateArgs['data'],
    Prisma.TagsUpdateArgs['data'],
    Prisma.TagsFindFirstArgs['select'],
    Prisma.TagsFindFirstArgs['where'],
    Prisma.TagsFindUniqueArgs['where'],
    never,
    Prisma.TagsFindFirstArgs['orderBy'],
    Prisma.TagsScalarFieldEnum,
    TagsGetPayload
  >,
  tasks: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "due_date",
        "TIMESTAMP"
      ],
      [
        "contact_id",
        "UUID"
      ],
      [
        "sales_id",
        "UUID"
      ],
      [
        "text",
        "TEXT"
      ],
      [
        "type",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("contacts", "contact_id", "id", "contacts", "ContactsToTasks", "one"),
      new Relation("sales", "sales_id", "id", "sales", "SalesToTasks", "one"),
    ],
    modelSchema: (TasksCreateInputSchema as any)
      .partial()
      .or((TasksUncheckedCreateInputSchema as any).partial()),
    createSchema: TasksCreateArgsSchema,
    createManySchema: TasksCreateManyArgsSchema,
    findUniqueSchema: TasksFindUniqueArgsSchema,
    findSchema: TasksFindFirstArgsSchema,
    updateSchema: TasksUpdateArgsSchema,
    updateManySchema: TasksUpdateManyArgsSchema,
    upsertSchema: TasksUpsertArgsSchema,
    deleteSchema: TasksDeleteArgsSchema,
    deleteManySchema: TasksDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof TasksUncheckedCreateInputSchema>,
    Prisma.TasksCreateArgs['data'],
    Prisma.TasksUpdateArgs['data'],
    Prisma.TasksFindFirstArgs['select'],
    Prisma.TasksFindFirstArgs['where'],
    Prisma.TasksFindUniqueArgs['where'],
    Omit<Prisma.TasksInclude, '_count'>,
    Prisma.TasksFindFirstArgs['orderBy'],
    Prisma.TasksScalarFieldEnum,
    TasksGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
export const JsonNull = { __is_electric_json_null__: true }
