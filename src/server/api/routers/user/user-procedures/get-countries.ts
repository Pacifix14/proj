import { protectedProcedure } from "@/server/api/trpc";
import { CustomTRPCError } from "@/server/lib/logger";
import { tryCatch } from "@/server/lib/try-catch";
import type { CountryApiResponse } from "@/types/country";

const getCountries = protectedProcedure.query(async () => {
	const { data: response, error } = await tryCatch(
		fetch("https://api.first.org/data/v1/countries?offset=0&limit=249"),
	);

	if (error) {
		throw new CustomTRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Failed to fetch countries",
			cause: "Failed to fetch countries",
		});
	}

	const data = (await response.json()) as CountryApiResponse;

	const countries = Object.values(data.data).map((country) => ({
		name: country.country,
	}));

	// const data = (await response.json()) as Country[];
	return countries;
});

export default getCountries;
