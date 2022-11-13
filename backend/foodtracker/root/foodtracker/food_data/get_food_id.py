import csv

food_filename = "food.csv"
foundataion_food_filename = "foundation_food.csv"
branded_filename = "branded_food.csv"
our_foods_filename = "our_foods.csv"
food_portions_filename = "food_portion.csv"
food_dict = {}
# do not add duplicate food names.
foods_to_add = {}
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
            if not(food_name in foods_to_add):
                foods_to_add[food_id] = [food_name, None]

    # for the weight of foundation food, need to look up at food_portion.csv
    with open(food_portions_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            food_id = row[1]
            weight = row[7]
            if(food_id in foods_to_add):
                foods_to_add[food_id][1] = weight

    for food in foods_to_add:
        data = [food, foods_to_add[food][0], foods_to_add[food][1], "g"]
        file_writer.writerow(data)

    with open(branded_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            food_id = row[0]
            food_name = food_dict[food_id]
            serving_size = row[7]
            serving_unit = row[8]
            if food_name not in foods_to_add:
                data = [food_id, food_name, serving_size, serving_unit]
                foods_to_add[food_name] = None
                file_writer.writerow(data)
