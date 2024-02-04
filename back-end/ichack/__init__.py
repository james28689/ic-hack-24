from flask import Flask, request, jsonify
import logging
import sys

from ichack.process_data import process_data

app = Flask(__name__)

logger = logging.getLogger("ichack")
logger.setLevel(logging.DEBUG)

# Log to stdout for monitoring in the Docker container
logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))

@app.route("/", methods=["POST"])
def process_request():
    # log the request and its headers
    logger.debug("Request: %s", request.json)
    return jsonify({"message": process_data(request.json)})


if __name__ == "__main__":
    app.run(debug=True)
