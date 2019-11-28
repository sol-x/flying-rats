import * as Koa from "koa";
import * as Router from "koa-router";
import * as cors from "@koa/cors";

interface Rat {
  width: number;
  height: number;
  nickname?: string;
}

interface Rats {
  [k: string]: Rat;
}

const rats: Rats = {
  dervin: { width: 10, height: 2, nickname: "Le Franco" },
  "moss boss": { width: 42, height: 10 },
  catherine: { width: 20, height: 46, nickname: "Dirty Pete" },
  kevin: { width: 2, height: 4, nickname: "Germy" },
  susan: { width: 20, height: 18, nickname: "La King" },
  "The Mode": { width: 3, height: 8 },
};

const getRouter = (): Router => {
  const router = new Router();

  router.get("/rat-names", ctxt => {
    ctxt.body = Object.keys(rats);
  });

  router.get("/rat/:name", ctxt => {
    const rat = rats[ctxt.params.name];
    if (rat) {
      ctxt.body = rat;
    } else {
      ctxt.status = 404;
    }
  });

  return router;
};

function main() {
  const app = new Koa();
  app.use(cors({ origin: "*", credentials: true }));
  const router = getRouter();
  app.use(router.routes());
  app.use(router.allowedMethods());
  const PORT = 7421;
  app.listen(PORT);
  console.log("server started on port", PORT);
}

if (require.main === module) {
  main();
}
