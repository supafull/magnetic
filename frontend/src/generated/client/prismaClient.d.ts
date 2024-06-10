
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Companies
 * 
 */
export type Companies = {
  /**
   * @zod.string.uuid()
   */
  id: string
  name: string
  logo: Prisma.JsonValue | null
  sector: string
  /**
   * @zod.number.int().gte(-32768).lte(32767)
   */
  size: number
  linked_in: string
  website: string
  phone_number: string
  address: string
  zipcode: string
  city: string
  state_abbr: string
  /**
   * @zod.string.uuid()
   */
  sales_id: string
  created_at: Date
}

/**
 * Model Contact_notes
 * 
 */
export type Contact_notes = {
  /**
   * @zod.string.uuid()
   */
  id: string
  date: Date
  type: string
  text: string
  /**
   * @zod.string.uuid()
   */
  sales_id: string
  /**
   * @zod.string.uuid()
   */
  contact_id: string | null
  status: string
}

/**
 * Model Contacts
 * 
 */
export type Contacts = {
  /**
   * @zod.string.uuid()
   */
  id: string
  first_name: string
  last_name: string
  gender: string | null
  title: string | null
  email: string
  phone_number1: string | null
  phone_number2: string | null
  background: string | null
  acquisition: string | null
  avatar: Prisma.JsonValue | null
  first_seen: Date
  last_seen: Date
  has_newsletter: boolean | null
  status: string
  /**
   * @zod.string.uuid()
   */
  company_id: string
  /**
   * @zod.string.uuid()
   */
  sales_id: string
  tags: Prisma.JsonValue | null
}

/**
 * Model Deal_notes
 * 
 */
export type Deal_notes = {
  /**
   * @zod.string.uuid()
   */
  id: string
  date: Date
  type: string
  /**
   * @zod.string.uuid()
   */
  deal_id: string
  /**
   * @zod.string.uuid()
   */
  sales_id: string
  text: string
}

/**
 * Model Deals
 * 
 */
export type Deals = {
  /**
   * @zod.string.uuid()
   */
  id: string
  created_at: Date
  name: string
  contact_ids: Prisma.JsonValue | null
  type: string
  stage: string
  description: string | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  amount: number
  updated_at: Date
  start_at: Date | null
  /**
   * @zod.string.uuid()
   */
  company_id: string
  /**
   * @zod.string.uuid()
   */
  sales_id: string
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  anindex: number
}

/**
 * Model Sales
 * 
 */
export type Sales = {
  /**
   * @zod.string.uuid()
   */
  id: string
  first_name: string
  last_name: string
  email: string
}

/**
 * Model Tags
 * 
 */
export type Tags = {
  /**
   * @zod.string.uuid()
   */
  id: string
  name: string
  color: string
}

/**
 * Model Tasks
 * 
 */
