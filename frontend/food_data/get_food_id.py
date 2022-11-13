import csv

food_filename = "food.csv"
foundataion_food_filename = "foundation_food.csv"
branded_filename = "branded_food.csv"
our_foods_filename = "our_foods.csv"
food_dict = {}
# do not add duplicate food names.
added_food_names = {}
data = []

# store id, name of all foods in dictionary. food_dict[id] = [name]
with open(food_filename, newline="", encoding="utf-8") as csvfile:
    file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
    next(csvfile)
    for row in file_reader:
        food_dict[row[0]] = row[2]

with open(our_foods_filename, 'w') as writefile:
    file_writer = csv.writer(writefile, lineterminator = '\n')
    with open(foundataion_food_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            food_id = row[0]
            food_name = food_dict[food_id]
            if not(food_name in added_food_names):
                data = [food_id, food_name]
                added_food_names[food_name] = None
                file_writer.writerow(data)
    with open(branded_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            food_id = row[0]
            food_name = food_dict[food_id]
            if not(food_name in added_food_names):
                data = [food_id, food_name]
                added_food_names[food_name] = None
                file_writer.writerow(data)
