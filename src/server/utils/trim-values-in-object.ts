export function trimStringValues<T extends Record<string, unknown>>(
  input: T,
): T {
  return Object.entries(input).reduce(
    (result, [key, value]) => {
      result[key] = typeof value === "string" ? value.trim() : value;
      return result;
    },
    {} as Record<string, unknown>,
  ) as T;
}
