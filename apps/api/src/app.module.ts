import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PingController } from "./app.controller";
import Joi from "joi";
import { PostGraphileController } from "./postgraphile.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("production", "development", "test")
          .default("development"),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  controllers: [PingController, PostGraphileController],
})
export class AppModule {}
