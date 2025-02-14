export function setDateParam(params: URLSearchParams, key: string, date?: Date) {
  date ? params.set(key, date.toISOString()) : params.delete(key);
}
