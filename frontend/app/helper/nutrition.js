import { round } from "./utility";

export class Nutrition {
  constructor(
    allNutrients,
    servings = "1",
    servingSize = "100",
    unit = "g",
    defaultServings = "1",
    defaultServingSize = "100",
    defaultUnit = "g"
  ) {
    this.servings = servings;
    this.servingSize = servingSize;
    this.unit = unit;

    this.defaultServings = defaultServings;
    this.defaultServingSize = defaultServingSize;
    this.defaultUnit = defaultUnit;

    this.nutrients = {
      Energy: { longForm: "energy", dailyValueInG: 2000 },
      "Total Fat": {
        longForm: "Total lipid (fat)",
        dailyValueInG: 78,
        bold: true,
      },
      "Saturated Fat": {
        longForm: "Fatty acids, total saturated",
        dailyValueInG: 20,
        indent: true,
      },
      "Trans Fat": {
        longForm: "Fatty acids, total trans",
        dailyValueInG: 2.2,
        indent: true,
        hide0Pct: true,
        italic: true,
      },
      Cholesterol: { longForm: "Cholesterol", dailyValueInG: 0.3, bold: true },
      Sodium: { longForm: "Sodium, Na", dailyValueInG: 2.3, bold: true },
      "Total Carbohydrates": {
        longForm: "Carbohydrate, by difference",
        dailyValueInG: 275,
        bold: true,
      },
      Fiber: {
        longForm: "Fiber, total dietary",
        dailyValueInG: 28,
        indent: true,
      },
      "Total Sugars": {
        longForm: "Sugars, total including NLEA",
        dailyValueInG: 50,
        indent: true,
      },
      Protein: {
        longForm: "Protein",
        dailyValueInG: 50,
        bold: true,
        borderBottomStyleName: "veryThickBorderBottom",
      },
      "Vitamin D": { longForm: "Vitamin D (D2 + D3)", dailyValueInG: 20e-6 },
      Calcium: { longForm: "Calcium, Ca", dailyValueInG: 1.3 },
      Iron: { longForm: "Iron, Fe", dailyValueInG: 18e-3 },
      Potassium: {
        longForm: "Potassium, K",
        dailyValueInG: 4.7,
        borderBottomStyleName: "thickBorderBottom",
      },
    };

    for (let nutrient in this.nutrients) {
      let substring = nutrient === "Energy";

      this.nutrients[nutrient].value = getNutrient(
        allNutrients,
        this.nutrients[nutrient].longForm,
        substring
      );
    }
  }

  /* PRIVATE METHODS */

  isLookupErr(nutrientName) {
    if (this.nutrients[nutrientName] === undefined) {
      console.error("Nutrient name does not exist");
    } else if (this.nutrients[nutrientName].value === undefined) {
      console.error("Nutrient name does not have a value (for some reason)");
    } else {
      return true;
    }

    return false;
  }

  formula(value) {
    let unitMult = 1;
    switch (this.unit) {
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
        console.error(this.unit + " is not one of the units.");
        break;
    }

    return value * this.servings * ((this.servingSize * unitMult) / 100);
  }

  percentDV([value, unit], dailyValueInG) {
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

  /* PUBLIC METHODS */

  getValue(nutrientName, decimalPlaces = 2) {
    if (!this.isLookupErr(nutrientName)) {
      return false;
    }

    const [value, unit] = this.nutrients[nutrientName].value;

    if (
      this.servings === this.defaultServings &&
      this.servingSize === this.defaultServingSize &&
      this.unit === this.defaultUnit
    ) {
      // loose equal
      return [value, unit];
    }

    let newValue = round(this.formula(value), decimalPlaces);
    if (isNaN(newValue)) {
      newValue = "--";
    }
    return [newValue, unit];
  }

  getPercentDailyValue(nutrientName) {
    if (!this.isLookupErr(nutrientName)) {
      return false;
    }

    const {
      value: [value, unit],
      dailyValueInG,
    } = this.nutrients[nutrientName];
    return this.percentDV([this.formula(value), unit], dailyValueInG);
  }

  getValues() {
    const nutrientNames = Object.keys(this.nutrients);
    const values = nutrientNames.map(name => this.getValue(name));
    const returnObj = {};
    nutrientNames.forEach((name, i) => {
      returnObj[name] = values[i];
    });

    return returnObj;
  }
}

export function getNutrient(nutrients, nutrientName, substring = false) {
  for (let nutrient of nutrients) {
    if (
      (!substring &&
        nutrient.nutrientName.toLowerCase() === nutrientName.toLowerCase()) ||
      (substring &&
        nutrient.nutrientName
          .toLowerCase()
          .includes(nutrientName.toLowerCase()))
    ) {
      let unitName = nutrient.unitName;
      if (unitName === unitName.toUpperCase()) {
        unitName = unitName.toLowerCase();
      }

      return [nutrient.value, unitName];
    }
  }

  return [0, "g"];
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
