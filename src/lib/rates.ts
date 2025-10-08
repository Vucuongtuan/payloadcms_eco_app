export async function getRates() {
  const res = await fetch(
    "https://api.exchangerate.host/latest?base=VND&symbols=USD,JPY,EUR"
  );
  const data = await res.json();
  return data.rates;
}
