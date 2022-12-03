import { remove_prefix } from "./utility";

export const stdNutrients = {
  Energy: {
    dailyValueInG: 2000,
  },
  "Total Fat": {
    dailyValueInG: 78,
    bold: true,
  },
  "Saturated Fat": {
    dailyValueInG: 20,
    indent: true,
  },
  "Trans Fat": {
    dailyValueInG: 2.2,
    indent: true,
    hide0Pct: true,
    italic: true,
  },
  Cholesterol: {
    dailyValueInG: 0.3,
    bold: true,
  },
  Sodium: {
    dailyValueInG: 2.3,
    bold: true,
  },
  "Total Carbohydrates": {
    dailyValueInG: 275,
    bold: true,
  },
  Fiber: {
    dailyValueInG: 28,
    indent: true,
  },
  "Total Sugars": {
    dailyValueInG: 50,
    indent: true,
  },
  Protein: {
    dailyValueInG: 50,
    bold: true,
    borderBottomStyleName: "veryThickBorderBottom",
  },
  "Vitamin D": {
    dailyValueInG: 20e-6,
  },
  Calcium: {
    dailyValueInG: 1.3,
  },
  Iron: {
    dailyValueInG: 18e-3,
  },
  Potassium: {
    dailyValueInG: 4.7,
    borderBottomStyleName: "thickBorderBottom",
  },
};

export function getPercentDailyValue(
  [num, unit],
  dailyValueInG,
  servings,
  servingSize
) {
  // normalize it to grams
  if (unit.includes("k")) {
    num *= 1000;
  } else if (unit.includes("m")) {
    num /= 1000;
  } else if (unit.includes("u")) {
    num /= 10e6;
  }

  const valueInG = formula([num, unit], servings, servingSize);
  return Math.round((valueInG / dailyValueInG) * 100) + "%";
}

function formula([num, unit], servings, servingSize) {
  if (["kg", "mg", "ug", "μg"].includes(unit)) {
    [num, unit] = remove_prefix([num, unit]);
  }

  let unitMult = 1;
  switch (unit) {
    case "g":
      break;
    case "oz":
      unitMult = 28.3495;
      break;
    case "lb":
      unitMult = 453.592;
      break;
    case "ml": // assume 1g = 1ml
      break;
    case "tsp":
      unitMult = 4.92892;
      break;
    case "tbsp":
      unitMult = 14.79;
      break;
    case "cup":
      unitMult = 250;
      break;
    default:
      console.error(unit + " is not one of the units.");
      break;
  }

  return num * servings * ((servingSize * unitMult) / 100);
}

export function kJ_to_kcal([num, unit]) {
  if (unit.toLowerCase() == "kj") {
    return [Math.round(num * 0.239006), "kcal"];
  } else if (unit.toLowerCase() == "kcal") {
    return [num, "kcal"];
  }

  return ["--", "kcal"];
}
