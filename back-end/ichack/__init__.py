from flask import Flask, request, jsonify
from flask_cors import CORS

from ichack.process_data import process_data

app = Flask(__name__)
cors = CORS(app)

processed: dict[str, any] = {}

@app.route("/api", methods=["POST"])
def process_request():
    # Get the Client-Id header
    client_id: str = request.headers.get("Client-Id", type=str)
    if client_id is None:
        return jsonify({"error": "Client-Id header is required"}), 400

    # Get the data from the request body
    submission = request.get_json(force=True)

    # Process the data
    data = process_data(submission)

    # Save the processed data to the database
    processed[client_id] = data

    return jsonify({"client-id": client_id, "message": "Data processed successfully!"}), 200

@app.route("/api", methods=["GET"])
def get_processed_data():
    # Get the Client-Id header
    client_id: str = request.headers.get("Client-Id", type=str)
    if client_id is None:
        return jsonify({"error": "Client-Id header is required"}), 400

    # Get the processed data from the database
    data = processed.get(client_id)
    if data is None:
        return jsonify({"error": "Data not found"}), 404

    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True)
