
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model usuarios
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type usuarios = $Result.DefaultSelection<Prisma.$usuariosPayload>
/**
 * Model direcciones
 * 
 */
export type direcciones = $Result.DefaultSelection<Prisma.$direccionesPayload>
/**
 * Model pagos
 * 
 */
export type pagos = $Result.DefaultSelection<Prisma.$pagosPayload>
/**
 * Model pedido_items
 * 
 */
export type pedido_items = $Result.DefaultSelection<Prisma.$pedido_itemsPayload>
/**
 * Model pedidos
 * 
 */
export type pedidos = $Result.DefaultSelection<Prisma.$pedidosPayload>
/**
 * Model productos
 * 
 */
export type productos = $Result.DefaultSelection<Prisma.$productosPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuarios.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuarios.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.usuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.direcciones`: Exposes CRUD operations for the **direcciones** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Direcciones
    * const direcciones = await prisma.direcciones.findMany()
    * ```
    */
  get direcciones(): Prisma.direccionesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pagos`: Exposes CRUD operations for the **pagos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pagos.findMany()
    * ```
    */
  get pagos(): Prisma.pagosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedido_items`: Exposes CRUD operations for the **pedido_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedido_items
    * const pedido_items = await prisma.pedido_items.findMany()
    * ```
    */
  get pedido_items(): Prisma.pedido_itemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidos`: Exposes CRUD operations for the **pedidos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedidos.findMany()
    * ```
    */
  get pedidos(): Prisma.pedidosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productos`: Exposes CRUD operations for the **productos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.productos.findMany()
    * ```
    */
  get productos(): Prisma.productosDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    usuarios: 'usuarios',
    direcciones: 'direcciones',
    pagos: 'pagos',
    pedido_items: 'pedido_items',
    pedidos: 'pedidos',
    productos: 'productos'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuarios" | "direcciones" | "pagos" | "pedido_items" | "pedidos" | "productos"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      usuarios: {
        payload: Prisma.$usuariosPayload<ExtArgs>
        fields: Prisma.usuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findFirst: {
            args: Prisma.usuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findMany: {
            args: Prisma.usuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          create: {
            args: Prisma.usuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          createMany: {
            args: Prisma.usuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          delete: {
            args: Prisma.usuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          update: {
            args: Prisma.usuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          deleteMany: {
            args: Prisma.usuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          upsert: {
            args: Prisma.usuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.usuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
          }
        }
      }
      direcciones: {
        payload: Prisma.$direccionesPayload<ExtArgs>
        fields: Prisma.direccionesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.direccionesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.direccionesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          findFirst: {
            args: Prisma.direccionesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.direccionesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          findMany: {
            args: Prisma.direccionesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>[]
          }
          create: {
            args: Prisma.direccionesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          createMany: {
            args: Prisma.direccionesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.direccionesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>[]
          }
          delete: {
            args: Prisma.direccionesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          update: {
            args: Prisma.direccionesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          deleteMany: {
            args: Prisma.direccionesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.direccionesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.direccionesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>[]
          }
          upsert: {
            args: Prisma.direccionesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$direccionesPayload>
          }
          aggregate: {
            args: Prisma.DireccionesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDirecciones>
          }
          groupBy: {
            args: Prisma.direccionesGroupByArgs<ExtArgs>
            result: $Utils.Optional<DireccionesGroupByOutputType>[]
          }
          count: {
            args: Prisma.direccionesCountArgs<ExtArgs>
            result: $Utils.Optional<DireccionesCountAggregateOutputType> | number
          }
        }
      }
      pagos: {
        payload: Prisma.$pagosPayload<ExtArgs>
        fields: Prisma.pagosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pagosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pagosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          findFirst: {
            args: Prisma.pagosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pagosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          findMany: {
            args: Prisma.pagosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          create: {
            args: Prisma.pagosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          createMany: {
            args: Prisma.pagosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pagosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          delete: {
            args: Prisma.pagosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          update: {
            args: Prisma.pagosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          deleteMany: {
            args: Prisma.pagosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pagosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pagosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          upsert: {
            args: Prisma.pagosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          aggregate: {
            args: Prisma.PagosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagos>
          }
          groupBy: {
            args: Prisma.pagosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pagosCountArgs<ExtArgs>
            result: $Utils.Optional<PagosCountAggregateOutputType> | number
          }
        }
      }
      pedido_items: {
        payload: Prisma.$pedido_itemsPayload<ExtArgs>
        fields: Prisma.pedido_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pedido_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pedido_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          findFirst: {
            args: Prisma.pedido_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pedido_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          findMany: {
            args: Prisma.pedido_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>[]
          }
          create: {
            args: Prisma.pedido_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          createMany: {
            args: Prisma.pedido_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pedido_itemsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>[]
          }
          delete: {
            args: Prisma.pedido_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          update: {
            args: Prisma.pedido_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          deleteMany: {
            args: Prisma.pedido_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pedido_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pedido_itemsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>[]
          }
          upsert: {
            args: Prisma.pedido_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedido_itemsPayload>
          }
          aggregate: {
            args: Prisma.Pedido_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido_items>
          }
          groupBy: {
            args: Prisma.pedido_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pedido_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.pedido_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Pedido_itemsCountAggregateOutputType> | number
          }
        }
      }
      pedidos: {
        payload: Prisma.$pedidosPayload<ExtArgs>
        fields: Prisma.pedidosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pedidosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pedidosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findFirst: {
            args: Prisma.pedidosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pedidosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findMany: {
            args: Prisma.pedidosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          create: {
            args: Prisma.pedidosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          createMany: {
            args: Prisma.pedidosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pedidosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          delete: {
            args: Prisma.pedidosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          update: {
            args: Prisma.pedidosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          deleteMany: {
            args: Prisma.pedidosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pedidosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pedidosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          upsert: {
            args: Prisma.pedidosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          aggregate: {
            args: Prisma.PedidosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidos>
          }
          groupBy: {
            args: Prisma.pedidosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pedidosCountArgs<ExtArgs>
            result: $Utils.Optional<PedidosCountAggregateOutputType> | number
          }
        }
      }
      productos: {
        payload: Prisma.$productosPayload<ExtArgs>
        fields: Prisma.productosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          findFirst: {
            args: Prisma.productosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          findMany: {
            args: Prisma.productosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>[]
          }
          create: {
            args: Prisma.productosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          createMany: {
            args: Prisma.productosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>[]
          }
          delete: {
            args: Prisma.productosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          update: {
            args: Prisma.productosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          deleteMany: {
            args: Prisma.productosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>[]
          }
          upsert: {
            args: Prisma.productosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productosPayload>
          }
          aggregate: {
            args: Prisma.ProductosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductos>
          }
          groupBy: {
            args: Prisma.productosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductosGroupByOutputType>[]
          }
          count: {
            args: Prisma.productosCountArgs<ExtArgs>
            result: $Utils.Optional<ProductosCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuarios?: usuariosOmit
    direcciones?: direccionesOmit
    pagos?: pagosOmit
    pedido_items?: pedido_itemsOmit
    pedidos?: pedidosOmit
    productos?: productosOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuariosCountOutputType
   */

  export type UsuariosCountOutputType = {
    direcciones: number
    pedidos: number
  }

  export type UsuariosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    direcciones?: boolean | UsuariosCountOutputTypeCountDireccionesArgs
    pedidos?: boolean | UsuariosCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     */
    select?: UsuariosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountDireccionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: direccionesWhereInput
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
  }


  /**
   * Count Type DireccionesCountOutputType
   */

  export type DireccionesCountOutputType = {
    pedidos: number
  }

  export type DireccionesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | DireccionesCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * DireccionesCountOutputType without action
   */
  export type DireccionesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DireccionesCountOutputType
     */
    select?: DireccionesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DireccionesCountOutputType without action
   */
  export type DireccionesCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
  }


  /**
   * Count Type PedidosCountOutputType
   */

  export type PedidosCountOutputType = {
    pagos: number
    pedido_items: number
  }

  export type PedidosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagos?: boolean | PedidosCountOutputTypeCountPagosArgs
    pedido_items?: boolean | PedidosCountOutputTypeCountPedido_itemsArgs
  }

  // Custom InputTypes
  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidosCountOutputType
     */
    select?: PedidosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagosWhereInput
  }

  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeCountPedido_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedido_itemsWhereInput
  }


  /**
   * Count Type ProductosCountOutputType
   */

  export type ProductosCountOutputType = {
    pedido_items: number
  }

  export type ProductosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido_items?: boolean | ProductosCountOutputTypeCountPedido_itemsArgs
  }

  // Custom InputTypes
  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductosCountOutputType
     */
    select?: ProductosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeCountPedido_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedido_itemsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosMinAggregateOutputType = {
    id: string | null
    email: string | null
    nombre: string | null
    apellido: string | null
    rut: string | null
    hash_pwd: string | null
    telefono: string | null
    creado_en: Date | null
  }

  export type UsuariosMaxAggregateOutputType = {
    id: string | null
    email: string | null
    nombre: string | null
    apellido: string | null
    rut: string | null
    hash_pwd: string | null
    telefono: string | null
    creado_en: Date | null
  }

  export type UsuariosCountAggregateOutputType = {
    id: number
    email: number
    nombre: number
    apellido: number
    rut: number
    hash_pwd: number
    telefono: number
    creado_en: number
    _all: number
  }


  export type UsuariosMinAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    apellido?: true
    rut?: true
    hash_pwd?: true
    telefono?: true
    creado_en?: true
  }

  export type UsuariosMaxAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    apellido?: true
    rut?: true
    hash_pwd?: true
    telefono?: true
    creado_en?: true
  }

  export type UsuariosCountAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    apellido?: true
    rut?: true
    hash_pwd?: true
    telefono?: true
    creado_en?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type usuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithAggregationInput | usuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: usuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    id: string
    email: string
    nombre: string | null
    apellido: string | null
    rut: string | null
    hash_pwd: string
    telefono: string | null
    creado_en: Date | null
    _count: UsuariosCountAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type usuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    apellido?: boolean
    rut?: boolean
    hash_pwd?: boolean
    telefono?: boolean
    creado_en?: boolean
    direcciones?: boolean | usuarios$direccionesArgs<ExtArgs>
    pedidos?: boolean | usuarios$pedidosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    apellido?: boolean
    rut?: boolean
    hash_pwd?: boolean
    telefono?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    apellido?: boolean
    rut?: boolean
    hash_pwd?: boolean
    telefono?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectScalar = {
    id?: boolean
    email?: boolean
    nombre?: boolean
    apellido?: boolean
    rut?: boolean
    hash_pwd?: boolean
    telefono?: boolean
    creado_en?: boolean
  }

  export type usuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "nombre" | "apellido" | "rut" | "hash_pwd" | "telefono" | "creado_en", ExtArgs["result"]["usuarios"]>
  export type usuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    direcciones?: boolean | usuarios$direccionesArgs<ExtArgs>
    pedidos?: boolean | usuarios$pedidosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usuariosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usuariosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios"
    objects: {
      direcciones: Prisma.$direccionesPayload<ExtArgs>[]
      pedidos: Prisma.$pedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      nombre: string | null
      apellido: string | null
      rut: string | null
      hash_pwd: string
      telefono: string | null
      creado_en: Date | null
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = $Result.GetResult<Prisma.$usuariosPayload, S>

  type usuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface usuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios'], meta: { name: 'usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usuariosFindManyArgs>(args?: SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends usuariosCreateArgs>(args: SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuariosCreateManyArgs>(args?: SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends usuariosDeleteArgs>(args: SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuariosUpdateArgs>(args: SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(
      args?: Subset<T, usuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
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
      T extends usuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuariosGroupByArgs['orderBy'] }
        : { orderBy?: usuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios model
   */
  readonly fields: usuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    direcciones<T extends usuarios$direccionesArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$direccionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pedidos<T extends usuarios$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuarios model
   */
  interface usuariosFieldRefs {
    readonly id: FieldRef<"usuarios", 'String'>
    readonly email: FieldRef<"usuarios", 'String'>
    readonly nombre: FieldRef<"usuarios", 'String'>
    readonly apellido: FieldRef<"usuarios", 'String'>
    readonly rut: FieldRef<"usuarios", 'String'>
    readonly hash_pwd: FieldRef<"usuarios", 'String'>
    readonly telefono: FieldRef<"usuarios", 'String'>
    readonly creado_en: FieldRef<"usuarios", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * usuarios findUnique
   */
  export type usuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findUniqueOrThrow
   */
  export type usuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findFirst
   */
  export type usuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findFirstOrThrow
   */
  export type usuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findMany
   */
  export type usuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios create
   */
  export type usuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a usuarios.
     */
    data: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
  }

  /**
   * usuarios createMany
   */
  export type usuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios createManyAndReturn
   */
  export type usuariosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios update
   */
  export type usuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a usuarios.
     */
    data: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
    /**
     * Choose, which usuarios to update.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios updateMany
   */
  export type usuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios updateManyAndReturn
   */
  export type usuariosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios upsert
   */
  export type usuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: usuariosWhereUniqueInput
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
  }

  /**
   * usuarios delete
   */
  export type usuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter which usuarios to delete.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios deleteMany
   */
  export type usuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuarios.direcciones
   */
  export type usuarios$direccionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    where?: direccionesWhereInput
    orderBy?: direccionesOrderByWithRelationInput | direccionesOrderByWithRelationInput[]
    cursor?: direccionesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DireccionesScalarFieldEnum | DireccionesScalarFieldEnum[]
  }

  /**
   * usuarios.pedidos
   */
  export type usuarios$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    cursor?: pedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * usuarios without action
   */
  export type usuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
  }


  /**
   * Model direcciones
   */

  export type AggregateDirecciones = {
    _count: DireccionesCountAggregateOutputType | null
    _min: DireccionesMinAggregateOutputType | null
    _max: DireccionesMaxAggregateOutputType | null
  }

  export type DireccionesMinAggregateOutputType = {
    id: string | null
    usuario_id: string | null
    comuna: string | null
    region: string | null
    calle: string | null
    numero: string | null
    creado_en: Date | null
  }

  export type DireccionesMaxAggregateOutputType = {
    id: string | null
    usuario_id: string | null
    comuna: string | null
    region: string | null
    calle: string | null
    numero: string | null
    creado_en: Date | null
  }

  export type DireccionesCountAggregateOutputType = {
    id: number
    usuario_id: number
    comuna: number
    region: number
    calle: number
    numero: number
    creado_en: number
    _all: number
  }


  export type DireccionesMinAggregateInputType = {
    id?: true
    usuario_id?: true
    comuna?: true
    region?: true
    calle?: true
    numero?: true
    creado_en?: true
  }

  export type DireccionesMaxAggregateInputType = {
    id?: true
    usuario_id?: true
    comuna?: true
    region?: true
    calle?: true
    numero?: true
    creado_en?: true
  }

  export type DireccionesCountAggregateInputType = {
    id?: true
    usuario_id?: true
    comuna?: true
    region?: true
    calle?: true
    numero?: true
    creado_en?: true
    _all?: true
  }

  export type DireccionesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which direcciones to aggregate.
     */
    where?: direccionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of direcciones to fetch.
     */
    orderBy?: direccionesOrderByWithRelationInput | direccionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: direccionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` direcciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` direcciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned direcciones
    **/
    _count?: true | DireccionesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DireccionesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DireccionesMaxAggregateInputType
  }

  export type GetDireccionesAggregateType<T extends DireccionesAggregateArgs> = {
        [P in keyof T & keyof AggregateDirecciones]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDirecciones[P]>
      : GetScalarType<T[P], AggregateDirecciones[P]>
  }




  export type direccionesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: direccionesWhereInput
    orderBy?: direccionesOrderByWithAggregationInput | direccionesOrderByWithAggregationInput[]
    by: DireccionesScalarFieldEnum[] | DireccionesScalarFieldEnum
    having?: direccionesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DireccionesCountAggregateInputType | true
    _min?: DireccionesMinAggregateInputType
    _max?: DireccionesMaxAggregateInputType
  }

  export type DireccionesGroupByOutputType = {
    id: string
    usuario_id: string | null
    comuna: string | null
    region: string | null
    calle: string | null
    numero: string | null
    creado_en: Date | null
    _count: DireccionesCountAggregateOutputType | null
    _min: DireccionesMinAggregateOutputType | null
    _max: DireccionesMaxAggregateOutputType | null
  }

  type GetDireccionesGroupByPayload<T extends direccionesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DireccionesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DireccionesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DireccionesGroupByOutputType[P]>
            : GetScalarType<T[P], DireccionesGroupByOutputType[P]>
        }
      >
    >


  export type direccionesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    comuna?: boolean
    region?: boolean
    calle?: boolean
    numero?: boolean
    creado_en?: boolean
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
    pedidos?: boolean | direcciones$pedidosArgs<ExtArgs>
    _count?: boolean | DireccionesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["direcciones"]>

  export type direccionesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    comuna?: boolean
    region?: boolean
    calle?: boolean
    numero?: boolean
    creado_en?: boolean
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["direcciones"]>

  export type direccionesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    comuna?: boolean
    region?: boolean
    calle?: boolean
    numero?: boolean
    creado_en?: boolean
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["direcciones"]>

  export type direccionesSelectScalar = {
    id?: boolean
    usuario_id?: boolean
    comuna?: boolean
    region?: boolean
    calle?: boolean
    numero?: boolean
    creado_en?: boolean
  }

  export type direccionesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuario_id" | "comuna" | "region" | "calle" | "numero" | "creado_en", ExtArgs["result"]["direcciones"]>
  export type direccionesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
    pedidos?: boolean | direcciones$pedidosArgs<ExtArgs>
    _count?: boolean | DireccionesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type direccionesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
  }
  export type direccionesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | direcciones$usuarioArgs<ExtArgs>
  }

  export type $direccionesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "direcciones"
    objects: {
      usuario: Prisma.$usuariosPayload<ExtArgs> | null
      pedidos: Prisma.$pedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      usuario_id: string | null
      comuna: string | null
      region: string | null
      calle: string | null
      numero: string | null
      creado_en: Date | null
    }, ExtArgs["result"]["direcciones"]>
    composites: {}
  }

  type direccionesGetPayload<S extends boolean | null | undefined | direccionesDefaultArgs> = $Result.GetResult<Prisma.$direccionesPayload, S>

  type direccionesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<direccionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DireccionesCountAggregateInputType | true
    }

  export interface direccionesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['direcciones'], meta: { name: 'direcciones' } }
    /**
     * Find zero or one Direcciones that matches the filter.
     * @param {direccionesFindUniqueArgs} args - Arguments to find a Direcciones
     * @example
     * // Get one Direcciones
     * const direcciones = await prisma.direcciones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends direccionesFindUniqueArgs>(args: SelectSubset<T, direccionesFindUniqueArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Direcciones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {direccionesFindUniqueOrThrowArgs} args - Arguments to find a Direcciones
     * @example
     * // Get one Direcciones
     * const direcciones = await prisma.direcciones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends direccionesFindUniqueOrThrowArgs>(args: SelectSubset<T, direccionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Direcciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesFindFirstArgs} args - Arguments to find a Direcciones
     * @example
     * // Get one Direcciones
     * const direcciones = await prisma.direcciones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends direccionesFindFirstArgs>(args?: SelectSubset<T, direccionesFindFirstArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Direcciones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesFindFirstOrThrowArgs} args - Arguments to find a Direcciones
     * @example
     * // Get one Direcciones
     * const direcciones = await prisma.direcciones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends direccionesFindFirstOrThrowArgs>(args?: SelectSubset<T, direccionesFindFirstOrThrowArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Direcciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Direcciones
     * const direcciones = await prisma.direcciones.findMany()
     * 
     * // Get first 10 Direcciones
     * const direcciones = await prisma.direcciones.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const direccionesWithIdOnly = await prisma.direcciones.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends direccionesFindManyArgs>(args?: SelectSubset<T, direccionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Direcciones.
     * @param {direccionesCreateArgs} args - Arguments to create a Direcciones.
     * @example
     * // Create one Direcciones
     * const Direcciones = await prisma.direcciones.create({
     *   data: {
     *     // ... data to create a Direcciones
     *   }
     * })
     * 
     */
    create<T extends direccionesCreateArgs>(args: SelectSubset<T, direccionesCreateArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Direcciones.
     * @param {direccionesCreateManyArgs} args - Arguments to create many Direcciones.
     * @example
     * // Create many Direcciones
     * const direcciones = await prisma.direcciones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends direccionesCreateManyArgs>(args?: SelectSubset<T, direccionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Direcciones and returns the data saved in the database.
     * @param {direccionesCreateManyAndReturnArgs} args - Arguments to create many Direcciones.
     * @example
     * // Create many Direcciones
     * const direcciones = await prisma.direcciones.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Direcciones and only return the `id`
     * const direccionesWithIdOnly = await prisma.direcciones.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends direccionesCreateManyAndReturnArgs>(args?: SelectSubset<T, direccionesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Direcciones.
     * @param {direccionesDeleteArgs} args - Arguments to delete one Direcciones.
     * @example
     * // Delete one Direcciones
     * const Direcciones = await prisma.direcciones.delete({
     *   where: {
     *     // ... filter to delete one Direcciones
     *   }
     * })
     * 
     */
    delete<T extends direccionesDeleteArgs>(args: SelectSubset<T, direccionesDeleteArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Direcciones.
     * @param {direccionesUpdateArgs} args - Arguments to update one Direcciones.
     * @example
     * // Update one Direcciones
     * const direcciones = await prisma.direcciones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends direccionesUpdateArgs>(args: SelectSubset<T, direccionesUpdateArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Direcciones.
     * @param {direccionesDeleteManyArgs} args - Arguments to filter Direcciones to delete.
     * @example
     * // Delete a few Direcciones
     * const { count } = await prisma.direcciones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends direccionesDeleteManyArgs>(args?: SelectSubset<T, direccionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Direcciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Direcciones
     * const direcciones = await prisma.direcciones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends direccionesUpdateManyArgs>(args: SelectSubset<T, direccionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Direcciones and returns the data updated in the database.
     * @param {direccionesUpdateManyAndReturnArgs} args - Arguments to update many Direcciones.
     * @example
     * // Update many Direcciones
     * const direcciones = await prisma.direcciones.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Direcciones and only return the `id`
     * const direccionesWithIdOnly = await prisma.direcciones.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends direccionesUpdateManyAndReturnArgs>(args: SelectSubset<T, direccionesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Direcciones.
     * @param {direccionesUpsertArgs} args - Arguments to update or create a Direcciones.
     * @example
     * // Update or create a Direcciones
     * const direcciones = await prisma.direcciones.upsert({
     *   create: {
     *     // ... data to create a Direcciones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Direcciones we want to update
     *   }
     * })
     */
    upsert<T extends direccionesUpsertArgs>(args: SelectSubset<T, direccionesUpsertArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Direcciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesCountArgs} args - Arguments to filter Direcciones to count.
     * @example
     * // Count the number of Direcciones
     * const count = await prisma.direcciones.count({
     *   where: {
     *     // ... the filter for the Direcciones we want to count
     *   }
     * })
    **/
    count<T extends direccionesCountArgs>(
      args?: Subset<T, direccionesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DireccionesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Direcciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireccionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DireccionesAggregateArgs>(args: Subset<T, DireccionesAggregateArgs>): Prisma.PrismaPromise<GetDireccionesAggregateType<T>>

    /**
     * Group by Direcciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {direccionesGroupByArgs} args - Group by arguments.
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
      T extends direccionesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: direccionesGroupByArgs['orderBy'] }
        : { orderBy?: direccionesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, direccionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDireccionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the direcciones model
   */
  readonly fields: direccionesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for direcciones.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__direccionesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends direcciones$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, direcciones$usuarioArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pedidos<T extends direcciones$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, direcciones$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the direcciones model
   */
  interface direccionesFieldRefs {
    readonly id: FieldRef<"direcciones", 'String'>
    readonly usuario_id: FieldRef<"direcciones", 'String'>
    readonly comuna: FieldRef<"direcciones", 'String'>
    readonly region: FieldRef<"direcciones", 'String'>
    readonly calle: FieldRef<"direcciones", 'String'>
    readonly numero: FieldRef<"direcciones", 'String'>
    readonly creado_en: FieldRef<"direcciones", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * direcciones findUnique
   */
  export type direccionesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter, which direcciones to fetch.
     */
    where: direccionesWhereUniqueInput
  }

  /**
   * direcciones findUniqueOrThrow
   */
  export type direccionesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter, which direcciones to fetch.
     */
    where: direccionesWhereUniqueInput
  }

  /**
   * direcciones findFirst
   */
  export type direccionesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter, which direcciones to fetch.
     */
    where?: direccionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of direcciones to fetch.
     */
    orderBy?: direccionesOrderByWithRelationInput | direccionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for direcciones.
     */
    cursor?: direccionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` direcciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` direcciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of direcciones.
     */
    distinct?: DireccionesScalarFieldEnum | DireccionesScalarFieldEnum[]
  }

  /**
   * direcciones findFirstOrThrow
   */
  export type direccionesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter, which direcciones to fetch.
     */
    where?: direccionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of direcciones to fetch.
     */
    orderBy?: direccionesOrderByWithRelationInput | direccionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for direcciones.
     */
    cursor?: direccionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` direcciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` direcciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of direcciones.
     */
    distinct?: DireccionesScalarFieldEnum | DireccionesScalarFieldEnum[]
  }

  /**
   * direcciones findMany
   */
  export type direccionesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter, which direcciones to fetch.
     */
    where?: direccionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of direcciones to fetch.
     */
    orderBy?: direccionesOrderByWithRelationInput | direccionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing direcciones.
     */
    cursor?: direccionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` direcciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` direcciones.
     */
    skip?: number
    distinct?: DireccionesScalarFieldEnum | DireccionesScalarFieldEnum[]
  }

  /**
   * direcciones create
   */
  export type direccionesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * The data needed to create a direcciones.
     */
    data?: XOR<direccionesCreateInput, direccionesUncheckedCreateInput>
  }

  /**
   * direcciones createMany
   */
  export type direccionesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many direcciones.
     */
    data: direccionesCreateManyInput | direccionesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * direcciones createManyAndReturn
   */
  export type direccionesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * The data used to create many direcciones.
     */
    data: direccionesCreateManyInput | direccionesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * direcciones update
   */
  export type direccionesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * The data needed to update a direcciones.
     */
    data: XOR<direccionesUpdateInput, direccionesUncheckedUpdateInput>
    /**
     * Choose, which direcciones to update.
     */
    where: direccionesWhereUniqueInput
  }

  /**
   * direcciones updateMany
   */
  export type direccionesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update direcciones.
     */
    data: XOR<direccionesUpdateManyMutationInput, direccionesUncheckedUpdateManyInput>
    /**
     * Filter which direcciones to update
     */
    where?: direccionesWhereInput
    /**
     * Limit how many direcciones to update.
     */
    limit?: number
  }

  /**
   * direcciones updateManyAndReturn
   */
  export type direccionesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * The data used to update direcciones.
     */
    data: XOR<direccionesUpdateManyMutationInput, direccionesUncheckedUpdateManyInput>
    /**
     * Filter which direcciones to update
     */
    where?: direccionesWhereInput
    /**
     * Limit how many direcciones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * direcciones upsert
   */
  export type direccionesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * The filter to search for the direcciones to update in case it exists.
     */
    where: direccionesWhereUniqueInput
    /**
     * In case the direcciones found by the `where` argument doesn't exist, create a new direcciones with this data.
     */
    create: XOR<direccionesCreateInput, direccionesUncheckedCreateInput>
    /**
     * In case the direcciones was found with the provided `where` argument, update it with this data.
     */
    update: XOR<direccionesUpdateInput, direccionesUncheckedUpdateInput>
  }

  /**
   * direcciones delete
   */
  export type direccionesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    /**
     * Filter which direcciones to delete.
     */
    where: direccionesWhereUniqueInput
  }

  /**
   * direcciones deleteMany
   */
  export type direccionesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which direcciones to delete
     */
    where?: direccionesWhereInput
    /**
     * Limit how many direcciones to delete.
     */
    limit?: number
  }

  /**
   * direcciones.usuario
   */
  export type direcciones$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    where?: usuariosWhereInput
  }

  /**
   * direcciones.pedidos
   */
  export type direcciones$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    cursor?: pedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * direcciones without action
   */
  export type direccionesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
  }


  /**
   * Model pagos
   */

  export type AggregatePagos = {
    _count: PagosCountAggregateOutputType | null
    _avg: PagosAvgAggregateOutputType | null
    _sum: PagosSumAggregateOutputType | null
    _min: PagosMinAggregateOutputType | null
    _max: PagosMaxAggregateOutputType | null
  }

  export type PagosAvgAggregateOutputType = {
    monto: Decimal | null
  }

  export type PagosSumAggregateOutputType = {
    monto: Decimal | null
  }

  export type PagosMinAggregateOutputType = {
    id: string | null
    pedido_id: string | null
    proveedor: string | null
    status: string | null
    monto: Decimal | null
    moneda: string | null
    tx_id: string | null
  }

  export type PagosMaxAggregateOutputType = {
    id: string | null
    pedido_id: string | null
    proveedor: string | null
    status: string | null
    monto: Decimal | null
    moneda: string | null
    tx_id: string | null
  }

  export type PagosCountAggregateOutputType = {
    id: number
    pedido_id: number
    proveedor: number
    status: number
    monto: number
    moneda: number
    tx_id: number
    comprobante_json: number
    _all: number
  }


  export type PagosAvgAggregateInputType = {
    monto?: true
  }

  export type PagosSumAggregateInputType = {
    monto?: true
  }

  export type PagosMinAggregateInputType = {
    id?: true
    pedido_id?: true
    proveedor?: true
    status?: true
    monto?: true
    moneda?: true
    tx_id?: true
  }

  export type PagosMaxAggregateInputType = {
    id?: true
    pedido_id?: true
    proveedor?: true
    status?: true
    monto?: true
    moneda?: true
    tx_id?: true
  }

  export type PagosCountAggregateInputType = {
    id?: true
    pedido_id?: true
    proveedor?: true
    status?: true
    monto?: true
    moneda?: true
    tx_id?: true
    comprobante_json?: true
    _all?: true
  }

  export type PagosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagos to aggregate.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pagos
    **/
    _count?: true | PagosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagosMaxAggregateInputType
  }

  export type GetPagosAggregateType<T extends PagosAggregateArgs> = {
        [P in keyof T & keyof AggregatePagos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagos[P]>
      : GetScalarType<T[P], AggregatePagos[P]>
  }




  export type pagosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagosWhereInput
    orderBy?: pagosOrderByWithAggregationInput | pagosOrderByWithAggregationInput[]
    by: PagosScalarFieldEnum[] | PagosScalarFieldEnum
    having?: pagosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagosCountAggregateInputType | true
    _avg?: PagosAvgAggregateInputType
    _sum?: PagosSumAggregateInputType
    _min?: PagosMinAggregateInputType
    _max?: PagosMaxAggregateInputType
  }

  export type PagosGroupByOutputType = {
    id: string
    pedido_id: string | null
    proveedor: string | null
    status: string | null
    monto: Decimal | null
    moneda: string | null
    tx_id: string | null
    comprobante_json: JsonValue | null
    _count: PagosCountAggregateOutputType | null
    _avg: PagosAvgAggregateOutputType | null
    _sum: PagosSumAggregateOutputType | null
    _min: PagosMinAggregateOutputType | null
    _max: PagosMaxAggregateOutputType | null
  }

  type GetPagosGroupByPayload<T extends pagosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagosGroupByOutputType[P]>
            : GetScalarType<T[P], PagosGroupByOutputType[P]>
        }
      >
    >


  export type pagosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    proveedor?: boolean
    status?: boolean
    monto?: boolean
    moneda?: boolean
    tx_id?: boolean
    comprobante_json?: boolean
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    proveedor?: boolean
    status?: boolean
    monto?: boolean
    moneda?: boolean
    tx_id?: boolean
    comprobante_json?: boolean
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    proveedor?: boolean
    status?: boolean
    monto?: boolean
    moneda?: boolean
    tx_id?: boolean
    comprobante_json?: boolean
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectScalar = {
    id?: boolean
    pedido_id?: boolean
    proveedor?: boolean
    status?: boolean
    monto?: boolean
    moneda?: boolean
    tx_id?: boolean
    comprobante_json?: boolean
  }

  export type pagosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedido_id" | "proveedor" | "status" | "monto" | "moneda" | "tx_id" | "comprobante_json", ExtArgs["result"]["pagos"]>
  export type pagosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }
  export type pagosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }
  export type pagosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pagos$pedidosArgs<ExtArgs>
  }

  export type $pagosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pagos"
    objects: {
      pedidos: Prisma.$pedidosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pedido_id: string | null
      proveedor: string | null
      status: string | null
      monto: Prisma.Decimal | null
      moneda: string | null
      tx_id: string | null
      comprobante_json: Prisma.JsonValue | null
    }, ExtArgs["result"]["pagos"]>
    composites: {}
  }

  type pagosGetPayload<S extends boolean | null | undefined | pagosDefaultArgs> = $Result.GetResult<Prisma.$pagosPayload, S>

  type pagosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pagosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagosCountAggregateInputType | true
    }

  export interface pagosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pagos'], meta: { name: 'pagos' } }
    /**
     * Find zero or one Pagos that matches the filter.
     * @param {pagosFindUniqueArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pagosFindUniqueArgs>(args: SelectSubset<T, pagosFindUniqueArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pagos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pagosFindUniqueOrThrowArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pagosFindUniqueOrThrowArgs>(args: SelectSubset<T, pagosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindFirstArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pagosFindFirstArgs>(args?: SelectSubset<T, pagosFindFirstArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindFirstOrThrowArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pagosFindFirstOrThrowArgs>(args?: SelectSubset<T, pagosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pagos.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pagos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagosWithIdOnly = await prisma.pagos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pagosFindManyArgs>(args?: SelectSubset<T, pagosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pagos.
     * @param {pagosCreateArgs} args - Arguments to create a Pagos.
     * @example
     * // Create one Pagos
     * const Pagos = await prisma.pagos.create({
     *   data: {
     *     // ... data to create a Pagos
     *   }
     * })
     * 
     */
    create<T extends pagosCreateArgs>(args: SelectSubset<T, pagosCreateArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {pagosCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pagos = await prisma.pagos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pagosCreateManyArgs>(args?: SelectSubset<T, pagosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {pagosCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pagos = await prisma.pagos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id`
     * const pagosWithIdOnly = await prisma.pagos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pagosCreateManyAndReturnArgs>(args?: SelectSubset<T, pagosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pagos.
     * @param {pagosDeleteArgs} args - Arguments to delete one Pagos.
     * @example
     * // Delete one Pagos
     * const Pagos = await prisma.pagos.delete({
     *   where: {
     *     // ... filter to delete one Pagos
     *   }
     * })
     * 
     */
    delete<T extends pagosDeleteArgs>(args: SelectSubset<T, pagosDeleteArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pagos.
     * @param {pagosUpdateArgs} args - Arguments to update one Pagos.
     * @example
     * // Update one Pagos
     * const pagos = await prisma.pagos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pagosUpdateArgs>(args: SelectSubset<T, pagosUpdateArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {pagosDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pagos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pagosDeleteManyArgs>(args?: SelectSubset<T, pagosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pagos = await prisma.pagos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pagosUpdateManyArgs>(args: SelectSubset<T, pagosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos and returns the data updated in the database.
     * @param {pagosUpdateManyAndReturnArgs} args - Arguments to update many Pagos.
     * @example
     * // Update many Pagos
     * const pagos = await prisma.pagos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagos and only return the `id`
     * const pagosWithIdOnly = await prisma.pagos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pagosUpdateManyAndReturnArgs>(args: SelectSubset<T, pagosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pagos.
     * @param {pagosUpsertArgs} args - Arguments to update or create a Pagos.
     * @example
     * // Update or create a Pagos
     * const pagos = await prisma.pagos.upsert({
     *   create: {
     *     // ... data to create a Pagos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pagos we want to update
     *   }
     * })
     */
    upsert<T extends pagosUpsertArgs>(args: SelectSubset<T, pagosUpsertArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pagos.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends pagosCountArgs>(
      args?: Subset<T, pagosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PagosAggregateArgs>(args: Subset<T, PagosAggregateArgs>): Prisma.PrismaPromise<GetPagosAggregateType<T>>

    /**
     * Group by Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosGroupByArgs} args - Group by arguments.
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
      T extends pagosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pagosGroupByArgs['orderBy'] }
        : { orderBy?: pagosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, pagosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pagos model
   */
  readonly fields: pagosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pagos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pagosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends pagos$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, pagos$pedidosArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pagos model
   */
  interface pagosFieldRefs {
    readonly id: FieldRef<"pagos", 'String'>
    readonly pedido_id: FieldRef<"pagos", 'String'>
    readonly proveedor: FieldRef<"pagos", 'String'>
    readonly status: FieldRef<"pagos", 'String'>
    readonly monto: FieldRef<"pagos", 'Decimal'>
    readonly moneda: FieldRef<"pagos", 'String'>
    readonly tx_id: FieldRef<"pagos", 'String'>
    readonly comprobante_json: FieldRef<"pagos", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * pagos findUnique
   */
  export type pagosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos findUniqueOrThrow
   */
  export type pagosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos findFirst
   */
  export type pagosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagos.
     */
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos findFirstOrThrow
   */
  export type pagosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagos.
     */
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos findMany
   */
  export type pagosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos create
   */
  export type pagosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The data needed to create a pagos.
     */
    data?: XOR<pagosCreateInput, pagosUncheckedCreateInput>
  }

  /**
   * pagos createMany
   */
  export type pagosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pagos.
     */
    data: pagosCreateManyInput | pagosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pagos createManyAndReturn
   */
  export type pagosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * The data used to create many pagos.
     */
    data: pagosCreateManyInput | pagosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pagos update
   */
  export type pagosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The data needed to update a pagos.
     */
    data: XOR<pagosUpdateInput, pagosUncheckedUpdateInput>
    /**
     * Choose, which pagos to update.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos updateMany
   */
  export type pagosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pagos.
     */
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyInput>
    /**
     * Filter which pagos to update
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to update.
     */
    limit?: number
  }

  /**
   * pagos updateManyAndReturn
   */
  export type pagosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * The data used to update pagos.
     */
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyInput>
    /**
     * Filter which pagos to update
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pagos upsert
   */
  export type pagosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The filter to search for the pagos to update in case it exists.
     */
    where: pagosWhereUniqueInput
    /**
     * In case the pagos found by the `where` argument doesn't exist, create a new pagos with this data.
     */
    create: XOR<pagosCreateInput, pagosUncheckedCreateInput>
    /**
     * In case the pagos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pagosUpdateInput, pagosUncheckedUpdateInput>
  }

  /**
   * pagos delete
   */
  export type pagosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter which pagos to delete.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos deleteMany
   */
  export type pagosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagos to delete
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to delete.
     */
    limit?: number
  }

  /**
   * pagos.pedidos
   */
  export type pagos$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
  }

  /**
   * pagos without action
   */
  export type pagosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
  }


  /**
   * Model pedido_items
   */

  export type AggregatePedido_items = {
    _count: Pedido_itemsCountAggregateOutputType | null
    _avg: Pedido_itemsAvgAggregateOutputType | null
    _sum: Pedido_itemsSumAggregateOutputType | null
    _min: Pedido_itemsMinAggregateOutputType | null
    _max: Pedido_itemsMaxAggregateOutputType | null
  }

  export type Pedido_itemsAvgAggregateOutputType = {
    cantidad: number | null
    precio_unit: Decimal | null
  }

  export type Pedido_itemsSumAggregateOutputType = {
    cantidad: number | null
    precio_unit: Decimal | null
  }

  export type Pedido_itemsMinAggregateOutputType = {
    id: string | null
    pedido_id: string | null
    producto_id: string | null
    cantidad: number | null
    precio_unit: Decimal | null
  }

  export type Pedido_itemsMaxAggregateOutputType = {
    id: string | null
    pedido_id: string | null
    producto_id: string | null
    cantidad: number | null
    precio_unit: Decimal | null
  }

  export type Pedido_itemsCountAggregateOutputType = {
    id: number
    pedido_id: number
    producto_id: number
    cantidad: number
    precio_unit: number
    _all: number
  }


  export type Pedido_itemsAvgAggregateInputType = {
    cantidad?: true
    precio_unit?: true
  }

  export type Pedido_itemsSumAggregateInputType = {
    cantidad?: true
    precio_unit?: true
  }

  export type Pedido_itemsMinAggregateInputType = {
    id?: true
    pedido_id?: true
    producto_id?: true
    cantidad?: true
    precio_unit?: true
  }

  export type Pedido_itemsMaxAggregateInputType = {
    id?: true
    pedido_id?: true
    producto_id?: true
    cantidad?: true
    precio_unit?: true
  }

  export type Pedido_itemsCountAggregateInputType = {
    id?: true
    pedido_id?: true
    producto_id?: true
    cantidad?: true
    precio_unit?: true
    _all?: true
  }

  export type Pedido_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedido_items to aggregate.
     */
    where?: pedido_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedido_items to fetch.
     */
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pedido_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedido_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedido_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pedido_items
    **/
    _count?: true | Pedido_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Pedido_itemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Pedido_itemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pedido_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pedido_itemsMaxAggregateInputType
  }

  export type GetPedido_itemsAggregateType<T extends Pedido_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido_items[P]>
      : GetScalarType<T[P], AggregatePedido_items[P]>
  }




  export type pedido_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedido_itemsWhereInput
    orderBy?: pedido_itemsOrderByWithAggregationInput | pedido_itemsOrderByWithAggregationInput[]
    by: Pedido_itemsScalarFieldEnum[] | Pedido_itemsScalarFieldEnum
    having?: pedido_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pedido_itemsCountAggregateInputType | true
    _avg?: Pedido_itemsAvgAggregateInputType
    _sum?: Pedido_itemsSumAggregateInputType
    _min?: Pedido_itemsMinAggregateInputType
    _max?: Pedido_itemsMaxAggregateInputType
  }

  export type Pedido_itemsGroupByOutputType = {
    id: string
    pedido_id: string | null
    producto_id: string | null
    cantidad: number
    precio_unit: Decimal
    _count: Pedido_itemsCountAggregateOutputType | null
    _avg: Pedido_itemsAvgAggregateOutputType | null
    _sum: Pedido_itemsSumAggregateOutputType | null
    _min: Pedido_itemsMinAggregateOutputType | null
    _max: Pedido_itemsMaxAggregateOutputType | null
  }

  type GetPedido_itemsGroupByPayload<T extends pedido_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pedido_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pedido_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pedido_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Pedido_itemsGroupByOutputType[P]>
        }
      >
    >


  export type pedido_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    producto_id?: boolean
    cantidad?: boolean
    precio_unit?: boolean
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }, ExtArgs["result"]["pedido_items"]>

  export type pedido_itemsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    producto_id?: boolean
    cantidad?: boolean
    precio_unit?: boolean
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }, ExtArgs["result"]["pedido_items"]>

  export type pedido_itemsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    producto_id?: boolean
    cantidad?: boolean
    precio_unit?: boolean
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }, ExtArgs["result"]["pedido_items"]>

  export type pedido_itemsSelectScalar = {
    id?: boolean
    pedido_id?: boolean
    producto_id?: boolean
    cantidad?: boolean
    precio_unit?: boolean
  }

  export type pedido_itemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedido_id" | "producto_id" | "cantidad" | "precio_unit", ExtArgs["result"]["pedido_items"]>
  export type pedido_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }
  export type pedido_itemsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }
  export type pedido_itemsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | pedido_items$pedidosArgs<ExtArgs>
    productos?: boolean | pedido_items$productosArgs<ExtArgs>
  }

  export type $pedido_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pedido_items"
    objects: {
      pedidos: Prisma.$pedidosPayload<ExtArgs> | null
      productos: Prisma.$productosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pedido_id: string | null
      producto_id: string | null
      cantidad: number
      precio_unit: Prisma.Decimal
    }, ExtArgs["result"]["pedido_items"]>
    composites: {}
  }

  type pedido_itemsGetPayload<S extends boolean | null | undefined | pedido_itemsDefaultArgs> = $Result.GetResult<Prisma.$pedido_itemsPayload, S>

  type pedido_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pedido_itemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Pedido_itemsCountAggregateInputType | true
    }

  export interface pedido_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pedido_items'], meta: { name: 'pedido_items' } }
    /**
     * Find zero or one Pedido_items that matches the filter.
     * @param {pedido_itemsFindUniqueArgs} args - Arguments to find a Pedido_items
     * @example
     * // Get one Pedido_items
     * const pedido_items = await prisma.pedido_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pedido_itemsFindUniqueArgs>(args: SelectSubset<T, pedido_itemsFindUniqueArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedido_items that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pedido_itemsFindUniqueOrThrowArgs} args - Arguments to find a Pedido_items
     * @example
     * // Get one Pedido_items
     * const pedido_items = await prisma.pedido_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pedido_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, pedido_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsFindFirstArgs} args - Arguments to find a Pedido_items
     * @example
     * // Get one Pedido_items
     * const pedido_items = await prisma.pedido_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pedido_itemsFindFirstArgs>(args?: SelectSubset<T, pedido_itemsFindFirstArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsFindFirstOrThrowArgs} args - Arguments to find a Pedido_items
     * @example
     * // Get one Pedido_items
     * const pedido_items = await prisma.pedido_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pedido_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, pedido_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedido_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedido_items
     * const pedido_items = await prisma.pedido_items.findMany()
     * 
     * // Get first 10 Pedido_items
     * const pedido_items = await prisma.pedido_items.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedido_itemsWithIdOnly = await prisma.pedido_items.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pedido_itemsFindManyArgs>(args?: SelectSubset<T, pedido_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedido_items.
     * @param {pedido_itemsCreateArgs} args - Arguments to create a Pedido_items.
     * @example
     * // Create one Pedido_items
     * const Pedido_items = await prisma.pedido_items.create({
     *   data: {
     *     // ... data to create a Pedido_items
     *   }
     * })
     * 
     */
    create<T extends pedido_itemsCreateArgs>(args: SelectSubset<T, pedido_itemsCreateArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedido_items.
     * @param {pedido_itemsCreateManyArgs} args - Arguments to create many Pedido_items.
     * @example
     * // Create many Pedido_items
     * const pedido_items = await prisma.pedido_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pedido_itemsCreateManyArgs>(args?: SelectSubset<T, pedido_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedido_items and returns the data saved in the database.
     * @param {pedido_itemsCreateManyAndReturnArgs} args - Arguments to create many Pedido_items.
     * @example
     * // Create many Pedido_items
     * const pedido_items = await prisma.pedido_items.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedido_items and only return the `id`
     * const pedido_itemsWithIdOnly = await prisma.pedido_items.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pedido_itemsCreateManyAndReturnArgs>(args?: SelectSubset<T, pedido_itemsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedido_items.
     * @param {pedido_itemsDeleteArgs} args - Arguments to delete one Pedido_items.
     * @example
     * // Delete one Pedido_items
     * const Pedido_items = await prisma.pedido_items.delete({
     *   where: {
     *     // ... filter to delete one Pedido_items
     *   }
     * })
     * 
     */
    delete<T extends pedido_itemsDeleteArgs>(args: SelectSubset<T, pedido_itemsDeleteArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedido_items.
     * @param {pedido_itemsUpdateArgs} args - Arguments to update one Pedido_items.
     * @example
     * // Update one Pedido_items
     * const pedido_items = await prisma.pedido_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pedido_itemsUpdateArgs>(args: SelectSubset<T, pedido_itemsUpdateArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedido_items.
     * @param {pedido_itemsDeleteManyArgs} args - Arguments to filter Pedido_items to delete.
     * @example
     * // Delete a few Pedido_items
     * const { count } = await prisma.pedido_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pedido_itemsDeleteManyArgs>(args?: SelectSubset<T, pedido_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedido_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedido_items
     * const pedido_items = await prisma.pedido_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pedido_itemsUpdateManyArgs>(args: SelectSubset<T, pedido_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedido_items and returns the data updated in the database.
     * @param {pedido_itemsUpdateManyAndReturnArgs} args - Arguments to update many Pedido_items.
     * @example
     * // Update many Pedido_items
     * const pedido_items = await prisma.pedido_items.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedido_items and only return the `id`
     * const pedido_itemsWithIdOnly = await prisma.pedido_items.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pedido_itemsUpdateManyAndReturnArgs>(args: SelectSubset<T, pedido_itemsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedido_items.
     * @param {pedido_itemsUpsertArgs} args - Arguments to update or create a Pedido_items.
     * @example
     * // Update or create a Pedido_items
     * const pedido_items = await prisma.pedido_items.upsert({
     *   create: {
     *     // ... data to create a Pedido_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido_items we want to update
     *   }
     * })
     */
    upsert<T extends pedido_itemsUpsertArgs>(args: SelectSubset<T, pedido_itemsUpsertArgs<ExtArgs>>): Prisma__pedido_itemsClient<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedido_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsCountArgs} args - Arguments to filter Pedido_items to count.
     * @example
     * // Count the number of Pedido_items
     * const count = await prisma.pedido_items.count({
     *   where: {
     *     // ... the filter for the Pedido_items we want to count
     *   }
     * })
    **/
    count<T extends pedido_itemsCountArgs>(
      args?: Subset<T, pedido_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pedido_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pedido_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Pedido_itemsAggregateArgs>(args: Subset<T, Pedido_itemsAggregateArgs>): Prisma.PrismaPromise<GetPedido_itemsAggregateType<T>>

    /**
     * Group by Pedido_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedido_itemsGroupByArgs} args - Group by arguments.
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
      T extends pedido_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pedido_itemsGroupByArgs['orderBy'] }
        : { orderBy?: pedido_itemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, pedido_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedido_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pedido_items model
   */
  readonly fields: pedido_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pedido_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pedido_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends pedido_items$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, pedido_items$pedidosArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    productos<T extends pedido_items$productosArgs<ExtArgs> = {}>(args?: Subset<T, pedido_items$productosArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pedido_items model
   */
  interface pedido_itemsFieldRefs {
    readonly id: FieldRef<"pedido_items", 'String'>
    readonly pedido_id: FieldRef<"pedido_items", 'String'>
    readonly producto_id: FieldRef<"pedido_items", 'String'>
    readonly cantidad: FieldRef<"pedido_items", 'Int'>
    readonly precio_unit: FieldRef<"pedido_items", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * pedido_items findUnique
   */
  export type pedido_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter, which pedido_items to fetch.
     */
    where: pedido_itemsWhereUniqueInput
  }

  /**
   * pedido_items findUniqueOrThrow
   */
  export type pedido_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter, which pedido_items to fetch.
     */
    where: pedido_itemsWhereUniqueInput
  }

  /**
   * pedido_items findFirst
   */
  export type pedido_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter, which pedido_items to fetch.
     */
    where?: pedido_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedido_items to fetch.
     */
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedido_items.
     */
    cursor?: pedido_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedido_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedido_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedido_items.
     */
    distinct?: Pedido_itemsScalarFieldEnum | Pedido_itemsScalarFieldEnum[]
  }

  /**
   * pedido_items findFirstOrThrow
   */
  export type pedido_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter, which pedido_items to fetch.
     */
    where?: pedido_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedido_items to fetch.
     */
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedido_items.
     */
    cursor?: pedido_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedido_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedido_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedido_items.
     */
    distinct?: Pedido_itemsScalarFieldEnum | Pedido_itemsScalarFieldEnum[]
  }

  /**
   * pedido_items findMany
   */
  export type pedido_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter, which pedido_items to fetch.
     */
    where?: pedido_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedido_items to fetch.
     */
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pedido_items.
     */
    cursor?: pedido_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedido_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedido_items.
     */
    skip?: number
    distinct?: Pedido_itemsScalarFieldEnum | Pedido_itemsScalarFieldEnum[]
  }

  /**
   * pedido_items create
   */
  export type pedido_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a pedido_items.
     */
    data: XOR<pedido_itemsCreateInput, pedido_itemsUncheckedCreateInput>
  }

  /**
   * pedido_items createMany
   */
  export type pedido_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pedido_items.
     */
    data: pedido_itemsCreateManyInput | pedido_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pedido_items createManyAndReturn
   */
  export type pedido_itemsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * The data used to create many pedido_items.
     */
    data: pedido_itemsCreateManyInput | pedido_itemsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedido_items update
   */
  export type pedido_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a pedido_items.
     */
    data: XOR<pedido_itemsUpdateInput, pedido_itemsUncheckedUpdateInput>
    /**
     * Choose, which pedido_items to update.
     */
    where: pedido_itemsWhereUniqueInput
  }

  /**
   * pedido_items updateMany
   */
  export type pedido_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pedido_items.
     */
    data: XOR<pedido_itemsUpdateManyMutationInput, pedido_itemsUncheckedUpdateManyInput>
    /**
     * Filter which pedido_items to update
     */
    where?: pedido_itemsWhereInput
    /**
     * Limit how many pedido_items to update.
     */
    limit?: number
  }

  /**
   * pedido_items updateManyAndReturn
   */
  export type pedido_itemsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * The data used to update pedido_items.
     */
    data: XOR<pedido_itemsUpdateManyMutationInput, pedido_itemsUncheckedUpdateManyInput>
    /**
     * Filter which pedido_items to update
     */
    where?: pedido_itemsWhereInput
    /**
     * Limit how many pedido_items to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedido_items upsert
   */
  export type pedido_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the pedido_items to update in case it exists.
     */
    where: pedido_itemsWhereUniqueInput
    /**
     * In case the pedido_items found by the `where` argument doesn't exist, create a new pedido_items with this data.
     */
    create: XOR<pedido_itemsCreateInput, pedido_itemsUncheckedCreateInput>
    /**
     * In case the pedido_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pedido_itemsUpdateInput, pedido_itemsUncheckedUpdateInput>
  }

  /**
   * pedido_items delete
   */
  export type pedido_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    /**
     * Filter which pedido_items to delete.
     */
    where: pedido_itemsWhereUniqueInput
  }

  /**
   * pedido_items deleteMany
   */
  export type pedido_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedido_items to delete
     */
    where?: pedido_itemsWhereInput
    /**
     * Limit how many pedido_items to delete.
     */
    limit?: number
  }

  /**
   * pedido_items.pedidos
   */
  export type pedido_items$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
  }

  /**
   * pedido_items.productos
   */
  export type pedido_items$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    where?: productosWhereInput
  }

  /**
   * pedido_items without action
   */
  export type pedido_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
  }


  /**
   * Model pedidos
   */

  export type AggregatePedidos = {
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  export type PedidosAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type PedidosSumAggregateOutputType = {
    total: Decimal | null
  }

  export type PedidosMinAggregateOutputType = {
    id: string | null
    usuario_id: string | null
    total: Decimal | null
    estado: string | null
    fecha: Date | null
    direccion_envio_id: string | null
  }

  export type PedidosMaxAggregateOutputType = {
    id: string | null
    usuario_id: string | null
    total: Decimal | null
    estado: string | null
    fecha: Date | null
    direccion_envio_id: string | null
  }

  export type PedidosCountAggregateOutputType = {
    id: number
    usuario_id: number
    total: number
    estado: number
    fecha: number
    direccion_envio_id: number
    _all: number
  }


  export type PedidosAvgAggregateInputType = {
    total?: true
  }

  export type PedidosSumAggregateInputType = {
    total?: true
  }

  export type PedidosMinAggregateInputType = {
    id?: true
    usuario_id?: true
    total?: true
    estado?: true
    fecha?: true
    direccion_envio_id?: true
  }

  export type PedidosMaxAggregateInputType = {
    id?: true
    usuario_id?: true
    total?: true
    estado?: true
    fecha?: true
    direccion_envio_id?: true
  }

  export type PedidosCountAggregateInputType = {
    id?: true
    usuario_id?: true
    total?: true
    estado?: true
    fecha?: true
    direccion_envio_id?: true
    _all?: true
  }

  export type PedidosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to aggregate.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pedidos
    **/
    _count?: true | PedidosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidosMaxAggregateInputType
  }

  export type GetPedidosAggregateType<T extends PedidosAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidos[P]>
      : GetScalarType<T[P], AggregatePedidos[P]>
  }




  export type pedidosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithAggregationInput | pedidosOrderByWithAggregationInput[]
    by: PedidosScalarFieldEnum[] | PedidosScalarFieldEnum
    having?: pedidosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidosCountAggregateInputType | true
    _avg?: PedidosAvgAggregateInputType
    _sum?: PedidosSumAggregateInputType
    _min?: PedidosMinAggregateInputType
    _max?: PedidosMaxAggregateInputType
  }

  export type PedidosGroupByOutputType = {
    id: string
    usuario_id: string | null
    total: Decimal | null
    estado: string | null
    fecha: Date | null
    direccion_envio_id: string | null
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  type GetPedidosGroupByPayload<T extends pedidosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidosGroupByOutputType[P]>
            : GetScalarType<T[P], PedidosGroupByOutputType[P]>
        }
      >
    >


  export type pedidosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    total?: boolean
    estado?: boolean
    fecha?: boolean
    direccion_envio_id?: boolean
    pagos?: boolean | pedidos$pagosArgs<ExtArgs>
    pedido_items?: boolean | pedidos$pedido_itemsArgs<ExtArgs>
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    total?: boolean
    estado?: boolean
    fecha?: boolean
    direccion_envio_id?: boolean
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario_id?: boolean
    total?: boolean
    estado?: boolean
    fecha?: boolean
    direccion_envio_id?: boolean
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectScalar = {
    id?: boolean
    usuario_id?: boolean
    total?: boolean
    estado?: boolean
    fecha?: boolean
    direccion_envio_id?: boolean
  }

  export type pedidosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuario_id" | "total" | "estado" | "fecha" | "direccion_envio_id", ExtArgs["result"]["pedidos"]>
  export type pedidosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagos?: boolean | pedidos$pagosArgs<ExtArgs>
    pedido_items?: boolean | pedidos$pedido_itemsArgs<ExtArgs>
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type pedidosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
  }
  export type pedidosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    direcciones?: boolean | pedidos$direccionesArgs<ExtArgs>
    usuarios?: boolean | pedidos$usuariosArgs<ExtArgs>
  }

  export type $pedidosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pedidos"
    objects: {
      pagos: Prisma.$pagosPayload<ExtArgs>[]
      pedido_items: Prisma.$pedido_itemsPayload<ExtArgs>[]
      direcciones: Prisma.$direccionesPayload<ExtArgs> | null
      usuarios: Prisma.$usuariosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      usuario_id: string | null
      total: Prisma.Decimal | null
      estado: string | null
      fecha: Date | null
      direccion_envio_id: string | null
    }, ExtArgs["result"]["pedidos"]>
    composites: {}
  }

  type pedidosGetPayload<S extends boolean | null | undefined | pedidosDefaultArgs> = $Result.GetResult<Prisma.$pedidosPayload, S>

  type pedidosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pedidosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidosCountAggregateInputType | true
    }

  export interface pedidosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pedidos'], meta: { name: 'pedidos' } }
    /**
     * Find zero or one Pedidos that matches the filter.
     * @param {pedidosFindUniqueArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pedidosFindUniqueArgs>(args: SelectSubset<T, pedidosFindUniqueArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedidos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pedidosFindUniqueOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pedidosFindUniqueOrThrowArgs>(args: SelectSubset<T, pedidosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pedidosFindFirstArgs>(args?: SelectSubset<T, pedidosFindFirstArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pedidosFindFirstOrThrowArgs>(args?: SelectSubset<T, pedidosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedidos.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedidos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pedidosFindManyArgs>(args?: SelectSubset<T, pedidosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedidos.
     * @param {pedidosCreateArgs} args - Arguments to create a Pedidos.
     * @example
     * // Create one Pedidos
     * const Pedidos = await prisma.pedidos.create({
     *   data: {
     *     // ... data to create a Pedidos
     *   }
     * })
     * 
     */
    create<T extends pedidosCreateArgs>(args: SelectSubset<T, pedidosCreateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {pedidosCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pedidosCreateManyArgs>(args?: SelectSubset<T, pedidosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {pedidosCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pedidosCreateManyAndReturnArgs>(args?: SelectSubset<T, pedidosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedidos.
     * @param {pedidosDeleteArgs} args - Arguments to delete one Pedidos.
     * @example
     * // Delete one Pedidos
     * const Pedidos = await prisma.pedidos.delete({
     *   where: {
     *     // ... filter to delete one Pedidos
     *   }
     * })
     * 
     */
    delete<T extends pedidosDeleteArgs>(args: SelectSubset<T, pedidosDeleteArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedidos.
     * @param {pedidosUpdateArgs} args - Arguments to update one Pedidos.
     * @example
     * // Update one Pedidos
     * const pedidos = await prisma.pedidos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pedidosUpdateArgs>(args: SelectSubset<T, pedidosUpdateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {pedidosDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedidos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pedidosDeleteManyArgs>(args?: SelectSubset<T, pedidosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pedidosUpdateManyArgs>(args: SelectSubset<T, pedidosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {pedidosUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pedidosUpdateManyAndReturnArgs>(args: SelectSubset<T, pedidosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedidos.
     * @param {pedidosUpsertArgs} args - Arguments to update or create a Pedidos.
     * @example
     * // Update or create a Pedidos
     * const pedidos = await prisma.pedidos.upsert({
     *   create: {
     *     // ... data to create a Pedidos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedidos we want to update
     *   }
     * })
     */
    upsert<T extends pedidosUpsertArgs>(args: SelectSubset<T, pedidosUpsertArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedidos.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends pedidosCountArgs>(
      args?: Subset<T, pedidosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PedidosAggregateArgs>(args: Subset<T, PedidosAggregateArgs>): Prisma.PrismaPromise<GetPedidosAggregateType<T>>

    /**
     * Group by Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosGroupByArgs} args - Group by arguments.
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
      T extends pedidosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pedidosGroupByArgs['orderBy'] }
        : { orderBy?: pedidosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, pedidosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pedidos model
   */
  readonly fields: pedidosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pedidos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pedidosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pagos<T extends pedidos$pagosArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pedido_items<T extends pedidos$pedido_itemsArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$pedido_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    direcciones<T extends pedidos$direccionesArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$direccionesArgs<ExtArgs>>): Prisma__direccionesClient<$Result.GetResult<Prisma.$direccionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    usuarios<T extends pedidos$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$usuariosArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pedidos model
   */
  interface pedidosFieldRefs {
    readonly id: FieldRef<"pedidos", 'String'>
    readonly usuario_id: FieldRef<"pedidos", 'String'>
    readonly total: FieldRef<"pedidos", 'Decimal'>
    readonly estado: FieldRef<"pedidos", 'String'>
    readonly fecha: FieldRef<"pedidos", 'DateTime'>
    readonly direccion_envio_id: FieldRef<"pedidos", 'String'>
  }
    

  // Custom InputTypes
  /**
   * pedidos findUnique
   */
  export type pedidosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findUniqueOrThrow
   */
  export type pedidosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findFirst
   */
  export type pedidosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findFirstOrThrow
   */
  export type pedidosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findMany
   */
  export type pedidosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos create
   */
  export type pedidosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to create a pedidos.
     */
    data?: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
  }

  /**
   * pedidos createMany
   */
  export type pedidosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pedidos.
     */
    data: pedidosCreateManyInput | pedidosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pedidos createManyAndReturn
   */
  export type pedidosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * The data used to create many pedidos.
     */
    data: pedidosCreateManyInput | pedidosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedidos update
   */
  export type pedidosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to update a pedidos.
     */
    data: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
    /**
     * Choose, which pedidos to update.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos updateMany
   */
  export type pedidosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pedidos.
     */
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyInput>
    /**
     * Filter which pedidos to update
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to update.
     */
    limit?: number
  }

  /**
   * pedidos updateManyAndReturn
   */
  export type pedidosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * The data used to update pedidos.
     */
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyInput>
    /**
     * Filter which pedidos to update
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedidos upsert
   */
  export type pedidosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The filter to search for the pedidos to update in case it exists.
     */
    where: pedidosWhereUniqueInput
    /**
     * In case the pedidos found by the `where` argument doesn't exist, create a new pedidos with this data.
     */
    create: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
    /**
     * In case the pedidos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
  }

  /**
   * pedidos delete
   */
  export type pedidosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter which pedidos to delete.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos deleteMany
   */
  export type pedidosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to delete
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to delete.
     */
    limit?: number
  }

  /**
   * pedidos.pagos
   */
  export type pedidos$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    where?: pagosWhereInput
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    cursor?: pagosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pedidos.pedido_items
   */
  export type pedidos$pedido_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    where?: pedido_itemsWhereInput
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    cursor?: pedido_itemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Pedido_itemsScalarFieldEnum | Pedido_itemsScalarFieldEnum[]
  }

  /**
   * pedidos.direcciones
   */
  export type pedidos$direccionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the direcciones
     */
    select?: direccionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the direcciones
     */
    omit?: direccionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: direccionesInclude<ExtArgs> | null
    where?: direccionesWhereInput
  }

  /**
   * pedidos.usuarios
   */
  export type pedidos$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    where?: usuariosWhereInput
  }

  /**
   * pedidos without action
   */
  export type pedidosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
  }


  /**
   * Model productos
   */

  export type AggregateProductos = {
    _count: ProductosCountAggregateOutputType | null
    _avg: ProductosAvgAggregateOutputType | null
    _sum: ProductosSumAggregateOutputType | null
    _min: ProductosMinAggregateOutputType | null
    _max: ProductosMaxAggregateOutputType | null
  }

  export type ProductosAvgAggregateOutputType = {
    precio: Decimal | null
    stock: number | null
  }

  export type ProductosSumAggregateOutputType = {
    precio: Decimal | null
    stock: number | null
  }

  export type ProductosMinAggregateOutputType = {
    id: string | null
    sku: string | null
    titulo: string | null
    descripcion: string | null
    precio: Decimal | null
    stock: number | null
    categoria: string | null
    creado_en: Date | null
  }

  export type ProductosMaxAggregateOutputType = {
    id: string | null
    sku: string | null
    titulo: string | null
    descripcion: string | null
    precio: Decimal | null
    stock: number | null
    categoria: string | null
    creado_en: Date | null
  }

  export type ProductosCountAggregateOutputType = {
    id: number
    sku: number
    titulo: number
    descripcion: number
    precio: number
    stock: number
    categoria: number
    imagenes: number
    creado_en: number
    _all: number
  }


  export type ProductosAvgAggregateInputType = {
    precio?: true
    stock?: true
  }

  export type ProductosSumAggregateInputType = {
    precio?: true
    stock?: true
  }

  export type ProductosMinAggregateInputType = {
    id?: true
    sku?: true
    titulo?: true
    descripcion?: true
    precio?: true
    stock?: true
    categoria?: true
    creado_en?: true
  }

  export type ProductosMaxAggregateInputType = {
    id?: true
    sku?: true
    titulo?: true
    descripcion?: true
    precio?: true
    stock?: true
    categoria?: true
    creado_en?: true
  }

  export type ProductosCountAggregateInputType = {
    id?: true
    sku?: true
    titulo?: true
    descripcion?: true
    precio?: true
    stock?: true
    categoria?: true
    imagenes?: true
    creado_en?: true
    _all?: true
  }

  export type ProductosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productos to aggregate.
     */
    where?: productosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productosOrderByWithRelationInput | productosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productos
    **/
    _count?: true | ProductosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductosMaxAggregateInputType
  }

  export type GetProductosAggregateType<T extends ProductosAggregateArgs> = {
        [P in keyof T & keyof AggregateProductos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductos[P]>
      : GetScalarType<T[P], AggregateProductos[P]>
  }




  export type productosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productosWhereInput
    orderBy?: productosOrderByWithAggregationInput | productosOrderByWithAggregationInput[]
    by: ProductosScalarFieldEnum[] | ProductosScalarFieldEnum
    having?: productosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductosCountAggregateInputType | true
    _avg?: ProductosAvgAggregateInputType
    _sum?: ProductosSumAggregateInputType
    _min?: ProductosMinAggregateInputType
    _max?: ProductosMaxAggregateInputType
  }

  export type ProductosGroupByOutputType = {
    id: string
    sku: string
    titulo: string
    descripcion: string | null
    precio: Decimal
    stock: number | null
    categoria: string | null
    imagenes: string[]
    creado_en: Date | null
    _count: ProductosCountAggregateOutputType | null
    _avg: ProductosAvgAggregateOutputType | null
    _sum: ProductosSumAggregateOutputType | null
    _min: ProductosMinAggregateOutputType | null
    _max: ProductosMaxAggregateOutputType | null
  }

  type GetProductosGroupByPayload<T extends productosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductosGroupByOutputType[P]>
            : GetScalarType<T[P], ProductosGroupByOutputType[P]>
        }
      >
    >


  export type productosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    stock?: boolean
    categoria?: boolean
    imagenes?: boolean
    creado_en?: boolean
    pedido_items?: boolean | productos$pedido_itemsArgs<ExtArgs>
    _count?: boolean | ProductosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productos"]>

  export type productosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    stock?: boolean
    categoria?: boolean
    imagenes?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["productos"]>

  export type productosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    stock?: boolean
    categoria?: boolean
    imagenes?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["productos"]>

  export type productosSelectScalar = {
    id?: boolean
    sku?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    stock?: boolean
    categoria?: boolean
    imagenes?: boolean
    creado_en?: boolean
  }

  export type productosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sku" | "titulo" | "descripcion" | "precio" | "stock" | "categoria" | "imagenes" | "creado_en", ExtArgs["result"]["productos"]>
  export type productosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido_items?: boolean | productos$pedido_itemsArgs<ExtArgs>
    _count?: boolean | ProductosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type productosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type productosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $productosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "productos"
    objects: {
      pedido_items: Prisma.$pedido_itemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sku: string
      titulo: string
      descripcion: string | null
      precio: Prisma.Decimal
      stock: number | null
      categoria: string | null
      imagenes: string[]
      creado_en: Date | null
    }, ExtArgs["result"]["productos"]>
    composites: {}
  }

  type productosGetPayload<S extends boolean | null | undefined | productosDefaultArgs> = $Result.GetResult<Prisma.$productosPayload, S>

  type productosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductosCountAggregateInputType | true
    }

  export interface productosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['productos'], meta: { name: 'productos' } }
    /**
     * Find zero or one Productos that matches the filter.
     * @param {productosFindUniqueArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productosFindUniqueArgs>(args: SelectSubset<T, productosFindUniqueArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productosFindUniqueOrThrowArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productosFindUniqueOrThrowArgs>(args: SelectSubset<T, productosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosFindFirstArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productosFindFirstArgs>(args?: SelectSubset<T, productosFindFirstArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosFindFirstOrThrowArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productosFindFirstOrThrowArgs>(args?: SelectSubset<T, productosFindFirstOrThrowArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.productos.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.productos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productosWithIdOnly = await prisma.productos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productosFindManyArgs>(args?: SelectSubset<T, productosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productos.
     * @param {productosCreateArgs} args - Arguments to create a Productos.
     * @example
     * // Create one Productos
     * const Productos = await prisma.productos.create({
     *   data: {
     *     // ... data to create a Productos
     *   }
     * })
     * 
     */
    create<T extends productosCreateArgs>(args: SelectSubset<T, productosCreateArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {productosCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const productos = await prisma.productos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productosCreateManyArgs>(args?: SelectSubset<T, productosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {productosCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const productos = await prisma.productos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `id`
     * const productosWithIdOnly = await prisma.productos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productosCreateManyAndReturnArgs>(args?: SelectSubset<T, productosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Productos.
     * @param {productosDeleteArgs} args - Arguments to delete one Productos.
     * @example
     * // Delete one Productos
     * const Productos = await prisma.productos.delete({
     *   where: {
     *     // ... filter to delete one Productos
     *   }
     * })
     * 
     */
    delete<T extends productosDeleteArgs>(args: SelectSubset<T, productosDeleteArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productos.
     * @param {productosUpdateArgs} args - Arguments to update one Productos.
     * @example
     * // Update one Productos
     * const productos = await prisma.productos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productosUpdateArgs>(args: SelectSubset<T, productosUpdateArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {productosDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.productos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productosDeleteManyArgs>(args?: SelectSubset<T, productosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const productos = await prisma.productos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productosUpdateManyArgs>(args: SelectSubset<T, productosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos and returns the data updated in the database.
     * @param {productosUpdateManyAndReturnArgs} args - Arguments to update many Productos.
     * @example
     * // Update many Productos
     * const productos = await prisma.productos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productos and only return the `id`
     * const productosWithIdOnly = await prisma.productos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productosUpdateManyAndReturnArgs>(args: SelectSubset<T, productosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Productos.
     * @param {productosUpsertArgs} args - Arguments to update or create a Productos.
     * @example
     * // Update or create a Productos
     * const productos = await prisma.productos.upsert({
     *   create: {
     *     // ... data to create a Productos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productos we want to update
     *   }
     * })
     */
    upsert<T extends productosUpsertArgs>(args: SelectSubset<T, productosUpsertArgs<ExtArgs>>): Prisma__productosClient<$Result.GetResult<Prisma.$productosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.productos.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends productosCountArgs>(
      args?: Subset<T, productosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductosAggregateArgs>(args: Subset<T, ProductosAggregateArgs>): Prisma.PrismaPromise<GetProductosAggregateType<T>>

    /**
     * Group by Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productosGroupByArgs} args - Group by arguments.
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
      T extends productosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productosGroupByArgs['orderBy'] }
        : { orderBy?: productosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, productosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the productos model
   */
  readonly fields: productosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for productos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido_items<T extends productos$pedido_itemsArgs<ExtArgs> = {}>(args?: Subset<T, productos$pedido_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedido_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the productos model
   */
  interface productosFieldRefs {
    readonly id: FieldRef<"productos", 'String'>
    readonly sku: FieldRef<"productos", 'String'>
    readonly titulo: FieldRef<"productos", 'String'>
    readonly descripcion: FieldRef<"productos", 'String'>
    readonly precio: FieldRef<"productos", 'Decimal'>
    readonly stock: FieldRef<"productos", 'Int'>
    readonly categoria: FieldRef<"productos", 'String'>
    readonly imagenes: FieldRef<"productos", 'String[]'>
    readonly creado_en: FieldRef<"productos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * productos findUnique
   */
  export type productosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where: productosWhereUniqueInput
  }

  /**
   * productos findUniqueOrThrow
   */
  export type productosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where: productosWhereUniqueInput
  }

  /**
   * productos findFirst
   */
  export type productosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where?: productosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productosOrderByWithRelationInput | productosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productos.
     */
    cursor?: productosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productos.
     */
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * productos findFirstOrThrow
   */
  export type productosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where?: productosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productosOrderByWithRelationInput | productosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productos.
     */
    cursor?: productosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productos.
     */
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * productos findMany
   */
  export type productosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where?: productosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productosOrderByWithRelationInput | productosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productos.
     */
    cursor?: productosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * productos create
   */
  export type productosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * The data needed to create a productos.
     */
    data: XOR<productosCreateInput, productosUncheckedCreateInput>
  }

  /**
   * productos createMany
   */
  export type productosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productos.
     */
    data: productosCreateManyInput | productosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * productos createManyAndReturn
   */
  export type productosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * The data used to create many productos.
     */
    data: productosCreateManyInput | productosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * productos update
   */
  export type productosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * The data needed to update a productos.
     */
    data: XOR<productosUpdateInput, productosUncheckedUpdateInput>
    /**
     * Choose, which productos to update.
     */
    where: productosWhereUniqueInput
  }

  /**
   * productos updateMany
   */
  export type productosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productos.
     */
    data: XOR<productosUpdateManyMutationInput, productosUncheckedUpdateManyInput>
    /**
     * Filter which productos to update
     */
    where?: productosWhereInput
    /**
     * Limit how many productos to update.
     */
    limit?: number
  }

  /**
   * productos updateManyAndReturn
   */
  export type productosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * The data used to update productos.
     */
    data: XOR<productosUpdateManyMutationInput, productosUncheckedUpdateManyInput>
    /**
     * Filter which productos to update
     */
    where?: productosWhereInput
    /**
     * Limit how many productos to update.
     */
    limit?: number
  }

  /**
   * productos upsert
   */
  export type productosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * The filter to search for the productos to update in case it exists.
     */
    where: productosWhereUniqueInput
    /**
     * In case the productos found by the `where` argument doesn't exist, create a new productos with this data.
     */
    create: XOR<productosCreateInput, productosUncheckedCreateInput>
    /**
     * In case the productos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productosUpdateInput, productosUncheckedUpdateInput>
  }

  /**
   * productos delete
   */
  export type productosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
    /**
     * Filter which productos to delete.
     */
    where: productosWhereUniqueInput
  }

  /**
   * productos deleteMany
   */
  export type productosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productos to delete
     */
    where?: productosWhereInput
    /**
     * Limit how many productos to delete.
     */
    limit?: number
  }

  /**
   * productos.pedido_items
   */
  export type productos$pedido_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedido_items
     */
    select?: pedido_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedido_items
     */
    omit?: pedido_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedido_itemsInclude<ExtArgs> | null
    where?: pedido_itemsWhereInput
    orderBy?: pedido_itemsOrderByWithRelationInput | pedido_itemsOrderByWithRelationInput[]
    cursor?: pedido_itemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Pedido_itemsScalarFieldEnum | Pedido_itemsScalarFieldEnum[]
  }

  /**
   * productos without action
   */
  export type productosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productos
     */
    select?: productosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productos
     */
    omit?: productosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productosInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuariosScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nombre: 'nombre',
    apellido: 'apellido',
    rut: 'rut',
    hash_pwd: 'hash_pwd',
    telefono: 'telefono',
    creado_en: 'creado_en'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const DireccionesScalarFieldEnum: {
    id: 'id',
    usuario_id: 'usuario_id',
    comuna: 'comuna',
    region: 'region',
    calle: 'calle',
    numero: 'numero',
    creado_en: 'creado_en'
  };

  export type DireccionesScalarFieldEnum = (typeof DireccionesScalarFieldEnum)[keyof typeof DireccionesScalarFieldEnum]


  export const PagosScalarFieldEnum: {
    id: 'id',
    pedido_id: 'pedido_id',
    proveedor: 'proveedor',
    status: 'status',
    monto: 'monto',
    moneda: 'moneda',
    tx_id: 'tx_id',
    comprobante_json: 'comprobante_json'
  };

  export type PagosScalarFieldEnum = (typeof PagosScalarFieldEnum)[keyof typeof PagosScalarFieldEnum]


  export const Pedido_itemsScalarFieldEnum: {
    id: 'id',
    pedido_id: 'pedido_id',
    producto_id: 'producto_id',
    cantidad: 'cantidad',
    precio_unit: 'precio_unit'
  };

  export type Pedido_itemsScalarFieldEnum = (typeof Pedido_itemsScalarFieldEnum)[keyof typeof Pedido_itemsScalarFieldEnum]


  export const PedidosScalarFieldEnum: {
    id: 'id',
    usuario_id: 'usuario_id',
    total: 'total',
    estado: 'estado',
    fecha: 'fecha',
    direccion_envio_id: 'direccion_envio_id'
  };

  export type PedidosScalarFieldEnum = (typeof PedidosScalarFieldEnum)[keyof typeof PedidosScalarFieldEnum]


  export const ProductosScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    titulo: 'titulo',
    descripcion: 'descripcion',
    precio: 'precio',
    stock: 'stock',
    categoria: 'categoria',
    imagenes: 'imagenes',
    creado_en: 'creado_en'
  };

  export type ProductosScalarFieldEnum = (typeof ProductosScalarFieldEnum)[keyof typeof ProductosScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usuariosWhereInput = {
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    id?: UuidFilter<"usuarios"> | string
    email?: StringFilter<"usuarios"> | string
    nombre?: StringNullableFilter<"usuarios"> | string | null
    apellido?: StringNullableFilter<"usuarios"> | string | null
    rut?: StringNullableFilter<"usuarios"> | string | null
    hash_pwd?: StringFilter<"usuarios"> | string
    telefono?: StringNullableFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    direcciones?: DireccionesListRelationFilter
    pedidos?: PedidosListRelationFilter
  }

  export type usuariosOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrderInput | SortOrder
    apellido?: SortOrderInput | SortOrder
    rut?: SortOrderInput | SortOrder
    hash_pwd?: SortOrder
    telefono?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    direcciones?: direccionesOrderByRelationAggregateInput
    pedidos?: pedidosOrderByRelationAggregateInput
  }

  export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    nombre?: StringNullableFilter<"usuarios"> | string | null
    apellido?: StringNullableFilter<"usuarios"> | string | null
    rut?: StringNullableFilter<"usuarios"> | string | null
    hash_pwd?: StringFilter<"usuarios"> | string
    telefono?: StringNullableFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    direcciones?: DireccionesListRelationFilter
    pedidos?: PedidosListRelationFilter
  }, "id" | "email">

  export type usuariosOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrderInput | SortOrder
    apellido?: SortOrderInput | SortOrder
    rut?: SortOrderInput | SortOrder
    hash_pwd?: SortOrder
    telefono?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    _count?: usuariosCountOrderByAggregateInput
    _max?: usuariosMaxOrderByAggregateInput
    _min?: usuariosMinOrderByAggregateInput
  }

  export type usuariosScalarWhereWithAggregatesInput = {
    AND?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    OR?: usuariosScalarWhereWithAggregatesInput[]
    NOT?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"usuarios"> | string
    email?: StringWithAggregatesFilter<"usuarios"> | string
    nombre?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    apellido?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    rut?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    hash_pwd?: StringWithAggregatesFilter<"usuarios"> | string
    telefono?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null
  }

  export type direccionesWhereInput = {
    AND?: direccionesWhereInput | direccionesWhereInput[]
    OR?: direccionesWhereInput[]
    NOT?: direccionesWhereInput | direccionesWhereInput[]
    id?: UuidFilter<"direcciones"> | string
    usuario_id?: UuidNullableFilter<"direcciones"> | string | null
    comuna?: StringNullableFilter<"direcciones"> | string | null
    region?: StringNullableFilter<"direcciones"> | string | null
    calle?: StringNullableFilter<"direcciones"> | string | null
    numero?: StringNullableFilter<"direcciones"> | string | null
    creado_en?: DateTimeNullableFilter<"direcciones"> | Date | string | null
    usuario?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
    pedidos?: PedidosListRelationFilter
  }

  export type direccionesOrderByWithRelationInput = {
    id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    comuna?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    calle?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    usuario?: usuariosOrderByWithRelationInput
    pedidos?: pedidosOrderByRelationAggregateInput
  }

  export type direccionesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: direccionesWhereInput | direccionesWhereInput[]
    OR?: direccionesWhereInput[]
    NOT?: direccionesWhereInput | direccionesWhereInput[]
    usuario_id?: UuidNullableFilter<"direcciones"> | string | null
    comuna?: StringNullableFilter<"direcciones"> | string | null
    region?: StringNullableFilter<"direcciones"> | string | null
    calle?: StringNullableFilter<"direcciones"> | string | null
    numero?: StringNullableFilter<"direcciones"> | string | null
    creado_en?: DateTimeNullableFilter<"direcciones"> | Date | string | null
    usuario?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
    pedidos?: PedidosListRelationFilter
  }, "id">

  export type direccionesOrderByWithAggregationInput = {
    id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    comuna?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    calle?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    _count?: direccionesCountOrderByAggregateInput
    _max?: direccionesMaxOrderByAggregateInput
    _min?: direccionesMinOrderByAggregateInput
  }

  export type direccionesScalarWhereWithAggregatesInput = {
    AND?: direccionesScalarWhereWithAggregatesInput | direccionesScalarWhereWithAggregatesInput[]
    OR?: direccionesScalarWhereWithAggregatesInput[]
    NOT?: direccionesScalarWhereWithAggregatesInput | direccionesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"direcciones"> | string
    usuario_id?: UuidNullableWithAggregatesFilter<"direcciones"> | string | null
    comuna?: StringNullableWithAggregatesFilter<"direcciones"> | string | null
    region?: StringNullableWithAggregatesFilter<"direcciones"> | string | null
    calle?: StringNullableWithAggregatesFilter<"direcciones"> | string | null
    numero?: StringNullableWithAggregatesFilter<"direcciones"> | string | null
    creado_en?: DateTimeNullableWithAggregatesFilter<"direcciones"> | Date | string | null
  }

  export type pagosWhereInput = {
    AND?: pagosWhereInput | pagosWhereInput[]
    OR?: pagosWhereInput[]
    NOT?: pagosWhereInput | pagosWhereInput[]
    id?: UuidFilter<"pagos"> | string
    pedido_id?: UuidNullableFilter<"pagos"> | string | null
    proveedor?: StringNullableFilter<"pagos"> | string | null
    status?: StringNullableFilter<"pagos"> | string | null
    monto?: DecimalNullableFilter<"pagos"> | Decimal | DecimalJsLike | number | string | null
    moneda?: StringNullableFilter<"pagos"> | string | null
    tx_id?: StringNullableFilter<"pagos"> | string | null
    comprobante_json?: JsonNullableFilter<"pagos">
    pedidos?: XOR<PedidosNullableScalarRelationFilter, pedidosWhereInput> | null
  }

  export type pagosOrderByWithRelationInput = {
    id?: SortOrder
    pedido_id?: SortOrderInput | SortOrder
    proveedor?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    monto?: SortOrderInput | SortOrder
    moneda?: SortOrderInput | SortOrder
    tx_id?: SortOrderInput | SortOrder
    comprobante_json?: SortOrderInput | SortOrder
    pedidos?: pedidosOrderByWithRelationInput
  }

  export type pagosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pagosWhereInput | pagosWhereInput[]
    OR?: pagosWhereInput[]
    NOT?: pagosWhereInput | pagosWhereInput[]
    pedido_id?: UuidNullableFilter<"pagos"> | string | null
    proveedor?: StringNullableFilter<"pagos"> | string | null
    status?: StringNullableFilter<"pagos"> | string | null
    monto?: DecimalNullableFilter<"pagos"> | Decimal | DecimalJsLike | number | string | null
    moneda?: StringNullableFilter<"pagos"> | string | null
    tx_id?: StringNullableFilter<"pagos"> | string | null
    comprobante_json?: JsonNullableFilter<"pagos">
    pedidos?: XOR<PedidosNullableScalarRelationFilter, pedidosWhereInput> | null
  }, "id">

  export type pagosOrderByWithAggregationInput = {
    id?: SortOrder
    pedido_id?: SortOrderInput | SortOrder
    proveedor?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    monto?: SortOrderInput | SortOrder
    moneda?: SortOrderInput | SortOrder
    tx_id?: SortOrderInput | SortOrder
    comprobante_json?: SortOrderInput | SortOrder
    _count?: pagosCountOrderByAggregateInput
    _avg?: pagosAvgOrderByAggregateInput
    _max?: pagosMaxOrderByAggregateInput
    _min?: pagosMinOrderByAggregateInput
    _sum?: pagosSumOrderByAggregateInput
  }

  export type pagosScalarWhereWithAggregatesInput = {
    AND?: pagosScalarWhereWithAggregatesInput | pagosScalarWhereWithAggregatesInput[]
    OR?: pagosScalarWhereWithAggregatesInput[]
    NOT?: pagosScalarWhereWithAggregatesInput | pagosScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"pagos"> | string
    pedido_id?: UuidNullableWithAggregatesFilter<"pagos"> | string | null
    proveedor?: StringNullableWithAggregatesFilter<"pagos"> | string | null
    status?: StringNullableWithAggregatesFilter<"pagos"> | string | null
    monto?: DecimalNullableWithAggregatesFilter<"pagos"> | Decimal | DecimalJsLike | number | string | null
    moneda?: StringNullableWithAggregatesFilter<"pagos"> | string | null
    tx_id?: StringNullableWithAggregatesFilter<"pagos"> | string | null
    comprobante_json?: JsonNullableWithAggregatesFilter<"pagos">
  }

  export type pedido_itemsWhereInput = {
    AND?: pedido_itemsWhereInput | pedido_itemsWhereInput[]
    OR?: pedido_itemsWhereInput[]
    NOT?: pedido_itemsWhereInput | pedido_itemsWhereInput[]
    id?: UuidFilter<"pedido_items"> | string
    pedido_id?: UuidNullableFilter<"pedido_items"> | string | null
    producto_id?: UuidNullableFilter<"pedido_items"> | string | null
    cantidad?: IntFilter<"pedido_items"> | number
    precio_unit?: DecimalFilter<"pedido_items"> | Decimal | DecimalJsLike | number | string
    pedidos?: XOR<PedidosNullableScalarRelationFilter, pedidosWhereInput> | null
    productos?: XOR<ProductosNullableScalarRelationFilter, productosWhereInput> | null
  }

  export type pedido_itemsOrderByWithRelationInput = {
    id?: SortOrder
    pedido_id?: SortOrderInput | SortOrder
    producto_id?: SortOrderInput | SortOrder
    cantidad?: SortOrder
    precio_unit?: SortOrder
    pedidos?: pedidosOrderByWithRelationInput
    productos?: productosOrderByWithRelationInput
  }

  export type pedido_itemsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pedido_itemsWhereInput | pedido_itemsWhereInput[]
    OR?: pedido_itemsWhereInput[]
    NOT?: pedido_itemsWhereInput | pedido_itemsWhereInput[]
    pedido_id?: UuidNullableFilter<"pedido_items"> | string | null
    producto_id?: UuidNullableFilter<"pedido_items"> | string | null
    cantidad?: IntFilter<"pedido_items"> | number
    precio_unit?: DecimalFilter<"pedido_items"> | Decimal | DecimalJsLike | number | string
    pedidos?: XOR<PedidosNullableScalarRelationFilter, pedidosWhereInput> | null
    productos?: XOR<ProductosNullableScalarRelationFilter, productosWhereInput> | null
  }, "id">

  export type pedido_itemsOrderByWithAggregationInput = {
    id?: SortOrder
    pedido_id?: SortOrderInput | SortOrder
    producto_id?: SortOrderInput | SortOrder
    cantidad?: SortOrder
    precio_unit?: SortOrder
    _count?: pedido_itemsCountOrderByAggregateInput
    _avg?: pedido_itemsAvgOrderByAggregateInput
    _max?: pedido_itemsMaxOrderByAggregateInput
    _min?: pedido_itemsMinOrderByAggregateInput
    _sum?: pedido_itemsSumOrderByAggregateInput
  }

  export type pedido_itemsScalarWhereWithAggregatesInput = {
    AND?: pedido_itemsScalarWhereWithAggregatesInput | pedido_itemsScalarWhereWithAggregatesInput[]
    OR?: pedido_itemsScalarWhereWithAggregatesInput[]
    NOT?: pedido_itemsScalarWhereWithAggregatesInput | pedido_itemsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"pedido_items"> | string
    pedido_id?: UuidNullableWithAggregatesFilter<"pedido_items"> | string | null
    producto_id?: UuidNullableWithAggregatesFilter<"pedido_items"> | string | null
    cantidad?: IntWithAggregatesFilter<"pedido_items"> | number
    precio_unit?: DecimalWithAggregatesFilter<"pedido_items"> | Decimal | DecimalJsLike | number | string
  }

  export type pedidosWhereInput = {
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    id?: UuidFilter<"pedidos"> | string
    usuario_id?: UuidNullableFilter<"pedidos"> | string | null
    total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"pedidos"> | string | null
    fecha?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    direccion_envio_id?: UuidNullableFilter<"pedidos"> | string | null
    pagos?: PagosListRelationFilter
    pedido_items?: Pedido_itemsListRelationFilter
    direcciones?: XOR<DireccionesNullableScalarRelationFilter, direccionesWhereInput> | null
    usuarios?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
  }

  export type pedidosOrderByWithRelationInput = {
    id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    fecha?: SortOrderInput | SortOrder
    direccion_envio_id?: SortOrderInput | SortOrder
    pagos?: pagosOrderByRelationAggregateInput
    pedido_items?: pedido_itemsOrderByRelationAggregateInput
    direcciones?: direccionesOrderByWithRelationInput
    usuarios?: usuariosOrderByWithRelationInput
  }

  export type pedidosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    usuario_id?: UuidNullableFilter<"pedidos"> | string | null
    total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"pedidos"> | string | null
    fecha?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    direccion_envio_id?: UuidNullableFilter<"pedidos"> | string | null
    pagos?: PagosListRelationFilter
    pedido_items?: Pedido_itemsListRelationFilter
    direcciones?: XOR<DireccionesNullableScalarRelationFilter, direccionesWhereInput> | null
    usuarios?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
  }, "id">

  export type pedidosOrderByWithAggregationInput = {
    id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    fecha?: SortOrderInput | SortOrder
    direccion_envio_id?: SortOrderInput | SortOrder
    _count?: pedidosCountOrderByAggregateInput
    _avg?: pedidosAvgOrderByAggregateInput
    _max?: pedidosMaxOrderByAggregateInput
    _min?: pedidosMinOrderByAggregateInput
    _sum?: pedidosSumOrderByAggregateInput
  }

  export type pedidosScalarWhereWithAggregatesInput = {
    AND?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    OR?: pedidosScalarWhereWithAggregatesInput[]
    NOT?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"pedidos"> | string
    usuario_id?: UuidNullableWithAggregatesFilter<"pedidos"> | string | null
    total?: DecimalNullableWithAggregatesFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    fecha?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    direccion_envio_id?: UuidNullableWithAggregatesFilter<"pedidos"> | string | null
  }

  export type productosWhereInput = {
    AND?: productosWhereInput | productosWhereInput[]
    OR?: productosWhereInput[]
    NOT?: productosWhereInput | productosWhereInput[]
    id?: UuidFilter<"productos"> | string
    sku?: StringFilter<"productos"> | string
    titulo?: StringFilter<"productos"> | string
    descripcion?: StringNullableFilter<"productos"> | string | null
    precio?: DecimalFilter<"productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntNullableFilter<"productos"> | number | null
    categoria?: StringNullableFilter<"productos"> | string | null
    imagenes?: StringNullableListFilter<"productos">
    creado_en?: DateTimeNullableFilter<"productos"> | Date | string | null
    pedido_items?: Pedido_itemsListRelationFilter
  }

  export type productosOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    precio?: SortOrder
    stock?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    imagenes?: SortOrder
    creado_en?: SortOrderInput | SortOrder
    pedido_items?: pedido_itemsOrderByRelationAggregateInput
  }

  export type productosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: productosWhereInput | productosWhereInput[]
    OR?: productosWhereInput[]
    NOT?: productosWhereInput | productosWhereInput[]
    titulo?: StringFilter<"productos"> | string
    descripcion?: StringNullableFilter<"productos"> | string | null
    precio?: DecimalFilter<"productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntNullableFilter<"productos"> | number | null
    categoria?: StringNullableFilter<"productos"> | string | null
    imagenes?: StringNullableListFilter<"productos">
    creado_en?: DateTimeNullableFilter<"productos"> | Date | string | null
    pedido_items?: Pedido_itemsListRelationFilter
  }, "id" | "sku">

  export type productosOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    precio?: SortOrder
    stock?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    imagenes?: SortOrder
    creado_en?: SortOrderInput | SortOrder
    _count?: productosCountOrderByAggregateInput
    _avg?: productosAvgOrderByAggregateInput
    _max?: productosMaxOrderByAggregateInput
    _min?: productosMinOrderByAggregateInput
    _sum?: productosSumOrderByAggregateInput
  }

  export type productosScalarWhereWithAggregatesInput = {
    AND?: productosScalarWhereWithAggregatesInput | productosScalarWhereWithAggregatesInput[]
    OR?: productosScalarWhereWithAggregatesInput[]
    NOT?: productosScalarWhereWithAggregatesInput | productosScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"productos"> | string
    sku?: StringWithAggregatesFilter<"productos"> | string
    titulo?: StringWithAggregatesFilter<"productos"> | string
    descripcion?: StringNullableWithAggregatesFilter<"productos"> | string | null
    precio?: DecimalWithAggregatesFilter<"productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntNullableWithAggregatesFilter<"productos"> | number | null
    categoria?: StringNullableWithAggregatesFilter<"productos"> | string | null
    imagenes?: StringNullableListFilter<"productos">
    creado_en?: DateTimeNullableWithAggregatesFilter<"productos"> | Date | string | null
  }

  export type usuariosCreateInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    direcciones?: direccionesCreateNestedManyWithoutUsuarioInput
    pedidos?: pedidosCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    direcciones?: direccionesUncheckedCreateNestedManyWithoutUsuarioInput
    pedidos?: pedidosUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direcciones?: direccionesUpdateManyWithoutUsuarioNestedInput
    pedidos?: pedidosUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direcciones?: direccionesUncheckedUpdateManyWithoutUsuarioNestedInput
    pedidos?: pedidosUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosCreateManyInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
  }

  export type usuariosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usuariosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type direccionesCreateInput = {
    id?: string
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
    usuario?: usuariosCreateNestedOneWithoutDireccionesInput
    pedidos?: pedidosCreateNestedManyWithoutDireccionesInput
  }

  export type direccionesUncheckedCreateInput = {
    id?: string
    usuario_id?: string | null
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
    pedidos?: pedidosUncheckedCreateNestedManyWithoutDireccionesInput
  }

  export type direccionesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: usuariosUpdateOneWithoutDireccionesNestedInput
    pedidos?: pedidosUpdateManyWithoutDireccionesNestedInput
  }

  export type direccionesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedidos?: pedidosUncheckedUpdateManyWithoutDireccionesNestedInput
  }

  export type direccionesCreateManyInput = {
    id?: string
    usuario_id?: string | null
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
  }

  export type direccionesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type direccionesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosCreateInput = {
    id?: string
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
    pedidos?: pedidosCreateNestedOneWithoutPagosInput
  }

  export type pagosUncheckedCreateInput = {
    id?: string
    pedido_id?: string | null
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
    pedidos?: pedidosUpdateOneWithoutPagosNestedInput
  }

  export type pagosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosCreateManyInput = {
    id?: string
    pedido_id?: string | null
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pedido_itemsCreateInput = {
    id?: string
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
    pedidos?: pedidosCreateNestedOneWithoutPedido_itemsInput
    productos?: productosCreateNestedOneWithoutPedido_itemsInput
  }

  export type pedido_itemsUncheckedCreateInput = {
    id?: string
    pedido_id?: string | null
    producto_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pedidos?: pedidosUpdateOneWithoutPedido_itemsNestedInput
    productos?: productosUpdateOneWithoutPedido_itemsNestedInput
  }

  export type pedido_itemsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    producto_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsCreateManyInput = {
    id?: string
    pedido_id?: string | null
    producto_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    producto_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedidosCreateInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsCreateNestedManyWithoutPedidosInput
    direcciones?: direccionesCreateNestedOneWithoutPedidosInput
    usuarios?: usuariosCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type pedidosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUpdateManyWithoutPedidosNestedInput
    direcciones?: direccionesUpdateOneWithoutPedidosNestedInput
    usuarios?: usuariosUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
    pagos?: pagosUncheckedUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type pedidosCreateManyInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
  }

  export type pedidosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pedidosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productosCreateInput = {
    id?: string
    sku: string
    titulo: string
    descripcion?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number | null
    categoria?: string | null
    imagenes?: productosCreateimagenesInput | string[]
    creado_en?: Date | string | null
    pedido_items?: pedido_itemsCreateNestedManyWithoutProductosInput
  }

  export type productosUncheckedCreateInput = {
    id?: string
    sku: string
    titulo: string
    descripcion?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number | null
    categoria?: string | null
    imagenes?: productosCreateimagenesInput | string[]
    creado_en?: Date | string | null
    pedido_items?: pedido_itemsUncheckedCreateNestedManyWithoutProductosInput
  }

  export type productosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedido_items?: pedido_itemsUpdateManyWithoutProductosNestedInput
  }

  export type productosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedido_items?: pedido_itemsUncheckedUpdateManyWithoutProductosNestedInput
  }

  export type productosCreateManyInput = {
    id?: string
    sku: string
    titulo: string
    descripcion?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number | null
    categoria?: string | null
    imagenes?: productosCreateimagenesInput | string[]
    creado_en?: Date | string | null
  }

  export type productosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type productosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DireccionesListRelationFilter = {
    every?: direccionesWhereInput
    some?: direccionesWhereInput
    none?: direccionesWhereInput
  }

  export type PedidosListRelationFilter = {
    every?: pedidosWhereInput
    some?: pedidosWhereInput
    none?: pedidosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type direccionesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pedidosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuariosCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    rut?: SortOrder
    hash_pwd?: SortOrder
    telefono?: SortOrder
    creado_en?: SortOrder
  }

  export type usuariosMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    rut?: SortOrder
    hash_pwd?: SortOrder
    telefono?: SortOrder
    creado_en?: SortOrder
  }

  export type usuariosMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    rut?: SortOrder
    hash_pwd?: SortOrder
    telefono?: SortOrder
    creado_en?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UsuariosNullableScalarRelationFilter = {
    is?: usuariosWhereInput | null
    isNot?: usuariosWhereInput | null
  }

  export type direccionesCountOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    comuna?: SortOrder
    region?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    creado_en?: SortOrder
  }

  export type direccionesMaxOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    comuna?: SortOrder
    region?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    creado_en?: SortOrder
  }

  export type direccionesMinOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    comuna?: SortOrder
    region?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    creado_en?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PedidosNullableScalarRelationFilter = {
    is?: pedidosWhereInput | null
    isNot?: pedidosWhereInput | null
  }

  export type pagosCountOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    proveedor?: SortOrder
    status?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    tx_id?: SortOrder
    comprobante_json?: SortOrder
  }

  export type pagosAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type pagosMaxOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    proveedor?: SortOrder
    status?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    tx_id?: SortOrder
  }

  export type pagosMinOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    proveedor?: SortOrder
    status?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    tx_id?: SortOrder
  }

  export type pagosSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ProductosNullableScalarRelationFilter = {
    is?: productosWhereInput | null
    isNot?: productosWhereInput | null
  }

  export type pedido_itemsCountOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    producto_id?: SortOrder
    cantidad?: SortOrder
    precio_unit?: SortOrder
  }

  export type pedido_itemsAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precio_unit?: SortOrder
  }

  export type pedido_itemsMaxOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    producto_id?: SortOrder
    cantidad?: SortOrder
    precio_unit?: SortOrder
  }

  export type pedido_itemsMinOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    producto_id?: SortOrder
    cantidad?: SortOrder
    precio_unit?: SortOrder
  }

  export type pedido_itemsSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precio_unit?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type PagosListRelationFilter = {
    every?: pagosWhereInput
    some?: pagosWhereInput
    none?: pagosWhereInput
  }

  export type Pedido_itemsListRelationFilter = {
    every?: pedido_itemsWhereInput
    some?: pedido_itemsWhereInput
    none?: pedido_itemsWhereInput
  }

  export type DireccionesNullableScalarRelationFilter = {
    is?: direccionesWhereInput | null
    isNot?: direccionesWhereInput | null
  }

  export type pagosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pedido_itemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pedidosCountOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    direccion_envio_id?: SortOrder
  }

  export type pedidosAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type pedidosMaxOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    direccion_envio_id?: SortOrder
  }

  export type pedidosMinOrderByAggregateInput = {
    id?: SortOrder
    usuario_id?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    direccion_envio_id?: SortOrder
  }

  export type pedidosSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type productosCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    categoria?: SortOrder
    imagenes?: SortOrder
    creado_en?: SortOrder
  }

  export type productosAvgOrderByAggregateInput = {
    precio?: SortOrder
    stock?: SortOrder
  }

  export type productosMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    categoria?: SortOrder
    creado_en?: SortOrder
  }

  export type productosMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    categoria?: SortOrder
    creado_en?: SortOrder
  }

  export type productosSumOrderByAggregateInput = {
    precio?: SortOrder
    stock?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type direccionesCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput> | direccionesCreateWithoutUsuarioInput[] | direccionesUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: direccionesCreateOrConnectWithoutUsuarioInput | direccionesCreateOrConnectWithoutUsuarioInput[]
    createMany?: direccionesCreateManyUsuarioInputEnvelope
    connect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
  }

  export type pedidosCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput> | pedidosCreateWithoutUsuariosInput[] | pedidosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutUsuariosInput | pedidosCreateOrConnectWithoutUsuariosInput[]
    createMany?: pedidosCreateManyUsuariosInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type direccionesUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput> | direccionesCreateWithoutUsuarioInput[] | direccionesUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: direccionesCreateOrConnectWithoutUsuarioInput | direccionesCreateOrConnectWithoutUsuarioInput[]
    createMany?: direccionesCreateManyUsuarioInputEnvelope
    connect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
  }

  export type pedidosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput> | pedidosCreateWithoutUsuariosInput[] | pedidosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutUsuariosInput | pedidosCreateOrConnectWithoutUsuariosInput[]
    createMany?: pedidosCreateManyUsuariosInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type direccionesUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput> | direccionesCreateWithoutUsuarioInput[] | direccionesUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: direccionesCreateOrConnectWithoutUsuarioInput | direccionesCreateOrConnectWithoutUsuarioInput[]
    upsert?: direccionesUpsertWithWhereUniqueWithoutUsuarioInput | direccionesUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: direccionesCreateManyUsuarioInputEnvelope
    set?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    disconnect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    delete?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    connect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    update?: direccionesUpdateWithWhereUniqueWithoutUsuarioInput | direccionesUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: direccionesUpdateManyWithWhereWithoutUsuarioInput | direccionesUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: direccionesScalarWhereInput | direccionesScalarWhereInput[]
  }

  export type pedidosUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput> | pedidosCreateWithoutUsuariosInput[] | pedidosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutUsuariosInput | pedidosCreateOrConnectWithoutUsuariosInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutUsuariosInput | pedidosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: pedidosCreateManyUsuariosInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutUsuariosInput | pedidosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutUsuariosInput | pedidosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type direccionesUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput> | direccionesCreateWithoutUsuarioInput[] | direccionesUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: direccionesCreateOrConnectWithoutUsuarioInput | direccionesCreateOrConnectWithoutUsuarioInput[]
    upsert?: direccionesUpsertWithWhereUniqueWithoutUsuarioInput | direccionesUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: direccionesCreateManyUsuarioInputEnvelope
    set?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    disconnect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    delete?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    connect?: direccionesWhereUniqueInput | direccionesWhereUniqueInput[]
    update?: direccionesUpdateWithWhereUniqueWithoutUsuarioInput | direccionesUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: direccionesUpdateManyWithWhereWithoutUsuarioInput | direccionesUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: direccionesScalarWhereInput | direccionesScalarWhereInput[]
  }

  export type pedidosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput> | pedidosCreateWithoutUsuariosInput[] | pedidosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutUsuariosInput | pedidosCreateOrConnectWithoutUsuariosInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutUsuariosInput | pedidosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: pedidosCreateManyUsuariosInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutUsuariosInput | pedidosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutUsuariosInput | pedidosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type usuariosCreateNestedOneWithoutDireccionesInput = {
    create?: XOR<usuariosCreateWithoutDireccionesInput, usuariosUncheckedCreateWithoutDireccionesInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutDireccionesInput
    connect?: usuariosWhereUniqueInput
  }

  export type pedidosCreateNestedManyWithoutDireccionesInput = {
    create?: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput> | pedidosCreateWithoutDireccionesInput[] | pedidosUncheckedCreateWithoutDireccionesInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutDireccionesInput | pedidosCreateOrConnectWithoutDireccionesInput[]
    createMany?: pedidosCreateManyDireccionesInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type pedidosUncheckedCreateNestedManyWithoutDireccionesInput = {
    create?: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput> | pedidosCreateWithoutDireccionesInput[] | pedidosUncheckedCreateWithoutDireccionesInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutDireccionesInput | pedidosCreateOrConnectWithoutDireccionesInput[]
    createMany?: pedidosCreateManyDireccionesInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type usuariosUpdateOneWithoutDireccionesNestedInput = {
    create?: XOR<usuariosCreateWithoutDireccionesInput, usuariosUncheckedCreateWithoutDireccionesInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutDireccionesInput
    upsert?: usuariosUpsertWithoutDireccionesInput
    disconnect?: usuariosWhereInput | boolean
    delete?: usuariosWhereInput | boolean
    connect?: usuariosWhereUniqueInput
    update?: XOR<XOR<usuariosUpdateToOneWithWhereWithoutDireccionesInput, usuariosUpdateWithoutDireccionesInput>, usuariosUncheckedUpdateWithoutDireccionesInput>
  }

  export type pedidosUpdateManyWithoutDireccionesNestedInput = {
    create?: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput> | pedidosCreateWithoutDireccionesInput[] | pedidosUncheckedCreateWithoutDireccionesInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutDireccionesInput | pedidosCreateOrConnectWithoutDireccionesInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutDireccionesInput | pedidosUpsertWithWhereUniqueWithoutDireccionesInput[]
    createMany?: pedidosCreateManyDireccionesInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutDireccionesInput | pedidosUpdateWithWhereUniqueWithoutDireccionesInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutDireccionesInput | pedidosUpdateManyWithWhereWithoutDireccionesInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type pedidosUncheckedUpdateManyWithoutDireccionesNestedInput = {
    create?: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput> | pedidosCreateWithoutDireccionesInput[] | pedidosUncheckedCreateWithoutDireccionesInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutDireccionesInput | pedidosCreateOrConnectWithoutDireccionesInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutDireccionesInput | pedidosUpsertWithWhereUniqueWithoutDireccionesInput[]
    createMany?: pedidosCreateManyDireccionesInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutDireccionesInput | pedidosUpdateWithWhereUniqueWithoutDireccionesInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutDireccionesInput | pedidosUpdateManyWithWhereWithoutDireccionesInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type pedidosCreateNestedOneWithoutPagosInput = {
    create?: XOR<pedidosCreateWithoutPagosInput, pedidosUncheckedCreateWithoutPagosInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutPagosInput
    connect?: pedidosWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type pedidosUpdateOneWithoutPagosNestedInput = {
    create?: XOR<pedidosCreateWithoutPagosInput, pedidosUncheckedCreateWithoutPagosInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutPagosInput
    upsert?: pedidosUpsertWithoutPagosInput
    disconnect?: pedidosWhereInput | boolean
    delete?: pedidosWhereInput | boolean
    connect?: pedidosWhereUniqueInput
    update?: XOR<XOR<pedidosUpdateToOneWithWhereWithoutPagosInput, pedidosUpdateWithoutPagosInput>, pedidosUncheckedUpdateWithoutPagosInput>
  }

  export type pedidosCreateNestedOneWithoutPedido_itemsInput = {
    create?: XOR<pedidosCreateWithoutPedido_itemsInput, pedidosUncheckedCreateWithoutPedido_itemsInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutPedido_itemsInput
    connect?: pedidosWhereUniqueInput
  }

  export type productosCreateNestedOneWithoutPedido_itemsInput = {
    create?: XOR<productosCreateWithoutPedido_itemsInput, productosUncheckedCreateWithoutPedido_itemsInput>
    connectOrCreate?: productosCreateOrConnectWithoutPedido_itemsInput
    connect?: productosWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type pedidosUpdateOneWithoutPedido_itemsNestedInput = {
    create?: XOR<pedidosCreateWithoutPedido_itemsInput, pedidosUncheckedCreateWithoutPedido_itemsInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutPedido_itemsInput
    upsert?: pedidosUpsertWithoutPedido_itemsInput
    disconnect?: pedidosWhereInput | boolean
    delete?: pedidosWhereInput | boolean
    connect?: pedidosWhereUniqueInput
    update?: XOR<XOR<pedidosUpdateToOneWithWhereWithoutPedido_itemsInput, pedidosUpdateWithoutPedido_itemsInput>, pedidosUncheckedUpdateWithoutPedido_itemsInput>
  }

  export type productosUpdateOneWithoutPedido_itemsNestedInput = {
    create?: XOR<productosCreateWithoutPedido_itemsInput, productosUncheckedCreateWithoutPedido_itemsInput>
    connectOrCreate?: productosCreateOrConnectWithoutPedido_itemsInput
    upsert?: productosUpsertWithoutPedido_itemsInput
    disconnect?: productosWhereInput | boolean
    delete?: productosWhereInput | boolean
    connect?: productosWhereUniqueInput
    update?: XOR<XOR<productosUpdateToOneWithWhereWithoutPedido_itemsInput, productosUpdateWithoutPedido_itemsInput>, productosUncheckedUpdateWithoutPedido_itemsInput>
  }

  export type pagosCreateNestedManyWithoutPedidosInput = {
    create?: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput> | pagosCreateWithoutPedidosInput[] | pagosUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutPedidosInput | pagosCreateOrConnectWithoutPedidosInput[]
    createMany?: pagosCreateManyPedidosInputEnvelope
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
  }

  export type pedido_itemsCreateNestedManyWithoutPedidosInput = {
    create?: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput> | pedido_itemsCreateWithoutPedidosInput[] | pedido_itemsUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutPedidosInput | pedido_itemsCreateOrConnectWithoutPedidosInput[]
    createMany?: pedido_itemsCreateManyPedidosInputEnvelope
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
  }

  export type direccionesCreateNestedOneWithoutPedidosInput = {
    create?: XOR<direccionesCreateWithoutPedidosInput, direccionesUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: direccionesCreateOrConnectWithoutPedidosInput
    connect?: direccionesWhereUniqueInput
  }

  export type usuariosCreateNestedOneWithoutPedidosInput = {
    create?: XOR<usuariosCreateWithoutPedidosInput, usuariosUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutPedidosInput
    connect?: usuariosWhereUniqueInput
  }

  export type pagosUncheckedCreateNestedManyWithoutPedidosInput = {
    create?: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput> | pagosCreateWithoutPedidosInput[] | pagosUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutPedidosInput | pagosCreateOrConnectWithoutPedidosInput[]
    createMany?: pagosCreateManyPedidosInputEnvelope
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
  }

  export type pedido_itemsUncheckedCreateNestedManyWithoutPedidosInput = {
    create?: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput> | pedido_itemsCreateWithoutPedidosInput[] | pedido_itemsUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutPedidosInput | pedido_itemsCreateOrConnectWithoutPedidosInput[]
    createMany?: pedido_itemsCreateManyPedidosInputEnvelope
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
  }

  export type pagosUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput> | pagosCreateWithoutPedidosInput[] | pagosUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutPedidosInput | pagosCreateOrConnectWithoutPedidosInput[]
    upsert?: pagosUpsertWithWhereUniqueWithoutPedidosInput | pagosUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: pagosCreateManyPedidosInputEnvelope
    set?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    disconnect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    delete?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    update?: pagosUpdateWithWhereUniqueWithoutPedidosInput | pagosUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: pagosUpdateManyWithWhereWithoutPedidosInput | pagosUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: pagosScalarWhereInput | pagosScalarWhereInput[]
  }

  export type pedido_itemsUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput> | pedido_itemsCreateWithoutPedidosInput[] | pedido_itemsUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutPedidosInput | pedido_itemsCreateOrConnectWithoutPedidosInput[]
    upsert?: pedido_itemsUpsertWithWhereUniqueWithoutPedidosInput | pedido_itemsUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: pedido_itemsCreateManyPedidosInputEnvelope
    set?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    disconnect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    delete?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    update?: pedido_itemsUpdateWithWhereUniqueWithoutPedidosInput | pedido_itemsUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: pedido_itemsUpdateManyWithWhereWithoutPedidosInput | pedido_itemsUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
  }

  export type direccionesUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<direccionesCreateWithoutPedidosInput, direccionesUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: direccionesCreateOrConnectWithoutPedidosInput
    upsert?: direccionesUpsertWithoutPedidosInput
    disconnect?: direccionesWhereInput | boolean
    delete?: direccionesWhereInput | boolean
    connect?: direccionesWhereUniqueInput
    update?: XOR<XOR<direccionesUpdateToOneWithWhereWithoutPedidosInput, direccionesUpdateWithoutPedidosInput>, direccionesUncheckedUpdateWithoutPedidosInput>
  }

  export type usuariosUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<usuariosCreateWithoutPedidosInput, usuariosUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutPedidosInput
    upsert?: usuariosUpsertWithoutPedidosInput
    disconnect?: usuariosWhereInput | boolean
    delete?: usuariosWhereInput | boolean
    connect?: usuariosWhereUniqueInput
    update?: XOR<XOR<usuariosUpdateToOneWithWhereWithoutPedidosInput, usuariosUpdateWithoutPedidosInput>, usuariosUncheckedUpdateWithoutPedidosInput>
  }

  export type pagosUncheckedUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput> | pagosCreateWithoutPedidosInput[] | pagosUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutPedidosInput | pagosCreateOrConnectWithoutPedidosInput[]
    upsert?: pagosUpsertWithWhereUniqueWithoutPedidosInput | pagosUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: pagosCreateManyPedidosInputEnvelope
    set?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    disconnect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    delete?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    update?: pagosUpdateWithWhereUniqueWithoutPedidosInput | pagosUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: pagosUpdateManyWithWhereWithoutPedidosInput | pagosUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: pagosScalarWhereInput | pagosScalarWhereInput[]
  }

  export type pedido_itemsUncheckedUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput> | pedido_itemsCreateWithoutPedidosInput[] | pedido_itemsUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutPedidosInput | pedido_itemsCreateOrConnectWithoutPedidosInput[]
    upsert?: pedido_itemsUpsertWithWhereUniqueWithoutPedidosInput | pedido_itemsUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: pedido_itemsCreateManyPedidosInputEnvelope
    set?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    disconnect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    delete?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    update?: pedido_itemsUpdateWithWhereUniqueWithoutPedidosInput | pedido_itemsUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: pedido_itemsUpdateManyWithWhereWithoutPedidosInput | pedido_itemsUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
  }

  export type productosCreateimagenesInput = {
    set: string[]
  }

  export type pedido_itemsCreateNestedManyWithoutProductosInput = {
    create?: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput> | pedido_itemsCreateWithoutProductosInput[] | pedido_itemsUncheckedCreateWithoutProductosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutProductosInput | pedido_itemsCreateOrConnectWithoutProductosInput[]
    createMany?: pedido_itemsCreateManyProductosInputEnvelope
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
  }

  export type pedido_itemsUncheckedCreateNestedManyWithoutProductosInput = {
    create?: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput> | pedido_itemsCreateWithoutProductosInput[] | pedido_itemsUncheckedCreateWithoutProductosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutProductosInput | pedido_itemsCreateOrConnectWithoutProductosInput[]
    createMany?: pedido_itemsCreateManyProductosInputEnvelope
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type productosUpdateimagenesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type pedido_itemsUpdateManyWithoutProductosNestedInput = {
    create?: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput> | pedido_itemsCreateWithoutProductosInput[] | pedido_itemsUncheckedCreateWithoutProductosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutProductosInput | pedido_itemsCreateOrConnectWithoutProductosInput[]
    upsert?: pedido_itemsUpsertWithWhereUniqueWithoutProductosInput | pedido_itemsUpsertWithWhereUniqueWithoutProductosInput[]
    createMany?: pedido_itemsCreateManyProductosInputEnvelope
    set?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    disconnect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    delete?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    update?: pedido_itemsUpdateWithWhereUniqueWithoutProductosInput | pedido_itemsUpdateWithWhereUniqueWithoutProductosInput[]
    updateMany?: pedido_itemsUpdateManyWithWhereWithoutProductosInput | pedido_itemsUpdateManyWithWhereWithoutProductosInput[]
    deleteMany?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
  }

  export type pedido_itemsUncheckedUpdateManyWithoutProductosNestedInput = {
    create?: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput> | pedido_itemsCreateWithoutProductosInput[] | pedido_itemsUncheckedCreateWithoutProductosInput[]
    connectOrCreate?: pedido_itemsCreateOrConnectWithoutProductosInput | pedido_itemsCreateOrConnectWithoutProductosInput[]
    upsert?: pedido_itemsUpsertWithWhereUniqueWithoutProductosInput | pedido_itemsUpsertWithWhereUniqueWithoutProductosInput[]
    createMany?: pedido_itemsCreateManyProductosInputEnvelope
    set?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    disconnect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    delete?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    connect?: pedido_itemsWhereUniqueInput | pedido_itemsWhereUniqueInput[]
    update?: pedido_itemsUpdateWithWhereUniqueWithoutProductosInput | pedido_itemsUpdateWithWhereUniqueWithoutProductosInput[]
    updateMany?: pedido_itemsUpdateManyWithWhereWithoutProductosInput | pedido_itemsUpdateManyWithWhereWithoutProductosInput[]
    deleteMany?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type direccionesCreateWithoutUsuarioInput = {
    id?: string
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
    pedidos?: pedidosCreateNestedManyWithoutDireccionesInput
  }

  export type direccionesUncheckedCreateWithoutUsuarioInput = {
    id?: string
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
    pedidos?: pedidosUncheckedCreateNestedManyWithoutDireccionesInput
  }

  export type direccionesCreateOrConnectWithoutUsuarioInput = {
    where: direccionesWhereUniqueInput
    create: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput>
  }

  export type direccionesCreateManyUsuarioInputEnvelope = {
    data: direccionesCreateManyUsuarioInput | direccionesCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type pedidosCreateWithoutUsuariosInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsCreateNestedManyWithoutPedidosInput
    direcciones?: direccionesCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutUsuariosInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type pedidosCreateOrConnectWithoutUsuariosInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput>
  }

  export type pedidosCreateManyUsuariosInputEnvelope = {
    data: pedidosCreateManyUsuariosInput | pedidosCreateManyUsuariosInput[]
    skipDuplicates?: boolean
  }

  export type direccionesUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: direccionesWhereUniqueInput
    update: XOR<direccionesUpdateWithoutUsuarioInput, direccionesUncheckedUpdateWithoutUsuarioInput>
    create: XOR<direccionesCreateWithoutUsuarioInput, direccionesUncheckedCreateWithoutUsuarioInput>
  }

  export type direccionesUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: direccionesWhereUniqueInput
    data: XOR<direccionesUpdateWithoutUsuarioInput, direccionesUncheckedUpdateWithoutUsuarioInput>
  }

  export type direccionesUpdateManyWithWhereWithoutUsuarioInput = {
    where: direccionesScalarWhereInput
    data: XOR<direccionesUpdateManyMutationInput, direccionesUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type direccionesScalarWhereInput = {
    AND?: direccionesScalarWhereInput | direccionesScalarWhereInput[]
    OR?: direccionesScalarWhereInput[]
    NOT?: direccionesScalarWhereInput | direccionesScalarWhereInput[]
    id?: UuidFilter<"direcciones"> | string
    usuario_id?: UuidNullableFilter<"direcciones"> | string | null
    comuna?: StringNullableFilter<"direcciones"> | string | null
    region?: StringNullableFilter<"direcciones"> | string | null
    calle?: StringNullableFilter<"direcciones"> | string | null
    numero?: StringNullableFilter<"direcciones"> | string | null
    creado_en?: DateTimeNullableFilter<"direcciones"> | Date | string | null
  }

  export type pedidosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: pedidosWhereUniqueInput
    update: XOR<pedidosUpdateWithoutUsuariosInput, pedidosUncheckedUpdateWithoutUsuariosInput>
    create: XOR<pedidosCreateWithoutUsuariosInput, pedidosUncheckedCreateWithoutUsuariosInput>
  }

  export type pedidosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: pedidosWhereUniqueInput
    data: XOR<pedidosUpdateWithoutUsuariosInput, pedidosUncheckedUpdateWithoutUsuariosInput>
  }

  export type pedidosUpdateManyWithWhereWithoutUsuariosInput = {
    where: pedidosScalarWhereInput
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyWithoutUsuariosInput>
  }

  export type pedidosScalarWhereInput = {
    AND?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    OR?: pedidosScalarWhereInput[]
    NOT?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    id?: UuidFilter<"pedidos"> | string
    usuario_id?: UuidNullableFilter<"pedidos"> | string | null
    total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"pedidos"> | string | null
    fecha?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    direccion_envio_id?: UuidNullableFilter<"pedidos"> | string | null
  }

  export type usuariosCreateWithoutDireccionesInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    pedidos?: pedidosCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateWithoutDireccionesInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    pedidos?: pedidosUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosCreateOrConnectWithoutDireccionesInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutDireccionesInput, usuariosUncheckedCreateWithoutDireccionesInput>
  }

  export type pedidosCreateWithoutDireccionesInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsCreateNestedManyWithoutPedidosInput
    usuarios?: usuariosCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutDireccionesInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutPedidosInput
    pedido_items?: pedido_itemsUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type pedidosCreateOrConnectWithoutDireccionesInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput>
  }

  export type pedidosCreateManyDireccionesInputEnvelope = {
    data: pedidosCreateManyDireccionesInput | pedidosCreateManyDireccionesInput[]
    skipDuplicates?: boolean
  }

  export type usuariosUpsertWithoutDireccionesInput = {
    update: XOR<usuariosUpdateWithoutDireccionesInput, usuariosUncheckedUpdateWithoutDireccionesInput>
    create: XOR<usuariosCreateWithoutDireccionesInput, usuariosUncheckedCreateWithoutDireccionesInput>
    where?: usuariosWhereInput
  }

  export type usuariosUpdateToOneWithWhereWithoutDireccionesInput = {
    where?: usuariosWhereInput
    data: XOR<usuariosUpdateWithoutDireccionesInput, usuariosUncheckedUpdateWithoutDireccionesInput>
  }

  export type usuariosUpdateWithoutDireccionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedidos?: pedidosUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateWithoutDireccionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedidos?: pedidosUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type pedidosUpsertWithWhereUniqueWithoutDireccionesInput = {
    where: pedidosWhereUniqueInput
    update: XOR<pedidosUpdateWithoutDireccionesInput, pedidosUncheckedUpdateWithoutDireccionesInput>
    create: XOR<pedidosCreateWithoutDireccionesInput, pedidosUncheckedCreateWithoutDireccionesInput>
  }

  export type pedidosUpdateWithWhereUniqueWithoutDireccionesInput = {
    where: pedidosWhereUniqueInput
    data: XOR<pedidosUpdateWithoutDireccionesInput, pedidosUncheckedUpdateWithoutDireccionesInput>
  }

  export type pedidosUpdateManyWithWhereWithoutDireccionesInput = {
    where: pedidosScalarWhereInput
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyWithoutDireccionesInput>
  }

  export type pedidosCreateWithoutPagosInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pedido_items?: pedido_itemsCreateNestedManyWithoutPedidosInput
    direcciones?: direccionesCreateNestedOneWithoutPedidosInput
    usuarios?: usuariosCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutPagosInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
    pedido_items?: pedido_itemsUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type pedidosCreateOrConnectWithoutPagosInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutPagosInput, pedidosUncheckedCreateWithoutPagosInput>
  }

  export type pedidosUpsertWithoutPagosInput = {
    update: XOR<pedidosUpdateWithoutPagosInput, pedidosUncheckedUpdateWithoutPagosInput>
    create: XOR<pedidosCreateWithoutPagosInput, pedidosUncheckedCreateWithoutPagosInput>
    where?: pedidosWhereInput
  }

  export type pedidosUpdateToOneWithWhereWithoutPagosInput = {
    where?: pedidosWhereInput
    data: XOR<pedidosUpdateWithoutPagosInput, pedidosUncheckedUpdateWithoutPagosInput>
  }

  export type pedidosUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedido_items?: pedido_itemsUpdateManyWithoutPedidosNestedInput
    direcciones?: direccionesUpdateOneWithoutPedidosNestedInput
    usuarios?: usuariosUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
    pedido_items?: pedido_itemsUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type pedidosCreateWithoutPedido_itemsInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutPedidosInput
    direcciones?: direccionesCreateNestedOneWithoutPedidosInput
    usuarios?: usuariosCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutPedido_itemsInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type pedidosCreateOrConnectWithoutPedido_itemsInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutPedido_itemsInput, pedidosUncheckedCreateWithoutPedido_itemsInput>
  }

  export type productosCreateWithoutPedido_itemsInput = {
    id?: string
    sku: string
    titulo: string
    descripcion?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number | null
    categoria?: string | null
    imagenes?: productosCreateimagenesInput | string[]
    creado_en?: Date | string | null
  }

  export type productosUncheckedCreateWithoutPedido_itemsInput = {
    id?: string
    sku: string
    titulo: string
    descripcion?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number | null
    categoria?: string | null
    imagenes?: productosCreateimagenesInput | string[]
    creado_en?: Date | string | null
  }

  export type productosCreateOrConnectWithoutPedido_itemsInput = {
    where: productosWhereUniqueInput
    create: XOR<productosCreateWithoutPedido_itemsInput, productosUncheckedCreateWithoutPedido_itemsInput>
  }

  export type pedidosUpsertWithoutPedido_itemsInput = {
    update: XOR<pedidosUpdateWithoutPedido_itemsInput, pedidosUncheckedUpdateWithoutPedido_itemsInput>
    create: XOR<pedidosCreateWithoutPedido_itemsInput, pedidosUncheckedCreateWithoutPedido_itemsInput>
    where?: pedidosWhereInput
  }

  export type pedidosUpdateToOneWithWhereWithoutPedido_itemsInput = {
    where?: pedidosWhereInput
    data: XOR<pedidosUpdateWithoutPedido_itemsInput, pedidosUncheckedUpdateWithoutPedido_itemsInput>
  }

  export type pedidosUpdateWithoutPedido_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutPedidosNestedInput
    direcciones?: direccionesUpdateOneWithoutPedidosNestedInput
    usuarios?: usuariosUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutPedido_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
    pagos?: pagosUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type productosUpsertWithoutPedido_itemsInput = {
    update: XOR<productosUpdateWithoutPedido_itemsInput, productosUncheckedUpdateWithoutPedido_itemsInput>
    create: XOR<productosCreateWithoutPedido_itemsInput, productosUncheckedCreateWithoutPedido_itemsInput>
    where?: productosWhereInput
  }

  export type productosUpdateToOneWithWhereWithoutPedido_itemsInput = {
    where?: productosWhereInput
    data: XOR<productosUpdateWithoutPedido_itemsInput, productosUncheckedUpdateWithoutPedido_itemsInput>
  }

  export type productosUpdateWithoutPedido_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type productosUncheckedUpdateWithoutPedido_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    imagenes?: productosUpdateimagenesInput | string[]
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosCreateWithoutPedidosInput = {
    id?: string
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUncheckedCreateWithoutPedidosInput = {
    id?: string
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosCreateOrConnectWithoutPedidosInput = {
    where: pagosWhereUniqueInput
    create: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput>
  }

  export type pagosCreateManyPedidosInputEnvelope = {
    data: pagosCreateManyPedidosInput | pagosCreateManyPedidosInput[]
    skipDuplicates?: boolean
  }

  export type pedido_itemsCreateWithoutPedidosInput = {
    id?: string
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
    productos?: productosCreateNestedOneWithoutPedido_itemsInput
  }

  export type pedido_itemsUncheckedCreateWithoutPedidosInput = {
    id?: string
    producto_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsCreateOrConnectWithoutPedidosInput = {
    where: pedido_itemsWhereUniqueInput
    create: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput>
  }

  export type pedido_itemsCreateManyPedidosInputEnvelope = {
    data: pedido_itemsCreateManyPedidosInput | pedido_itemsCreateManyPedidosInput[]
    skipDuplicates?: boolean
  }

  export type direccionesCreateWithoutPedidosInput = {
    id?: string
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
    usuario?: usuariosCreateNestedOneWithoutDireccionesInput
  }

  export type direccionesUncheckedCreateWithoutPedidosInput = {
    id?: string
    usuario_id?: string | null
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
  }

  export type direccionesCreateOrConnectWithoutPedidosInput = {
    where: direccionesWhereUniqueInput
    create: XOR<direccionesCreateWithoutPedidosInput, direccionesUncheckedCreateWithoutPedidosInput>
  }

  export type usuariosCreateWithoutPedidosInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    direcciones?: direccionesCreateNestedManyWithoutUsuarioInput
  }

  export type usuariosUncheckedCreateWithoutPedidosInput = {
    id?: string
    email: string
    nombre?: string | null
    apellido?: string | null
    rut?: string | null
    hash_pwd: string
    telefono?: string | null
    creado_en?: Date | string | null
    direcciones?: direccionesUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuariosCreateOrConnectWithoutPedidosInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutPedidosInput, usuariosUncheckedCreateWithoutPedidosInput>
  }

  export type pagosUpsertWithWhereUniqueWithoutPedidosInput = {
    where: pagosWhereUniqueInput
    update: XOR<pagosUpdateWithoutPedidosInput, pagosUncheckedUpdateWithoutPedidosInput>
    create: XOR<pagosCreateWithoutPedidosInput, pagosUncheckedCreateWithoutPedidosInput>
  }

  export type pagosUpdateWithWhereUniqueWithoutPedidosInput = {
    where: pagosWhereUniqueInput
    data: XOR<pagosUpdateWithoutPedidosInput, pagosUncheckedUpdateWithoutPedidosInput>
  }

  export type pagosUpdateManyWithWhereWithoutPedidosInput = {
    where: pagosScalarWhereInput
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyWithoutPedidosInput>
  }

  export type pagosScalarWhereInput = {
    AND?: pagosScalarWhereInput | pagosScalarWhereInput[]
    OR?: pagosScalarWhereInput[]
    NOT?: pagosScalarWhereInput | pagosScalarWhereInput[]
    id?: UuidFilter<"pagos"> | string
    pedido_id?: UuidNullableFilter<"pagos"> | string | null
    proveedor?: StringNullableFilter<"pagos"> | string | null
    status?: StringNullableFilter<"pagos"> | string | null
    monto?: DecimalNullableFilter<"pagos"> | Decimal | DecimalJsLike | number | string | null
    moneda?: StringNullableFilter<"pagos"> | string | null
    tx_id?: StringNullableFilter<"pagos"> | string | null
    comprobante_json?: JsonNullableFilter<"pagos">
  }

  export type pedido_itemsUpsertWithWhereUniqueWithoutPedidosInput = {
    where: pedido_itemsWhereUniqueInput
    update: XOR<pedido_itemsUpdateWithoutPedidosInput, pedido_itemsUncheckedUpdateWithoutPedidosInput>
    create: XOR<pedido_itemsCreateWithoutPedidosInput, pedido_itemsUncheckedCreateWithoutPedidosInput>
  }

  export type pedido_itemsUpdateWithWhereUniqueWithoutPedidosInput = {
    where: pedido_itemsWhereUniqueInput
    data: XOR<pedido_itemsUpdateWithoutPedidosInput, pedido_itemsUncheckedUpdateWithoutPedidosInput>
  }

  export type pedido_itemsUpdateManyWithWhereWithoutPedidosInput = {
    where: pedido_itemsScalarWhereInput
    data: XOR<pedido_itemsUpdateManyMutationInput, pedido_itemsUncheckedUpdateManyWithoutPedidosInput>
  }

  export type pedido_itemsScalarWhereInput = {
    AND?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
    OR?: pedido_itemsScalarWhereInput[]
    NOT?: pedido_itemsScalarWhereInput | pedido_itemsScalarWhereInput[]
    id?: UuidFilter<"pedido_items"> | string
    pedido_id?: UuidNullableFilter<"pedido_items"> | string | null
    producto_id?: UuidNullableFilter<"pedido_items"> | string | null
    cantidad?: IntFilter<"pedido_items"> | number
    precio_unit?: DecimalFilter<"pedido_items"> | Decimal | DecimalJsLike | number | string
  }

  export type direccionesUpsertWithoutPedidosInput = {
    update: XOR<direccionesUpdateWithoutPedidosInput, direccionesUncheckedUpdateWithoutPedidosInput>
    create: XOR<direccionesCreateWithoutPedidosInput, direccionesUncheckedCreateWithoutPedidosInput>
    where?: direccionesWhereInput
  }

  export type direccionesUpdateToOneWithWhereWithoutPedidosInput = {
    where?: direccionesWhereInput
    data: XOR<direccionesUpdateWithoutPedidosInput, direccionesUncheckedUpdateWithoutPedidosInput>
  }

  export type direccionesUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: usuariosUpdateOneWithoutDireccionesNestedInput
  }

  export type direccionesUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usuariosUpsertWithoutPedidosInput = {
    update: XOR<usuariosUpdateWithoutPedidosInput, usuariosUncheckedUpdateWithoutPedidosInput>
    create: XOR<usuariosCreateWithoutPedidosInput, usuariosUncheckedCreateWithoutPedidosInput>
    where?: usuariosWhereInput
  }

  export type usuariosUpdateToOneWithWhereWithoutPedidosInput = {
    where?: usuariosWhereInput
    data: XOR<usuariosUpdateWithoutPedidosInput, usuariosUncheckedUpdateWithoutPedidosInput>
  }

  export type usuariosUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direcciones?: direccionesUpdateManyWithoutUsuarioNestedInput
  }

  export type usuariosUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellido?: NullableStringFieldUpdateOperationsInput | string | null
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    hash_pwd?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direcciones?: direccionesUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type pedido_itemsCreateWithoutProductosInput = {
    id?: string
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
    pedidos?: pedidosCreateNestedOneWithoutPedido_itemsInput
  }

  export type pedido_itemsUncheckedCreateWithoutProductosInput = {
    id?: string
    pedido_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsCreateOrConnectWithoutProductosInput = {
    where: pedido_itemsWhereUniqueInput
    create: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput>
  }

  export type pedido_itemsCreateManyProductosInputEnvelope = {
    data: pedido_itemsCreateManyProductosInput | pedido_itemsCreateManyProductosInput[]
    skipDuplicates?: boolean
  }

  export type pedido_itemsUpsertWithWhereUniqueWithoutProductosInput = {
    where: pedido_itemsWhereUniqueInput
    update: XOR<pedido_itemsUpdateWithoutProductosInput, pedido_itemsUncheckedUpdateWithoutProductosInput>
    create: XOR<pedido_itemsCreateWithoutProductosInput, pedido_itemsUncheckedCreateWithoutProductosInput>
  }

  export type pedido_itemsUpdateWithWhereUniqueWithoutProductosInput = {
    where: pedido_itemsWhereUniqueInput
    data: XOR<pedido_itemsUpdateWithoutProductosInput, pedido_itemsUncheckedUpdateWithoutProductosInput>
  }

  export type pedido_itemsUpdateManyWithWhereWithoutProductosInput = {
    where: pedido_itemsScalarWhereInput
    data: XOR<pedido_itemsUpdateManyMutationInput, pedido_itemsUncheckedUpdateManyWithoutProductosInput>
  }

  export type direccionesCreateManyUsuarioInput = {
    id?: string
    comuna?: string | null
    region?: string | null
    calle?: string | null
    numero?: string | null
    creado_en?: Date | string | null
  }

  export type pedidosCreateManyUsuariosInput = {
    id?: string
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
    direccion_envio_id?: string | null
  }

  export type direccionesUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedidos?: pedidosUpdateManyWithoutDireccionesNestedInput
  }

  export type direccionesUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pedidos?: pedidosUncheckedUpdateManyWithoutDireccionesNestedInput
  }

  export type direccionesUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    comuna?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    calle?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pedidosUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUpdateManyWithoutPedidosNestedInput
    direcciones?: direccionesUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
    pagos?: pagosUncheckedUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateManyWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    direccion_envio_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pedidosCreateManyDireccionesInput = {
    id?: string
    usuario_id?: string | null
    total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    fecha?: Date | string | null
  }

  export type pedidosUpdateWithoutDireccionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUpdateManyWithoutPedidosNestedInput
    usuarios?: usuariosUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutDireccionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUncheckedUpdateManyWithoutPedidosNestedInput
    pedido_items?: pedido_itemsUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateManyWithoutDireccionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosCreateManyPedidosInput = {
    id?: string
    proveedor?: string | null
    status?: string | null
    monto?: Decimal | DecimalJsLike | number | string | null
    moneda?: string | null
    tx_id?: string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pedido_itemsCreateManyPedidosInput = {
    id?: string
    producto_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pagosUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pagosUncheckedUpdateManyWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    monto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    moneda?: NullableStringFieldUpdateOperationsInput | string | null
    tx_id?: NullableStringFieldUpdateOperationsInput | string | null
    comprobante_json?: NullableJsonNullValueInput | InputJsonValue
  }

  export type pedido_itemsUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productos?: productosUpdateOneWithoutPedido_itemsNestedInput
  }

  export type pedido_itemsUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    producto_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUncheckedUpdateManyWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    producto_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsCreateManyProductosInput = {
    id?: string
    pedido_id?: string | null
    cantidad: number
    precio_unit: Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pedidos?: pedidosUpdateOneWithoutPedido_itemsNestedInput
  }

  export type pedido_itemsUncheckedUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type pedido_itemsUncheckedUpdateManyWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    pedido_id?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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