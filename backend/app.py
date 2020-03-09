from flask import Flask, render_template, Response
from utils import *
import json
from exceptions import *

app = Flask(__name__)


@app.route('/api/generate', methods=["POST"])
def generate_rap():
    try:
        text = predict()
    except ValueError:
        return Response("Input is not valid!", status=400, mimetype='application/json')
    except TimeoutException:
        return Response("Generation run out of time!", status=411, mimetype='application/json')
    res = json.dumps({"data": text})
    return Response(res, status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run()