export type Tasks = {
  /**
   * @zod.string.uuid()
   */
  id: string
  due_date: Date | null
  text: string | null
  /**
   * @zod.string.uuid()
   */
  contact_id: string | null
  /**
   * @zod.string.uuid()
   */
  sales_id: string | null
  type: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.companies.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.companies.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.companies`: Exposes CRUD operations for the **Companies** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.companies.findMany()
    * ```
    */
  get companies(): Prisma.CompaniesDelegate<GlobalReject>;

  /**
   * `prisma.contact_notes`: Exposes CRUD operations for the **Contact_notes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contact_notes
    * const contact_notes = await prisma.contact_notes.findMany()
    * ```
    */
  get contact_notes(): Prisma.Contact_notesDelegate<GlobalReject>;

  /**
   * `prisma.contacts`: Exposes CRUD operations for the **Contacts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contacts.findMany()
    * ```
    */
  get contacts(): Prisma.ContactsDelegate<GlobalReject>;

  /**
   * `prisma.deal_notes`: Exposes CRUD operations for the **Deal_notes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deal_notes
    * const deal_notes = await prisma.deal_notes.findMany()
    * ```
    */
  get deal_notes(): Prisma.Deal_notesDelegate<GlobalReject>;

  /**
   * `prisma.deals`: Exposes CRUD operations for the **Deals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deals
    * const deals = await prisma.deals.findMany()
    * ```
    */
  get deals(): Prisma.DealsDelegate<GlobalReject>;

  /**
   * `prisma.sales`: Exposes CRUD operations for the **Sales** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sales.findMany()
    * ```
    */
  get sales(): Prisma.SalesDelegate<GlobalReject>;

  /**
   * `prisma.tags`: Exposes CRUD operations for the **Tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tags.findMany()
    * ```
    */
  get tags(): Prisma.TagsDelegate<GlobalReject>;

  /**
   * `prisma.tasks`: Exposes CRUD operations for the **Tasks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.tasks.findMany()
    * ```
    */
  get tasks(): Prisma.TasksDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.1
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Companies: 'Companies',
    Contact_notes: 'Contact_notes',
    Contacts: 'Contacts',
    Deal_notes: 'Deal_notes',
    Deals: 'Deals',
    Sales: 'Sales',
    Tags: 'Tags',
    Tasks: 'Tasks'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompaniesCountOutputType
   */


  export type CompaniesCountOutputType = {
    contacts: number
    deals: number
  }

  export type CompaniesCountOutputTypeSelect = {
    contacts?: boolean
    deals?: boolean
  }

  export type CompaniesCountOutputTypeGetPayload<S extends boolean | null | undefined | CompaniesCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CompaniesCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CompaniesCountOutputTypeArgs)
    ? CompaniesCountOutputType 
    : S extends { select: any } & (CompaniesCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof CompaniesCountOutputType ? CompaniesCountOutputType[P] : never
  } 
      : CompaniesCountOutputType




  // Custom InputTypes

  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CompaniesCountOutputType
     * 
    **/
    select?: CompaniesCountOutputTypeSelect | null
  }



  /**
   * Count Type ContactsCountOutputType
   */


  export type ContactsCountOutputType = {
    contact_notes: number
    tasks: number
  }

  export type ContactsCountOutputTypeSelect = {
    contact_notes?: boolean
    tasks?: boolean
  }

  export type ContactsCountOutputTypeGetPayload<S extends boolean | null | undefined | ContactsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ContactsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ContactsCountOutputTypeArgs)
    ? ContactsCountOutputType 
    : S extends { select: any } & (ContactsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ContactsCountOutputType ? ContactsCountOutputType[P] : never
  } 
      : ContactsCountOutputType




  // Custom InputTypes

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ContactsCountOutputType
     * 
    **/
    select?: ContactsCountOutputTypeSelect | null
  }



  /**
   * Count Type DealsCountOutputType
   */


  export type DealsCountOutputType = {
    deal_notes: number
  }

  export type DealsCountOutputTypeSelect = {
    deal_notes?: boolean
  }

  export type DealsCountOutputTypeGetPayload<S extends boolean | null | undefined | DealsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DealsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DealsCountOutputTypeArgs)
    ? DealsCountOutputType 
    : S extends { select: any } & (DealsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DealsCountOutputType ? DealsCountOutputType[P] : never
  } 
      : DealsCountOutputType




  // Custom InputTypes

  /**
   * DealsCountOutputType without action
   */
  export type DealsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DealsCountOutputType
     * 
    **/
    select?: DealsCountOutputTypeSelect | null
  }



  /**
   * Count Type SalesCountOutputType
   */


  export type SalesCountOutputType = {
    companies: number
    contact_notes: number
    contacts: number
    deal_notes: number
    deals: number
    tasks: number
  }

  export type SalesCountOutputTypeSelect = {
    companies?: boolean
    contact_notes?: boolean
    contacts?: boolean
    deal_notes?: boolean
    deals?: boolean
    tasks?: boolean
  }

  export type SalesCountOutputTypeGetPayload<S extends boolean | null | undefined | SalesCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? SalesCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (SalesCountOutputTypeArgs)
    ? SalesCountOutputType 
    : S extends { select: any } & (SalesCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof SalesCountOutputType ? SalesCountOutputType[P] : never
  } 
      : SalesCountOutputType




  // Custom InputTypes

  /**
   * SalesCountOutputType without action
   */
  export type SalesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the SalesCountOutputType
     * 
    **/
    select?: SalesCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Companies
   */


  export type AggregateCompanies = {
    _count: CompaniesCountAggregateOutputType | null
    _avg: CompaniesAvgAggregateOutputType | null
    _sum: CompaniesSumAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  export type CompaniesAvgAggregateOutputType = {
    size: number | null
  }

  export type CompaniesSumAggregateOutputType = {
    size: number | null
  }

  export type CompaniesMinAggregateOutputType = {
    id: string | null
    name: string | null
    sector: string | null
    size: number | null
    linked_in: string | null
    website: string | null
    phone_number: string | null
    address: string | null
    zipcode: string | null
    city: string | null
    state_abbr: string | null
    sales_id: string | null
    created_at: Date | null
  }

  export type CompaniesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sector: string | null
    size: number | null
    linked_in: string | null
    website: string | null
    phone_number: string | null
    address: string | null
    zipcode: string | null
    city: string | null
    state_abbr: string | null
    sales_id: string | null
    created_at: Date | null
  }

  export type CompaniesCountAggregateOutputType = {
    id: number
    name: number
    logo: number
    sector: number
    size: number
    linked_in: number
    website: number
    phone_number: number
    address: number
    zipcode: number
    city: number
    state_abbr: number
    sales_id: number
    created_at: number
    _all: number
  }


  export type CompaniesAvgAggregateInputType = {
    size?: true
  }

  export type CompaniesSumAggregateInputType = {
    size?: true
  }

  export type CompaniesMinAggregateInputType = {
    id?: true
    name?: true
    sector?: true
    size?: true
    linked_in?: true
    website?: true
    phone_number?: true
    address?: true
    zipcode?: true
    city?: true
    state_abbr?: true
    sales_id?: true
    created_at?: true
  }

  export type CompaniesMaxAggregateInputType = {
    id?: true
    name?: true
    sector?: true
    size?: true
    linked_in?: true
    website?: true
    phone_number?: true
    address?: true
    zipcode?: true
    city?: true
    state_abbr?: true
    sales_id?: true
    created_at?: true
  }

  export type CompaniesCountAggregateInputType = {
    id?: true
    name?: true
    logo?: true
    sector?: true
    size?: true
    linked_in?: true
    website?: true
    phone_number?: true
    address?: true
    zipcode?: true
    city?: true
    state_abbr?: true
    sales_id?: true
    created_at?: true
    _all?: true
  }

  export type CompaniesAggregateArgs = {
    /**
     * Filter which Companies to aggregate.
     * 
    **/
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     * 
    **/
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompaniesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompaniesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompaniesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompaniesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompaniesMaxAggregateInputType
  }

  export type GetCompaniesAggregateType<T extends CompaniesAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanies]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanies[P]>
      : GetScalarType<T[P], AggregateCompanies[P]>
  }




  export type CompaniesGroupByArgs = {
    where?: CompaniesWhereInput
    orderBy?: Enumerable<CompaniesOrderByWithAggregationInput>
    by: Array<CompaniesScalarFieldEnum>
    having?: CompaniesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompaniesCountAggregateInputType | true
    _avg?: CompaniesAvgAggregateInputType
    _sum?: CompaniesSumAggregateInputType
    _min?: CompaniesMinAggregateInputType
    _max?: CompaniesMaxAggregateInputType
  }


  export type CompaniesGroupByOutputType = {
    id: string
    name: string
    logo: JsonValue | null
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    sales_id: string
    created_at: Date
    _count: CompaniesCountAggregateOutputType | null
    _avg: CompaniesAvgAggregateOutputType | null
    _sum: CompaniesSumAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  type GetCompaniesGroupByPayload<T extends CompaniesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CompaniesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompaniesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
            : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
        }
      >
    >


  export type CompaniesSelect = {
    id?: boolean
    name?: boolean
    logo?: boolean
    sector?: boolean
    size?: boolean
    linked_in?: boolean
    website?: boolean
    phone_number?: boolean
    address?: boolean
    zipcode?: boolean
    city?: boolean
    state_abbr?: boolean
    sales_id?: boolean
    created_at?: boolean
    sales?: boolean | SalesArgs
    contacts?: boolean | Companies$contactsArgs
    deals?: boolean | Companies$dealsArgs
    _count?: boolean | CompaniesCountOutputTypeArgs
  }


  export type CompaniesInclude = {
    sales?: boolean | SalesArgs
    contacts?: boolean | Companies$contactsArgs
    deals?: boolean | Companies$dealsArgs
    _count?: boolean | CompaniesCountOutputTypeArgs
  } 

  export type CompaniesGetPayload<S extends boolean | null | undefined | CompaniesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Companies :
    S extends undefined ? never :
    S extends { include: any } & (CompaniesArgs | CompaniesFindManyArgs)
    ? Companies  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'sales' ? SalesGetPayload<S['include'][P]> :
        P extends 'contacts' ? Array < ContactsGetPayload<S['include'][P]>>  :
        P extends 'deals' ? Array < DealsGetPayload<S['include'][P]>>  :
        P extends '_count' ? CompaniesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (CompaniesArgs | CompaniesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'sales' ? SalesGetPayload<S['select'][P]> :
        P extends 'contacts' ? Array < ContactsGetPayload<S['select'][P]>>  :
        P extends 'deals' ? Array < DealsGetPayload<S['select'][P]>>  :
        P extends '_count' ? CompaniesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Companies ? Companies[P] : never
  } 
      : Companies


  type CompaniesCountArgs = Merge<
    Omit<CompaniesFindManyArgs, 'select' | 'include'> & {
      select?: CompaniesCountAggregateInputType | true
    }
  >

  export interface CompaniesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Companies that matches the filter.
     * @param {CompaniesFindUniqueArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CompaniesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CompaniesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Companies'> extends True ? Prisma__CompaniesClient<CompaniesGetPayload<T>> : Prisma__CompaniesClient<CompaniesGetPayload<T> | null, null>

    /**
     * Find one Companies that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CompaniesFindUniqueOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CompaniesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CompaniesFindUniqueOrThrowArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Find the first Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindFirstArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CompaniesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CompaniesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Companies'> extends True ? Prisma__CompaniesClient<CompaniesGetPayload<T>> : Prisma__CompaniesClient<CompaniesGetPayload<T> | null, null>

    /**
     * Find the first Companies that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindFirstOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CompaniesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CompaniesFindFirstOrThrowArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.companies.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.companies.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companiesWithIdOnly = await prisma.companies.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CompaniesFindManyArgs>(
      args?: SelectSubset<T, CompaniesFindManyArgs>
    ): PrismaPromise<Array<CompaniesGetPayload<T>>>

    /**
     * Create a Companies.
     * @param {CompaniesCreateArgs} args - Arguments to create a Companies.
     * @example
     * // Create one Companies
     * const Companies = await prisma.companies.create({
     *   data: {
     *     // ... data to create a Companies
     *   }
     * })
     * 
    **/
    create<T extends CompaniesCreateArgs>(
      args: SelectSubset<T, CompaniesCreateArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Create many Companies.
     *     @param {CompaniesCreateManyArgs} args - Arguments to create many Companies.
     *     @example
     *     // Create many Companies
     *     const companies = await prisma.companies.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CompaniesCreateManyArgs>(
      args?: SelectSubset<T, CompaniesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Companies.
     * @param {CompaniesDeleteArgs} args - Arguments to delete one Companies.
     * @example
     * // Delete one Companies
     * const Companies = await prisma.companies.delete({
     *   where: {
     *     // ... filter to delete one Companies
     *   }
     * })
     * 
    **/
    delete<T extends CompaniesDeleteArgs>(
      args: SelectSubset<T, CompaniesDeleteArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Update one Companies.
     * @param {CompaniesUpdateArgs} args - Arguments to update one Companies.
     * @example
     * // Update one Companies
     * const companies = await prisma.companies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CompaniesUpdateArgs>(
      args: SelectSubset<T, CompaniesUpdateArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Delete zero or more Companies.
     * @param {CompaniesDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.companies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CompaniesDeleteManyArgs>(
      args?: SelectSubset<T, CompaniesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const companies = await prisma.companies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CompaniesUpdateManyArgs>(
      args: SelectSubset<T, CompaniesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Companies.
     * @param {CompaniesUpsertArgs} args - Arguments to update or create a Companies.
     * @example
     * // Update or create a Companies
     * const companies = await prisma.companies.upsert({
     *   create: {
     *     // ... data to create a Companies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Companies we want to update
     *   }
     * })
    **/
    upsert<T extends CompaniesUpsertArgs>(
      args: SelectSubset<T, CompaniesUpsertArgs>
    ): Prisma__CompaniesClient<CompaniesGetPayload<T>>

    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.companies.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompaniesCountArgs>(
      args?: Subset<T, CompaniesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompaniesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompaniesAggregateArgs>(args: Subset<T, CompaniesAggregateArgs>): PrismaPromise<GetCompaniesAggregateType<T>>

    /**
     * Group by Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompaniesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompaniesGroupByArgs['orderBy'] }
        : { orderBy?: CompaniesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompaniesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompaniesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Companies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CompaniesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    contacts<T extends Companies$contactsArgs= {}>(args?: Subset<T, Companies$contactsArgs>): PrismaPromise<Array<ContactsGetPayload<T>>| Null>;

    deals<T extends Companies$dealsArgs= {}>(args?: Subset<T, Companies$dealsArgs>): PrismaPromise<Array<DealsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Companies base type for findUnique actions
   */
  export type CompaniesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter, which Companies to fetch.
     * 
    **/
    where: CompaniesWhereUniqueInput
  }

  /**
   * Companies findUnique
   */
  export interface CompaniesFindUniqueArgs extends CompaniesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Companies findUniqueOrThrow
   */
  export type CompaniesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter, which Companies to fetch.
     * 
    **/
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies base type for findFirst actions
   */
  export type CompaniesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter, which Companies to fetch.
     * 
    **/
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     * 
    **/
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     * 
    **/
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     * 
    **/
    distinct?: Enumerable<CompaniesScalarFieldEnum>
  }

  /**
   * Companies findFirst
   */
  export interface CompaniesFindFirstArgs extends CompaniesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Companies findFirstOrThrow
   */
  export type CompaniesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter, which Companies to fetch.
     * 
    **/
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     * 
    **/
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     * 
    **/
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     * 
    **/
    distinct?: Enumerable<CompaniesScalarFieldEnum>
  }


  /**
   * Companies findMany
   */
  export type CompaniesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter, which Companies to fetch.
     * 
    **/
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     * 
    **/
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     * 
    **/
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CompaniesScalarFieldEnum>
  }


  /**
   * Companies create
   */
  export type CompaniesCreateArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * The data needed to create a Companies.
     * 
    **/
    data: XOR<CompaniesCreateInput, CompaniesUncheckedCreateInput>
  }


  /**
   * Companies createMany
   */
  export type CompaniesCreateManyArgs = {
    /**
     * The data used to create many Companies.
     * 
    **/
    data: Enumerable<CompaniesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Companies update
   */
  export type CompaniesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * The data needed to update a Companies.
     * 
    **/
    data: XOR<CompaniesUpdateInput, CompaniesUncheckedUpdateInput>
    /**
     * Choose, which Companies to update.
     * 
    **/
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies updateMany
   */
  export type CompaniesUpdateManyArgs = {
    /**
     * The data used to update Companies.
     * 
    **/
    data: XOR<CompaniesUpdateManyMutationInput, CompaniesUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     * 
    **/
    where?: CompaniesWhereInput
  }


  /**
   * Companies upsert
   */
  export type CompaniesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * The filter to search for the Companies to update in case it exists.
     * 
    **/
    where: CompaniesWhereUniqueInput
    /**
     * In case the Companies found by the `where` argument doesn't exist, create a new Companies with this data.
     * 
    **/
    create: XOR<CompaniesCreateInput, CompaniesUncheckedCreateInput>
    /**
     * In case the Companies was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CompaniesUpdateInput, CompaniesUncheckedUpdateInput>
  }


  /**
   * Companies delete
   */
  export type CompaniesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    /**
     * Filter which Companies to delete.
     * 
    **/
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies deleteMany
   */
  export type CompaniesDeleteManyArgs = {
    /**
     * Filter which Companies to delete
     * 
    **/
    where?: CompaniesWhereInput
  }


  /**
   * Companies.contacts
   */
  export type Companies$contactsArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    where?: ContactsWhereInput
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    cursor?: ContactsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Companies.deals
   */
  export type Companies$dealsArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    where?: DealsWhereInput
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    cursor?: DealsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DealsScalarFieldEnum>
  }


  /**
   * Companies without action
   */
  export type CompaniesArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
  }



  /**
   * Model Contact_notes
   */


  export type AggregateContact_notes = {
    _count: Contact_notesCountAggregateOutputType | null
    _min: Contact_notesMinAggregateOutputType | null
    _max: Contact_notesMaxAggregateOutputType | null
  }

  export type Contact_notesMinAggregateOutputType = {
    id: string | null
    date: Date | null
    type: string | null
    text: string | null
    sales_id: string | null
    contact_id: string | null
    status: string | null
  }

  export type Contact_notesMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    type: string | null
    text: string | null
    sales_id: string | null
    contact_id: string | null
    status: string | null
  }

  export type Contact_notesCountAggregateOutputType = {
    id: number
    date: number
    type: number
    text: number
    sales_id: number
    contact_id: number
    status: number
    _all: number
  }


  export type Contact_notesMinAggregateInputType = {
    id?: true
    date?: true
    type?: true
    text?: true
    sales_id?: true
    contact_id?: true
    status?: true
  }

  export type Contact_notesMaxAggregateInputType = {
    id?: true
    date?: true
    type?: true
    text?: true
    sales_id?: true
    contact_id?: true
    status?: true
  }

  export type Contact_notesCountAggregateInputType = {
    id?: true
    date?: true
    type?: true
    text?: true
    sales_id?: true
    contact_id?: true
    status?: true
    _all?: true
  }

  export type Contact_notesAggregateArgs = {
    /**
     * Filter which Contact_notes to aggregate.
     * 
    **/
    where?: Contact_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contact_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Contact_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contact_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contact_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contact_notes
    **/
    _count?: true | Contact_notesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Contact_notesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Contact_notesMaxAggregateInputType
  }

  export type GetContact_notesAggregateType<T extends Contact_notesAggregateArgs> = {
        [P in keyof T & keyof AggregateContact_notes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact_notes[P]>
      : GetScalarType<T[P], AggregateContact_notes[P]>
  }




  export type Contact_notesGroupByArgs = {
    where?: Contact_notesWhereInput
    orderBy?: Enumerable<Contact_notesOrderByWithAggregationInput>
    by: Array<Contact_notesScalarFieldEnum>
    having?: Contact_notesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Contact_notesCountAggregateInputType | true
    _min?: Contact_notesMinAggregateInputType
    _max?: Contact_notesMaxAggregateInputType
  }


  export type Contact_notesGroupByOutputType = {
    id: string
    date: Date
    type: string
    text: string
    sales_id: string
    contact_id: string | null
    status: string
    _count: Contact_notesCountAggregateOutputType | null
    _min: Contact_notesMinAggregateOutputType | null
    _max: Contact_notesMaxAggregateOutputType | null
  }

  type GetContact_notesGroupByPayload<T extends Contact_notesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Contact_notesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Contact_notesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Contact_notesGroupByOutputType[P]>
            : GetScalarType<T[P], Contact_notesGroupByOutputType[P]>
        }
      >
    >


  export type Contact_notesSelect = {
    id?: boolean
    date?: boolean
    type?: boolean
    text?: boolean
    sales_id?: boolean
    contact_id?: boolean
    status?: boolean
    contacts?: boolean | ContactsArgs
    sales?: boolean | SalesArgs
  }


  export type Contact_notesInclude = {
    contacts?: boolean | ContactsArgs
    sales?: boolean | SalesArgs
  } 

  export type Contact_notesGetPayload<S extends boolean | null | undefined | Contact_notesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Contact_notes :
    S extends undefined ? never :
    S extends { include: any } & (Contact_notesArgs | Contact_notesFindManyArgs)
    ? Contact_notes  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'contacts' ? ContactsGetPayload<S['include'][P]> | null :
        P extends 'sales' ? SalesGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Contact_notesArgs | Contact_notesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'contacts' ? ContactsGetPayload<S['select'][P]> | null :
        P extends 'sales' ? SalesGetPayload<S['select'][P]> :  P extends keyof Contact_notes ? Contact_notes[P] : never
  } 
      : Contact_notes


  type Contact_notesCountArgs = Merge<
    Omit<Contact_notesFindManyArgs, 'select' | 'include'> & {
      select?: Contact_notesCountAggregateInputType | true
    }
  >

  export interface Contact_notesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Contact_notes that matches the filter.
     * @param {Contact_notesFindUniqueArgs} args - Arguments to find a Contact_notes
     * @example
     * // Get one Contact_notes
     * const contact_notes = await prisma.contact_notes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Contact_notesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Contact_notesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contact_notes'> extends True ? Prisma__Contact_notesClient<Contact_notesGetPayload<T>> : Prisma__Contact_notesClient<Contact_notesGetPayload<T> | null, null>

    /**
     * Find one Contact_notes that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Contact_notesFindUniqueOrThrowArgs} args - Arguments to find a Contact_notes
     * @example
     * // Get one Contact_notes
     * const contact_notes = await prisma.contact_notes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Contact_notesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Contact_notesFindUniqueOrThrowArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Find the first Contact_notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesFindFirstArgs} args - Arguments to find a Contact_notes
     * @example
     * // Get one Contact_notes
     * const contact_notes = await prisma.contact_notes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Contact_notesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Contact_notesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contact_notes'> extends True ? Prisma__Contact_notesClient<Contact_notesGetPayload<T>> : Prisma__Contact_notesClient<Contact_notesGetPayload<T> | null, null>

    /**
     * Find the first Contact_notes that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesFindFirstOrThrowArgs} args - Arguments to find a Contact_notes
     * @example
     * // Get one Contact_notes
     * const contact_notes = await prisma.contact_notes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Contact_notesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Contact_notesFindFirstOrThrowArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Find zero or more Contact_notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contact_notes
     * const contact_notes = await prisma.contact_notes.findMany()
     * 
     * // Get first 10 Contact_notes
     * const contact_notes = await prisma.contact_notes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contact_notesWithIdOnly = await prisma.contact_notes.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Contact_notesFindManyArgs>(
      args?: SelectSubset<T, Contact_notesFindManyArgs>
    ): PrismaPromise<Array<Contact_notesGetPayload<T>>>

    /**
     * Create a Contact_notes.
     * @param {Contact_notesCreateArgs} args - Arguments to create a Contact_notes.
     * @example
     * // Create one Contact_notes
     * const Contact_notes = await prisma.contact_notes.create({
     *   data: {
     *     // ... data to create a Contact_notes
     *   }
     * })
     * 
    **/
    create<T extends Contact_notesCreateArgs>(
      args: SelectSubset<T, Contact_notesCreateArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Create many Contact_notes.
     *     @param {Contact_notesCreateManyArgs} args - Arguments to create many Contact_notes.
     *     @example
     *     // Create many Contact_notes
     *     const contact_notes = await prisma.contact_notes.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Contact_notesCreateManyArgs>(
      args?: SelectSubset<T, Contact_notesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Contact_notes.
     * @param {Contact_notesDeleteArgs} args - Arguments to delete one Contact_notes.
     * @example
     * // Delete one Contact_notes
     * const Contact_notes = await prisma.contact_notes.delete({
     *   where: {
     *     // ... filter to delete one Contact_notes
     *   }
     * })
     * 
    **/
    delete<T extends Contact_notesDeleteArgs>(
      args: SelectSubset<T, Contact_notesDeleteArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Update one Contact_notes.
     * @param {Contact_notesUpdateArgs} args - Arguments to update one Contact_notes.
     * @example
     * // Update one Contact_notes
     * const contact_notes = await prisma.contact_notes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Contact_notesUpdateArgs>(
      args: SelectSubset<T, Contact_notesUpdateArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Delete zero or more Contact_notes.
     * @param {Contact_notesDeleteManyArgs} args - Arguments to filter Contact_notes to delete.
     * @example
     * // Delete a few Contact_notes
     * const { count } = await prisma.contact_notes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Contact_notesDeleteManyArgs>(
      args?: SelectSubset<T, Contact_notesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contact_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contact_notes
     * const contact_notes = await prisma.contact_notes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Contact_notesUpdateManyArgs>(
      args: SelectSubset<T, Contact_notesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact_notes.
     * @param {Contact_notesUpsertArgs} args - Arguments to update or create a Contact_notes.
     * @example
     * // Update or create a Contact_notes
     * const contact_notes = await prisma.contact_notes.upsert({
     *   create: {
     *     // ... data to create a Contact_notes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact_notes we want to update
     *   }
     * })
    **/
    upsert<T extends Contact_notesUpsertArgs>(
      args: SelectSubset<T, Contact_notesUpsertArgs>
    ): Prisma__Contact_notesClient<Contact_notesGetPayload<T>>

    /**
     * Count the number of Contact_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesCountArgs} args - Arguments to filter Contact_notes to count.
     * @example
     * // Count the number of Contact_notes
     * const count = await prisma.contact_notes.count({
     *   where: {
     *     // ... the filter for the Contact_notes we want to count
     *   }
     * })
    **/
    count<T extends Contact_notesCountArgs>(
      args?: Subset<T, Contact_notesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Contact_notesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Contact_notesAggregateArgs>(args: Subset<T, Contact_notesAggregateArgs>): PrismaPromise<GetContact_notesAggregateType<T>>

    /**
     * Group by Contact_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_notesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Contact_notesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Contact_notesGroupByArgs['orderBy'] }
        : { orderBy?: Contact_notesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Contact_notesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContact_notesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact_notes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Contact_notesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    contacts<T extends ContactsArgs= {}>(args?: Subset<T, ContactsArgs>): Prisma__ContactsClient<ContactsGetPayload<T> | Null>;

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Contact_notes base type for findUnique actions
   */
  export type Contact_notesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter, which Contact_notes to fetch.
     * 
    **/
    where: Contact_notesWhereUniqueInput
  }

  /**
   * Contact_notes findUnique
   */
  export interface Contact_notesFindUniqueArgs extends Contact_notesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contact_notes findUniqueOrThrow
   */
  export type Contact_notesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter, which Contact_notes to fetch.
     * 
    **/
    where: Contact_notesWhereUniqueInput
  }


  /**
   * Contact_notes base type for findFirst actions
   */
  export type Contact_notesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter, which Contact_notes to fetch.
     * 
    **/
    where?: Contact_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contact_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contact_notes.
     * 
    **/
    cursor?: Contact_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contact_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contact_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contact_notes.
     * 
    **/
    distinct?: Enumerable<Contact_notesScalarFieldEnum>
  }

  /**
   * Contact_notes findFirst
   */
  export interface Contact_notesFindFirstArgs extends Contact_notesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contact_notes findFirstOrThrow
   */
  export type Contact_notesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter, which Contact_notes to fetch.
     * 
    **/
    where?: Contact_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contact_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contact_notes.
     * 
    **/
    cursor?: Contact_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contact_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contact_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contact_notes.
     * 
    **/
    distinct?: Enumerable<Contact_notesScalarFieldEnum>
  }


  /**
   * Contact_notes findMany
   */
  export type Contact_notesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter, which Contact_notes to fetch.
     * 
    **/
    where?: Contact_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contact_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contact_notes.
     * 
    **/
    cursor?: Contact_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contact_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contact_notes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Contact_notesScalarFieldEnum>
  }


  /**
   * Contact_notes create
   */
  export type Contact_notesCreateArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * The data needed to create a Contact_notes.
     * 
    **/
    data: XOR<Contact_notesCreateInput, Contact_notesUncheckedCreateInput>
  }


  /**
   * Contact_notes createMany
   */
  export type Contact_notesCreateManyArgs = {
    /**
     * The data used to create many Contact_notes.
     * 
    **/
    data: Enumerable<Contact_notesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Contact_notes update
   */
  export type Contact_notesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * The data needed to update a Contact_notes.
     * 
    **/
    data: XOR<Contact_notesUpdateInput, Contact_notesUncheckedUpdateInput>
    /**
     * Choose, which Contact_notes to update.
     * 
    **/
    where: Contact_notesWhereUniqueInput
  }


  /**
   * Contact_notes updateMany
   */
  export type Contact_notesUpdateManyArgs = {
    /**
     * The data used to update Contact_notes.
     * 
    **/
    data: XOR<Contact_notesUpdateManyMutationInput, Contact_notesUncheckedUpdateManyInput>
    /**
     * Filter which Contact_notes to update
     * 
    **/
    where?: Contact_notesWhereInput
  }


  /**
   * Contact_notes upsert
   */
  export type Contact_notesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * The filter to search for the Contact_notes to update in case it exists.
     * 
    **/
    where: Contact_notesWhereUniqueInput
    /**
     * In case the Contact_notes found by the `where` argument doesn't exist, create a new Contact_notes with this data.
     * 
    **/
    create: XOR<Contact_notesCreateInput, Contact_notesUncheckedCreateInput>
    /**
     * In case the Contact_notes was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Contact_notesUpdateInput, Contact_notesUncheckedUpdateInput>
  }


  /**
   * Contact_notes delete
   */
  export type Contact_notesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    /**
     * Filter which Contact_notes to delete.
     * 
    **/
    where: Contact_notesWhereUniqueInput
  }


  /**
   * Contact_notes deleteMany
   */
  export type Contact_notesDeleteManyArgs = {
    /**
     * Filter which Contact_notes to delete
     * 
    **/
    where?: Contact_notesWhereInput
  }


  /**
   * Contact_notes without action
   */
  export type Contact_notesArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
  }



  /**
   * Model Contacts
   */


  export type AggregateContacts = {
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  export type ContactsMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    gender: string | null
    title: string | null
    email: string | null
    phone_number1: string | null
    phone_number2: string | null
    background: string | null
    acquisition: string | null
    first_seen: Date | null
    last_seen: Date | null
    has_newsletter: boolean | null
    status: string | null
    company_id: string | null
    sales_id: string | null
  }

  export type ContactsMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    gender: string | null
    title: string | null
    email: string | null
    phone_number1: string | null
    phone_number2: string | null
    background: string | null
    acquisition: string | null
    first_seen: Date | null
    last_seen: Date | null
    has_newsletter: boolean | null
    status: string | null
    company_id: string | null
    sales_id: string | null
  }

  export type ContactsCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    gender: number
    title: number
    email: number
    phone_number1: number
    phone_number2: number
    background: number
    acquisition: number
    avatar: number
    first_seen: number
    last_seen: number
    has_newsletter: number
    status: number
    company_id: number
    sales_id: number
    tags: number
    _all: number
  }


  export type ContactsMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    gender?: true
    title?: true
    email?: true
    phone_number1?: true
    phone_number2?: true
    background?: true
    acquisition?: true
    first_seen?: true
    last_seen?: true
    has_newsletter?: true
    status?: true
    company_id?: true
    sales_id?: true
  }

  export type ContactsMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    gender?: true
    title?: true
    email?: true
    phone_number1?: true
    phone_number2?: true
    background?: true
    acquisition?: true
    first_seen?: true
    last_seen?: true
    has_newsletter?: true
    status?: true
    company_id?: true
    sales_id?: true
  }

  export type ContactsCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    gender?: true
    title?: true
    email?: true
    phone_number1?: true
    phone_number2?: true
    background?: true
    acquisition?: true
    avatar?: true
    first_seen?: true
    last_seen?: true
    has_newsletter?: true
    status?: true
    company_id?: true
    sales_id?: true
    tags?: true
    _all?: true
  }

  export type ContactsAggregateArgs = {
    /**
     * Filter which Contacts to aggregate.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactsMaxAggregateInputType
  }

  export type GetContactsAggregateType<T extends ContactsAggregateArgs> = {
        [P in keyof T & keyof AggregateContacts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContacts[P]>
      : GetScalarType<T[P], AggregateContacts[P]>
  }




  export type ContactsGroupByArgs = {
    where?: ContactsWhereInput
    orderBy?: Enumerable<ContactsOrderByWithAggregationInput>
    by: Array<ContactsScalarFieldEnum>
    having?: ContactsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactsCountAggregateInputType | true
    _min?: ContactsMinAggregateInputType
    _max?: ContactsMaxAggregateInputType
  }


  export type ContactsGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    gender: string | null
    title: string | null
    email: string
    phone_number1: string | null
    phone_number2: string | null
    background: string | null
    acquisition: string | null
    avatar: JsonValue | null
    first_seen: Date
    last_seen: Date
    has_newsletter: boolean | null
    status: string
    company_id: string
    sales_id: string
    tags: JsonValue | null
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  type GetContactsGroupByPayload<T extends ContactsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContactsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactsGroupByOutputType[P]>
            : GetScalarType<T[P], ContactsGroupByOutputType[P]>
        }
      >
    >


  export type ContactsSelect = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    gender?: boolean
    title?: boolean
    email?: boolean
    phone_number1?: boolean
    phone_number2?: boolean
    background?: boolean
    acquisition?: boolean
    avatar?: boolean
    first_seen?: boolean
    last_seen?: boolean
    has_newsletter?: boolean
    status?: boolean
    company_id?: boolean
    sales_id?: boolean
    tags?: boolean
    contact_notes?: boolean | Contacts$contact_notesArgs
    companies?: boolean | CompaniesArgs
    sales?: boolean | SalesArgs
    tasks?: boolean | Contacts$tasksArgs
    _count?: boolean | ContactsCountOutputTypeArgs
  }


  export type ContactsInclude = {
    contact_notes?: boolean | Contacts$contact_notesArgs
    companies?: boolean | CompaniesArgs
    sales?: boolean | SalesArgs
    tasks?: boolean | Contacts$tasksArgs
    _count?: boolean | ContactsCountOutputTypeArgs
  } 

  export type ContactsGetPayload<S extends boolean | null | undefined | ContactsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Contacts :
    S extends undefined ? never :
    S extends { include: any } & (ContactsArgs | ContactsFindManyArgs)
    ? Contacts  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'contact_notes' ? Array < Contact_notesGetPayload<S['include'][P]>>  :
        P extends 'companies' ? CompaniesGetPayload<S['include'][P]> :
        P extends 'sales' ? SalesGetPayload<S['include'][P]> :
        P extends 'tasks' ? Array < TasksGetPayload<S['include'][P]>>  :
        P extends '_count' ? ContactsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ContactsArgs | ContactsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'contact_notes' ? Array < Contact_notesGetPayload<S['select'][P]>>  :
        P extends 'companies' ? CompaniesGetPayload<S['select'][P]> :
        P extends 'sales' ? SalesGetPayload<S['select'][P]> :
        P extends 'tasks' ? Array < TasksGetPayload<S['select'][P]>>  :
        P extends '_count' ? ContactsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Contacts ? Contacts[P] : never
  } 
      : Contacts


  type ContactsCountArgs = Merge<
    Omit<ContactsFindManyArgs, 'select' | 'include'> & {
      select?: ContactsCountAggregateInputType | true
    }
  >

  export interface ContactsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Contacts that matches the filter.
     * @param {ContactsFindUniqueArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContactsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContactsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contacts'> extends True ? Prisma__ContactsClient<ContactsGetPayload<T>> : Prisma__ContactsClient<ContactsGetPayload<T> | null, null>

    /**
     * Find one Contacts that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ContactsFindUniqueOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContactsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContactsFindUniqueOrThrowArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Find the first Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindFirstArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContactsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContactsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contacts'> extends True ? Prisma__ContactsClient<ContactsGetPayload<T>> : Prisma__ContactsClient<ContactsGetPayload<T> | null, null>

    /**
     * Find the first Contacts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindFirstOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContactsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContactsFindFirstOrThrowArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contacts.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contacts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactsWithIdOnly = await prisma.contacts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ContactsFindManyArgs>(
      args?: SelectSubset<T, ContactsFindManyArgs>
    ): PrismaPromise<Array<ContactsGetPayload<T>>>

    /**
     * Create a Contacts.
     * @param {ContactsCreateArgs} args - Arguments to create a Contacts.
     * @example
     * // Create one Contacts
     * const Contacts = await prisma.contacts.create({
     *   data: {
     *     // ... data to create a Contacts
     *   }
     * })
     * 
    **/
    create<T extends ContactsCreateArgs>(
      args: SelectSubset<T, ContactsCreateArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Create many Contacts.
     *     @param {ContactsCreateManyArgs} args - Arguments to create many Contacts.
     *     @example
     *     // Create many Contacts
     *     const contacts = await prisma.contacts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContactsCreateManyArgs>(
      args?: SelectSubset<T, ContactsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Contacts.
     * @param {ContactsDeleteArgs} args - Arguments to delete one Contacts.
     * @example
     * // Delete one Contacts
     * const Contacts = await prisma.contacts.delete({
     *   where: {
     *     // ... filter to delete one Contacts
     *   }
     * })
     * 
    **/
    delete<T extends ContactsDeleteArgs>(
      args: SelectSubset<T, ContactsDeleteArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Update one Contacts.
     * @param {ContactsUpdateArgs} args - Arguments to update one Contacts.
     * @example
     * // Update one Contacts
     * const contacts = await prisma.contacts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContactsUpdateArgs>(
      args: SelectSubset<T, ContactsUpdateArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Delete zero or more Contacts.
     * @param {ContactsDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contacts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContactsDeleteManyArgs>(
      args?: SelectSubset<T, ContactsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contacts = await prisma.contacts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContactsUpdateManyArgs>(
      args: SelectSubset<T, ContactsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contacts.
     * @param {ContactsUpsertArgs} args - Arguments to update or create a Contacts.
     * @example
     * // Update or create a Contacts
     * const contacts = await prisma.contacts.upsert({
     *   create: {
     *     // ... data to create a Contacts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contacts we want to update
     *   }
     * })
    **/
    upsert<T extends ContactsUpsertArgs>(
      args: SelectSubset<T, ContactsUpsertArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contacts.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactsCountArgs>(
      args?: Subset<T, ContactsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactsAggregateArgs>(args: Subset<T, ContactsAggregateArgs>): PrismaPromise<GetContactsAggregateType<T>>

    /**
     * Group by Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactsGroupByArgs['orderBy'] }
        : { orderBy?: ContactsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Contacts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContactsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    contact_notes<T extends Contacts$contact_notesArgs= {}>(args?: Subset<T, Contacts$contact_notesArgs>): PrismaPromise<Array<Contact_notesGetPayload<T>>| Null>;

    companies<T extends CompaniesArgs= {}>(args?: Subset<T, CompaniesArgs>): Prisma__CompaniesClient<CompaniesGetPayload<T> | Null>;

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    tasks<T extends Contacts$tasksArgs= {}>(args?: Subset<T, Contacts$tasksArgs>): PrismaPromise<Array<TasksGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Contacts base type for findUnique actions
   */
  export type ContactsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where: ContactsWhereUniqueInput
  }

  /**
   * Contacts findUnique
   */
  export interface ContactsFindUniqueArgs extends ContactsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contacts findUniqueOrThrow
   */
  export type ContactsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts base type for findFirst actions
   */
  export type ContactsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }

  /**
   * Contacts findFirst
   */
  export interface ContactsFindFirstArgs extends ContactsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contacts findFirstOrThrow
   */
  export type ContactsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Contacts findMany
   */
  export type ContactsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Contacts create
   */
  export type ContactsCreateArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The data needed to create a Contacts.
     * 
    **/
    data: XOR<ContactsCreateInput, ContactsUncheckedCreateInput>
  }


  /**
   * Contacts createMany
   */
  export type ContactsCreateManyArgs = {
    /**
     * The data used to create many Contacts.
     * 
    **/
    data: Enumerable<ContactsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Contacts update
   */
  export type ContactsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The data needed to update a Contacts.
     * 
    **/
    data: XOR<ContactsUpdateInput, ContactsUncheckedUpdateInput>
    /**
     * Choose, which Contacts to update.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts updateMany
   */
  export type ContactsUpdateManyArgs = {
    /**
     * The data used to update Contacts.
     * 
    **/
    data: XOR<ContactsUpdateManyMutationInput, ContactsUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     * 
    **/
    where?: ContactsWhereInput
  }


  /**
   * Contacts upsert
   */
  export type ContactsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The filter to search for the Contacts to update in case it exists.
     * 
    **/
    where: ContactsWhereUniqueInput
    /**
     * In case the Contacts found by the `where` argument doesn't exist, create a new Contacts with this data.
     * 
    **/
    create: XOR<ContactsCreateInput, ContactsUncheckedCreateInput>
    /**
     * In case the Contacts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContactsUpdateInput, ContactsUncheckedUpdateInput>
  }


  /**
   * Contacts delete
   */
  export type ContactsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter which Contacts to delete.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts deleteMany
   */
  export type ContactsDeleteManyArgs = {
    /**
     * Filter which Contacts to delete
     * 
    **/
    where?: ContactsWhereInput
  }


  /**
   * Contacts.contact_notes
   */
  export type Contacts$contact_notesArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    where?: Contact_notesWhereInput
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    cursor?: Contact_notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Contact_notesScalarFieldEnum>
  }


  /**
   * Contacts.tasks
   */
  export type Contacts$tasksArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    where?: TasksWhereInput
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    cursor?: TasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Contacts without action
   */
  export type ContactsArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
  }



  /**
   * Model Deal_notes
   */


  export type AggregateDeal_notes = {
    _count: Deal_notesCountAggregateOutputType | null
    _min: Deal_notesMinAggregateOutputType | null
    _max: Deal_notesMaxAggregateOutputType | null
  }

  export type Deal_notesMinAggregateOutputType = {
    id: string | null
    date: Date | null
    type: string | null
    deal_id: string | null
    sales_id: string | null
    text: string | null
  }

  export type Deal_notesMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    type: string | null
    deal_id: string | null
    sales_id: string | null
    text: string | null
  }

  export type Deal_notesCountAggregateOutputType = {
    id: number
    date: number
    type: number
    deal_id: number
    sales_id: number
    text: number
    _all: number
  }


  export type Deal_notesMinAggregateInputType = {
    id?: true
    date?: true
    type?: true
    deal_id?: true
    sales_id?: true
    text?: true
  }

  export type Deal_notesMaxAggregateInputType = {
    id?: true
    date?: true
    type?: true
    deal_id?: true
    sales_id?: true
    text?: true
  }

  export type Deal_notesCountAggregateInputType = {
    id?: true
    date?: true
    type?: true
    deal_id?: true
    sales_id?: true
    text?: true
    _all?: true
  }

  export type Deal_notesAggregateArgs = {
    /**
     * Filter which Deal_notes to aggregate.
     * 
    **/
    where?: Deal_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deal_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Deal_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deal_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deal_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deal_notes
    **/
    _count?: true | Deal_notesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Deal_notesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Deal_notesMaxAggregateInputType
  }

  export type GetDeal_notesAggregateType<T extends Deal_notesAggregateArgs> = {
        [P in keyof T & keyof AggregateDeal_notes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeal_notes[P]>
      : GetScalarType<T[P], AggregateDeal_notes[P]>
  }




  export type Deal_notesGroupByArgs = {
    where?: Deal_notesWhereInput
    orderBy?: Enumerable<Deal_notesOrderByWithAggregationInput>
    by: Array<Deal_notesScalarFieldEnum>
    having?: Deal_notesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Deal_notesCountAggregateInputType | true
    _min?: Deal_notesMinAggregateInputType
    _max?: Deal_notesMaxAggregateInputType
  }


  export type Deal_notesGroupByOutputType = {
    id: string
    date: Date
    type: string
    deal_id: string
    sales_id: string
    text: string
    _count: Deal_notesCountAggregateOutputType | null
    _min: Deal_notesMinAggregateOutputType | null
    _max: Deal_notesMaxAggregateOutputType | null
  }

  type GetDeal_notesGroupByPayload<T extends Deal_notesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Deal_notesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Deal_notesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Deal_notesGroupByOutputType[P]>
            : GetScalarType<T[P], Deal_notesGroupByOutputType[P]>
        }
      >
    >


  export type Deal_notesSelect = {
    id?: boolean
    date?: boolean
    type?: boolean
    deal_id?: boolean
    sales_id?: boolean
    text?: boolean
    deals?: boolean | DealsArgs
    sales?: boolean | SalesArgs
  }


  export type Deal_notesInclude = {
    deals?: boolean | DealsArgs
    sales?: boolean | SalesArgs
  } 

  export type Deal_notesGetPayload<S extends boolean | null | undefined | Deal_notesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Deal_notes :
    S extends undefined ? never :
    S extends { include: any } & (Deal_notesArgs | Deal_notesFindManyArgs)
    ? Deal_notes  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deals' ? DealsGetPayload<S['include'][P]> :
        P extends 'sales' ? SalesGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Deal_notesArgs | Deal_notesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deals' ? DealsGetPayload<S['select'][P]> :
        P extends 'sales' ? SalesGetPayload<S['select'][P]> :  P extends keyof Deal_notes ? Deal_notes[P] : never
  } 
      : Deal_notes


  type Deal_notesCountArgs = Merge<
    Omit<Deal_notesFindManyArgs, 'select' | 'include'> & {
      select?: Deal_notesCountAggregateInputType | true
    }
  >

  export interface Deal_notesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Deal_notes that matches the filter.
     * @param {Deal_notesFindUniqueArgs} args - Arguments to find a Deal_notes
     * @example
     * // Get one Deal_notes
     * const deal_notes = await prisma.deal_notes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Deal_notesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Deal_notesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Deal_notes'> extends True ? Prisma__Deal_notesClient<Deal_notesGetPayload<T>> : Prisma__Deal_notesClient<Deal_notesGetPayload<T> | null, null>

    /**
     * Find one Deal_notes that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Deal_notesFindUniqueOrThrowArgs} args - Arguments to find a Deal_notes
     * @example
     * // Get one Deal_notes
     * const deal_notes = await prisma.deal_notes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Deal_notesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Deal_notesFindUniqueOrThrowArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Find the first Deal_notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesFindFirstArgs} args - Arguments to find a Deal_notes
     * @example
     * // Get one Deal_notes
     * const deal_notes = await prisma.deal_notes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Deal_notesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Deal_notesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Deal_notes'> extends True ? Prisma__Deal_notesClient<Deal_notesGetPayload<T>> : Prisma__Deal_notesClient<Deal_notesGetPayload<T> | null, null>

    /**
     * Find the first Deal_notes that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesFindFirstOrThrowArgs} args - Arguments to find a Deal_notes
     * @example
     * // Get one Deal_notes
     * const deal_notes = await prisma.deal_notes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Deal_notesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Deal_notesFindFirstOrThrowArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Find zero or more Deal_notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deal_notes
     * const deal_notes = await prisma.deal_notes.findMany()
     * 
     * // Get first 10 Deal_notes
     * const deal_notes = await prisma.deal_notes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deal_notesWithIdOnly = await prisma.deal_notes.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Deal_notesFindManyArgs>(
      args?: SelectSubset<T, Deal_notesFindManyArgs>
    ): PrismaPromise<Array<Deal_notesGetPayload<T>>>

    /**
     * Create a Deal_notes.
     * @param {Deal_notesCreateArgs} args - Arguments to create a Deal_notes.
     * @example
     * // Create one Deal_notes
     * const Deal_notes = await prisma.deal_notes.create({
     *   data: {
     *     // ... data to create a Deal_notes
     *   }
     * })
     * 
    **/
    create<T extends Deal_notesCreateArgs>(
      args: SelectSubset<T, Deal_notesCreateArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Create many Deal_notes.
     *     @param {Deal_notesCreateManyArgs} args - Arguments to create many Deal_notes.
     *     @example
     *     // Create many Deal_notes
     *     const deal_notes = await prisma.deal_notes.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Deal_notesCreateManyArgs>(
      args?: SelectSubset<T, Deal_notesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Deal_notes.
     * @param {Deal_notesDeleteArgs} args - Arguments to delete one Deal_notes.
     * @example
     * // Delete one Deal_notes
     * const Deal_notes = await prisma.deal_notes.delete({
     *   where: {
     *     // ... filter to delete one Deal_notes
     *   }
     * })
     * 
    **/
    delete<T extends Deal_notesDeleteArgs>(
      args: SelectSubset<T, Deal_notesDeleteArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Update one Deal_notes.
     * @param {Deal_notesUpdateArgs} args - Arguments to update one Deal_notes.
     * @example
     * // Update one Deal_notes
     * const deal_notes = await prisma.deal_notes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Deal_notesUpdateArgs>(
      args: SelectSubset<T, Deal_notesUpdateArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Delete zero or more Deal_notes.
     * @param {Deal_notesDeleteManyArgs} args - Arguments to filter Deal_notes to delete.
     * @example
     * // Delete a few Deal_notes
     * const { count } = await prisma.deal_notes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Deal_notesDeleteManyArgs>(
      args?: SelectSubset<T, Deal_notesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deal_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deal_notes
     * const deal_notes = await prisma.deal_notes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Deal_notesUpdateManyArgs>(
      args: SelectSubset<T, Deal_notesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Deal_notes.
     * @param {Deal_notesUpsertArgs} args - Arguments to update or create a Deal_notes.
     * @example
     * // Update or create a Deal_notes
     * const deal_notes = await prisma.deal_notes.upsert({
     *   create: {
     *     // ... data to create a Deal_notes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deal_notes we want to update
     *   }
     * })
    **/
    upsert<T extends Deal_notesUpsertArgs>(
      args: SelectSubset<T, Deal_notesUpsertArgs>
    ): Prisma__Deal_notesClient<Deal_notesGetPayload<T>>

    /**
     * Count the number of Deal_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesCountArgs} args - Arguments to filter Deal_notes to count.
     * @example
     * // Count the number of Deal_notes
     * const count = await prisma.deal_notes.count({
     *   where: {
     *     // ... the filter for the Deal_notes we want to count
     *   }
     * })
    **/
    count<T extends Deal_notesCountArgs>(
      args?: Subset<T, Deal_notesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Deal_notesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deal_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Deal_notesAggregateArgs>(args: Subset<T, Deal_notesAggregateArgs>): PrismaPromise<GetDeal_notesAggregateType<T>>

    /**
     * Group by Deal_notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Deal_notesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Deal_notesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Deal_notesGroupByArgs['orderBy'] }
        : { orderBy?: Deal_notesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Deal_notesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeal_notesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Deal_notes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Deal_notesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    deals<T extends DealsArgs= {}>(args?: Subset<T, DealsArgs>): Prisma__DealsClient<DealsGetPayload<T> | Null>;

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Deal_notes base type for findUnique actions
   */
  export type Deal_notesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter, which Deal_notes to fetch.
     * 
    **/
    where: Deal_notesWhereUniqueInput
  }

  /**
   * Deal_notes findUnique
   */
  export interface Deal_notesFindUniqueArgs extends Deal_notesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Deal_notes findUniqueOrThrow
   */
  export type Deal_notesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter, which Deal_notes to fetch.
     * 
    **/
    where: Deal_notesWhereUniqueInput
  }


  /**
   * Deal_notes base type for findFirst actions
   */
  export type Deal_notesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter, which Deal_notes to fetch.
     * 
    **/
    where?: Deal_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deal_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deal_notes.
     * 
    **/
    cursor?: Deal_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deal_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deal_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deal_notes.
     * 
    **/
    distinct?: Enumerable<Deal_notesScalarFieldEnum>
  }

  /**
   * Deal_notes findFirst
   */
  export interface Deal_notesFindFirstArgs extends Deal_notesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Deal_notes findFirstOrThrow
   */
  export type Deal_notesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter, which Deal_notes to fetch.
     * 
    **/
    where?: Deal_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deal_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deal_notes.
     * 
    **/
    cursor?: Deal_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deal_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deal_notes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deal_notes.
     * 
    **/
    distinct?: Enumerable<Deal_notesScalarFieldEnum>
  }


  /**
   * Deal_notes findMany
   */
  export type Deal_notesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter, which Deal_notes to fetch.
     * 
    **/
    where?: Deal_notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deal_notes to fetch.
     * 
    **/
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deal_notes.
     * 
    **/
    cursor?: Deal_notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deal_notes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deal_notes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Deal_notesScalarFieldEnum>
  }


  /**
   * Deal_notes create
   */
  export type Deal_notesCreateArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * The data needed to create a Deal_notes.
     * 
    **/
    data: XOR<Deal_notesCreateInput, Deal_notesUncheckedCreateInput>
  }


  /**
   * Deal_notes createMany
   */
  export type Deal_notesCreateManyArgs = {
    /**
     * The data used to create many Deal_notes.
     * 
    **/
    data: Enumerable<Deal_notesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Deal_notes update
   */
  export type Deal_notesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * The data needed to update a Deal_notes.
     * 
    **/
    data: XOR<Deal_notesUpdateInput, Deal_notesUncheckedUpdateInput>
    /**
     * Choose, which Deal_notes to update.
     * 
    **/
    where: Deal_notesWhereUniqueInput
  }


  /**
   * Deal_notes updateMany
   */
  export type Deal_notesUpdateManyArgs = {
    /**
     * The data used to update Deal_notes.
     * 
    **/
    data: XOR<Deal_notesUpdateManyMutationInput, Deal_notesUncheckedUpdateManyInput>
    /**
     * Filter which Deal_notes to update
     * 
    **/
    where?: Deal_notesWhereInput
  }


  /**
   * Deal_notes upsert
   */
  export type Deal_notesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * The filter to search for the Deal_notes to update in case it exists.
     * 
    **/
    where: Deal_notesWhereUniqueInput
    /**
     * In case the Deal_notes found by the `where` argument doesn't exist, create a new Deal_notes with this data.
     * 
    **/
    create: XOR<Deal_notesCreateInput, Deal_notesUncheckedCreateInput>
    /**
     * In case the Deal_notes was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Deal_notesUpdateInput, Deal_notesUncheckedUpdateInput>
  }


  /**
   * Deal_notes delete
   */
  export type Deal_notesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    /**
     * Filter which Deal_notes to delete.
     * 
    **/
    where: Deal_notesWhereUniqueInput
  }


  /**
   * Deal_notes deleteMany
   */
  export type Deal_notesDeleteManyArgs = {
    /**
     * Filter which Deal_notes to delete
     * 
    **/
    where?: Deal_notesWhereInput
  }


  /**
   * Deal_notes without action
   */
  export type Deal_notesArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
  }



  /**
   * Model Deals
   */


  export type AggregateDeals = {
    _count: DealsCountAggregateOutputType | null
    _avg: DealsAvgAggregateOutputType | null
    _sum: DealsSumAggregateOutputType | null
    _min: DealsMinAggregateOutputType | null
    _max: DealsMaxAggregateOutputType | null
  }

  export type DealsAvgAggregateOutputType = {
    amount: number | null
    anindex: number | null
  }

  export type DealsSumAggregateOutputType = {
    amount: number | null
    anindex: number | null
  }

  export type DealsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    type: string | null
    stage: string | null
    description: string | null
    amount: number | null
    updated_at: Date | null
    start_at: Date | null
    company_id: string | null
    sales_id: string | null
    anindex: number | null
  }

  export type DealsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    type: string | null
    stage: string | null
    description: string | null
    amount: number | null
    updated_at: Date | null
    start_at: Date | null
    company_id: string | null
    sales_id: string | null
    anindex: number | null
  }

  export type DealsCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    contact_ids: number
    type: number
    stage: number
    description: number
    amount: number
    updated_at: number
    start_at: number
    company_id: number
    sales_id: number
    anindex: number
    _all: number
  }


  export type DealsAvgAggregateInputType = {
    amount?: true
    anindex?: true
  }

  export type DealsSumAggregateInputType = {
    amount?: true
    anindex?: true
  }

  export type DealsMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    type?: true
    stage?: true
    description?: true
    amount?: true
    updated_at?: true
    start_at?: true
    company_id?: true
    sales_id?: true
    anindex?: true
  }

  export type DealsMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    type?: true
    stage?: true
    description?: true
    amount?: true
    updated_at?: true
    start_at?: true
    company_id?: true
    sales_id?: true
    anindex?: true
  }

  export type DealsCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    contact_ids?: true
    type?: true
    stage?: true
    description?: true
    amount?: true
    updated_at?: true
    start_at?: true
    company_id?: true
    sales_id?: true
    anindex?: true
    _all?: true
  }

  export type DealsAggregateArgs = {
    /**
     * Filter which Deals to aggregate.
     * 
    **/
    where?: DealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     * 
    **/
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deals
    **/
    _count?: true | DealsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealsMaxAggregateInputType
  }

  export type GetDealsAggregateType<T extends DealsAggregateArgs> = {
        [P in keyof T & keyof AggregateDeals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeals[P]>
      : GetScalarType<T[P], AggregateDeals[P]>
  }




  export type DealsGroupByArgs = {
    where?: DealsWhereInput
    orderBy?: Enumerable<DealsOrderByWithAggregationInput>
    by: Array<DealsScalarFieldEnum>
    having?: DealsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealsCountAggregateInputType | true
    _avg?: DealsAvgAggregateInputType
    _sum?: DealsSumAggregateInputType
    _min?: DealsMinAggregateInputType
    _max?: DealsMaxAggregateInputType
  }


  export type DealsGroupByOutputType = {
    id: string
    created_at: Date
    name: string
    contact_ids: JsonValue | null
    type: string
    stage: string
    description: string | null
    amount: number
    updated_at: Date
    start_at: Date | null
    company_id: string
    sales_id: string
    anindex: number
    _count: DealsCountAggregateOutputType | null
    _avg: DealsAvgAggregateOutputType | null
    _sum: DealsSumAggregateOutputType | null
    _min: DealsMinAggregateOutputType | null
    _max: DealsMaxAggregateOutputType | null
  }

  type GetDealsGroupByPayload<T extends DealsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DealsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealsGroupByOutputType[P]>
            : GetScalarType<T[P], DealsGroupByOutputType[P]>
        }
      >
    >


  export type DealsSelect = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    contact_ids?: boolean
    type?: boolean
    stage?: boolean
    description?: boolean
    amount?: boolean
    updated_at?: boolean
    start_at?: boolean
    company_id?: boolean
    sales_id?: boolean
    anindex?: boolean
    deal_notes?: boolean | Deals$deal_notesArgs
    companies?: boolean | CompaniesArgs
    sales?: boolean | SalesArgs
    _count?: boolean | DealsCountOutputTypeArgs
  }


  export type DealsInclude = {
    deal_notes?: boolean | Deals$deal_notesArgs
    companies?: boolean | CompaniesArgs
    sales?: boolean | SalesArgs
    _count?: boolean | DealsCountOutputTypeArgs
  } 

  export type DealsGetPayload<S extends boolean | null | undefined | DealsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Deals :
    S extends undefined ? never :
    S extends { include: any } & (DealsArgs | DealsFindManyArgs)
    ? Deals  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deal_notes' ? Array < Deal_notesGetPayload<S['include'][P]>>  :
        P extends 'companies' ? CompaniesGetPayload<S['include'][P]> :
        P extends 'sales' ? SalesGetPayload<S['include'][P]> :
        P extends '_count' ? DealsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DealsArgs | DealsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deal_notes' ? Array < Deal_notesGetPayload<S['select'][P]>>  :
        P extends 'companies' ? CompaniesGetPayload<S['select'][P]> :
        P extends 'sales' ? SalesGetPayload<S['select'][P]> :
        P extends '_count' ? DealsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Deals ? Deals[P] : never
  } 
      : Deals


  type DealsCountArgs = Merge<
    Omit<DealsFindManyArgs, 'select' | 'include'> & {
      select?: DealsCountAggregateInputType | true
    }
  >

  export interface DealsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Deals that matches the filter.
     * @param {DealsFindUniqueArgs} args - Arguments to find a Deals
     * @example
     * // Get one Deals
     * const deals = await prisma.deals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DealsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DealsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Deals'> extends True ? Prisma__DealsClient<DealsGetPayload<T>> : Prisma__DealsClient<DealsGetPayload<T> | null, null>

    /**
     * Find one Deals that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DealsFindUniqueOrThrowArgs} args - Arguments to find a Deals
     * @example
     * // Get one Deals
     * const deals = await prisma.deals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DealsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DealsFindUniqueOrThrowArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Find the first Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsFindFirstArgs} args - Arguments to find a Deals
     * @example
     * // Get one Deals
     * const deals = await prisma.deals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DealsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DealsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Deals'> extends True ? Prisma__DealsClient<DealsGetPayload<T>> : Prisma__DealsClient<DealsGetPayload<T> | null, null>

    /**
     * Find the first Deals that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsFindFirstOrThrowArgs} args - Arguments to find a Deals
     * @example
     * // Get one Deals
     * const deals = await prisma.deals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DealsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DealsFindFirstOrThrowArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Find zero or more Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deals
     * const deals = await prisma.deals.findMany()
     * 
     * // Get first 10 Deals
     * const deals = await prisma.deals.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealsWithIdOnly = await prisma.deals.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DealsFindManyArgs>(
      args?: SelectSubset<T, DealsFindManyArgs>
    ): PrismaPromise<Array<DealsGetPayload<T>>>

    /**
     * Create a Deals.
     * @param {DealsCreateArgs} args - Arguments to create a Deals.
     * @example
     * // Create one Deals
     * const Deals = await prisma.deals.create({
     *   data: {
     *     // ... data to create a Deals
     *   }
     * })
     * 
    **/
    create<T extends DealsCreateArgs>(
      args: SelectSubset<T, DealsCreateArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Create many Deals.
     *     @param {DealsCreateManyArgs} args - Arguments to create many Deals.
     *     @example
     *     // Create many Deals
     *     const deals = await prisma.deals.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DealsCreateManyArgs>(
      args?: SelectSubset<T, DealsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Deals.
     * @param {DealsDeleteArgs} args - Arguments to delete one Deals.
     * @example
     * // Delete one Deals
     * const Deals = await prisma.deals.delete({
     *   where: {
     *     // ... filter to delete one Deals
     *   }
     * })
     * 
    **/
    delete<T extends DealsDeleteArgs>(
      args: SelectSubset<T, DealsDeleteArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Update one Deals.
     * @param {DealsUpdateArgs} args - Arguments to update one Deals.
     * @example
     * // Update one Deals
     * const deals = await prisma.deals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DealsUpdateArgs>(
      args: SelectSubset<T, DealsUpdateArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Delete zero or more Deals.
     * @param {DealsDeleteManyArgs} args - Arguments to filter Deals to delete.
     * @example
     * // Delete a few Deals
     * const { count } = await prisma.deals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DealsDeleteManyArgs>(
      args?: SelectSubset<T, DealsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deals
     * const deals = await prisma.deals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DealsUpdateManyArgs>(
      args: SelectSubset<T, DealsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Deals.
     * @param {DealsUpsertArgs} args - Arguments to update or create a Deals.
     * @example
     * // Update or create a Deals
     * const deals = await prisma.deals.upsert({
     *   create: {
     *     // ... data to create a Deals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deals we want to update
     *   }
     * })
    **/
    upsert<T extends DealsUpsertArgs>(
      args: SelectSubset<T, DealsUpsertArgs>
    ): Prisma__DealsClient<DealsGetPayload<T>>

    /**
     * Count the number of Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsCountArgs} args - Arguments to filter Deals to count.
     * @example
     * // Count the number of Deals
     * const count = await prisma.deals.count({
     *   where: {
     *     // ... the filter for the Deals we want to count
     *   }
     * })
    **/
    count<T extends DealsCountArgs>(
      args?: Subset<T, DealsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealsAggregateArgs>(args: Subset<T, DealsAggregateArgs>): PrismaPromise<GetDealsAggregateType<T>>

    /**
     * Group by Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealsGroupByArgs['orderBy'] }
        : { orderBy?: DealsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Deals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DealsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    deal_notes<T extends Deals$deal_notesArgs= {}>(args?: Subset<T, Deals$deal_notesArgs>): PrismaPromise<Array<Deal_notesGetPayload<T>>| Null>;

    companies<T extends CompaniesArgs= {}>(args?: Subset<T, CompaniesArgs>): Prisma__CompaniesClient<CompaniesGetPayload<T> | Null>;

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Deals base type for findUnique actions
   */
  export type DealsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter, which Deals to fetch.
     * 
    **/
    where: DealsWhereUniqueInput
  }

  /**
   * Deals findUnique
   */
  export interface DealsFindUniqueArgs extends DealsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Deals findUniqueOrThrow
   */
  export type DealsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter, which Deals to fetch.
     * 
    **/
    where: DealsWhereUniqueInput
  }


  /**
   * Deals base type for findFirst actions
   */
  export type DealsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter, which Deals to fetch.
     * 
    **/
    where?: DealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     * 
    **/
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     * 
    **/
    cursor?: DealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     * 
    **/
    distinct?: Enumerable<DealsScalarFieldEnum>
  }

  /**
   * Deals findFirst
   */
  export interface DealsFindFirstArgs extends DealsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Deals findFirstOrThrow
   */
  export type DealsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter, which Deals to fetch.
     * 
    **/
    where?: DealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     * 
    **/
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     * 
    **/
    cursor?: DealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     * 
    **/
    distinct?: Enumerable<DealsScalarFieldEnum>
  }


  /**
   * Deals findMany
   */
  export type DealsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter, which Deals to fetch.
     * 
    **/
    where?: DealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     * 
    **/
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deals.
     * 
    **/
    cursor?: DealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DealsScalarFieldEnum>
  }


  /**
   * Deals create
   */
  export type DealsCreateArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * The data needed to create a Deals.
     * 
    **/
    data: XOR<DealsCreateInput, DealsUncheckedCreateInput>
  }


  /**
   * Deals createMany
   */
  export type DealsCreateManyArgs = {
    /**
     * The data used to create many Deals.
     * 
    **/
    data: Enumerable<DealsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Deals update
   */
  export type DealsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * The data needed to update a Deals.
     * 
    **/
    data: XOR<DealsUpdateInput, DealsUncheckedUpdateInput>
    /**
     * Choose, which Deals to update.
     * 
    **/
    where: DealsWhereUniqueInput
  }


  /**
   * Deals updateMany
   */
  export type DealsUpdateManyArgs = {
    /**
     * The data used to update Deals.
     * 
    **/
    data: XOR<DealsUpdateManyMutationInput, DealsUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     * 
    **/
    where?: DealsWhereInput
  }


  /**
   * Deals upsert
   */
  export type DealsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * The filter to search for the Deals to update in case it exists.
     * 
    **/
    where: DealsWhereUniqueInput
    /**
     * In case the Deals found by the `where` argument doesn't exist, create a new Deals with this data.
     * 
    **/
    create: XOR<DealsCreateInput, DealsUncheckedCreateInput>
    /**
     * In case the Deals was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DealsUpdateInput, DealsUncheckedUpdateInput>
  }


  /**
   * Deals delete
   */
  export type DealsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    /**
     * Filter which Deals to delete.
     * 
    **/
    where: DealsWhereUniqueInput
  }


  /**
   * Deals deleteMany
   */
  export type DealsDeleteManyArgs = {
    /**
     * Filter which Deals to delete
     * 
    **/
    where?: DealsWhereInput
  }


  /**
   * Deals.deal_notes
   */
  export type Deals$deal_notesArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    where?: Deal_notesWhereInput
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    cursor?: Deal_notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Deal_notesScalarFieldEnum>
  }


  /**
   * Deals without action
   */
  export type DealsArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
  }



  /**
   * Model Sales
   */


  export type AggregateSales = {
    _count: SalesCountAggregateOutputType | null
    _min: SalesMinAggregateOutputType | null
    _max: SalesMaxAggregateOutputType | null
  }

  export type SalesMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
  }

  export type SalesMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
  }

  export type SalesCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    email: number
    _all: number
  }


  export type SalesMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
  }

  export type SalesMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
  }

  export type SalesCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
    _all?: true
  }

  export type SalesAggregateArgs = {
    /**
     * Filter which Sales to aggregate.
     * 
    **/
    where?: SalesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     * 
    **/
    orderBy?: Enumerable<SalesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SalesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SalesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalesMaxAggregateInputType
  }

  export type GetSalesAggregateType<T extends SalesAggregateArgs> = {
        [P in keyof T & keyof AggregateSales]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSales[P]>
      : GetScalarType<T[P], AggregateSales[P]>
  }




  export type SalesGroupByArgs = {
    where?: SalesWhereInput
    orderBy?: Enumerable<SalesOrderByWithAggregationInput>
    by: Array<SalesScalarFieldEnum>
    having?: SalesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalesCountAggregateInputType | true
    _min?: SalesMinAggregateInputType
    _max?: SalesMaxAggregateInputType
  }


  export type SalesGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    email: string
    _count: SalesCountAggregateOutputType | null
    _min: SalesMinAggregateOutputType | null
    _max: SalesMaxAggregateOutputType | null
  }

  type GetSalesGroupByPayload<T extends SalesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SalesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalesGroupByOutputType[P]>
            : GetScalarType<T[P], SalesGroupByOutputType[P]>
        }
      >
    >


  export type SalesSelect = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    companies?: boolean | Sales$companiesArgs
    contact_notes?: boolean | Sales$contact_notesArgs
    contacts?: boolean | Sales$contactsArgs
    deal_notes?: boolean | Sales$deal_notesArgs
    deals?: boolean | Sales$dealsArgs
    tasks?: boolean | Sales$tasksArgs
    _count?: boolean | SalesCountOutputTypeArgs
  }


  export type SalesInclude = {
    companies?: boolean | Sales$companiesArgs
    contact_notes?: boolean | Sales$contact_notesArgs
    contacts?: boolean | Sales$contactsArgs
    deal_notes?: boolean | Sales$deal_notesArgs
    deals?: boolean | Sales$dealsArgs
    tasks?: boolean | Sales$tasksArgs
    _count?: boolean | SalesCountOutputTypeArgs
  } 

  export type SalesGetPayload<S extends boolean | null | undefined | SalesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Sales :
    S extends undefined ? never :
    S extends { include: any } & (SalesArgs | SalesFindManyArgs)
    ? Sales  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'companies' ? Array < CompaniesGetPayload<S['include'][P]>>  :
        P extends 'contact_notes' ? Array < Contact_notesGetPayload<S['include'][P]>>  :
        P extends 'contacts' ? Array < ContactsGetPayload<S['include'][P]>>  :
        P extends 'deal_notes' ? Array < Deal_notesGetPayload<S['include'][P]>>  :
        P extends 'deals' ? Array < DealsGetPayload<S['include'][P]>>  :
        P extends 'tasks' ? Array < TasksGetPayload<S['include'][P]>>  :
        P extends '_count' ? SalesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (SalesArgs | SalesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'companies' ? Array < CompaniesGetPayload<S['select'][P]>>  :
        P extends 'contact_notes' ? Array < Contact_notesGetPayload<S['select'][P]>>  :
        P extends 'contacts' ? Array < ContactsGetPayload<S['select'][P]>>  :
        P extends 'deal_notes' ? Array < Deal_notesGetPayload<S['select'][P]>>  :
        P extends 'deals' ? Array < DealsGetPayload<S['select'][P]>>  :
        P extends 'tasks' ? Array < TasksGetPayload<S['select'][P]>>  :
        P extends '_count' ? SalesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Sales ? Sales[P] : never
  } 
      : Sales


  type SalesCountArgs = Merge<
    Omit<SalesFindManyArgs, 'select' | 'include'> & {
      select?: SalesCountAggregateInputType | true
    }
  >

  export interface SalesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Sales that matches the filter.
     * @param {SalesFindUniqueArgs} args - Arguments to find a Sales
     * @example
     * // Get one Sales
     * const sales = await prisma.sales.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SalesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SalesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Sales'> extends True ? Prisma__SalesClient<SalesGetPayload<T>> : Prisma__SalesClient<SalesGetPayload<T> | null, null>

    /**
     * Find one Sales that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SalesFindUniqueOrThrowArgs} args - Arguments to find a Sales
     * @example
     * // Get one Sales
     * const sales = await prisma.sales.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SalesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SalesFindUniqueOrThrowArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Find the first Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesFindFirstArgs} args - Arguments to find a Sales
     * @example
     * // Get one Sales
     * const sales = await prisma.sales.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SalesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SalesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Sales'> extends True ? Prisma__SalesClient<SalesGetPayload<T>> : Prisma__SalesClient<SalesGetPayload<T> | null, null>

    /**
     * Find the first Sales that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesFindFirstOrThrowArgs} args - Arguments to find a Sales
     * @example
     * // Get one Sales
     * const sales = await prisma.sales.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SalesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SalesFindFirstOrThrowArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sales.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sales.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salesWithIdOnly = await prisma.sales.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SalesFindManyArgs>(
      args?: SelectSubset<T, SalesFindManyArgs>
    ): PrismaPromise<Array<SalesGetPayload<T>>>

    /**
     * Create a Sales.
     * @param {SalesCreateArgs} args - Arguments to create a Sales.
     * @example
     * // Create one Sales
     * const Sales = await prisma.sales.create({
     *   data: {
     *     // ... data to create a Sales
     *   }
     * })
     * 
    **/
    create<T extends SalesCreateArgs>(
      args: SelectSubset<T, SalesCreateArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Create many Sales.
     *     @param {SalesCreateManyArgs} args - Arguments to create many Sales.
     *     @example
     *     // Create many Sales
     *     const sales = await prisma.sales.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SalesCreateManyArgs>(
      args?: SelectSubset<T, SalesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Sales.
     * @param {SalesDeleteArgs} args - Arguments to delete one Sales.
     * @example
     * // Delete one Sales
     * const Sales = await prisma.sales.delete({
     *   where: {
     *     // ... filter to delete one Sales
     *   }
     * })
     * 
    **/
    delete<T extends SalesDeleteArgs>(
      args: SelectSubset<T, SalesDeleteArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Update one Sales.
     * @param {SalesUpdateArgs} args - Arguments to update one Sales.
     * @example
     * // Update one Sales
     * const sales = await prisma.sales.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SalesUpdateArgs>(
      args: SelectSubset<T, SalesUpdateArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Delete zero or more Sales.
     * @param {SalesDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sales.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SalesDeleteManyArgs>(
      args?: SelectSubset<T, SalesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sales = await prisma.sales.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SalesUpdateManyArgs>(
      args: SelectSubset<T, SalesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Sales.
     * @param {SalesUpsertArgs} args - Arguments to update or create a Sales.
     * @example
     * // Update or create a Sales
     * const sales = await prisma.sales.upsert({
     *   create: {
     *     // ... data to create a Sales
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sales we want to update
     *   }
     * })
    **/
    upsert<T extends SalesUpsertArgs>(
      args: SelectSubset<T, SalesUpsertArgs>
    ): Prisma__SalesClient<SalesGetPayload<T>>

    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sales.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SalesCountArgs>(
      args?: Subset<T, SalesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SalesAggregateArgs>(args: Subset<T, SalesAggregateArgs>): PrismaPromise<GetSalesAggregateType<T>>

    /**
     * Group by Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SalesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalesGroupByArgs['orderBy'] }
        : { orderBy?: SalesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SalesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Sales.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SalesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    companies<T extends Sales$companiesArgs= {}>(args?: Subset<T, Sales$companiesArgs>): PrismaPromise<Array<CompaniesGetPayload<T>>| Null>;

    contact_notes<T extends Sales$contact_notesArgs= {}>(args?: Subset<T, Sales$contact_notesArgs>): PrismaPromise<Array<Contact_notesGetPayload<T>>| Null>;

    contacts<T extends Sales$contactsArgs= {}>(args?: Subset<T, Sales$contactsArgs>): PrismaPromise<Array<ContactsGetPayload<T>>| Null>;

    deal_notes<T extends Sales$deal_notesArgs= {}>(args?: Subset<T, Sales$deal_notesArgs>): PrismaPromise<Array<Deal_notesGetPayload<T>>| Null>;

    deals<T extends Sales$dealsArgs= {}>(args?: Subset<T, Sales$dealsArgs>): PrismaPromise<Array<DealsGetPayload<T>>| Null>;

    tasks<T extends Sales$tasksArgs= {}>(args?: Subset<T, Sales$tasksArgs>): PrismaPromise<Array<TasksGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Sales base type for findUnique actions
   */
  export type SalesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter, which Sales to fetch.
     * 
    **/
    where: SalesWhereUniqueInput
  }

  /**
   * Sales findUnique
   */
  export interface SalesFindUniqueArgs extends SalesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Sales findUniqueOrThrow
   */
  export type SalesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter, which Sales to fetch.
     * 
    **/
    where: SalesWhereUniqueInput
  }


  /**
   * Sales base type for findFirst actions
   */
  export type SalesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter, which Sales to fetch.
     * 
    **/
    where?: SalesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     * 
    **/
    orderBy?: Enumerable<SalesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     * 
    **/
    cursor?: SalesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     * 
    **/
    distinct?: Enumerable<SalesScalarFieldEnum>
  }

  /**
   * Sales findFirst
   */
  export interface SalesFindFirstArgs extends SalesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Sales findFirstOrThrow
   */
  export type SalesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter, which Sales to fetch.
     * 
    **/
    where?: SalesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     * 
    **/
    orderBy?: Enumerable<SalesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     * 
    **/
    cursor?: SalesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     * 
    **/
    distinct?: Enumerable<SalesScalarFieldEnum>
  }


  /**
   * Sales findMany
   */
  export type SalesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter, which Sales to fetch.
     * 
    **/
    where?: SalesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     * 
    **/
    orderBy?: Enumerable<SalesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     * 
    **/
    cursor?: SalesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SalesScalarFieldEnum>
  }


  /**
   * Sales create
   */
  export type SalesCreateArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * The data needed to create a Sales.
     * 
    **/
    data: XOR<SalesCreateInput, SalesUncheckedCreateInput>
  }


  /**
   * Sales createMany
   */
  export type SalesCreateManyArgs = {
    /**
     * The data used to create many Sales.
     * 
    **/
    data: Enumerable<SalesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Sales update
   */
  export type SalesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * The data needed to update a Sales.
     * 
    **/
    data: XOR<SalesUpdateInput, SalesUncheckedUpdateInput>
    /**
     * Choose, which Sales to update.
     * 
    **/
    where: SalesWhereUniqueInput
  }


  /**
   * Sales updateMany
   */
  export type SalesUpdateManyArgs = {
    /**
     * The data used to update Sales.
     * 
    **/
    data: XOR<SalesUpdateManyMutationInput, SalesUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     * 
    **/
    where?: SalesWhereInput
  }


  /**
   * Sales upsert
   */
  export type SalesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * The filter to search for the Sales to update in case it exists.
     * 
    **/
    where: SalesWhereUniqueInput
    /**
     * In case the Sales found by the `where` argument doesn't exist, create a new Sales with this data.
     * 
    **/
    create: XOR<SalesCreateInput, SalesUncheckedCreateInput>
    /**
     * In case the Sales was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SalesUpdateInput, SalesUncheckedUpdateInput>
  }


  /**
   * Sales delete
   */
  export type SalesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
    /**
     * Filter which Sales to delete.
     * 
    **/
    where: SalesWhereUniqueInput
  }


  /**
   * Sales deleteMany
   */
  export type SalesDeleteManyArgs = {
    /**
     * Filter which Sales to delete
     * 
    **/
    where?: SalesWhereInput
  }


  /**
   * Sales.companies
   */
  export type Sales$companiesArgs = {
    /**
     * Select specific fields to fetch from the Companies
     * 
    **/
    select?: CompaniesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompaniesInclude | null
    where?: CompaniesWhereInput
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
    cursor?: CompaniesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<CompaniesScalarFieldEnum>
  }


  /**
   * Sales.contact_notes
   */
  export type Sales$contact_notesArgs = {
    /**
     * Select specific fields to fetch from the Contact_notes
     * 
    **/
    select?: Contact_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Contact_notesInclude | null
    where?: Contact_notesWhereInput
    orderBy?: Enumerable<Contact_notesOrderByWithRelationInput>
    cursor?: Contact_notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Contact_notesScalarFieldEnum>
  }


  /**
   * Sales.contacts
   */
  export type Sales$contactsArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    where?: ContactsWhereInput
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    cursor?: ContactsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Sales.deal_notes
   */
  export type Sales$deal_notesArgs = {
    /**
     * Select specific fields to fetch from the Deal_notes
     * 
    **/
    select?: Deal_notesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Deal_notesInclude | null
    where?: Deal_notesWhereInput
    orderBy?: Enumerable<Deal_notesOrderByWithRelationInput>
    cursor?: Deal_notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Deal_notesScalarFieldEnum>
  }


  /**
   * Sales.deals
   */
  export type Sales$dealsArgs = {
    /**
     * Select specific fields to fetch from the Deals
     * 
    **/
    select?: DealsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DealsInclude | null
    where?: DealsWhereInput
    orderBy?: Enumerable<DealsOrderByWithRelationInput>
    cursor?: DealsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DealsScalarFieldEnum>
  }


  /**
   * Sales.tasks
   */
  export type Sales$tasksArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    where?: TasksWhereInput
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    cursor?: TasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Sales without action
   */
  export type SalesArgs = {
    /**
     * Select specific fields to fetch from the Sales
     * 
    **/
    select?: SalesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SalesInclude | null
  }



  /**
   * Model Tags
   */


  export type AggregateTags = {
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  export type TagsMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
  }

  export type TagsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
  }

  export type TagsCountAggregateOutputType = {
    id: number
    name: number
    color: number
    _all: number
  }


  export type TagsMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type TagsMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type TagsCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    _all?: true
  }

  export type TagsAggregateArgs = {
    /**
     * Filter which Tags to aggregate.
     * 
    **/
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsMaxAggregateInputType
  }

  export type GetTagsAggregateType<T extends TagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTags[P]>
      : GetScalarType<T[P], AggregateTags[P]>
  }




  export type TagsGroupByArgs = {
    where?: TagsWhereInput
    orderBy?: Enumerable<TagsOrderByWithAggregationInput>
    by: Array<TagsScalarFieldEnum>
    having?: TagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsCountAggregateInputType | true
    _min?: TagsMinAggregateInputType
    _max?: TagsMaxAggregateInputType
  }


  export type TagsGroupByOutputType = {
    id: string
    name: string
    color: string
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  type GetTagsGroupByPayload<T extends TagsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupByOutputType[P]>
        }
      >
    >


  export type TagsSelect = {
    id?: boolean
    name?: boolean
    color?: boolean
  }


  export type TagsGetPayload<S extends boolean | null | undefined | TagsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tags :
    S extends undefined ? never :
    S extends { include: any } & (TagsArgs | TagsFindManyArgs)
    ? Tags 
    : S extends { select: any } & (TagsArgs | TagsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Tags ? Tags[P] : never
  } 
      : Tags


  type TagsCountArgs = Merge<
    Omit<TagsFindManyArgs, 'select' | 'include'> & {
      select?: TagsCountAggregateInputType | true
    }
  >

  export interface TagsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Tags that matches the filter.
     * @param {TagsFindUniqueArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tags'> extends True ? Prisma__TagsClient<TagsGetPayload<T>> : Prisma__TagsClient<TagsGetPayload<T> | null, null>

    /**
     * Find one Tags that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TagsFindUniqueOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TagsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TagsFindUniqueOrThrowArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Find the first Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindFirstArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tags'> extends True ? Prisma__TagsClient<TagsGetPayload<T>> : Prisma__TagsClient<TagsGetPayload<T> | null, null>

    /**
     * Find the first Tags that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindFirstOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TagsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TagsFindFirstOrThrowArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tags.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tags.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagsWithIdOnly = await prisma.tags.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagsFindManyArgs>(
      args?: SelectSubset<T, TagsFindManyArgs>
    ): PrismaPromise<Array<TagsGetPayload<T>>>

    /**
     * Create a Tags.
     * @param {TagsCreateArgs} args - Arguments to create a Tags.
     * @example
     * // Create one Tags
     * const Tags = await prisma.tags.create({
     *   data: {
     *     // ... data to create a Tags
     *   }
     * })
     * 
    **/
    create<T extends TagsCreateArgs>(
      args: SelectSubset<T, TagsCreateArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Create many Tags.
     *     @param {TagsCreateManyArgs} args - Arguments to create many Tags.
     *     @example
     *     // Create many Tags
     *     const tags = await prisma.tags.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagsCreateManyArgs>(
      args?: SelectSubset<T, TagsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tags.
     * @param {TagsDeleteArgs} args - Arguments to delete one Tags.
     * @example
     * // Delete one Tags
     * const Tags = await prisma.tags.delete({
     *   where: {
     *     // ... filter to delete one Tags
     *   }
     * })
     * 
    **/
    delete<T extends TagsDeleteArgs>(
      args: SelectSubset<T, TagsDeleteArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Update one Tags.
     * @param {TagsUpdateArgs} args - Arguments to update one Tags.
     * @example
     * // Update one Tags
     * const tags = await prisma.tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagsUpdateArgs>(
      args: SelectSubset<T, TagsUpdateArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Delete zero or more Tags.
     * @param {TagsDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagsDeleteManyArgs>(
      args?: SelectSubset<T, TagsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagsUpdateManyArgs>(
      args: SelectSubset<T, TagsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tags.
     * @param {TagsUpsertArgs} args - Arguments to update or create a Tags.
     * @example
     * // Update or create a Tags
     * const tags = await prisma.tags.upsert({
     *   create: {
     *     // ... data to create a Tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tags we want to update
     *   }
     * })
    **/
    upsert<T extends TagsUpsertArgs>(
      args: SelectSubset<T, TagsUpsertArgs>
    ): Prisma__TagsClient<TagsGetPayload<T>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tags.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagsCountArgs>(
      args?: Subset<T, TagsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagsAggregateArgs>(args: Subset<T, TagsAggregateArgs>): PrismaPromise<GetTagsAggregateType<T>>

    /**
     * Group by Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagsGroupByArgs['orderBy'] }
        : { orderBy?: TagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tags base type for findUnique actions
   */
  export type TagsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where: TagsWhereUniqueInput
  }

  /**
   * Tags findUnique
   */
  export interface TagsFindUniqueArgs extends TagsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tags findUniqueOrThrow
   */
  export type TagsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where: TagsWhereUniqueInput
  }


  /**
   * Tags base type for findFirst actions
   */
  export type TagsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     * 
    **/
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     * 
    **/
    distinct?: Enumerable<TagsScalarFieldEnum>
  }

  /**
   * Tags findFirst
   */
  export interface TagsFindFirstArgs extends TagsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tags findFirstOrThrow
   */
  export type TagsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     * 
    **/
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     * 
    **/
    distinct?: Enumerable<TagsScalarFieldEnum>
  }


  /**
   * Tags findMany
   */
  export type TagsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     * 
    **/
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TagsScalarFieldEnum>
  }


  /**
   * Tags create
   */
  export type TagsCreateArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * The data needed to create a Tags.
     * 
    **/
    data: XOR<TagsCreateInput, TagsUncheckedCreateInput>
  }


  /**
   * Tags createMany
   */
  export type TagsCreateManyArgs = {
    /**
     * The data used to create many Tags.
     * 
    **/
    data: Enumerable<TagsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tags update
   */
  export type TagsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * The data needed to update a Tags.
     * 
    **/
    data: XOR<TagsUpdateInput, TagsUncheckedUpdateInput>
    /**
     * Choose, which Tags to update.
     * 
    **/
    where: TagsWhereUniqueInput
  }


  /**
   * Tags updateMany
   */
  export type TagsUpdateManyArgs = {
    /**
     * The data used to update Tags.
     * 
    **/
    data: XOR<TagsUpdateManyMutationInput, TagsUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     * 
    **/
    where?: TagsWhereInput
  }


  /**
   * Tags upsert
   */
  export type TagsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * The filter to search for the Tags to update in case it exists.
     * 
    **/
    where: TagsWhereUniqueInput
    /**
     * In case the Tags found by the `where` argument doesn't exist, create a new Tags with this data.
     * 
    **/
    create: XOR<TagsCreateInput, TagsUncheckedCreateInput>
    /**
     * In case the Tags was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TagsUpdateInput, TagsUncheckedUpdateInput>
  }


  /**
   * Tags delete
   */
  export type TagsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
    /**
     * Filter which Tags to delete.
     * 
    **/
    where: TagsWhereUniqueInput
  }


  /**
   * Tags deleteMany
   */
  export type TagsDeleteManyArgs = {
    /**
     * Filter which Tags to delete
     * 
    **/
    where?: TagsWhereInput
  }


  /**
   * Tags without action
   */
  export type TagsArgs = {
    /**
     * Select specific fields to fetch from the Tags
     * 
    **/
    select?: TagsSelect | null
  }



  /**
   * Model Tasks
   */


  export type AggregateTasks = {
    _count: TasksCountAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  export type TasksMinAggregateOutputType = {
    id: string | null
    due_date: Date | null
    text: string | null
    contact_id: string | null
    sales_id: string | null
    type: string | null
  }

  export type TasksMaxAggregateOutputType = {
    id: string | null
    due_date: Date | null
    text: string | null
    contact_id: string | null
    sales_id: string | null
    type: string | null
  }

  export type TasksCountAggregateOutputType = {
    id: number
    due_date: number
    text: number
    contact_id: number
    sales_id: number
    type: number
    _all: number
  }


  export type TasksMinAggregateInputType = {
    id?: true
    due_date?: true
    text?: true
    contact_id?: true
    sales_id?: true
    type?: true
  }

  export type TasksMaxAggregateInputType = {
    id?: true
    due_date?: true
    text?: true
    contact_id?: true
    sales_id?: true
    type?: true
  }

  export type TasksCountAggregateInputType = {
    id?: true
    due_date?: true
    text?: true
    contact_id?: true
    sales_id?: true
    type?: true
    _all?: true
  }

  export type TasksAggregateArgs = {
    /**
     * Filter which Tasks to aggregate.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TasksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TasksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TasksMaxAggregateInputType
  }

  export type GetTasksAggregateType<T extends TasksAggregateArgs> = {
        [P in keyof T & keyof AggregateTasks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTasks[P]>
      : GetScalarType<T[P], AggregateTasks[P]>
  }




  export type TasksGroupByArgs = {
    where?: TasksWhereInput
    orderBy?: Enumerable<TasksOrderByWithAggregationInput>
    by: Array<TasksScalarFieldEnum>
    having?: TasksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TasksCountAggregateInputType | true
    _min?: TasksMinAggregateInputType
    _max?: TasksMaxAggregateInputType
  }


  export type TasksGroupByOutputType = {
    id: string
    due_date: Date | null
    text: string | null
    contact_id: string | null
    sales_id: string | null
    type: string | null
    _count: TasksCountAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  type GetTasksGroupByPayload<T extends TasksGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TasksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TasksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TasksGroupByOutputType[P]>
            : GetScalarType<T[P], TasksGroupByOutputType[P]>
        }
      >
    >


  export type TasksSelect = {
    id?: boolean
    due_date?: boolean
    text?: boolean
    contact_id?: boolean
    sales_id?: boolean
    type?: boolean
    contacts?: boolean | ContactsArgs
    sales?: boolean | SalesArgs
  }


  export type TasksInclude = {
    contacts?: boolean | ContactsArgs
    sales?: boolean | SalesArgs
  } 

  export type TasksGetPayload<S extends boolean | null | undefined | TasksArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tasks :
    S extends undefined ? never :
    S extends { include: any } & (TasksArgs | TasksFindManyArgs)
    ? Tasks  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'contacts' ? ContactsGetPayload<S['include'][P]> | null :
        P extends 'sales' ? SalesGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (TasksArgs | TasksFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'contacts' ? ContactsGetPayload<S['select'][P]> | null :
        P extends 'sales' ? SalesGetPayload<S['select'][P]> | null :  P extends keyof Tasks ? Tasks[P] : never
  } 
      : Tasks


  type TasksCountArgs = Merge<
    Omit<TasksFindManyArgs, 'select' | 'include'> & {
      select?: TasksCountAggregateInputType | true
    }
  >

  export interface TasksDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Tasks that matches the filter.
     * @param {TasksFindUniqueArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TasksFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TasksFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tasks'> extends True ? Prisma__TasksClient<TasksGetPayload<T>> : Prisma__TasksClient<TasksGetPayload<T> | null, null>

    /**
     * Find one Tasks that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TasksFindUniqueOrThrowArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TasksFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TasksFindUniqueOrThrowArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Find the first Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksFindFirstArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TasksFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TasksFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tasks'> extends True ? Prisma__TasksClient<TasksGetPayload<T>> : Prisma__TasksClient<TasksGetPayload<T> | null, null>

    /**
     * Find the first Tasks that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksFindFirstOrThrowArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TasksFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TasksFindFirstOrThrowArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.tasks.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.tasks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tasksWithIdOnly = await prisma.tasks.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TasksFindManyArgs>(
      args?: SelectSubset<T, TasksFindManyArgs>
    ): PrismaPromise<Array<TasksGetPayload<T>>>

    /**
     * Create a Tasks.
     * @param {TasksCreateArgs} args - Arguments to create a Tasks.
     * @example
     * // Create one Tasks
     * const Tasks = await prisma.tasks.create({
     *   data: {
     *     // ... data to create a Tasks
     *   }
     * })
     * 
    **/
    create<T extends TasksCreateArgs>(
      args: SelectSubset<T, TasksCreateArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Create many Tasks.
     *     @param {TasksCreateManyArgs} args - Arguments to create many Tasks.
     *     @example
     *     // Create many Tasks
     *     const tasks = await prisma.tasks.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TasksCreateManyArgs>(
      args?: SelectSubset<T, TasksCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tasks.
     * @param {TasksDeleteArgs} args - Arguments to delete one Tasks.
     * @example
     * // Delete one Tasks
     * const Tasks = await prisma.tasks.delete({
     *   where: {
     *     // ... filter to delete one Tasks
     *   }
     * })
     * 
    **/
    delete<T extends TasksDeleteArgs>(
      args: SelectSubset<T, TasksDeleteArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Update one Tasks.
     * @param {TasksUpdateArgs} args - Arguments to update one Tasks.
     * @example
     * // Update one Tasks
     * const tasks = await prisma.tasks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TasksUpdateArgs>(
      args: SelectSubset<T, TasksUpdateArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Delete zero or more Tasks.
     * @param {TasksDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.tasks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TasksDeleteManyArgs>(
      args?: SelectSubset<T, TasksDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const tasks = await prisma.tasks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TasksUpdateManyArgs>(
      args: SelectSubset<T, TasksUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tasks.
     * @param {TasksUpsertArgs} args - Arguments to update or create a Tasks.
     * @example
     * // Update or create a Tasks
     * const tasks = await prisma.tasks.upsert({
     *   create: {
     *     // ... data to create a Tasks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tasks we want to update
     *   }
     * })
    **/
    upsert<T extends TasksUpsertArgs>(
      args: SelectSubset<T, TasksUpsertArgs>
    ): Prisma__TasksClient<TasksGetPayload<T>>

    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.tasks.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TasksCountArgs>(
      args?: Subset<T, TasksCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TasksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TasksAggregateArgs>(args: Subset<T, TasksAggregateArgs>): PrismaPromise<GetTasksAggregateType<T>>

    /**
     * Group by Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TasksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TasksGroupByArgs['orderBy'] }
        : { orderBy?: TasksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TasksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTasksGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tasks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TasksClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    contacts<T extends ContactsArgs= {}>(args?: Subset<T, ContactsArgs>): Prisma__ContactsClient<ContactsGetPayload<T> | Null>;

    sales<T extends SalesArgs= {}>(args?: Subset<T, SalesArgs>): Prisma__SalesClient<SalesGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tasks base type for findUnique actions
   */
  export type TasksFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where: TasksWhereUniqueInput
  }

  /**
   * Tasks findUnique
   */
  export interface TasksFindUniqueArgs extends TasksFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tasks findUniqueOrThrow
   */
  export type TasksFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks base type for findFirst actions
   */
  export type TasksFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     * 
    **/
    distinct?: Enumerable<TasksScalarFieldEnum>
  }

  /**
   * Tasks findFirst
   */
  export interface TasksFindFirstArgs extends TasksFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tasks findFirstOrThrow
   */
  export type TasksFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     * 
    **/
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Tasks findMany
   */
  export type TasksFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Tasks create
   */
  export type TasksCreateArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The data needed to create a Tasks.
     * 
    **/
    data: XOR<TasksCreateInput, TasksUncheckedCreateInput>
  }


  /**
   * Tasks createMany
   */
  export type TasksCreateManyArgs = {
    /**
     * The data used to create many Tasks.
     * 
    **/
    data: Enumerable<TasksCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tasks update
   */
  export type TasksUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The data needed to update a Tasks.
     * 
    **/
    data: XOR<TasksUpdateInput, TasksUncheckedUpdateInput>
    /**
     * Choose, which Tasks to update.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks updateMany
   */
  export type TasksUpdateManyArgs = {
    /**
     * The data used to update Tasks.
     * 
    **/
    data: XOR<TasksUpdateManyMutationInput, TasksUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     * 
    **/
    where?: TasksWhereInput
  }


  /**
   * Tasks upsert
   */
  export type TasksUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The filter to search for the Tasks to update in case it exists.
     * 
    **/
    where: TasksWhereUniqueInput
    /**
     * In case the Tasks found by the `where` argument doesn't exist, create a new Tasks with this data.
     * 
    **/
    create: XOR<TasksCreateInput, TasksUncheckedCreateInput>
    /**
     * In case the Tasks was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TasksUpdateInput, TasksUncheckedUpdateInput>
  }


  /**
   * Tasks delete
   */
  export type TasksDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter which Tasks to delete.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks deleteMany
   */
  export type TasksDeleteManyArgs = {
    /**
     * Filter which Tasks to delete
     * 
    **/
    where?: TasksWhereInput
  }


  /**
   * Tasks without action
   */
  export type TasksArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CompaniesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logo: 'logo',
    sector: 'sector',
    size: 'size',
    linked_in: 'linked_in',
    website: 'website',
    phone_number: 'phone_number',
    address: 'address',
    zipcode: 'zipcode',
    city: 'city',
    state_abbr: 'state_abbr',
    sales_id: 'sales_id',
    created_at: 'created_at'
  };

  export type CompaniesScalarFieldEnum = (typeof CompaniesScalarFieldEnum)[keyof typeof CompaniesScalarFieldEnum]


  export const Contact_notesScalarFieldEnum: {
    id: 'id',
    date: 'date',
    type: 'type',
    text: 'text',
    sales_id: 'sales_id',
    contact_id: 'contact_id',
    status: 'status'
  };

  export type Contact_notesScalarFieldEnum = (typeof Contact_notesScalarFieldEnum)[keyof typeof Contact_notesScalarFieldEnum]


  export const ContactsScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    gender: 'gender',
    title: 'title',
    email: 'email',
    phone_number1: 'phone_number1',
    phone_number2: 'phone_number2',
    background: 'background',
    acquisition: 'acquisition',
    avatar: 'avatar',
    first_seen: 'first_seen',
    last_seen: 'last_seen',
    has_newsletter: 'has_newsletter',
    status: 'status',
    company_id: 'company_id',
    sales_id: 'sales_id',
    tags: 'tags'
  };

  export type ContactsScalarFieldEnum = (typeof ContactsScalarFieldEnum)[keyof typeof ContactsScalarFieldEnum]


  export const Deal_notesScalarFieldEnum: {
    id: 'id',
    date: 'date',
    type: 'type',
    deal_id: 'deal_id',
    sales_id: 'sales_id',
    text: 'text'
  };

  export type Deal_notesScalarFieldEnum = (typeof Deal_notesScalarFieldEnum)[keyof typeof Deal_notesScalarFieldEnum]


  export const DealsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    contact_ids: 'contact_ids',
    type: 'type',
    stage: 'stage',
    description: 'description',
    amount: 'amount',
    updated_at: 'updated_at',
    start_at: 'start_at',
    company_id: 'company_id',
    sales_id: 'sales_id',
    anindex: 'anindex'
  };

  export type DealsScalarFieldEnum = (typeof DealsScalarFieldEnum)[keyof typeof DealsScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SalesScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email'
  };

  export type SalesScalarFieldEnum = (typeof SalesScalarFieldEnum)[keyof typeof SalesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TagsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color'
  };

  export type TagsScalarFieldEnum = (typeof TagsScalarFieldEnum)[keyof typeof TagsScalarFieldEnum]


  export const TasksScalarFieldEnum: {
    id: 'id',
    due_date: 'due_date',
    text: 'text',
    contact_id: 'contact_id',
    sales_id: 'sales_id',
    type: 'type'
  };

  export type TasksScalarFieldEnum = (typeof TasksScalarFieldEnum)[keyof typeof TasksScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type CompaniesWhereInput = {
    AND?: Enumerable<CompaniesWhereInput>
    OR?: Enumerable<CompaniesWhereInput>
    NOT?: Enumerable<CompaniesWhereInput>
    id?: UuidFilter | string
    name?: StringFilter | string
    logo?: JsonNullableFilter
    sector?: StringFilter | string
    size?: IntFilter | number
    linked_in?: StringFilter | string
    website?: StringFilter | string
    phone_number?: StringFilter | string
    address?: StringFilter | string
    zipcode?: StringFilter | string
    city?: StringFilter | string
    state_abbr?: StringFilter | string
    sales_id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    sales?: XOR<SalesRelationFilter, SalesWhereInput>
    contacts?: ContactsListRelationFilter
    deals?: DealsListRelationFilter
  }

  export type CompaniesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    sector?: SortOrder
    size?: SortOrder
    linked_in?: SortOrder
    website?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    zipcode?: SortOrder
    city?: SortOrder
    state_abbr?: SortOrder
    sales_id?: SortOrder
    created_at?: SortOrder
    sales?: SalesOrderByWithRelationInput
    contacts?: ContactsOrderByRelationAggregateInput
    deals?: DealsOrderByRelationAggregateInput
  }

  export type CompaniesWhereUniqueInput = {
    id?: string
  }

  export type CompaniesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    sector?: SortOrder
    size?: SortOrder
    linked_in?: SortOrder
    website?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    zipcode?: SortOrder
    city?: SortOrder
    state_abbr?: SortOrder
    sales_id?: SortOrder
    created_at?: SortOrder
    _count?: CompaniesCountOrderByAggregateInput
    _avg?: CompaniesAvgOrderByAggregateInput
    _max?: CompaniesMaxOrderByAggregateInput
    _min?: CompaniesMinOrderByAggregateInput
    _sum?: CompaniesSumOrderByAggregateInput
  }

  export type CompaniesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    OR?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    logo?: JsonNullableWithAggregatesFilter
    sector?: StringWithAggregatesFilter | string
    size?: IntWithAggregatesFilter | number
    linked_in?: StringWithAggregatesFilter | string
    website?: StringWithAggregatesFilter | string
    phone_number?: StringWithAggregatesFilter | string
    address?: StringWithAggregatesFilter | string
    zipcode?: StringWithAggregatesFilter | string
    city?: StringWithAggregatesFilter | string
    state_abbr?: StringWithAggregatesFilter | string
    sales_id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type Contact_notesWhereInput = {
    AND?: Enumerable<Contact_notesWhereInput>
    OR?: Enumerable<Contact_notesWhereInput>
    NOT?: Enumerable<Contact_notesWhereInput>
    id?: UuidFilter | string
    date?: DateTimeFilter | Date | string
    type?: StringFilter | string
    text?: StringFilter | string
    sales_id?: UuidFilter | string
    contact_id?: UuidNullableFilter | string | null
    status?: StringFilter | string
    contacts?: XOR<ContactsRelationFilter, ContactsWhereInput> | null
    sales?: XOR<SalesRelationFilter, SalesWhereInput>
  }

  export type Contact_notesOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    text?: SortOrder
    sales_id?: SortOrder
    contact_id?: SortOrder
    status?: SortOrder
    contacts?: ContactsOrderByWithRelationInput
    sales?: SalesOrderByWithRelationInput
  }

  export type Contact_notesWhereUniqueInput = {
    id?: string
  }

  export type Contact_notesOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    text?: SortOrder
    sales_id?: SortOrder
    contact_id?: SortOrder
    status?: SortOrder
    _count?: Contact_notesCountOrderByAggregateInput
    _max?: Contact_notesMaxOrderByAggregateInput
    _min?: Contact_notesMinOrderByAggregateInput
  }

  export type Contact_notesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Contact_notesScalarWhereWithAggregatesInput>
    OR?: Enumerable<Contact_notesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Contact_notesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    type?: StringWithAggregatesFilter | string
    text?: StringWithAggregatesFilter | string
    sales_id?: UuidWithAggregatesFilter | string
    contact_id?: UuidNullableWithAggregatesFilter | string | null
    status?: StringWithAggregatesFilter | string
  }

  export type ContactsWhereInput = {
    AND?: Enumerable<ContactsWhereInput>
    OR?: Enumerable<ContactsWhereInput>
    NOT?: Enumerable<ContactsWhereInput>
    id?: UuidFilter | string
    first_name?: StringFilter | string
    last_name?: StringFilter | string
    gender?: StringNullableFilter | string | null
    title?: StringNullableFilter | string | null
    email?: StringFilter | string
    phone_number1?: StringNullableFilter | string | null
    phone_number2?: StringNullableFilter | string | null
    background?: StringNullableFilter | string | null
    acquisition?: StringNullableFilter | string | null
    avatar?: JsonNullableFilter
    first_seen?: DateTimeFilter | Date | string
    last_seen?: DateTimeFilter | Date | string
    has_newsletter?: BoolNullableFilter | boolean | null
    status?: StringFilter | string
    company_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    tags?: JsonNullableFilter
    contact_notes?: Contact_notesListRelationFilter
    companies?: XOR<CompaniesRelationFilter, CompaniesWhereInput>
    sales?: XOR<SalesRelationFilter, SalesWhereInput>
    tasks?: TasksListRelationFilter
  }

  export type ContactsOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    gender?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone_number1?: SortOrder
    phone_number2?: SortOrder
    background?: SortOrder
    acquisition?: SortOrder
    avatar?: SortOrder
    first_seen?: SortOrder
    last_seen?: SortOrder
    has_newsletter?: SortOrder
    status?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    tags?: SortOrder
    contact_notes?: Contact_notesOrderByRelationAggregateInput
    companies?: CompaniesOrderByWithRelationInput
    sales?: SalesOrderByWithRelationInput
    tasks?: TasksOrderByRelationAggregateInput
  }

  export type ContactsWhereUniqueInput = {
    id?: string
  }

  export type ContactsOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    gender?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone_number1?: SortOrder
    phone_number2?: SortOrder
    background?: SortOrder
    acquisition?: SortOrder
    avatar?: SortOrder
    first_seen?: SortOrder
    last_seen?: SortOrder
    has_newsletter?: SortOrder
    status?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    tags?: SortOrder
    _count?: ContactsCountOrderByAggregateInput
    _max?: ContactsMaxOrderByAggregateInput
    _min?: ContactsMinOrderByAggregateInput
  }

  export type ContactsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    first_name?: StringWithAggregatesFilter | string
    last_name?: StringWithAggregatesFilter | string
    gender?: StringNullableWithAggregatesFilter | string | null
    title?: StringNullableWithAggregatesFilter | string | null
    email?: StringWithAggregatesFilter | string
    phone_number1?: StringNullableWithAggregatesFilter | string | null
    phone_number2?: StringNullableWithAggregatesFilter | string | null
    background?: StringNullableWithAggregatesFilter | string | null
    acquisition?: StringNullableWithAggregatesFilter | string | null
    avatar?: JsonNullableWithAggregatesFilter
    first_seen?: DateTimeWithAggregatesFilter | Date | string
    last_seen?: DateTimeWithAggregatesFilter | Date | string
    has_newsletter?: BoolNullableWithAggregatesFilter | boolean | null
    status?: StringWithAggregatesFilter | string
    company_id?: UuidWithAggregatesFilter | string
    sales_id?: UuidWithAggregatesFilter | string
    tags?: JsonNullableWithAggregatesFilter
  }

  export type Deal_notesWhereInput = {
    AND?: Enumerable<Deal_notesWhereInput>
    OR?: Enumerable<Deal_notesWhereInput>
    NOT?: Enumerable<Deal_notesWhereInput>
    id?: UuidFilter | string
    date?: DateTimeFilter | Date | string
    type?: StringFilter | string
    deal_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    text?: StringFilter | string
    deals?: XOR<DealsRelationFilter, DealsWhereInput>
    sales?: XOR<SalesRelationFilter, SalesWhereInput>
  }

  export type Deal_notesOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    deal_id?: SortOrder
    sales_id?: SortOrder
    text?: SortOrder
    deals?: DealsOrderByWithRelationInput
    sales?: SalesOrderByWithRelationInput
  }

  export type Deal_notesWhereUniqueInput = {
    id?: string
  }

  export type Deal_notesOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    deal_id?: SortOrder
    sales_id?: SortOrder
    text?: SortOrder
    _count?: Deal_notesCountOrderByAggregateInput
    _max?: Deal_notesMaxOrderByAggregateInput
    _min?: Deal_notesMinOrderByAggregateInput
  }

  export type Deal_notesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Deal_notesScalarWhereWithAggregatesInput>
    OR?: Enumerable<Deal_notesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Deal_notesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    type?: StringWithAggregatesFilter | string
    deal_id?: UuidWithAggregatesFilter | string
    sales_id?: UuidWithAggregatesFilter | string
    text?: StringWithAggregatesFilter | string
  }

  export type DealsWhereInput = {
    AND?: Enumerable<DealsWhereInput>
    OR?: Enumerable<DealsWhereInput>
    NOT?: Enumerable<DealsWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    contact_ids?: JsonNullableFilter
    type?: StringFilter | string
    stage?: StringFilter | string
    description?: StringNullableFilter | string | null
    amount?: IntFilter | number
    updated_at?: DateTimeFilter | Date | string
    start_at?: DateTimeNullableFilter | Date | string | null
    company_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    anindex?: IntFilter | number
    deal_notes?: Deal_notesListRelationFilter
    companies?: XOR<CompaniesRelationFilter, CompaniesWhereInput>
    sales?: XOR<SalesRelationFilter, SalesWhereInput>
  }

  export type DealsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    contact_ids?: SortOrder
    type?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    updated_at?: SortOrder
    start_at?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    anindex?: SortOrder
    deal_notes?: Deal_notesOrderByRelationAggregateInput
    companies?: CompaniesOrderByWithRelationInput
    sales?: SalesOrderByWithRelationInput
  }

  export type DealsWhereUniqueInput = {
    id?: string
  }

  export type DealsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    contact_ids?: SortOrder
    type?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    updated_at?: SortOrder
    start_at?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    anindex?: SortOrder
    _count?: DealsCountOrderByAggregateInput
    _avg?: DealsAvgOrderByAggregateInput
    _max?: DealsMaxOrderByAggregateInput
    _min?: DealsMinOrderByAggregateInput
    _sum?: DealsSumOrderByAggregateInput
  }

  export type DealsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DealsScalarWhereWithAggregatesInput>
    OR?: Enumerable<DealsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DealsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    contact_ids?: JsonNullableWithAggregatesFilter
    type?: StringWithAggregatesFilter | string
    stage?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    amount?: IntWithAggregatesFilter | number
    updated_at?: DateTimeWithAggregatesFilter | Date | string
    start_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    company_id?: UuidWithAggregatesFilter | string
    sales_id?: UuidWithAggregatesFilter | string
    anindex?: IntWithAggregatesFilter | number
  }

  export type SalesWhereInput = {
    AND?: Enumerable<SalesWhereInput>
    OR?: Enumerable<SalesWhereInput>
    NOT?: Enumerable<SalesWhereInput>
    id?: UuidFilter | string
    first_name?: StringFilter | string
    last_name?: StringFilter | string
    email?: StringFilter | string
    companies?: CompaniesListRelationFilter
    contact_notes?: Contact_notesListRelationFilter
    contacts?: ContactsListRelationFilter
    deal_notes?: Deal_notesListRelationFilter
    deals?: DealsListRelationFilter
    tasks?: TasksListRelationFilter
  }

  export type SalesOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    companies?: CompaniesOrderByRelationAggregateInput
    contact_notes?: Contact_notesOrderByRelationAggregateInput
    contacts?: ContactsOrderByRelationAggregateInput
    deal_notes?: Deal_notesOrderByRelationAggregateInput
    deals?: DealsOrderByRelationAggregateInput
    tasks?: TasksOrderByRelationAggregateInput
  }

  export type SalesWhereUniqueInput = {
    id?: string
  }

  export type SalesOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    _count?: SalesCountOrderByAggregateInput
    _max?: SalesMaxOrderByAggregateInput
    _min?: SalesMinOrderByAggregateInput
  }

  export type SalesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SalesScalarWhereWithAggregatesInput>
    OR?: Enumerable<SalesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SalesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    first_name?: StringWithAggregatesFilter | string
    last_name?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
  }

  export type TagsWhereInput = {
    AND?: Enumerable<TagsWhereInput>
    OR?: Enumerable<TagsWhereInput>
    NOT?: Enumerable<TagsWhereInput>
    id?: UuidFilter | string
    name?: StringFilter | string
    color?: StringFilter | string
  }

  export type TagsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TagsWhereUniqueInput = {
    id?: string
  }

  export type TagsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    _count?: TagsCountOrderByAggregateInput
    _max?: TagsMaxOrderByAggregateInput
    _min?: TagsMinOrderByAggregateInput
  }

  export type TagsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    color?: StringWithAggregatesFilter | string
  }

  export type TasksWhereInput = {
    AND?: Enumerable<TasksWhereInput>
    OR?: Enumerable<TasksWhereInput>
    NOT?: Enumerable<TasksWhereInput>
    id?: UuidFilter | string
    due_date?: DateTimeNullableFilter | Date | string | null
    text?: StringNullableFilter | string | null
    contact_id?: UuidNullableFilter | string | null
    sales_id?: UuidNullableFilter | string | null
    type?: StringNullableFilter | string | null
    contacts?: XOR<ContactsRelationFilter, ContactsWhereInput> | null
    sales?: XOR<SalesRelationFilter, SalesWhereInput> | null
  }

  export type TasksOrderByWithRelationInput = {
    id?: SortOrder
    due_date?: SortOrder
    text?: SortOrder
    contact_id?: SortOrder
    sales_id?: SortOrder
    type?: SortOrder
    contacts?: ContactsOrderByWithRelationInput
    sales?: SalesOrderByWithRelationInput
  }

  export type TasksWhereUniqueInput = {
    id?: string
  }

  export type TasksOrderByWithAggregationInput = {
    id?: SortOrder
    due_date?: SortOrder
    text?: SortOrder
    contact_id?: SortOrder
    sales_id?: SortOrder
    type?: SortOrder
    _count?: TasksCountOrderByAggregateInput
    _max?: TasksMaxOrderByAggregateInput
    _min?: TasksMinOrderByAggregateInput
  }

  export type TasksScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TasksScalarWhereWithAggregatesInput>
    OR?: Enumerable<TasksScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TasksScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    due_date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    text?: StringNullableWithAggregatesFilter | string | null
    contact_id?: UuidNullableWithAggregatesFilter | string | null
    sales_id?: UuidNullableWithAggregatesFilter | string | null
    type?: StringNullableWithAggregatesFilter | string | null
  }

  export type CompaniesCreateInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
    sales: SalesCreateNestedOneWithoutCompaniesInput
    contacts?: ContactsCreateNestedManyWithoutCompaniesInput
    deals?: DealsCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesUncheckedCreateInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    sales_id: string
    created_at: Date | string
    contacts?: ContactsUncheckedCreateNestedManyWithoutCompaniesInput
    deals?: DealsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SalesUpdateOneRequiredWithoutCompaniesNestedInput
    contacts?: ContactsUpdateManyWithoutCompaniesNestedInput
    deals?: DealsUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactsUncheckedUpdateManyWithoutCompaniesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesCreateManyInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    sales_id: string
    created_at: Date | string
  }

  export type CompaniesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompaniesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Contact_notesCreateInput = {
    id: string
    date: Date | string
    type: string
    text: string
    status: string
    contacts?: ContactsCreateNestedOneWithoutContact_notesInput
    sales: SalesCreateNestedOneWithoutContact_notesInput
  }

  export type Contact_notesUncheckedCreateInput = {
    id: string
    date: Date | string
    type: string
    text: string
    sales_id: string
    contact_id?: string | null
    status: string
  }

  export type Contact_notesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contacts?: ContactsUpdateOneWithoutContact_notesNestedInput
    sales?: SalesUpdateOneRequiredWithoutContact_notesNestedInput
  }

  export type Contact_notesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type Contact_notesCreateManyInput = {
    id: string
    date: Date | string
    type: string
    text: string
    sales_id: string
    contact_id?: string | null
    status: string
  }

  export type Contact_notesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type Contact_notesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ContactsCreateInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesCreateNestedManyWithoutContactsInput
    companies: CompaniesCreateNestedOneWithoutContactsInput
    sales: SalesCreateNestedOneWithoutContactsInput
    tasks?: TasksCreateNestedManyWithoutContactsInput
  }

  export type ContactsUncheckedCreateInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutContactsInput
    tasks?: TasksUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUpdateManyWithoutContactsNestedInput
    companies?: CompaniesUpdateOneRequiredWithoutContactsNestedInput
    sales?: SalesUpdateOneRequiredWithoutContactsNestedInput
    tasks?: TasksUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutContactsNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type ContactsCreateManyInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContactsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContactsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Deal_notesCreateInput = {
    id: string
    date: Date | string
    type: string
    text: string
    deals: DealsCreateNestedOneWithoutDeal_notesInput
    sales: SalesCreateNestedOneWithoutDeal_notesInput
  }

  export type Deal_notesUncheckedCreateInput = {
    id: string
    date: Date | string
    type: string
    deal_id: string
    sales_id: string
    text: string
  }

  export type Deal_notesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    deals?: DealsUpdateOneRequiredWithoutDeal_notesNestedInput
    sales?: SalesUpdateOneRequiredWithoutDeal_notesNestedInput
  }

  export type Deal_notesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    deal_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type Deal_notesCreateManyInput = {
    id: string
    date: Date | string
    type: string
    deal_id: string
    sales_id: string
    text: string
  }

  export type Deal_notesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type Deal_notesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    deal_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type DealsCreateInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    anindex: number
    deal_notes?: Deal_notesCreateNestedManyWithoutDealsInput
    companies: CompaniesCreateNestedOneWithoutDealsInput
    sales: SalesCreateNestedOneWithoutDealsInput
  }

  export type DealsUncheckedCreateInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    company_id: string
    sales_id: string
    anindex: number
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutDealsInput
  }

  export type DealsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUpdateManyWithoutDealsNestedInput
    companies?: CompaniesUpdateOneRequiredWithoutDealsNestedInput
    sales?: SalesUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutDealsNestedInput
  }

  export type DealsCreateManyInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    company_id: string
    sales_id: string
    anindex: number
  }

  export type DealsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anindex?: IntFieldUpdateOperationsInput | number
  }

  export type DealsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
  }

  export type SalesCreateInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type SalesCreateManyInput = {
    id: string
    first_name: string
    last_name: string
    email: string
  }

  export type SalesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type SalesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type TagsCreateInput = {
    id: string
    name: string
    color: string
  }

  export type TagsUncheckedCreateInput = {
    id: string
    name: string
    color: string
  }

  export type TagsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type TagsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type TagsCreateManyInput = {
    id: string
    name: string
    color: string
  }

  export type TagsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type TagsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type TasksCreateInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    type?: string | null
    contacts?: ContactsCreateNestedOneWithoutTasksInput
    sales?: SalesCreateNestedOneWithoutTasksInput
  }

  export type TasksUncheckedCreateInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    contact_id?: string | null
    sales_id?: string | null
    type?: string | null
  }

  export type TasksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: ContactsUpdateOneWithoutTasksNestedInput
    sales?: SalesUpdateOneWithoutTasksNestedInput
  }

  export type TasksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    sales_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TasksCreateManyInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    contact_id?: string | null
    sales_id?: string | null
    type?: string | null
  }

  export type TasksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TasksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    sales_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidFilter | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type SalesRelationFilter = {
    is?: SalesWhereInput
    isNot?: SalesWhereInput
  }

  export type ContactsListRelationFilter = {
    every?: ContactsWhereInput
    some?: ContactsWhereInput
    none?: ContactsWhereInput
  }

  export type DealsListRelationFilter = {
    every?: DealsWhereInput
    some?: DealsWhereInput
    none?: DealsWhereInput
  }

  export type ContactsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompaniesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    sector?: SortOrder
    size?: SortOrder
    linked_in?: SortOrder
    website?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    zipcode?: SortOrder
    city?: SortOrder
    state_abbr?: SortOrder
    sales_id?: SortOrder
    created_at?: SortOrder
  }

  export type CompaniesAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type CompaniesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    size?: SortOrder
    linked_in?: SortOrder
    website?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    zipcode?: SortOrder
    city?: SortOrder
    state_abbr?: SortOrder
    sales_id?: SortOrder
    created_at?: SortOrder
  }

  export type CompaniesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    size?: SortOrder
    linked_in?: SortOrder
    website?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    zipcode?: SortOrder
    city?: SortOrder
    state_abbr?: SortOrder
    sales_id?: SortOrder
    created_at?: SortOrder
  }

  export type CompaniesSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type UuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type UuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableFilter | string | null
  }

  export type ContactsRelationFilter = {
    is?: ContactsWhereInput | null
    isNot?: ContactsWhereInput | null
  }

  export type Contact_notesCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    text?: SortOrder
    sales_id?: SortOrder
    contact_id?: SortOrder
    status?: SortOrder
  }

  export type Contact_notesMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    text?: SortOrder
    sales_id?: SortOrder
    contact_id?: SortOrder
    status?: SortOrder
  }

  export type Contact_notesMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    text?: SortOrder
    sales_id?: SortOrder
    contact_id?: SortOrder
    status?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type Contact_notesListRelationFilter = {
    every?: Contact_notesWhereInput
    some?: Contact_notesWhereInput
    none?: Contact_notesWhereInput
  }

  export type CompaniesRelationFilter = {
    is?: CompaniesWhereInput
    isNot?: CompaniesWhereInput
  }

  export type TasksListRelationFilter = {
    every?: TasksWhereInput
    some?: TasksWhereInput
    none?: TasksWhereInput
  }

  export type Contact_notesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TasksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactsCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    gender?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone_number1?: SortOrder
    phone_number2?: SortOrder
    background?: SortOrder
    acquisition?: SortOrder
    avatar?: SortOrder
    first_seen?: SortOrder
    last_seen?: SortOrder
    has_newsletter?: SortOrder
    status?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    tags?: SortOrder
  }

  export type ContactsMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    gender?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone_number1?: SortOrder
    phone_number2?: SortOrder
    background?: SortOrder
    acquisition?: SortOrder
    first_seen?: SortOrder
    last_seen?: SortOrder
    has_newsletter?: SortOrder
    status?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
  }

  export type ContactsMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    gender?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone_number1?: SortOrder
    phone_number2?: SortOrder
    background?: SortOrder
    acquisition?: SortOrder
    first_seen?: SortOrder
    last_seen?: SortOrder
    has_newsletter?: SortOrder
    status?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type DealsRelationFilter = {
    is?: DealsWhereInput
    isNot?: DealsWhereInput
  }

  export type Deal_notesCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    deal_id?: SortOrder
    sales_id?: SortOrder
    text?: SortOrder
  }

  export type Deal_notesMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    deal_id?: SortOrder
    sales_id?: SortOrder
    text?: SortOrder
  }

  export type Deal_notesMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    deal_id?: SortOrder
    sales_id?: SortOrder
    text?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type Deal_notesListRelationFilter = {
    every?: Deal_notesWhereInput
    some?: Deal_notesWhereInput
    none?: Deal_notesWhereInput
  }

  export type Deal_notesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    contact_ids?: SortOrder
    type?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    updated_at?: SortOrder
    start_at?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    anindex?: SortOrder
  }

  export type DealsAvgOrderByAggregateInput = {
    amount?: SortOrder
    anindex?: SortOrder
  }

  export type DealsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    type?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    updated_at?: SortOrder
    start_at?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    anindex?: SortOrder
  }

  export type DealsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    type?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    updated_at?: SortOrder
    start_at?: SortOrder
    company_id?: SortOrder
    sales_id?: SortOrder
    anindex?: SortOrder
  }

  export type DealsSumOrderByAggregateInput = {
    amount?: SortOrder
    anindex?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type CompaniesListRelationFilter = {
    every?: CompaniesWhereInput
    some?: CompaniesWhereInput
    none?: CompaniesWhereInput
  }

  export type CompaniesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SalesCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
  }

  export type SalesMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
  }

  export type SalesMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
  }

  export type TagsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TagsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TagsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TasksCountOrderByAggregateInput = {
    id?: SortOrder
    due_date?: SortOrder
    text?: SortOrder
    contact_id?: SortOrder
    sales_id?: SortOrder
    type?: SortOrder
  }

  export type TasksMaxOrderByAggregateInput = {
    id?: SortOrder
    due_date?: SortOrder
    text?: SortOrder
    contact_id?: SortOrder
    sales_id?: SortOrder
    type?: SortOrder
  }

  export type TasksMinOrderByAggregateInput = {
    id?: SortOrder
    due_date?: SortOrder
    text?: SortOrder
    contact_id?: SortOrder
    sales_id?: SortOrder
    type?: SortOrder
  }

  export type SalesCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<SalesCreateWithoutCompaniesInput, SalesUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutCompaniesInput
    connect?: SalesWhereUniqueInput
  }

  export type ContactsCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutCompaniesInput>, Enumerable<ContactsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutCompaniesInput>
    createMany?: ContactsCreateManyCompaniesInputEnvelope
    connect?: Enumerable<ContactsWhereUniqueInput>
  }

  export type DealsCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<Enumerable<DealsCreateWithoutCompaniesInput>, Enumerable<DealsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutCompaniesInput>
    createMany?: DealsCreateManyCompaniesInputEnvelope
    connect?: Enumerable<DealsWhereUniqueInput>
  }

  export type ContactsUncheckedCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutCompaniesInput>, Enumerable<ContactsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutCompaniesInput>
    createMany?: ContactsCreateManyCompaniesInputEnvelope
    connect?: Enumerable<ContactsWhereUniqueInput>
  }

  export type DealsUncheckedCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<Enumerable<DealsCreateWithoutCompaniesInput>, Enumerable<DealsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutCompaniesInput>
    createMany?: DealsCreateManyCompaniesInputEnvelope
    connect?: Enumerable<DealsWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SalesUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<SalesCreateWithoutCompaniesInput, SalesUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutCompaniesInput
    upsert?: SalesUpsertWithoutCompaniesInput
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutCompaniesInput, SalesUncheckedUpdateWithoutCompaniesInput>
  }

  export type ContactsUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutCompaniesInput>, Enumerable<ContactsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutCompaniesInput>
    upsert?: Enumerable<ContactsUpsertWithWhereUniqueWithoutCompaniesInput>
    createMany?: ContactsCreateManyCompaniesInputEnvelope
    set?: Enumerable<ContactsWhereUniqueInput>
    disconnect?: Enumerable<ContactsWhereUniqueInput>
    delete?: Enumerable<ContactsWhereUniqueInput>
    connect?: Enumerable<ContactsWhereUniqueInput>
    update?: Enumerable<ContactsUpdateWithWhereUniqueWithoutCompaniesInput>
    updateMany?: Enumerable<ContactsUpdateManyWithWhereWithoutCompaniesInput>
    deleteMany?: Enumerable<ContactsScalarWhereInput>
  }

  export type DealsUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<Enumerable<DealsCreateWithoutCompaniesInput>, Enumerable<DealsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutCompaniesInput>
    upsert?: Enumerable<DealsUpsertWithWhereUniqueWithoutCompaniesInput>
    createMany?: DealsCreateManyCompaniesInputEnvelope
    set?: Enumerable<DealsWhereUniqueInput>
    disconnect?: Enumerable<DealsWhereUniqueInput>
    delete?: Enumerable<DealsWhereUniqueInput>
    connect?: Enumerable<DealsWhereUniqueInput>
    update?: Enumerable<DealsUpdateWithWhereUniqueWithoutCompaniesInput>
    updateMany?: Enumerable<DealsUpdateManyWithWhereWithoutCompaniesInput>
    deleteMany?: Enumerable<DealsScalarWhereInput>
  }

  export type ContactsUncheckedUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutCompaniesInput>, Enumerable<ContactsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutCompaniesInput>
    upsert?: Enumerable<ContactsUpsertWithWhereUniqueWithoutCompaniesInput>
    createMany?: ContactsCreateManyCompaniesInputEnvelope
    set?: Enumerable<ContactsWhereUniqueInput>
    disconnect?: Enumerable<ContactsWhereUniqueInput>
    delete?: Enumerable<ContactsWhereUniqueInput>
    connect?: Enumerable<ContactsWhereUniqueInput>
    update?: Enumerable<ContactsUpdateWithWhereUniqueWithoutCompaniesInput>
    updateMany?: Enumerable<ContactsUpdateManyWithWhereWithoutCompaniesInput>
    deleteMany?: Enumerable<ContactsScalarWhereInput>
  }

  export type DealsUncheckedUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<Enumerable<DealsCreateWithoutCompaniesInput>, Enumerable<DealsUncheckedCreateWithoutCompaniesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutCompaniesInput>
    upsert?: Enumerable<DealsUpsertWithWhereUniqueWithoutCompaniesInput>
    createMany?: DealsCreateManyCompaniesInputEnvelope
    set?: Enumerable<DealsWhereUniqueInput>
    disconnect?: Enumerable<DealsWhereUniqueInput>
    delete?: Enumerable<DealsWhereUniqueInput>
    connect?: Enumerable<DealsWhereUniqueInput>
    update?: Enumerable<DealsUpdateWithWhereUniqueWithoutCompaniesInput>
    updateMany?: Enumerable<DealsUpdateManyWithWhereWithoutCompaniesInput>
    deleteMany?: Enumerable<DealsScalarWhereInput>
  }

  export type ContactsCreateNestedOneWithoutContact_notesInput = {
    create?: XOR<ContactsCreateWithoutContact_notesInput, ContactsUncheckedCreateWithoutContact_notesInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutContact_notesInput
    connect?: ContactsWhereUniqueInput
  }

  export type SalesCreateNestedOneWithoutContact_notesInput = {
    create?: XOR<SalesCreateWithoutContact_notesInput, SalesUncheckedCreateWithoutContact_notesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutContact_notesInput
    connect?: SalesWhereUniqueInput
  }

  export type ContactsUpdateOneWithoutContact_notesNestedInput = {
    create?: XOR<ContactsCreateWithoutContact_notesInput, ContactsUncheckedCreateWithoutContact_notesInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutContact_notesInput
    upsert?: ContactsUpsertWithoutContact_notesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ContactsWhereUniqueInput
    update?: XOR<ContactsUpdateWithoutContact_notesInput, ContactsUncheckedUpdateWithoutContact_notesInput>
  }

  export type SalesUpdateOneRequiredWithoutContact_notesNestedInput = {
    create?: XOR<SalesCreateWithoutContact_notesInput, SalesUncheckedCreateWithoutContact_notesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutContact_notesInput
    upsert?: SalesUpsertWithoutContact_notesInput
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutContact_notesInput, SalesUncheckedUpdateWithoutContact_notesInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type Contact_notesCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutContactsInput>, Enumerable<Contact_notesUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutContactsInput>
    createMany?: Contact_notesCreateManyContactsInputEnvelope
    connect?: Enumerable<Contact_notesWhereUniqueInput>
  }

  export type CompaniesCreateNestedOneWithoutContactsInput = {
    create?: XOR<CompaniesCreateWithoutContactsInput, CompaniesUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutContactsInput
    connect?: CompaniesWhereUniqueInput
  }

  export type SalesCreateNestedOneWithoutContactsInput = {
    create?: XOR<SalesCreateWithoutContactsInput, SalesUncheckedCreateWithoutContactsInput>
    connectOrCreate?: SalesCreateOrConnectWithoutContactsInput
    connect?: SalesWhereUniqueInput
  }

  export type TasksCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<TasksCreateWithoutContactsInput>, Enumerable<TasksUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutContactsInput>
    createMany?: TasksCreateManyContactsInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type Contact_notesUncheckedCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutContactsInput>, Enumerable<Contact_notesUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutContactsInput>
    createMany?: Contact_notesCreateManyContactsInputEnvelope
    connect?: Enumerable<Contact_notesWhereUniqueInput>
  }

  export type TasksUncheckedCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<TasksCreateWithoutContactsInput>, Enumerable<TasksUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutContactsInput>
    createMany?: TasksCreateManyContactsInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type Contact_notesUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutContactsInput>, Enumerable<Contact_notesUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<Contact_notesUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: Contact_notesCreateManyContactsInputEnvelope
    set?: Enumerable<Contact_notesWhereUniqueInput>
    disconnect?: Enumerable<Contact_notesWhereUniqueInput>
    delete?: Enumerable<Contact_notesWhereUniqueInput>
    connect?: Enumerable<Contact_notesWhereUniqueInput>
    update?: Enumerable<Contact_notesUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<Contact_notesUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<Contact_notesScalarWhereInput>
  }

  export type CompaniesUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<CompaniesCreateWithoutContactsInput, CompaniesUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutContactsInput
    upsert?: CompaniesUpsertWithoutContactsInput
    connect?: CompaniesWhereUniqueInput
    update?: XOR<CompaniesUpdateWithoutContactsInput, CompaniesUncheckedUpdateWithoutContactsInput>
  }

  export type SalesUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<SalesCreateWithoutContactsInput, SalesUncheckedCreateWithoutContactsInput>
    connectOrCreate?: SalesCreateOrConnectWithoutContactsInput
    upsert?: SalesUpsertWithoutContactsInput
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutContactsInput, SalesUncheckedUpdateWithoutContactsInput>
  }

  export type TasksUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<TasksCreateWithoutContactsInput>, Enumerable<TasksUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: TasksCreateManyContactsInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type Contact_notesUncheckedUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutContactsInput>, Enumerable<Contact_notesUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<Contact_notesUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: Contact_notesCreateManyContactsInputEnvelope
    set?: Enumerable<Contact_notesWhereUniqueInput>
    disconnect?: Enumerable<Contact_notesWhereUniqueInput>
    delete?: Enumerable<Contact_notesWhereUniqueInput>
    connect?: Enumerable<Contact_notesWhereUniqueInput>
    update?: Enumerable<Contact_notesUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<Contact_notesUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<Contact_notesScalarWhereInput>
  }

  export type TasksUncheckedUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<TasksCreateWithoutContactsInput>, Enumerable<TasksUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: TasksCreateManyContactsInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type DealsCreateNestedOneWithoutDeal_notesInput = {
    create?: XOR<DealsCreateWithoutDeal_notesInput, DealsUncheckedCreateWithoutDeal_notesInput>
    connectOrCreate?: DealsCreateOrConnectWithoutDeal_notesInput
    connect?: DealsWhereUniqueInput
  }

  export type SalesCreateNestedOneWithoutDeal_notesInput = {
    create?: XOR<SalesCreateWithoutDeal_notesInput, SalesUncheckedCreateWithoutDeal_notesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutDeal_notesInput
    connect?: SalesWhereUniqueInput
  }

  export type DealsUpdateOneRequiredWithoutDeal_notesNestedInput = {
    create?: XOR<DealsCreateWithoutDeal_notesInput, DealsUncheckedCreateWithoutDeal_notesInput>
    connectOrCreate?: DealsCreateOrConnectWithoutDeal_notesInput
    upsert?: DealsUpsertWithoutDeal_notesInput
    connect?: DealsWhereUniqueInput
    update?: XOR<DealsUpdateWithoutDeal_notesInput, DealsUncheckedUpdateWithoutDeal_notesInput>
  }

  export type SalesUpdateOneRequiredWithoutDeal_notesNestedInput = {
    create?: XOR<SalesCreateWithoutDeal_notesInput, SalesUncheckedCreateWithoutDeal_notesInput>
    connectOrCreate?: SalesCreateOrConnectWithoutDeal_notesInput
    upsert?: SalesUpsertWithoutDeal_notesInput
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutDeal_notesInput, SalesUncheckedUpdateWithoutDeal_notesInput>
  }

  export type Deal_notesCreateNestedManyWithoutDealsInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutDealsInput>, Enumerable<Deal_notesUncheckedCreateWithoutDealsInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutDealsInput>
    createMany?: Deal_notesCreateManyDealsInputEnvelope
    connect?: Enumerable<Deal_notesWhereUniqueInput>
  }

  export type CompaniesCreateNestedOneWithoutDealsInput = {
    create?: XOR<CompaniesCreateWithoutDealsInput, CompaniesUncheckedCreateWithoutDealsInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutDealsInput
    connect?: CompaniesWhereUniqueInput
  }

  export type SalesCreateNestedOneWithoutDealsInput = {
    create?: XOR<SalesCreateWithoutDealsInput, SalesUncheckedCreateWithoutDealsInput>
    connectOrCreate?: SalesCreateOrConnectWithoutDealsInput
    connect?: SalesWhereUniqueInput
  }

  export type Deal_notesUncheckedCreateNestedManyWithoutDealsInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutDealsInput>, Enumerable<Deal_notesUncheckedCreateWithoutDealsInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutDealsInput>
    createMany?: Deal_notesCreateManyDealsInputEnvelope
    connect?: Enumerable<Deal_notesWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type Deal_notesUpdateManyWithoutDealsNestedInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutDealsInput>, Enumerable<Deal_notesUncheckedCreateWithoutDealsInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutDealsInput>
    upsert?: Enumerable<Deal_notesUpsertWithWhereUniqueWithoutDealsInput>
    createMany?: Deal_notesCreateManyDealsInputEnvelope
    set?: Enumerable<Deal_notesWhereUniqueInput>
    disconnect?: Enumerable<Deal_notesWhereUniqueInput>
    delete?: Enumerable<Deal_notesWhereUniqueInput>
    connect?: Enumerable<Deal_notesWhereUniqueInput>
    update?: Enumerable<Deal_notesUpdateWithWhereUniqueWithoutDealsInput>
    updateMany?: Enumerable<Deal_notesUpdateManyWithWhereWithoutDealsInput>
    deleteMany?: Enumerable<Deal_notesScalarWhereInput>
  }

  export type CompaniesUpdateOneRequiredWithoutDealsNestedInput = {
    create?: XOR<CompaniesCreateWithoutDealsInput, CompaniesUncheckedCreateWithoutDealsInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutDealsInput
    upsert?: CompaniesUpsertWithoutDealsInput
    connect?: CompaniesWhereUniqueInput
    update?: XOR<CompaniesUpdateWithoutDealsInput, CompaniesUncheckedUpdateWithoutDealsInput>
  }

  export type SalesUpdateOneRequiredWithoutDealsNestedInput = {
    create?: XOR<SalesCreateWithoutDealsInput, SalesUncheckedCreateWithoutDealsInput>
    connectOrCreate?: SalesCreateOrConnectWithoutDealsInput
    upsert?: SalesUpsertWithoutDealsInput
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutDealsInput, SalesUncheckedUpdateWithoutDealsInput>
  }

  export type Deal_notesUncheckedUpdateManyWithoutDealsNestedInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutDealsInput>, Enumerable<Deal_notesUncheckedCreateWithoutDealsInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutDealsInput>
    upsert?: Enumerable<Deal_notesUpsertWithWhereUniqueWithoutDealsInput>
    createMany?: Deal_notesCreateManyDealsInputEnvelope
    set?: Enumerable<Deal_notesWhereUniqueInput>
    disconnect?: Enumerable<Deal_notesWhereUniqueInput>
    delete?: Enumerable<Deal_notesWhereUniqueInput>
    connect?: Enumerable<Deal_notesWhereUniqueInput>
    update?: Enumerable<Deal_notesUpdateWithWhereUniqueWithoutDealsInput>
    updateMany?: Enumerable<Deal_notesUpdateManyWithWhereWithoutDealsInput>
    deleteMany?: Enumerable<Deal_notesScalarWhereInput>
  }

  export type CompaniesCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<CompaniesCreateWithoutSalesInput>, Enumerable<CompaniesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<CompaniesCreateOrConnectWithoutSalesInput>
    createMany?: CompaniesCreateManySalesInputEnvelope
    connect?: Enumerable<CompaniesWhereUniqueInput>
  }

  export type Contact_notesCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutSalesInput>, Enumerable<Contact_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutSalesInput>
    createMany?: Contact_notesCreateManySalesInputEnvelope
    connect?: Enumerable<Contact_notesWhereUniqueInput>
  }

  export type ContactsCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutSalesInput>, Enumerable<ContactsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutSalesInput>
    createMany?: ContactsCreateManySalesInputEnvelope
    connect?: Enumerable<ContactsWhereUniqueInput>
  }

  export type Deal_notesCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutSalesInput>, Enumerable<Deal_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutSalesInput>
    createMany?: Deal_notesCreateManySalesInputEnvelope
    connect?: Enumerable<Deal_notesWhereUniqueInput>
  }

  export type DealsCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<DealsCreateWithoutSalesInput>, Enumerable<DealsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutSalesInput>
    createMany?: DealsCreateManySalesInputEnvelope
    connect?: Enumerable<DealsWhereUniqueInput>
  }

  export type TasksCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<TasksCreateWithoutSalesInput>, Enumerable<TasksUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutSalesInput>
    createMany?: TasksCreateManySalesInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type CompaniesUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<CompaniesCreateWithoutSalesInput>, Enumerable<CompaniesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<CompaniesCreateOrConnectWithoutSalesInput>
    createMany?: CompaniesCreateManySalesInputEnvelope
    connect?: Enumerable<CompaniesWhereUniqueInput>
  }

  export type Contact_notesUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutSalesInput>, Enumerable<Contact_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutSalesInput>
    createMany?: Contact_notesCreateManySalesInputEnvelope
    connect?: Enumerable<Contact_notesWhereUniqueInput>
  }

  export type ContactsUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutSalesInput>, Enumerable<ContactsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutSalesInput>
    createMany?: ContactsCreateManySalesInputEnvelope
    connect?: Enumerable<ContactsWhereUniqueInput>
  }

  export type Deal_notesUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutSalesInput>, Enumerable<Deal_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutSalesInput>
    createMany?: Deal_notesCreateManySalesInputEnvelope
    connect?: Enumerable<Deal_notesWhereUniqueInput>
  }

  export type DealsUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<DealsCreateWithoutSalesInput>, Enumerable<DealsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutSalesInput>
    createMany?: DealsCreateManySalesInputEnvelope
    connect?: Enumerable<DealsWhereUniqueInput>
  }

  export type TasksUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<TasksCreateWithoutSalesInput>, Enumerable<TasksUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutSalesInput>
    createMany?: TasksCreateManySalesInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type CompaniesUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<CompaniesCreateWithoutSalesInput>, Enumerable<CompaniesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<CompaniesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<CompaniesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: CompaniesCreateManySalesInputEnvelope
    set?: Enumerable<CompaniesWhereUniqueInput>
    disconnect?: Enumerable<CompaniesWhereUniqueInput>
    delete?: Enumerable<CompaniesWhereUniqueInput>
    connect?: Enumerable<CompaniesWhereUniqueInput>
    update?: Enumerable<CompaniesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<CompaniesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<CompaniesScalarWhereInput>
  }

  export type Contact_notesUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutSalesInput>, Enumerable<Contact_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<Contact_notesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: Contact_notesCreateManySalesInputEnvelope
    set?: Enumerable<Contact_notesWhereUniqueInput>
    disconnect?: Enumerable<Contact_notesWhereUniqueInput>
    delete?: Enumerable<Contact_notesWhereUniqueInput>
    connect?: Enumerable<Contact_notesWhereUniqueInput>
    update?: Enumerable<Contact_notesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<Contact_notesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<Contact_notesScalarWhereInput>
  }

  export type ContactsUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutSalesInput>, Enumerable<ContactsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<ContactsUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: ContactsCreateManySalesInputEnvelope
    set?: Enumerable<ContactsWhereUniqueInput>
    disconnect?: Enumerable<ContactsWhereUniqueInput>
    delete?: Enumerable<ContactsWhereUniqueInput>
    connect?: Enumerable<ContactsWhereUniqueInput>
    update?: Enumerable<ContactsUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<ContactsUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<ContactsScalarWhereInput>
  }

  export type Deal_notesUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutSalesInput>, Enumerable<Deal_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<Deal_notesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: Deal_notesCreateManySalesInputEnvelope
    set?: Enumerable<Deal_notesWhereUniqueInput>
    disconnect?: Enumerable<Deal_notesWhereUniqueInput>
    delete?: Enumerable<Deal_notesWhereUniqueInput>
    connect?: Enumerable<Deal_notesWhereUniqueInput>
    update?: Enumerable<Deal_notesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<Deal_notesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<Deal_notesScalarWhereInput>
  }

  export type DealsUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<DealsCreateWithoutSalesInput>, Enumerable<DealsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<DealsUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: DealsCreateManySalesInputEnvelope
    set?: Enumerable<DealsWhereUniqueInput>
    disconnect?: Enumerable<DealsWhereUniqueInput>
    delete?: Enumerable<DealsWhereUniqueInput>
    connect?: Enumerable<DealsWhereUniqueInput>
    update?: Enumerable<DealsUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<DealsUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<DealsScalarWhereInput>
  }

  export type TasksUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<TasksCreateWithoutSalesInput>, Enumerable<TasksUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: TasksCreateManySalesInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type CompaniesUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<CompaniesCreateWithoutSalesInput>, Enumerable<CompaniesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<CompaniesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<CompaniesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: CompaniesCreateManySalesInputEnvelope
    set?: Enumerable<CompaniesWhereUniqueInput>
    disconnect?: Enumerable<CompaniesWhereUniqueInput>
    delete?: Enumerable<CompaniesWhereUniqueInput>
    connect?: Enumerable<CompaniesWhereUniqueInput>
    update?: Enumerable<CompaniesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<CompaniesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<CompaniesScalarWhereInput>
  }

  export type Contact_notesUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<Contact_notesCreateWithoutSalesInput>, Enumerable<Contact_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Contact_notesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<Contact_notesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: Contact_notesCreateManySalesInputEnvelope
    set?: Enumerable<Contact_notesWhereUniqueInput>
    disconnect?: Enumerable<Contact_notesWhereUniqueInput>
    delete?: Enumerable<Contact_notesWhereUniqueInput>
    connect?: Enumerable<Contact_notesWhereUniqueInput>
    update?: Enumerable<Contact_notesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<Contact_notesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<Contact_notesScalarWhereInput>
  }

  export type ContactsUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<ContactsCreateWithoutSalesInput>, Enumerable<ContactsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ContactsCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<ContactsUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: ContactsCreateManySalesInputEnvelope
    set?: Enumerable<ContactsWhereUniqueInput>
    disconnect?: Enumerable<ContactsWhereUniqueInput>
    delete?: Enumerable<ContactsWhereUniqueInput>
    connect?: Enumerable<ContactsWhereUniqueInput>
    update?: Enumerable<ContactsUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<ContactsUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<ContactsScalarWhereInput>
  }

  export type Deal_notesUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<Deal_notesCreateWithoutSalesInput>, Enumerable<Deal_notesUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<Deal_notesCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<Deal_notesUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: Deal_notesCreateManySalesInputEnvelope
    set?: Enumerable<Deal_notesWhereUniqueInput>
    disconnect?: Enumerable<Deal_notesWhereUniqueInput>
    delete?: Enumerable<Deal_notesWhereUniqueInput>
    connect?: Enumerable<Deal_notesWhereUniqueInput>
    update?: Enumerable<Deal_notesUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<Deal_notesUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<Deal_notesScalarWhereInput>
  }

  export type DealsUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<DealsCreateWithoutSalesInput>, Enumerable<DealsUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<DealsCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<DealsUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: DealsCreateManySalesInputEnvelope
    set?: Enumerable<DealsWhereUniqueInput>
    disconnect?: Enumerable<DealsWhereUniqueInput>
    delete?: Enumerable<DealsWhereUniqueInput>
    connect?: Enumerable<DealsWhereUniqueInput>
    update?: Enumerable<DealsUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<DealsUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<DealsScalarWhereInput>
  }

  export type TasksUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<TasksCreateWithoutSalesInput>, Enumerable<TasksUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutSalesInput>
    createMany?: TasksCreateManySalesInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type ContactsCreateNestedOneWithoutTasksInput = {
    create?: XOR<ContactsCreateWithoutTasksInput, ContactsUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutTasksInput
    connect?: ContactsWhereUniqueInput
  }

  export type SalesCreateNestedOneWithoutTasksInput = {
    create?: XOR<SalesCreateWithoutTasksInput, SalesUncheckedCreateWithoutTasksInput>
    connectOrCreate?: SalesCreateOrConnectWithoutTasksInput
    connect?: SalesWhereUniqueInput
  }

  export type ContactsUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ContactsCreateWithoutTasksInput, ContactsUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutTasksInput
    upsert?: ContactsUpsertWithoutTasksInput
    disconnect?: boolean
    delete?: boolean
    connect?: ContactsWhereUniqueInput
    update?: XOR<ContactsUpdateWithoutTasksInput, ContactsUncheckedUpdateWithoutTasksInput>
  }

  export type SalesUpdateOneWithoutTasksNestedInput = {
    create?: XOR<SalesCreateWithoutTasksInput, SalesUncheckedCreateWithoutTasksInput>
    connectOrCreate?: SalesCreateOrConnectWithoutTasksInput
    upsert?: SalesUpsertWithoutTasksInput
    disconnect?: boolean
    delete?: boolean
    connect?: SalesWhereUniqueInput
    update?: XOR<SalesUpdateWithoutTasksInput, SalesUncheckedUpdateWithoutTasksInput>
  }

  export type NestedUuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidFilter | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedUuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedUuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableFilter | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type SalesCreateWithoutCompaniesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutCompaniesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutCompaniesInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutCompaniesInput, SalesUncheckedCreateWithoutCompaniesInput>
  }

  export type ContactsCreateWithoutCompaniesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesCreateNestedManyWithoutContactsInput
    sales: SalesCreateNestedOneWithoutContactsInput
    tasks?: TasksCreateNestedManyWithoutContactsInput
  }

  export type ContactsUncheckedCreateWithoutCompaniesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutContactsInput
    tasks?: TasksUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsCreateOrConnectWithoutCompaniesInput = {
    where: ContactsWhereUniqueInput
    create: XOR<ContactsCreateWithoutCompaniesInput, ContactsUncheckedCreateWithoutCompaniesInput>
  }

  export type ContactsCreateManyCompaniesInputEnvelope = {
    data: Enumerable<ContactsCreateManyCompaniesInput>
    skipDuplicates?: boolean
  }

  export type DealsCreateWithoutCompaniesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    anindex: number
    deal_notes?: Deal_notesCreateNestedManyWithoutDealsInput
    sales: SalesCreateNestedOneWithoutDealsInput
  }

  export type DealsUncheckedCreateWithoutCompaniesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    sales_id: string
    anindex: number
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutDealsInput
  }

  export type DealsCreateOrConnectWithoutCompaniesInput = {
    where: DealsWhereUniqueInput
    create: XOR<DealsCreateWithoutCompaniesInput, DealsUncheckedCreateWithoutCompaniesInput>
  }

  export type DealsCreateManyCompaniesInputEnvelope = {
    data: Enumerable<DealsCreateManyCompaniesInput>
    skipDuplicates?: boolean
  }

  export type SalesUpsertWithoutCompaniesInput = {
    update: XOR<SalesUpdateWithoutCompaniesInput, SalesUncheckedUpdateWithoutCompaniesInput>
    create: XOR<SalesCreateWithoutCompaniesInput, SalesUncheckedCreateWithoutCompaniesInput>
  }

  export type SalesUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type ContactsUpsertWithWhereUniqueWithoutCompaniesInput = {
    where: ContactsWhereUniqueInput
    update: XOR<ContactsUpdateWithoutCompaniesInput, ContactsUncheckedUpdateWithoutCompaniesInput>
    create: XOR<ContactsCreateWithoutCompaniesInput, ContactsUncheckedCreateWithoutCompaniesInput>
  }

  export type ContactsUpdateWithWhereUniqueWithoutCompaniesInput = {
    where: ContactsWhereUniqueInput
    data: XOR<ContactsUpdateWithoutCompaniesInput, ContactsUncheckedUpdateWithoutCompaniesInput>
  }

  export type ContactsUpdateManyWithWhereWithoutCompaniesInput = {
    where: ContactsScalarWhereInput
    data: XOR<ContactsUpdateManyMutationInput, ContactsUncheckedUpdateManyWithoutContactsInput>
  }

  export type ContactsScalarWhereInput = {
    AND?: Enumerable<ContactsScalarWhereInput>
    OR?: Enumerable<ContactsScalarWhereInput>
    NOT?: Enumerable<ContactsScalarWhereInput>
    id?: UuidFilter | string
    first_name?: StringFilter | string
    last_name?: StringFilter | string
    gender?: StringNullableFilter | string | null
    title?: StringNullableFilter | string | null
    email?: StringFilter | string
    phone_number1?: StringNullableFilter | string | null
    phone_number2?: StringNullableFilter | string | null
    background?: StringNullableFilter | string | null
    acquisition?: StringNullableFilter | string | null
    avatar?: JsonNullableFilter
    first_seen?: DateTimeFilter | Date | string
    last_seen?: DateTimeFilter | Date | string
    has_newsletter?: BoolNullableFilter | boolean | null
    status?: StringFilter | string
    company_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    tags?: JsonNullableFilter
  }

  export type DealsUpsertWithWhereUniqueWithoutCompaniesInput = {
    where: DealsWhereUniqueInput
    update: XOR<DealsUpdateWithoutCompaniesInput, DealsUncheckedUpdateWithoutCompaniesInput>
    create: XOR<DealsCreateWithoutCompaniesInput, DealsUncheckedCreateWithoutCompaniesInput>
  }

  export type DealsUpdateWithWhereUniqueWithoutCompaniesInput = {
    where: DealsWhereUniqueInput
    data: XOR<DealsUpdateWithoutCompaniesInput, DealsUncheckedUpdateWithoutCompaniesInput>
  }

  export type DealsUpdateManyWithWhereWithoutCompaniesInput = {
    where: DealsScalarWhereInput
    data: XOR<DealsUpdateManyMutationInput, DealsUncheckedUpdateManyWithoutDealsInput>
  }

  export type DealsScalarWhereInput = {
    AND?: Enumerable<DealsScalarWhereInput>
    OR?: Enumerable<DealsScalarWhereInput>
    NOT?: Enumerable<DealsScalarWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    contact_ids?: JsonNullableFilter
    type?: StringFilter | string
    stage?: StringFilter | string
    description?: StringNullableFilter | string | null
    amount?: IntFilter | number
    updated_at?: DateTimeFilter | Date | string
    start_at?: DateTimeNullableFilter | Date | string | null
    company_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    anindex?: IntFilter | number
  }

  export type ContactsCreateWithoutContact_notesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    companies: CompaniesCreateNestedOneWithoutContactsInput
    sales: SalesCreateNestedOneWithoutContactsInput
    tasks?: TasksCreateNestedManyWithoutContactsInput
  }

  export type ContactsUncheckedCreateWithoutContact_notesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    tasks?: TasksUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsCreateOrConnectWithoutContact_notesInput = {
    where: ContactsWhereUniqueInput
    create: XOR<ContactsCreateWithoutContact_notesInput, ContactsUncheckedCreateWithoutContact_notesInput>
  }

  export type SalesCreateWithoutContact_notesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutContact_notesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutContact_notesInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutContact_notesInput, SalesUncheckedCreateWithoutContact_notesInput>
  }

  export type ContactsUpsertWithoutContact_notesInput = {
    update: XOR<ContactsUpdateWithoutContact_notesInput, ContactsUncheckedUpdateWithoutContact_notesInput>
    create: XOR<ContactsCreateWithoutContact_notesInput, ContactsUncheckedCreateWithoutContact_notesInput>
  }

  export type ContactsUpdateWithoutContact_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    companies?: CompaniesUpdateOneRequiredWithoutContactsNestedInput
    sales?: SalesUpdateOneRequiredWithoutContactsNestedInput
    tasks?: TasksUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateWithoutContact_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    tasks?: TasksUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type SalesUpsertWithoutContact_notesInput = {
    update: XOR<SalesUpdateWithoutContact_notesInput, SalesUncheckedUpdateWithoutContact_notesInput>
    create: XOR<SalesCreateWithoutContact_notesInput, SalesUncheckedCreateWithoutContact_notesInput>
  }

  export type SalesUpdateWithoutContact_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutContact_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type Contact_notesCreateWithoutContactsInput = {
    id: string
    date: Date | string
    type: string
    text: string
    status: string
    sales: SalesCreateNestedOneWithoutContact_notesInput
  }

  export type Contact_notesUncheckedCreateWithoutContactsInput = {
    id: string
    date: Date | string
    type: string
    text: string
    sales_id: string
    status: string
  }

  export type Contact_notesCreateOrConnectWithoutContactsInput = {
    where: Contact_notesWhereUniqueInput
    create: XOR<Contact_notesCreateWithoutContactsInput, Contact_notesUncheckedCreateWithoutContactsInput>
  }

  export type Contact_notesCreateManyContactsInputEnvelope = {
    data: Enumerable<Contact_notesCreateManyContactsInput>
    skipDuplicates?: boolean
  }

  export type CompaniesCreateWithoutContactsInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
    sales: SalesCreateNestedOneWithoutCompaniesInput
    deals?: DealsCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesUncheckedCreateWithoutContactsInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    sales_id: string
    created_at: Date | string
    deals?: DealsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesCreateOrConnectWithoutContactsInput = {
    where: CompaniesWhereUniqueInput
    create: XOR<CompaniesCreateWithoutContactsInput, CompaniesUncheckedCreateWithoutContactsInput>
  }

  export type SalesCreateWithoutContactsInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutContactsInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutContactsInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutContactsInput, SalesUncheckedCreateWithoutContactsInput>
  }

  export type TasksCreateWithoutContactsInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    type?: string | null
    sales?: SalesCreateNestedOneWithoutTasksInput
  }

  export type TasksUncheckedCreateWithoutContactsInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    sales_id?: string | null
    type?: string | null
  }

  export type TasksCreateOrConnectWithoutContactsInput = {
    where: TasksWhereUniqueInput
    create: XOR<TasksCreateWithoutContactsInput, TasksUncheckedCreateWithoutContactsInput>
  }

  export type TasksCreateManyContactsInputEnvelope = {
    data: Enumerable<TasksCreateManyContactsInput>
    skipDuplicates?: boolean
  }

  export type Contact_notesUpsertWithWhereUniqueWithoutContactsInput = {
    where: Contact_notesWhereUniqueInput
    update: XOR<Contact_notesUpdateWithoutContactsInput, Contact_notesUncheckedUpdateWithoutContactsInput>
    create: XOR<Contact_notesCreateWithoutContactsInput, Contact_notesUncheckedCreateWithoutContactsInput>
  }

  export type Contact_notesUpdateWithWhereUniqueWithoutContactsInput = {
    where: Contact_notesWhereUniqueInput
    data: XOR<Contact_notesUpdateWithoutContactsInput, Contact_notesUncheckedUpdateWithoutContactsInput>
  }

  export type Contact_notesUpdateManyWithWhereWithoutContactsInput = {
    where: Contact_notesScalarWhereInput
    data: XOR<Contact_notesUpdateManyMutationInput, Contact_notesUncheckedUpdateManyWithoutContact_notesInput>
  }

  export type Contact_notesScalarWhereInput = {
    AND?: Enumerable<Contact_notesScalarWhereInput>
    OR?: Enumerable<Contact_notesScalarWhereInput>
    NOT?: Enumerable<Contact_notesScalarWhereInput>
    id?: UuidFilter | string
    date?: DateTimeFilter | Date | string
    type?: StringFilter | string
    text?: StringFilter | string
    sales_id?: UuidFilter | string
    contact_id?: UuidNullableFilter | string | null
    status?: StringFilter | string
  }

  export type CompaniesUpsertWithoutContactsInput = {
    update: XOR<CompaniesUpdateWithoutContactsInput, CompaniesUncheckedUpdateWithoutContactsInput>
    create: XOR<CompaniesCreateWithoutContactsInput, CompaniesUncheckedCreateWithoutContactsInput>
  }

  export type CompaniesUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SalesUpdateOneRequiredWithoutCompaniesNestedInput
    deals?: DealsUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type SalesUpsertWithoutContactsInput = {
    update: XOR<SalesUpdateWithoutContactsInput, SalesUncheckedUpdateWithoutContactsInput>
    create: XOR<SalesCreateWithoutContactsInput, SalesUncheckedCreateWithoutContactsInput>
  }

  export type SalesUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type TasksUpsertWithWhereUniqueWithoutContactsInput = {
    where: TasksWhereUniqueInput
    update: XOR<TasksUpdateWithoutContactsInput, TasksUncheckedUpdateWithoutContactsInput>
    create: XOR<TasksCreateWithoutContactsInput, TasksUncheckedCreateWithoutContactsInput>
  }

  export type TasksUpdateWithWhereUniqueWithoutContactsInput = {
    where: TasksWhereUniqueInput
    data: XOR<TasksUpdateWithoutContactsInput, TasksUncheckedUpdateWithoutContactsInput>
  }

  export type TasksUpdateManyWithWhereWithoutContactsInput = {
    where: TasksScalarWhereInput
    data: XOR<TasksUpdateManyMutationInput, TasksUncheckedUpdateManyWithoutTasksInput>
  }

  export type TasksScalarWhereInput = {
    AND?: Enumerable<TasksScalarWhereInput>
    OR?: Enumerable<TasksScalarWhereInput>
    NOT?: Enumerable<TasksScalarWhereInput>
    id?: UuidFilter | string
    due_date?: DateTimeNullableFilter | Date | string | null
    text?: StringNullableFilter | string | null
    contact_id?: UuidNullableFilter | string | null
    sales_id?: UuidNullableFilter | string | null
    type?: StringNullableFilter | string | null
  }

  export type DealsCreateWithoutDeal_notesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    anindex: number
    companies: CompaniesCreateNestedOneWithoutDealsInput
    sales: SalesCreateNestedOneWithoutDealsInput
  }

  export type DealsUncheckedCreateWithoutDeal_notesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    company_id: string
    sales_id: string
    anindex: number
  }

  export type DealsCreateOrConnectWithoutDeal_notesInput = {
    where: DealsWhereUniqueInput
    create: XOR<DealsCreateWithoutDeal_notesInput, DealsUncheckedCreateWithoutDeal_notesInput>
  }

  export type SalesCreateWithoutDeal_notesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutDeal_notesInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutDeal_notesInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutDeal_notesInput, SalesUncheckedCreateWithoutDeal_notesInput>
  }

  export type DealsUpsertWithoutDeal_notesInput = {
    update: XOR<DealsUpdateWithoutDeal_notesInput, DealsUncheckedUpdateWithoutDeal_notesInput>
    create: XOR<DealsCreateWithoutDeal_notesInput, DealsUncheckedCreateWithoutDeal_notesInput>
  }

  export type DealsUpdateWithoutDeal_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anindex?: IntFieldUpdateOperationsInput | number
    companies?: CompaniesUpdateOneRequiredWithoutDealsNestedInput
    sales?: SalesUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealsUncheckedUpdateWithoutDeal_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
  }

  export type SalesUpsertWithoutDeal_notesInput = {
    update: XOR<SalesUpdateWithoutDeal_notesInput, SalesUncheckedUpdateWithoutDeal_notesInput>
    create: XOR<SalesCreateWithoutDeal_notesInput, SalesUncheckedCreateWithoutDeal_notesInput>
  }

  export type SalesUpdateWithoutDeal_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutDeal_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type Deal_notesCreateWithoutDealsInput = {
    id: string
    date: Date | string
    type: string
    text: string
    sales: SalesCreateNestedOneWithoutDeal_notesInput
  }

  export type Deal_notesUncheckedCreateWithoutDealsInput = {
    id: string
    date: Date | string
    type: string
    sales_id: string
    text: string
  }

  export type Deal_notesCreateOrConnectWithoutDealsInput = {
    where: Deal_notesWhereUniqueInput
    create: XOR<Deal_notesCreateWithoutDealsInput, Deal_notesUncheckedCreateWithoutDealsInput>
  }

  export type Deal_notesCreateManyDealsInputEnvelope = {
    data: Enumerable<Deal_notesCreateManyDealsInput>
    skipDuplicates?: boolean
  }

  export type CompaniesCreateWithoutDealsInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
    sales: SalesCreateNestedOneWithoutCompaniesInput
    contacts?: ContactsCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesUncheckedCreateWithoutDealsInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    sales_id: string
    created_at: Date | string
    contacts?: ContactsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesCreateOrConnectWithoutDealsInput = {
    where: CompaniesWhereUniqueInput
    create: XOR<CompaniesCreateWithoutDealsInput, CompaniesUncheckedCreateWithoutDealsInput>
  }

  export type SalesCreateWithoutDealsInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    tasks?: TasksCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutDealsInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    tasks?: TasksUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutDealsInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutDealsInput, SalesUncheckedCreateWithoutDealsInput>
  }

  export type Deal_notesUpsertWithWhereUniqueWithoutDealsInput = {
    where: Deal_notesWhereUniqueInput
    update: XOR<Deal_notesUpdateWithoutDealsInput, Deal_notesUncheckedUpdateWithoutDealsInput>
    create: XOR<Deal_notesCreateWithoutDealsInput, Deal_notesUncheckedCreateWithoutDealsInput>
  }

  export type Deal_notesUpdateWithWhereUniqueWithoutDealsInput = {
    where: Deal_notesWhereUniqueInput
    data: XOR<Deal_notesUpdateWithoutDealsInput, Deal_notesUncheckedUpdateWithoutDealsInput>
  }

  export type Deal_notesUpdateManyWithWhereWithoutDealsInput = {
    where: Deal_notesScalarWhereInput
    data: XOR<Deal_notesUpdateManyMutationInput, Deal_notesUncheckedUpdateManyWithoutDeal_notesInput>
  }

  export type Deal_notesScalarWhereInput = {
    AND?: Enumerable<Deal_notesScalarWhereInput>
    OR?: Enumerable<Deal_notesScalarWhereInput>
    NOT?: Enumerable<Deal_notesScalarWhereInput>
    id?: UuidFilter | string
    date?: DateTimeFilter | Date | string
    type?: StringFilter | string
    deal_id?: UuidFilter | string
    sales_id?: UuidFilter | string
    text?: StringFilter | string
  }

  export type CompaniesUpsertWithoutDealsInput = {
    update: XOR<CompaniesUpdateWithoutDealsInput, CompaniesUncheckedUpdateWithoutDealsInput>
    create: XOR<CompaniesCreateWithoutDealsInput, CompaniesUncheckedCreateWithoutDealsInput>
  }

  export type CompaniesUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SalesUpdateOneRequiredWithoutCompaniesNestedInput
    contacts?: ContactsUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type SalesUpsertWithoutDealsInput = {
    update: XOR<SalesUpdateWithoutDealsInput, SalesUncheckedUpdateWithoutDealsInput>
    create: XOR<SalesCreateWithoutDealsInput, SalesUncheckedCreateWithoutDealsInput>
  }

  export type SalesUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    tasks?: TasksUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type CompaniesCreateWithoutSalesInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
    contacts?: ContactsCreateNestedManyWithoutCompaniesInput
    deals?: DealsCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesUncheckedCreateWithoutSalesInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
    contacts?: ContactsUncheckedCreateNestedManyWithoutCompaniesInput
    deals?: DealsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type CompaniesCreateOrConnectWithoutSalesInput = {
    where: CompaniesWhereUniqueInput
    create: XOR<CompaniesCreateWithoutSalesInput, CompaniesUncheckedCreateWithoutSalesInput>
  }

  export type CompaniesCreateManySalesInputEnvelope = {
    data: Enumerable<CompaniesCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type Contact_notesCreateWithoutSalesInput = {
    id: string
    date: Date | string
    type: string
    text: string
    status: string
    contacts?: ContactsCreateNestedOneWithoutContact_notesInput
  }

  export type Contact_notesUncheckedCreateWithoutSalesInput = {
    id: string
    date: Date | string
    type: string
    text: string
    contact_id?: string | null
    status: string
  }

  export type Contact_notesCreateOrConnectWithoutSalesInput = {
    where: Contact_notesWhereUniqueInput
    create: XOR<Contact_notesCreateWithoutSalesInput, Contact_notesUncheckedCreateWithoutSalesInput>
  }

  export type Contact_notesCreateManySalesInputEnvelope = {
    data: Enumerable<Contact_notesCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type ContactsCreateWithoutSalesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesCreateNestedManyWithoutContactsInput
    companies: CompaniesCreateNestedOneWithoutContactsInput
    tasks?: TasksCreateNestedManyWithoutContactsInput
  }

  export type ContactsUncheckedCreateWithoutSalesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutContactsInput
    tasks?: TasksUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsCreateOrConnectWithoutSalesInput = {
    where: ContactsWhereUniqueInput
    create: XOR<ContactsCreateWithoutSalesInput, ContactsUncheckedCreateWithoutSalesInput>
  }

  export type ContactsCreateManySalesInputEnvelope = {
    data: Enumerable<ContactsCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type Deal_notesCreateWithoutSalesInput = {
    id: string
    date: Date | string
    type: string
    text: string
    deals: DealsCreateNestedOneWithoutDeal_notesInput
  }

  export type Deal_notesUncheckedCreateWithoutSalesInput = {
    id: string
    date: Date | string
    type: string
    deal_id: string
    text: string
  }

  export type Deal_notesCreateOrConnectWithoutSalesInput = {
    where: Deal_notesWhereUniqueInput
    create: XOR<Deal_notesCreateWithoutSalesInput, Deal_notesUncheckedCreateWithoutSalesInput>
  }

  export type Deal_notesCreateManySalesInputEnvelope = {
    data: Enumerable<Deal_notesCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type DealsCreateWithoutSalesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    anindex: number
    deal_notes?: Deal_notesCreateNestedManyWithoutDealsInput
    companies: CompaniesCreateNestedOneWithoutDealsInput
  }

  export type DealsUncheckedCreateWithoutSalesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    company_id: string
    anindex: number
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutDealsInput
  }

  export type DealsCreateOrConnectWithoutSalesInput = {
    where: DealsWhereUniqueInput
    create: XOR<DealsCreateWithoutSalesInput, DealsUncheckedCreateWithoutSalesInput>
  }

  export type DealsCreateManySalesInputEnvelope = {
    data: Enumerable<DealsCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type TasksCreateWithoutSalesInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    type?: string | null
    contacts?: ContactsCreateNestedOneWithoutTasksInput
  }

  export type TasksUncheckedCreateWithoutSalesInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    contact_id?: string | null
    type?: string | null
  }

  export type TasksCreateOrConnectWithoutSalesInput = {
    where: TasksWhereUniqueInput
    create: XOR<TasksCreateWithoutSalesInput, TasksUncheckedCreateWithoutSalesInput>
  }

  export type TasksCreateManySalesInputEnvelope = {
    data: Enumerable<TasksCreateManySalesInput>
    skipDuplicates?: boolean
  }

  export type CompaniesUpsertWithWhereUniqueWithoutSalesInput = {
    where: CompaniesWhereUniqueInput
    update: XOR<CompaniesUpdateWithoutSalesInput, CompaniesUncheckedUpdateWithoutSalesInput>
    create: XOR<CompaniesCreateWithoutSalesInput, CompaniesUncheckedCreateWithoutSalesInput>
  }

  export type CompaniesUpdateWithWhereUniqueWithoutSalesInput = {
    where: CompaniesWhereUniqueInput
    data: XOR<CompaniesUpdateWithoutSalesInput, CompaniesUncheckedUpdateWithoutSalesInput>
  }

  export type CompaniesUpdateManyWithWhereWithoutSalesInput = {
    where: CompaniesScalarWhereInput
    data: XOR<CompaniesUpdateManyMutationInput, CompaniesUncheckedUpdateManyWithoutCompaniesInput>
  }

  export type CompaniesScalarWhereInput = {
    AND?: Enumerable<CompaniesScalarWhereInput>
    OR?: Enumerable<CompaniesScalarWhereInput>
    NOT?: Enumerable<CompaniesScalarWhereInput>
    id?: UuidFilter | string
    name?: StringFilter | string
    logo?: JsonNullableFilter
    sector?: StringFilter | string
    size?: IntFilter | number
    linked_in?: StringFilter | string
    website?: StringFilter | string
    phone_number?: StringFilter | string
    address?: StringFilter | string
    zipcode?: StringFilter | string
    city?: StringFilter | string
    state_abbr?: StringFilter | string
    sales_id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
  }

  export type Contact_notesUpsertWithWhereUniqueWithoutSalesInput = {
    where: Contact_notesWhereUniqueInput
    update: XOR<Contact_notesUpdateWithoutSalesInput, Contact_notesUncheckedUpdateWithoutSalesInput>
    create: XOR<Contact_notesCreateWithoutSalesInput, Contact_notesUncheckedCreateWithoutSalesInput>
  }

  export type Contact_notesUpdateWithWhereUniqueWithoutSalesInput = {
    where: Contact_notesWhereUniqueInput
    data: XOR<Contact_notesUpdateWithoutSalesInput, Contact_notesUncheckedUpdateWithoutSalesInput>
  }

  export type Contact_notesUpdateManyWithWhereWithoutSalesInput = {
    where: Contact_notesScalarWhereInput
    data: XOR<Contact_notesUpdateManyMutationInput, Contact_notesUncheckedUpdateManyWithoutContact_notesInput>
  }

  export type ContactsUpsertWithWhereUniqueWithoutSalesInput = {
    where: ContactsWhereUniqueInput
    update: XOR<ContactsUpdateWithoutSalesInput, ContactsUncheckedUpdateWithoutSalesInput>
    create: XOR<ContactsCreateWithoutSalesInput, ContactsUncheckedCreateWithoutSalesInput>
  }

  export type ContactsUpdateWithWhereUniqueWithoutSalesInput = {
    where: ContactsWhereUniqueInput
    data: XOR<ContactsUpdateWithoutSalesInput, ContactsUncheckedUpdateWithoutSalesInput>
  }

  export type ContactsUpdateManyWithWhereWithoutSalesInput = {
    where: ContactsScalarWhereInput
    data: XOR<ContactsUpdateManyMutationInput, ContactsUncheckedUpdateManyWithoutContactsInput>
  }

  export type Deal_notesUpsertWithWhereUniqueWithoutSalesInput = {
    where: Deal_notesWhereUniqueInput
    update: XOR<Deal_notesUpdateWithoutSalesInput, Deal_notesUncheckedUpdateWithoutSalesInput>
    create: XOR<Deal_notesCreateWithoutSalesInput, Deal_notesUncheckedCreateWithoutSalesInput>
  }

  export type Deal_notesUpdateWithWhereUniqueWithoutSalesInput = {
    where: Deal_notesWhereUniqueInput
    data: XOR<Deal_notesUpdateWithoutSalesInput, Deal_notesUncheckedUpdateWithoutSalesInput>
  }

  export type Deal_notesUpdateManyWithWhereWithoutSalesInput = {
    where: Deal_notesScalarWhereInput
    data: XOR<Deal_notesUpdateManyMutationInput, Deal_notesUncheckedUpdateManyWithoutDeal_notesInput>
  }

  export type DealsUpsertWithWhereUniqueWithoutSalesInput = {
    where: DealsWhereUniqueInput
    update: XOR<DealsUpdateWithoutSalesInput, DealsUncheckedUpdateWithoutSalesInput>
    create: XOR<DealsCreateWithoutSalesInput, DealsUncheckedCreateWithoutSalesInput>
  }

  export type DealsUpdateWithWhereUniqueWithoutSalesInput = {
    where: DealsWhereUniqueInput
    data: XOR<DealsUpdateWithoutSalesInput, DealsUncheckedUpdateWithoutSalesInput>
  }

  export type DealsUpdateManyWithWhereWithoutSalesInput = {
    where: DealsScalarWhereInput
    data: XOR<DealsUpdateManyMutationInput, DealsUncheckedUpdateManyWithoutDealsInput>
  }

  export type TasksUpsertWithWhereUniqueWithoutSalesInput = {
    where: TasksWhereUniqueInput
    update: XOR<TasksUpdateWithoutSalesInput, TasksUncheckedUpdateWithoutSalesInput>
    create: XOR<TasksCreateWithoutSalesInput, TasksUncheckedCreateWithoutSalesInput>
  }

  export type TasksUpdateWithWhereUniqueWithoutSalesInput = {
    where: TasksWhereUniqueInput
    data: XOR<TasksUpdateWithoutSalesInput, TasksUncheckedUpdateWithoutSalesInput>
  }

  export type TasksUpdateManyWithWhereWithoutSalesInput = {
    where: TasksScalarWhereInput
    data: XOR<TasksUpdateManyMutationInput, TasksUncheckedUpdateManyWithoutTasksInput>
  }

  export type ContactsCreateWithoutTasksInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesCreateNestedManyWithoutContactsInput
    companies: CompaniesCreateNestedOneWithoutContactsInput
    sales: SalesCreateNestedOneWithoutContactsInput
  }

  export type ContactsUncheckedCreateWithoutTasksInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsCreateOrConnectWithoutTasksInput = {
    where: ContactsWhereUniqueInput
    create: XOR<ContactsCreateWithoutTasksInput, ContactsUncheckedCreateWithoutTasksInput>
  }

  export type SalesCreateWithoutTasksInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesCreateNestedManyWithoutSalesInput
    contacts?: ContactsCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesCreateNestedManyWithoutSalesInput
    deals?: DealsCreateNestedManyWithoutSalesInput
  }

  export type SalesUncheckedCreateWithoutTasksInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    companies?: CompaniesUncheckedCreateNestedManyWithoutSalesInput
    contact_notes?: Contact_notesUncheckedCreateNestedManyWithoutSalesInput
    contacts?: ContactsUncheckedCreateNestedManyWithoutSalesInput
    deal_notes?: Deal_notesUncheckedCreateNestedManyWithoutSalesInput
    deals?: DealsUncheckedCreateNestedManyWithoutSalesInput
  }

  export type SalesCreateOrConnectWithoutTasksInput = {
    where: SalesWhereUniqueInput
    create: XOR<SalesCreateWithoutTasksInput, SalesUncheckedCreateWithoutTasksInput>
  }

  export type ContactsUpsertWithoutTasksInput = {
    update: XOR<ContactsUpdateWithoutTasksInput, ContactsUncheckedUpdateWithoutTasksInput>
    create: XOR<ContactsCreateWithoutTasksInput, ContactsUncheckedCreateWithoutTasksInput>
  }

  export type ContactsUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUpdateManyWithoutContactsNestedInput
    companies?: CompaniesUpdateOneRequiredWithoutContactsNestedInput
    sales?: SalesUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type SalesUpsertWithoutTasksInput = {
    update: XOR<SalesUpdateWithoutTasksInput, SalesUncheckedUpdateWithoutTasksInput>
    create: XOR<SalesCreateWithoutTasksInput, SalesUncheckedCreateWithoutTasksInput>
  }

  export type SalesUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUpdateManyWithoutSalesNestedInput
    deals?: DealsUpdateManyWithoutSalesNestedInput
  }

  export type SalesUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    companies?: CompaniesUncheckedUpdateManyWithoutSalesNestedInput
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutSalesNestedInput
    contacts?: ContactsUncheckedUpdateManyWithoutSalesNestedInput
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutSalesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutSalesNestedInput
  }

  export type ContactsCreateManyCompaniesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    sales_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DealsCreateManyCompaniesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    sales_id: string
    anindex: number
  }

  export type ContactsUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUpdateManyWithoutContactsNestedInput
    sales?: SalesUpdateOneRequiredWithoutContactsNestedInput
    tasks?: TasksUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutContactsNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateManyWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DealsUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUpdateManyWithoutDealsNestedInput
    sales?: SalesUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealsUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sales_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutDealsNestedInput
  }

  export type DealsUncheckedUpdateManyWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sales_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
  }

  export type Contact_notesCreateManyContactsInput = {
    id: string
    date: Date | string
    type: string
    text: string
    sales_id: string
    status: string
  }

  export type TasksCreateManyContactsInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    sales_id?: string | null
    type?: string | null
  }

  export type Contact_notesUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sales?: SalesUpdateOneRequiredWithoutContact_notesNestedInput
  }

  export type Contact_notesUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type Contact_notesUncheckedUpdateManyWithoutContact_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TasksUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    sales?: SalesUpdateOneWithoutTasksNestedInput
  }

  export type TasksUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    sales_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TasksUncheckedUpdateManyWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    sales_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Deal_notesCreateManyDealsInput = {
    id: string
    date: Date | string
    type: string
    sales_id: string
    text: string
  }

  export type Deal_notesUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sales?: SalesUpdateOneRequiredWithoutDeal_notesNestedInput
  }

  export type Deal_notesUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type Deal_notesUncheckedUpdateManyWithoutDeal_notesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    sales_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type CompaniesCreateManySalesInput = {
    id: string
    name: string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector: string
    size: number
    linked_in: string
    website: string
    phone_number: string
    address: string
    zipcode: string
    city: string
    state_abbr: string
    created_at: Date | string
  }

  export type Contact_notesCreateManySalesInput = {
    id: string
    date: Date | string
    type: string
    text: string
    contact_id?: string | null
    status: string
  }

  export type ContactsCreateManySalesInput = {
    id: string
    first_name: string
    last_name: string
    gender?: string | null
    title?: string | null
    email: string
    phone_number1?: string | null
    phone_number2?: string | null
    background?: string | null
    acquisition?: string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen: Date | string
    last_seen: Date | string
    has_newsletter?: boolean | null
    status: string
    company_id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Deal_notesCreateManySalesInput = {
    id: string
    date: Date | string
    type: string
    deal_id: string
    text: string
  }

  export type DealsCreateManySalesInput = {
    id: string
    created_at: Date | string
    name: string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type: string
    stage: string
    description?: string | null
    amount: number
    updated_at: Date | string
    start_at?: Date | string | null
    company_id: string
    anindex: number
  }

  export type TasksCreateManySalesInput = {
    id: string
    due_date?: Date | string | null
    text?: string | null
    contact_id?: string | null
    type?: string | null
  }

  export type CompaniesUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactsUpdateManyWithoutCompaniesNestedInput
    deals?: DealsUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactsUncheckedUpdateManyWithoutCompaniesNestedInput
    deals?: DealsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type CompaniesUncheckedUpdateManyWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableJsonNullValueInput | InputJsonValue
    sector?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    linked_in?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipcode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state_abbr?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Contact_notesUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contacts?: ContactsUpdateOneWithoutContact_notesNestedInput
  }

  export type Contact_notesUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ContactsUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUpdateManyWithoutContactsNestedInput
    companies?: CompaniesUpdateOneRequiredWithoutContactsNestedInput
    tasks?: TasksUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone_number1?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number2?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    acquisition?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableJsonNullValueInput | InputJsonValue
    first_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    has_newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    contact_notes?: Contact_notesUncheckedUpdateManyWithoutContactsNestedInput
    tasks?: TasksUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type Deal_notesUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    deals?: DealsUpdateOneRequiredWithoutDeal_notesNestedInput
  }

  export type Deal_notesUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    deal_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type DealsUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUpdateManyWithoutDealsNestedInput
    companies?: CompaniesUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealsUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    contact_ids?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    anindex?: IntFieldUpdateOperationsInput | number
    deal_notes?: Deal_notesUncheckedUpdateManyWithoutDealsNestedInput
  }

  export type TasksUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: ContactsUpdateOneWithoutTasksNestedInput
  }

  export type TasksUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    contact_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

type Buffer = Omit<Uint8Array, 'set'>
