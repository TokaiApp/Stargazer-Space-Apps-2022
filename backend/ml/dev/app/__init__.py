# -*- coding: UTF-8 -*-
import app.model as model
import numpy as np


from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def index():
#     return 'hello!!'

@app.route('/test', methods = ['GET'])
def getResult():
    input = np.array([[5.5, 2.4, 2.7, 1.1]])
    result = model.predict(input)
    return jsonify({'result': str(result)})

# @app.route('/predict', methods=['POST'])
# def postInput():
#     # the data input from frontend

#     ...
#     return jsonify({'return': 'ok!'})

if __name__ == '__main_':
    app.run(host='0.0.0.0', port = 3000, debug = True)
