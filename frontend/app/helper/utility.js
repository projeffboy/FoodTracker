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
  return str[0].toUpperCase() + str.slice(1);
}

export function remove_prefix([num, unit]) {
  // only works up to micro. Make sure your unit doesn't start with k, m, or u
  if (unit.includes("k")) {
    num *= 1000;
  } else if (unit.includes("m")) {
    num /= 1000;
  } else if (unit.includes("u") || unit.includes("μ")) {
    num /= 10e6;
  } else {
    return [num, unit];
  }

  return [num, unit.slice(1)];
}

export function createObj(keys, values) {
  const output = {};
  keys.forEach((key, i) => (output[key] = values[i]));
  return output;
}

export function fractionToDecimal(frac) {
  const [numerator, denominator] = frac.splice("/");
  const dec = Number(numerator) / Number(denominator);

  return dec;
}

export const formatNaN = val => (isNaN(val) ? "--" : val);

export function binarySearch(arr, val) {
  // https://stackoverflow.com/a/50612218/6454135

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === val) {
      return mid;
    }

    if (val < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}
