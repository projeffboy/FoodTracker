from flask import Flask
from utils import *

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    output_from_ml = ["1750339", "Apples, red delicious, with skin, raw", None, "g"]
    food = Food(output_from_ml[0],output_from_ml[1],output_from_ml[2],output_from_ml[3])
    get_food_info(food)
    return str(food)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
