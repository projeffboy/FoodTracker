from flask import Flask, request, make_response
from werkzeug.exceptions import BadRequest
from .utils import *
import io
import json
import torch
from PIL import Image
import open_clip
import pandas as pd
import time
from .models import Food

app = Flask(__name__)

model, _, preprocess = open_clip.create_model_and_transforms('ViT-H-14', pretrained='laion2b_s32b_b79k')
textcat = torch.load("./textcat0-377602.pt")
df = pd.read_csv('./food_data/our_foods.csv', header=None,
                 dtype=str)
df2 = df.iloc[:, 1]
df1 = df.iloc[:, 0]
print(df2[0])
dflist = df2.values.tolist()
dflist_str = [str(x) for x in dflist]

start = time.time()
textcat /= textcat.norm(dim=-1, keepdim=True)
end = time.time()
print((end - start), "sec")


def clippify(image):
    with torch.no_grad(), torch.cuda.amp.autocast():
        start = time.time()
        image_features = model.encode_image(image)
        end = time.time()
        print((end - start), "sec")
        image_features /= image_features.norm(dim=-1, keepdim=True)
        start = time.time()
        text_probs = (100.0 * image_features @ textcat.T).softmax(dim=-1)
        end = time.time()
        print((end - start), "sec")

    # print(image_features, image_features.size())
    # print(textcat[100000:100100], textcat.size())
    # print(text_probs, text_probs.size())
    # print(text_probs[100000:100100])
    probs_list = text_probs[0].tolist()
    # print(len(probs_list))
    # print(probs_list[0])

    biglist = [biglist[0] for biglist in sorted(enumerate(probs_list), key=lambda i: i[1], reverse=True)]
    top_i_list = biglist[:10]
    # print(top_i_list)
    top10foods = []
    for x in top_i_list:
        top10foods.append([(df.iloc[x, :]).tolist(), probs_list[x]])
    print("Label probs:\n", top10foods)  # prints: [[1., 0., 0.]]
    return top10foods

# @app.route('/')
# def hello_world():  # put application's code here
#     output_from_ml = ["1750339", "Apples, red delicious, with skin, raw", None, "g"]
#     output_from_ml = ["1048343", "RAW ALMONDS, RAW", "28.0", "g"]
#     food = Food(output_from_ml[0], output_from_ml[1], output_from_ml[2], output_from_ml[3])
#     get_food_info(food)
#     return str(food)

@app.route('/image_query_10', methods=['POST'])
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
    image = preprocess(image).unsqueeze(0)
    print("OK")
    result = clippify(image)

    def parse_result(r):
        json_content = []
        for x in r:
            food_dict = {'name': x[0][1],
                         'id': x[0][0],
                         'default_quantity': x[0][2],
                         'default_quantity_unit': x[0][3],
                         'confidence': x[1]}
            json_content.append(food_dict)

        return json.dumps(json_content)

    res_json = parse_result(result)
    response = make_response(res_json, 200)
    response.headers['Content-type'] = 'application/json'

    return response
  
@app.route('/image_query_3', methods=['POST'])
def handler3():
    def extract_image(request_in):
        if 'file' not in request_in.files:
            raise BadRequest("Missing file (image/jpeg).")
        file = request_in.files['file']
        if file.filename == '':
            raise BadRequest("File name is invalid.")

        return file

    file = extract_image(request)
    image = Image.open(io.BytesIO(file.read()))
    image = preprocess(image).unsqueeze(0)
    print("OK")
    result = clippify(image)

    def parse_result(r):
        json_content = []
        counter = 0

        for x in r:
            if counter > 3:
                break
            food = Food(x[0][0], x[0][1], x[0][2], x[0][3])
            get_food_info(food)
            food_dict = {'name': food.get_name(),
                         'id': food.get_id(),
                         'default_quantity': food.get_default_quantity(),
                         'default_quantity_unit': food.get_deafult_quantity_unit(),
                         'calories': food.get_calories(),
                         'protein': food.get_protien(),
                         'fat': food.get_fat(),
                         'sugar': food.get_sugar(),
                         'fiber': food.get_fiber(),
                         'calcium': food.get_calcium(),
                         'sodium': food.get_sodium(),
                         'confidence': x[1]}
            json_content.append(food_dict)
            counter = counter+1

        return json.dumps(json_content)

    res_json = parse_result(result)
    response = make_response(res_json, 200)
    response.headers['Content-type'] = 'application/json'

    return response

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
    image = preprocess(image).unsqueeze(0)
    print("OK")
    result = clippify(image)

    def parse_result(r):
        json_content = []
        for x in r:
            food_dict = {'name': food.get_name(),
                         'id': food.get_id(),
                         'default_quantity': food.get_default_quantity(),
                         'default_quantity_unit': food.get_deafult_quantity_unit(),
                         'calories': food.get_calories(),
                         'protein': food.get_protien(),
                         'fat': food.get_fat(),
                         'sugar': food.get_sugar(),
                         'fiber': food.get_fiber(),
                         'calcium': food.get_calcium(),
                         'sodium': food.get_sodium(),
                         'confidence': x[1]}
            json_content.append(food_dict)

        return json.dumps(json_content)

    res_json = parse_result(result)
    response = make_response(res_json, 200)
    response.headers['Content-type'] = 'application/json'

    return response
  
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
