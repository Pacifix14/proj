import { getSortingStateParser } from "@/lib/parsers";

import type { RouterOutputs } from "@/trpc/react";
import { ProjectStatus, BudgetStatus, ApprovalStatus } from "@prisma/client";

type Supplier =
  RouterOutputs["v1"]["supplier"]["getSuppliers"]["suppliers"][number];

export type SearchParams = Record<string, string | string[] | undefined>;

import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { useQueryStates } from "nuqs";

export const ExtendedApprovalStatus = {
  ...ApprovalStatus,
  ALL: "ALL",
} as const;

export type ExtendedApprovalStatus =
  (typeof ExtendedApprovalStatus)[keyof typeof ExtendedApprovalStatus];

// Extended ProjectStatus enum with ALL option for filtering
export const ExtendedProjectStatus = {
  ...ProjectStatus,
  ALL: "ALL",
} as const;
export type ExtendedProjectStatus =
  (typeof ExtendedProjectStatus)[keyof typeof ExtendedProjectStatus];

// Extended BudgetStatus enum with ALL option for filtering
export const ExtendedBudgetStatus = {
  ...BudgetStatus,
  ALL: "ALL",
} as const;
export type ExtendedBudgetStatus =
  (typeof ExtendedBudgetStatus)[keyof typeof ExtendedBudgetStatus];

export const searchSupplierParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Supplier>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  gstRegistered: parseAsBoolean,
  status: parseAsStringEnum(Object.values(ExtendedApprovalStatus)).withDefault(
    ExtendedApprovalStatus.ALL,
  ),
});

export const searchProjectParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(6),
  name: parseAsString.withDefault(""),
  status: parseAsStringEnum(Object.values(ExtendedProjectStatus)).withDefault(
    ExtendedProjectStatus.ALL,
  ),
});

export const searchBudgetParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(6),
  name: parseAsString.withDefault(""),
  status: parseAsStringEnum(Object.values(ExtendedBudgetStatus)).withDefault(
    ExtendedBudgetStatus.ALL,
  ),
});

export const searchCompanyParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(6),
  name: parseAsString.withDefault(""),
});

// Client-side hook for project search params
export function useProjectSearchParams() {
  const [searchParams, setSearchParams] = useQueryStates(
    {
      name: parseAsString.withDefault(""),
      status: parseAsStringEnum(
        Object.values(ExtendedProjectStatus),
      ).withDefault(ExtendedProjectStatus.ALL),
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(6),
    },
    {
      history: "replace",
      shallow: false,
    },
  );

  return {
    searchParams,
    setSearchParams,
    search: searchParams.name,
    status: searchParams.status,
    page: searchParams.page,
    perPage: searchParams.perPage,
    setSearch: (search: string) => setSearchParams({ name: search, page: 1 }),
    setStatus: (status: ExtendedProjectStatus) =>
      setSearchParams({ status, page: 1 }),
    setPage: (page: number) => setSearchParams({ page }),
    reset: () =>
      setSearchParams({
        name: "",
        status: ExtendedProjectStatus.ALL,
        page: 1,
      }),
  };
}
