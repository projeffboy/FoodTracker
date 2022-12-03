import { round } from "./utility";

export const stdNutrients = {
  Energy: {
    dailyGrams: 2000,
  },
  "Total Fat": {
    dailyGrams: 78,
    bold: true,
  },
  "Saturated Fat": {
    dailyGrams: 20,
    indent: true,
  },
  "Trans Fat": {
    dailyGrams: 2.2,
    indent: true,
    hide0Pct: true,
    italic: true,
  },
  Cholesterol: {
    dailyGrams: 0.3,
    bold: true,
  },
  Sodium: {
    dailyGrams: 2.3,
    bold: true,
  },
  "Total Carbohydrates": {
    dailyGrams: 275,
    bold: true,
  },
  Fiber: {
    dailyGrams: 28,
    indent: true,
  },
  "Total Sugars": {
    dailyGrams: 50,
    indent: true,
  },
  Protein: {
    dailyGrams: 50,
    bold: true,
    borderBottomStyleName: "veryThickBorderBottom",
  },
  "Vitamin D": {
    dailyGrams: 20e-6,
  },
  Calcium: {
    dailyGrams: 1.3,
  },
  Iron: {
    dailyGrams: 18e-3,
  },
  Potassium: {
    dailyGrams: 4.7,
    borderBottomStyleName: "thickBorderBottom",
  },
};

export const getPercentDailyValue = (grams, dailyGrams) =>
  Math.round((grams / dailyGrams) * 100) + "%";

export function total(
  num,
  servings,
  servingSize,
  servingSizeUnit,
  defaultServingGrams,
  roundTotal = true
) {
  // if (["kg", "mg", "ug", "μg"].includes(unit)) {
  //   [num, unit] = remove_prefix([num, unit]);
  // }

  let unitMult = 1;
  switch (servingSizeUnit) {
    case "g":
      break;
    case "oz":
      unitMult = 28.3495;
      break;
    case "lb":
      unitMult = 453.592;
      break;
    // case "ml": // assume 1g = 1ml
    //   break;
    // case "tsp":
    //   unitMult = 4.92892;
    //   break;
    // case "tbsp":
    //   unitMult = 14.79;
    //   break;
    // case "cup":
    //   unitMult = 250;
    //   break;
    default:
      console.error(servingSizeUnit + " is not one of the units.");
      break;
  }

  const total =
    num * servings * ((servingSize * unitMult) / defaultServingGrams);

  if (!roundTotal) {
    return total;
  }

  if (total >= 100) {
    return total.toPrecision(3);
  } else if (total >= 1) {
    return round(total, 1);
  } else {
    return round(total, 2);
  }
}

export function kJ_to_kcal([num, unit]) {
  if (unit.toLowerCase() == "kj") {
    return [Math.round(num * 0.239006), "kcal"];
  } else if (unit.toLowerCase() == "kcal") {
    return [num, "kcal"];
  }

  return ["--", "kcal"];
}
