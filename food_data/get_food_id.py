import csv

food_filename = "food.csv"
foundataion_food_filename = "foundation_food.csv"
branded_filename = "branded_food.csv"
our_foods_filename = "our_foods.csv"
food_dict = {}
data = []

# store id, name of all foods in dictionary
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
            data = [row[0], food_dict[row[0]]]
            file_writer.writerow(data)
    with open(branded_filename, newline="", encoding="utf-8") as csvfile:
        file_reader = csv.reader(csvfile, quoting=csv.QUOTE_ALL)
        next(csvfile)
        for row in file_reader:
            data = [row[0], food_dict[row[0]]]
            file_writer.writerow(data)
