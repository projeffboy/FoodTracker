import { getNutrient, percentDV, round } from "../helper/helper";

export default class Nutrients {
  constructor(servings, servingSize, allNutrients) {
    this.servings = servings;
    this.servingSize = servingSize;
    this.nutrients = {
      Energy: { longForm: "energy", dailyValueInG: 2000 },
      Fat: { longForm: "Total lipid (fat)", dailyValueInG: 78, bold: true },
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
      Carbs: {
        longForm: "Carbohydrate, by difference",
        dailyValueInG: 275,
        bold: true,
      },
      Fiber: {
        longForm: "Fiber, total dietary",
        dailyValueInG: 28,
        indent: true,
      },
      Sugars: {
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
    return value * this.servings * (this.servingSize / 100);
  }

  getValue(nutrientName) {
    if (!this.isLookupErr(nutrientName)) {
      return false;
    }

    const [value, unit] = this.nutrients[nutrientName].value;

    if (this.servings == 1) {
      // loose equal
      return [value, unit];
    }

    let newValue = round(this.formula(value), 4);
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
    return percentDV([this.formula(value), unit], dailyValueInG);
  }
}
