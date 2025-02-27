export default function totalFormatter(
  lang: string,
  value: number,
  digits = 0
) {
  let result = Intl.NumberFormat(lang, {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'code',
    minimumFractionDigits: digits,
  }).format(value);
  result = result.replace(/[a-z]{3}/i, '').trim();
  return result;
}
