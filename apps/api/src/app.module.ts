import { Module } from "@nestjs/common";
import { AppController, PostGraphileController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController, PostGraphileController],
  providers: [AppService],
})
export class AppModule {}
