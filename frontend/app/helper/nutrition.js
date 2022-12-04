import { round } from "./utility";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
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

export function servingSizeNumOfUnit(unit, servingSizes) {
  for (const size in servingSizes) {
    if (unit === size.unit) {
      return size.num;
    }
  }

  const mapping = {
    g: 100,
    ml: 100,
    oz: 5,
  };
  const size = mapping[unit] || 1;

  return size; // keep it as str
}

export const getPercentDailyValue = (grams, dailyGrams) =>
  Math.round((grams / dailyGrams) * 100);

export function total(
  num,
  servings,
  servingSize,
  servingSizeUnit,
  servingSizeToGrams,
  defaultServingGrams,
  roundTotal = true
) {
  let unitMult = servingSizeToGrams[servingSizeUnit];
  if (unitMult === undefined) {
    unitMult = 1;
  }
  const servingSizeGrams = servingSize * unitMult;

  const total = num * servings * (servingSizeGrams / defaultServingGrams);

  if (!roundTotal) {
    return total;
  }

  if (total >= 100) {
    return Number(total.toPrecision(3)).toFixed(0);
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

export function isMissingDetails(foodEntry) {
  const {
    id,
    food,
    nutrients,
    servings,
    servingSizeNum,
    servingSizeUnit,
    servingGrams,
  } = foodEntry;
  const answer = [
    id,
    food,
    nutrients,
    servings,
    servingSizeNum,
    servingSizeUnit,
    servingGrams,
  ].includes(undefined);

  return answer;
}
