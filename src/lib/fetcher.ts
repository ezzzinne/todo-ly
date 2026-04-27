import { api } from "./axios";

export const fetcher = <T>(url: string): Promise<T> =>
  api.get<T>(url).then((res) => res.data);
