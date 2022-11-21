from flask import Flask, request, make_response
from werkzeug.exceptions import BadRequest
from utils import *
from PIL import Image
import io
import json

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    output_from_ml = ["1750339", "Apples, red delicious, with skin, raw", None, "g"]
    food = Food(output_from_ml[0],output_from_ml[1],output_from_ml[2],output_from_ml[3])
    get_food_info(food)
    return str(food)


@app.route('/image_query', methods=['POST'])
def handler():

    def extract_image(request_in):
        if 'file' not in request_in.files:
            raise BadRequest("Missing file (image/jpeg).")
        file = request_in.files['file']
        if file.filename == '':
            raise BadRequest("File name is invalid.")

        return file

    file = extract_image(request)
    image = Image.open(io.BytesIO(file.read()))
    result = [[]]
    # TODO
    '''
    Send the image to the ML function, and obtain a list of lists
    result = ml_func(image)
    '''

    def parse_result(r):
        json_content = []
        for x in r:
            food = Food(x[0], x[1], x[2], x[3])
            get_food_info(food)
            food_dict = {'name': food.get_name(),
                         'id': food.get_id(),
                         'default_quantity': food.get_default_quantity(),
                         'deafult_quantity_unit': food.get_deafult_quantity_unit(),
                         'calories': food.get_calories(),
                         'protien': food.get_protien(),
                         'fat': food.fat(),
                         'sugar': food.sugar(),
                         'fiber': food.fiber(),
                         'calcium': food.calcium()}
            json_content.append(food_dict)

        return json.dumps(json_content)

    res_json = parse_result(result)
    response = make_response(res_json, 200)
    response.headers['Content-type'] = 'application/json'

    return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
