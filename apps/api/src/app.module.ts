import { Module } from "@nestjs/common";
import { PingController, PostGraphileController } from "./app.controller";

@Module({
  imports: [],
  controllers: [PingController, PostGraphileController],
  providers: [],
})
export class AppModule {}
