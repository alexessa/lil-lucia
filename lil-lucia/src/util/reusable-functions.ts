export function groupArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "MYR",
  style: "currency",
});

export function FormatCurrency(currency: number) {
  return CURRENCY_FORMATTER.format(currency);
}