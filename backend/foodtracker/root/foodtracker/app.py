from flask import Flask
from utils import *

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    get_food_data_from_csv()
    return str(get_food_info("1750339")) + " " + str(get_food_info("334536"))


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
