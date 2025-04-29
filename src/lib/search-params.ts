import { BudgetStatus } from "@prisma/client";

export type SearchParams = Record<string, string | string[] | undefined>;

import {
	createSearchParamsCache,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server";

// Extended BudgetStatus enum with ALL option for filtering
export const ExtendedBudgetStatus = {
	...BudgetStatus,
	ALL: "ALL",
} as const;
export type ExtendedBudgetStatus =
	(typeof ExtendedBudgetStatus)[keyof typeof ExtendedBudgetStatus];

export const searchBudgetParamsCache = createSearchParamsCache({
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(6),
	name: parseAsString.withDefault(""),
	status: parseAsStringEnum(Object.values(ExtendedBudgetStatus)).withDefault(
		ExtendedBudgetStatus.ALL,
	),
});
