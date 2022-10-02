from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hello!!'

# GET the frontend data and return the result
@app.route('/api', methods=['GET'])
def api():
    # get the data from frontend
    data = request.args.get('data')
    # return the result
    return jsonify({'result': data})

@app.route('/predict', methods=['POST'])
def postInput():
    # the data input from frontend

    ...
    return jsonify({'return': 'ok!'})

if __name__ == '__main_':
    app.run(host='0.0.0.0', port = 3000, debug = True)
    