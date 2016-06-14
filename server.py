from flask import Flask, request, after_this_request

import sys
import json
    
app = Flask("Arrange me")

CHARSET_ABC = "abc"
CHARSET_NUM = "123"

levels = [
    {
        "charset" : CHARSET_NUM,
        "size" : 3
    },
    {
        "charset" : CHARSET_ABC,
        "size" : 4
    },
    {
        "charset" : CHARSET_ABC,
        "size" : 5
    }
]

def load_levels(config):
    try:
        with open(config, "rb") as f:
            global levels
            d = json.load(f)
            levels = d["levels"]
    except:
        print "No levels in config, using default levels"
        pass

@app.route("/")
def get_level_data():
    if "level" not in request.args:
        return "Parameter level not found", 404
    
    level = request.args["level"]
    if not level.isdigit():
        return "Level must be an integer", 404
    
    level = int(level)
    if level >= len(levels):
        return "Level doesn't exist", 404
    
    @after_this_request
    def add_header(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
    
    return json.dumps(levels[level])

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print "Usage: [config file]"
        exit(1)
    
    config = sys.argv[1]
    load_levels(config)
    
    # app.run(host="0.0.0.0", port=8080, debug=True)
    app.run(host="localhost", port=8080, debug=True)
