from flask import Flask, request, jsonify
from ichack.process_data import process_data

app = Flask(__name__)

@app.route('/', methods=['POST'])
def process_request():
    return jsonify({'message': process_data(request.json)})

if __name__ == '__main__':
    app.run(debug=True)
