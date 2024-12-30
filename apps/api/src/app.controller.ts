import { Controller, Get, Next, Req, Res } from "@nestjs/common";
import { postgraphileMiddleware } from "./middleware/postgraphile.middleware";
import { PostGraphileResponseNode } from "postgraphile";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";

@Controller("/ping")
export class PingController {
  @Get()
  ping(): string {
    return "pong";
  }
}

@Controller("/")
export class PostGraphileController {
  @Get(postgraphileMiddleware.graphiqlRoute)
  graphiql(
    @Req() request: Request extends IncomingMessage ? Request : IncomingMessage,
    @Res()
    response: Response extends ServerResponse ? Response : ServerResponse,
    @Next() next: (e?: "route" | Error) => void,
  ) {
    postgraphileMiddleware.graphiqlRouteHandler(
      new PostGraphileResponseNode(request, response, next),
    );
  }
}
