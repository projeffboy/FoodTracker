export function getNutrient(nutrients, nutrientName) {
  for (let nutrient of nutrients) {
    if (nutrient.nutrientName.toLowerCase() === nutrientName.toLowerCase()) {
      let unitName = nutrient.unitName;
      if (unitName === unitName.toUpperCase()) {
        unitName = unitName.toLowerCase();
      }

      return [nutrient.value, unitName];
    }
  }

  return [0, "g"];
}

export function percentDV([value, unit], dailyValueInG) {
  // normalize it to grams
  if (unit.includes("k")) {
    value *= 1000;
  } else if (unit.includes("m")) {
    value /= 1000;
  } else if (unit.includes("u")) {
    value /= 10e6;
  }

  return Math.round((value / dailyValueInG) * 100) + "%";
}

export function kJ_to_kcal([value, unit]) {
  if (unit.toLowerCase() == "kj") {
    return [Math.round(value * 0.239006), "kcal"];
  } else if (unit.toLowerCase() == "kcal") {
    return [value, unit];
  }
  console.error("Unit is not in kJ or kcal");
  return ["--", "kcal"];
}
