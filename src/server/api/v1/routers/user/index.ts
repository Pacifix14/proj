import { createTRPCRouter } from "@/server/api/trpc";
import getAdminEmails from "./user-procedures/get-admin-emails";
import updateUserInfo from "./user-procedures/update-user-info";
import getCountries from "./user-procedures/get-countries";

const userRouter = createTRPCRouter({
  getAdminEmails,
  updateUserInfo,
  getCountries,
});

export default userRouter;
