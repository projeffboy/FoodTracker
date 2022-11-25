export function round(num, decimalPlaces = 2) {
  if (Number.isInteger(num)) {
    return num;
  }

  const rounder = Math.pow(10, decimalPlaces);
  return Math.round((num + Number.EPSILON) * rounder) / rounder;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
