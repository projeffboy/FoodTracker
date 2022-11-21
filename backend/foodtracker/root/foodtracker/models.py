class Food:
    # important!!! For some food, default quantity (e.g. weight) does not exist. For example, 
    # "Apples, red delicious, with skin, raw" does not have mass in the database. In this case, we must 
    # assume one apple instead of specific mass.
    # However, it's not 100% sure this happens for countable objects. Not sure what to do when there is no
    # default quantity for something like juice or soup.
    def __init__(self, id, name, default_quantity=0, default_unit=None):
        self.name = name
        self.id = id
        # default portion of food
        self.default_quantity = default_quantity
        self.default_quantity_unit = default_unit
        self.calories = None
        self.protien = None
        self.fat = None
        self.sugar = 0
        self.fiber = None
        self.calcium = None
        self.sodium = None

    def get_name(self):
        return self.name

    def get_id(self):
        return str(self.id)

    def get_calories(self):
        return self.calories

    def set_calories(self, calories):
        self.calories = calories

    def get_default_quantity(self):
        return self.calories

    def set_default_quantity(self, default_quantity):
        self.default_quantity = default_quantity

    def get_deafult_quantity_unit(self):
        return self.default_quantity_unit

    def set_deafult_quantity_unit(self, deafult_quantity_unit):
        self.default_quantity_unit = deafult_quantity_unit

    def set_protien(self, protien):
        self.protien = protien

    def get_protien(self):
        return self.protien

    def set_fat(self, fat):
        self.fat = fat

    def get_fat(self):
        return self.fat

    def set_sugar(self, sugar):
        self.sugar = sugar

    def get_sugar(self):
        return self.sugar

    def set_fiber(self, fiber):
        self.fiber = fiber

    def get_fiber(self):
        return self.fiber

    def set_calcium(self, calcium):
        self.calcium = calcium

    def get_calcium(self):
        return self.calcium

    def set_sodium(self, sodium):
        self.sodium = sodium

    def get_sodium(self):
        return self.sodium

    def __str__(self):
        return f"{self.name} \
            has energy: {self.calories}{Calorie.get_unit()}, \
            protien: {self.protien}{Protien.get_unit()}, \
            fat: {self.fat}{Fat.get_unit()}, \
            sugar: {self.sugar}{Sugar.get_unit()}, \
            fiber: {self.fiber}{Fiber.get_unit()}, \
            calcium: {self.calcium}{Calcium.get_unit()}, \
            sodium: {self.sodium}{Sodium.get_unit()}, \
            per {self.default_quantity}{self.default_quantity_unit}."


# very basic calorie info.
class Calorie:
    def get_unit():
        return 'kcal'

    def get_daily_consumption(gender="male"):
        return 2500 if (gender == "male") else 2000

    def get_nutrientId():
        # returns the id that is used to identify energy in database (energy or Atwater Factors) found in nutrients.csv
        return 1062, 1008, 2047, 2048


class Protien:
    def get_unit():
        return "g"

    def get_daily_consumption(weight=70):
        return weight * 0.8

    def get_nutrientId():
        return 1003


class Fat:
    def get_unit():
        return "g"

    def get_daily_consumption(gender="male"):
        return Calorie.get_daily_consumption(gender) * 66 / 2000  # 35% of calorie intake as per USDA

    def get_nutrientId():
        return 1004


class Sugar:
    def get_unit():
        return "g"

    def get_daily_consumption(gender="male"):
        return 36 if (gender == "male") else 25

    def get_nutrientId():
        return 1010, 1011, 1012, 1063


class Fiber:
    def get_unit():
        return "g"

    def get_daily_consumption():
        return 25

    def get_nutrientId():
        return 1079


class Calcium:
    def get_unit():
        return "mg"

    def get_daily_consumption():
        return 1000

    def get_nutrientId():
        return 1087


class Sodium:
    def get_unit():
        return "mg"

    def get_daily_consumption():
        return 2300

    def get_nutrientId():
        return 1093