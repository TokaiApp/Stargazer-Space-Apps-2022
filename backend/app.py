#from datetime import datetime
# Import the model module from the current directory
from sre_constants import SUCCESS
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from flask_cors import CORS

#Impor the model module from the ml folder
import ml as model

app = Flask(__name__)

CORS(app)

# Create a global variable to store the input data
with open('./sample.json', 'r') as f:
    sampleResponse = f.read()

#print(sampleResponse)
"""
@app.route('/')
def index():
   print('Request for index page received')
   return render_template('index.html')
"""

@app.route('/api/request', methods=['POST', 'GET'])
def api_request():
    if request.method == 'POST':
        print('Request for api request received')
        print(request.data.decode('utf-8'))
        return sampleResponse
"""
@app.route('/api/predict', methods=['GET'])
def api_predict():
    print('Request for api predict received')
    userInput = request.data.decode('utf-8')
    print(userInput)
    modelAnswer = model.predict(userInput)
    return modelAnswer

@app.route('/api/response')
def api_response():
    #Send the sample response to the frontend via HTTP GET
    print('Request for api response received')
    return sampleResponse

@app.route('/hello', methods=['POST'])
def hello():
   name = request.form.get('name')

   if name:
       print('Request for hello page received with name=%s' % name)
       return render_template('hello.html', name = name)
   else:
       print('Request for hello page received with no name or blank name -- redirecting')
       return redirect(url_for('index'))

"""
if __name__ == '__main__':
   app.run()