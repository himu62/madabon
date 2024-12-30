import { Controller, Get, Inject, Next, Post, Req, Res } from "@nestjs/common";
import { PostGraphileModule } from "./postgraphile.module";
import { ConfigService } from "@nestjs/config";
import { PostGraphileResponseNode } from "postgraphile";
import { IncomingMessage, ServerResponse } from "node:http";

@Controller("/")
export class PostGraphileController {
  private readonly postgraphileMiddleware: ReturnType<
    typeof PostGraphileModule.createPostGraphile
  >;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.postgraphileMiddleware =
      PostGraphileModule.createPostGraphile(configService);
  }

  // this.postgraphileMiddleware.graphiqlRoute
  @Get("graphiql")
  graphiql(
    @Req() request: Request extends IncomingMessage ? Request : IncomingMessage,
    @Res()
    response: Response extends ServerResponse ? Response : ServerResponse,
    @Next() next: (e?: "route" | Error) => void,
  ) {
    this.postgraphileMiddleware.graphiqlRouteHandler(
      new PostGraphileResponseNode(request, response, next),
    );
  }

  // this.postgraphileMiddleware.graphqlRoute
  @Post("graphql")
  graphql(
    @Req() request: Request extends IncomingMessage ? Request : IncomingMessage,
    @Res()
    response: Response extends ServerResponse ? Response : ServerResponse,
    @Next() next: (e?: "route" | Error) => void,
  ) {
    this.postgraphileMiddleware.graphqlRouteHandler(
      new PostGraphileResponseNode(request, response, next),
    );
  }
}
