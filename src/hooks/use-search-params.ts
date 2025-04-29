"use client";

import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { ExtendedBudgetStatus } from "@/lib/search-params";
import { useQueryStates } from "nuqs";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import { useState } from "react";

/**
 * Hook for budget search parameters with URL synchronization
 */
export function useBudgetSearchParams() {
	const [searchParams, setSearchParams] = useQueryStates(
		{
			page: parseAsInteger.withDefault(1),
			perPage: parseAsInteger.withDefault(10),
			name: parseAsString.withDefault(""),
			status: parseAsStringEnum(
				Object.values(ExtendedBudgetStatus),
			).withDefault(ExtendedBudgetStatus.ALL),
		},
		{
			history: "replace",
			shallow: false,
		},
	);

	// Local state for immediate UI feedback
	const [localSearch, setLocalSearch] = useState(searchParams.name);

	const debouncedSetSearchParams = useDebouncedCallback<typeof setSearchParams>(
		setSearchParams,
		300,
	);

	return {
		searchParams,
		search: localSearch,
		status: searchParams.status,
		page: searchParams.page,
		perPage: searchParams.perPage,
		setSearch: (search: string) => {
			setLocalSearch(search);
			debouncedSetSearchParams({ name: search, page: 1 });
		},
		setStatus: (status: ExtendedBudgetStatus) => {
			void setSearchParams({ status, page: 1 });
		},
		setPage: (page: number) => {
			void setSearchParams({ page });
		},
		reset: () => {
			setLocalSearch("");
			void setSearchParams({
				name: "",
				status: ExtendedBudgetStatus.ALL,
				page: 1,
				perPage: 10,
			});
		},
	};
}
