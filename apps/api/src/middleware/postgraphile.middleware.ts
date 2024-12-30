import { postgraphile, PostGraphileOptions } from "postgraphile";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { config, Config } from "../config";

const databaseUrl = (c: Config) => {
  return `postgres://${c.database.username}:${c.database.password}@${c.database.host}:${c.database.port}/${c.database.database}`;
};

const devOptions: PostGraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [PgSimplifyInflectorPlugin],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
};

const prodOptions: PostGraphileOptions = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  extendedErrors: ["errcode"],
  appendPlugins: [PgSimplifyInflectorPlugin],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true,
  legacyRelations: "omit",
};

export const postgraphileMiddleware = postgraphile(
  databaseUrl(config),
  "madabon",
  process.env.NODE_ENV === "production" ? prodOptions : devOptions,
);
