#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Walk, Bunny, Path

# Views go here!
@app.route("/")
def index():
    return "Welcome!"

class Walks(Resource):
    # view all walks
    def get(self):
        walks = [walk.to_dict() for walk in Walk.query.all()]
        response = make_response(
            walks, 
            200
        )
        return response
    
    # add a walk - TBC
    def post(self):
        pass

    # delete a walk - TBC
    def delete(self):
        pass

api.add_resource(Walks, '/walks')

class Bunnies(Resource):
    # view all bunnies
    def get(self):
        bunnies = [bunny.to_dict() for bunny in Bunny.query.all()]
        response = make_response(
            bunnies, 
            200
        )
        return response
    
    # add a bunny - TBC
    def post(self):
        pass

    # delete a bunny - TBC
    def delete(self):
        pass

api.add_resource(Bunnies, '/bunnies')

class Paths(Resource):
    # view all paths
    def get(self): 
        paths = [path.to_dict() for path in Path.query.all()]
        response = make_response(
            paths, 
            200
        ) 

        return response
    
    # add a path 
    # delete a path 

api.add_resource(Paths, '/paths')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
