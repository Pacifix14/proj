import { createTRPCRouter } from "@/server/api/trpc";
import getAdminEmails from "./user-procedures/get-admin-emails";
import getCountries from "./user-procedures/get-countries";
import updateUserInfo from "./user-procedures/update-user-info";

const userRouter = createTRPCRouter({
	getAdminEmails,
	updateUserInfo,
	getCountries,
});

export default userRouter;
