import { postgraphile, PostGraphileOptions } from "postgraphile";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

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

@Module({})
export class PostGraphileModule {
  static createPostGraphile(configService: ConfigService) {
    const connectionSettings = {
      host: configService.getOrThrow<string>("DATABASE_HOST"),
      port: configService.getOrThrow<number>("DATABASE_PORT"),
      database: configService.getOrThrow<string>("DATABASE_NAME"),
      user: configService.getOrThrow<string>("DATABASE_USER"),
      password: configService.getOrThrow<string>("DATABASE_PASSWORD"),
    };
    const options =
      configService.get<string>("NODE_ENV") === "production"
        ? prodOptions
        : devOptions;

    return postgraphile(connectionSettings, "madabon", options);
  }
}
