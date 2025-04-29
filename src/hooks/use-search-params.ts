"use client";

import { useQueryStates } from "nuqs";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import {
  ExtendedProjectStatus,
  ExtendedBudgetStatus,
} from "@/lib/search-params";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useMemo, useState } from "react";

/**
 * Hook for project search parameters with URL synchronization
 */
export function useProjectSearchParams() {
  const searchParamsParsers = useMemo(
    () => ({
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(6),
      name: parseAsString.withDefault(""),
      status: parseAsStringEnum(
        Object.values(ExtendedProjectStatus),
      ).withDefault(ExtendedProjectStatus.ALL),
    }),
    [],
  );

  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    history: "replace",
    shallow: false,
  });

  // Local state for immediate UI feedback
  const [localSearch, setLocalSearch] = useState(searchParams.name);

  const debouncedSetSearchParams = useDebouncedCallback<typeof setSearchParams>(
    setSearchParams,
    300,
  );

  return {
    searchParams,
    search: localSearch, // Return local state for immediate UI response
    status: searchParams.status,
    page: searchParams.page,
    perPage: searchParams.perPage,
    setSearch: (search: string) => {
      // Update local state immediately for UI
      setLocalSearch(search);
      // Debounce the URL update
      debouncedSetSearchParams({ name: search, page: 1 });
    },
    setStatus: (status: ExtendedProjectStatus) => {
      void setSearchParams({ status, page: 1 });
    },
    setPage: (page: number) => {
      void setSearchParams({ page });
    },
    reset: () => {
      // Update local state immediately
      setLocalSearch("");
      void setSearchParams({
        name: "",
        status: ExtendedProjectStatus.ALL,
        page: 1,
        perPage: 6,
      });
    },
  };
}

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

/**
 * Hook for company search parameters with URL synchronization
 */
export function useCompanySearchParams() {
  const [searchParams, setSearchParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
      name: parseAsString.withDefault(""),
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
    page: searchParams.page,
    perPage: searchParams.perPage,
    setSearch: (search: string) => {
      setLocalSearch(search);
      debouncedSetSearchParams({ name: search, page: 1 });
    },
    setPage: (page: number) => {
      void setSearchParams({ page });
    },
    reset: () => {
      setLocalSearch("");
      void setSearchParams({
        name: "",
        page: 1,
        perPage: 10,
      });
    },
  };
}
