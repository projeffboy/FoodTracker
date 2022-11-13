
class Food:
    # important!!! For some food, default quantity (e.g. weight) does not exist. For example, 
    # "Apples, red delicious, with skin, raw" does not have mass in the database. In this case, we must 
    # assume one apple instead of specific mass.
    # However, it's not 100% sure this happens for countable objects. Not sure what to do when there is no
    # default quantity for something like juice or soup.
    def __init__(self, name, id):
        self.name = name
        self.id = id
        self.calories = -1
        # default portion of food
        self.default_quantity = -1
        self.deafult_quantity_unit = "Missing unit"
    def get_calories(self):
        return self.calories
    def set_calories(self, calories):
        self.calories = calories
    def get_default_quantity(self):
        return self.calories
    def set_default_quantity(self, default_quantity):
        self.default_quantity = default_quantity
    def get_deafult_quantity_unit(self):
        return self.deafult_quantity_unit
    def set_deafult_quantity_unit(self, deafult_quantity_unit):
        self.deafult_quantity_unit = deafult_quantity_unit
    def __str__(self):
        return f"{self.name} has {self.calories}{Calorie.getUnit()} energy per {self.default_quantity}{self.deafult_quantity_unit}."

# very basic calorie info.
class Calorie:
    def getUnit():
        return 'kcal'
    def get_daily_consumption(gender="male"):
        return 2500 if (gender=="male") else 2000
    def get_nutrientId(): 
        # returns the id that is used to identify energy in database (energy or Atwater Factors) found in nutrients.csv
        return 1062, 2047, 2048

