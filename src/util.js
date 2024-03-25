export function getQueryString(values) {
  const commaSepValue = Object.keys(values)
    .map((key) => `${key}=${values[key]}`)
    .join("&");
  return commaSepValue;
}
