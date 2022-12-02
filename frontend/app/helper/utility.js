export function round(num, decimalPlaces = 2) {
  if (Number.isInteger(num)) {
    return num;
  }

  if (decimalPlaces === 0) {
    return Math.round(num);
  }

  const rounder = Math.pow(10, decimalPlaces);
  return Math.round((num + Number.EPSILON) * rounder) / rounder; // the epsilon is for floating point edge cases, try rounding 1.255
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function remove_prefix([num, unit]) {
  // only works up to micro. Make sure your unit doesn't start with k, m, or u
  if (unit.includes("k")) {
    num *= 1000;
  } else if (unit.includes("m")) {
    num /= 1000;
  } else if (unit.includes("u") || unit.includes("μ")) {
    num /= 10e6;
  }

  return [num, unit.slice(1)];
}
