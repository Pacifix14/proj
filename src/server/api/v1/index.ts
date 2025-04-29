import { createTRPCRouter } from "@/server/api/trpc";

import userRouter from "@/server/api/v1/routers/user";

import budgetRouter from "@/server/api/v1/routers/budget";
// import itemRouter from "@/server/api/v1/routers/item";

const v1Router = createTRPCRouter({
  user: userRouter,
 
  budget: budgetRouter,
  // item: itemRouter,
});

export default v1Router;
