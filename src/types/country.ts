export type CountryApiResponse = {
  status: string;
  "status-code": number;
  version: string;
  access: string;
  total: number;
  offset: number;
  limit: number;
  data: Record<string, { country: string; region: string }>;
};
