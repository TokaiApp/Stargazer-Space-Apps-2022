from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
app = Flask(__name__)


@app.route('/')
def index():
   print('Request for index page received')
   return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/api/request', methods=['POST'])
def api_request():
    print('Request for api received')
    print('Request received at: ', datetime.now())
    print('Request received from: ', request.remote_addr)
    print('Request received with data: ', request.data)
    return 'ok'

@app.route('/api/response', methods=['GET'])
def api_response():
    print('Response for api received')
    print('Response received at: ', datetime.now())
    print('Response received from: ', request.remote_addr)
    print('Response received with data: ', request.data)
    return 'ok'

@app.route('/hello', methods=['POST'])
def hello():
   name = request.form.get('name')

   if name:
       print('Request for hello page received with name=%s' % name)
       return render_template('hello.html', name = name)
   else:
       print('Request for hello page received with no name or blank name -- redirecting')
       return redirect(url_for('index'))


if __name__ == '__main__':
   app.run()