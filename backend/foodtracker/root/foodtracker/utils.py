import requests, json, csv

from models import *

DATABASE_URL = "https://api.nal.usda.gov/fdc/v1/food/"
KEY = "DEMO_KEY"
# only use for testing
TEST_KEY = "wypfPDS0hGT0tCQDPQWYQ32mUgT1OKmpWvTskcwC"
our_foods_filename = "food_data/our_foods.csv"
# food_data[food_id] = food object
food_data = {}
# food_name_id[food_name] = food_id
food_name_id = {}

# this will not work when default quantity unit is not in grams!!!!
def calculate_calories(food, mass):
    if food.get_default_quantity == -1 or food.get_default_quantity == 0:
        return -1
    return food.get_calories * mass / food.get_default_quantity

def convert_KJ_to_kCal(energy_in_kj):
    return 0.2390057361 * energy_in_kj

# Returns food object given food_id.
# Does a REST request to food database to get energy.
def get_food_info(food_id):
    url = DATABASE_URL + food_id + "?api_key=" + TEST_KEY
    response = requests.get(url).json()
    
    food = food_data[food_id]
    food_nutrients = response["foodNutrients"]
    # use this order energy - specific factor - general factor. i.e. if energy value exists, use it otherwise go to next priority
    energy = -1
    atwater_general_factor = -1
    atwater_specific_factor = -1
    for food_nutrient in food_nutrients:
        # find energy value
        nutrient_id = food_nutrient["nutrient"]["id"]
        energy_id1, energy_id2, energy_id3 = Calorie.get_nutrientId()
        if(nutrient_id == energy_id1):
            energy = convert_KJ_to_kCal(int(food_nutrient["amount"]))
            break
        elif(nutrient_id == energy_id2):
            atwater_general_factor = int(food_nutrient["amount"])
        elif(nutrient_id == energy_id3):
            atwater_specific_factor = int(food_nutrient["amount"])
    if (energy != -1):
        food.set_calories(energy)
    elif (atwater_specific_factor != -1):
        food.set_calories(atwater_specific_factor)
    else:
        food.set_calories(atwater_general_factor)
    return food

# gets all food data for our_foods.csv which is generated using get_food_id.py and csv files
# downloadable in the usda food api website. These csv files are not in the project since they are too big
# to include.
def get_food_data_from_csv():
    with open(our_foods_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            food = Food(row[1], row[0])
            food.set_default_quantity(row[2])
            food.set_deafult_quantity_unit(row[3])
            food_data[row[0]] = food
            food_name_id[row[1]] = row[0]

# return list of all food names
def get_food_names():
    return list(food_name_id.keys())