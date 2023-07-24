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

    # add a walk 
    def post(self):
        form_json = request.get_json()
        new_walk = Walk(
            date = form_json['date'],
            start_time = form_json['start_time'],
            end_time = form_json['end_time'],
            bunny_count = form_json['bunny_count'],
            walk_path = form_json['walk_path'],
        )

        db.session.add(new_walk)
        db.session.commit()

        response = make_response(
            new_walk.to_dict(), 
            201
        )

        return response

    # delete a walk - TBC
    def delete(self, walk_id):
        walk = Walk.query.filter_by(id=walk_id).first()
        db.session.delete(walk)
        db.session.commit()

        response = make_response(
            "deletion completed",
            204
        )

        return response
    
api.add_resource(Walks, '/walks/', endpoint='walks')
api.add_resource(Walks, '/walks/<int:walk_id>/', endpoint='walks_by_id')

class Bunnies(Resource):
    # view all bunnies
    def get(self):
        bunnies = [bunny.to_dict() for bunny in Bunny.query.all()]
        response = make_response(
            bunnies, 
            200
        )
        return response
    
    # add a bunny 
    def post(self):
        form_json = request.get_json()
        new_bunny = Bunny(
            name = form_json['name'],
            description = form_json['description'],
            headshot = form_json['headshot']               
        )
        db.session.add(new_bunny)
        db.session.commit()

        response = make_response(
            new_bunny.to_dict(),
            201
        )

        return response

    # delete a bunny - TBC
    def delete(self, bunny_id):
        bunny = Bunny.query.filter_by(id=bunny_id).first()
        db.session.delete(bunny)
        db.session.commit()

        response = make_response(
            "deletion completed", 
            204
        )

        return response
    
    # edit a bunny's information 
    def patch(self, bunny_id):
        form_json = request.get_json()
        bunny = Bunny.query.filter_by(id=bunny_id).first()
        bunny.name = form_json['name']
        bunny.description = form_json['description']
        bunny.headshot = form_json['headshot']
        db.session.commit()
        
        response = make_response(
            bunny.to_dict(), 
            200 # this status code may be temp => want to see edits in response for now
        )

        return response
    
api.add_resource(Bunnies, '/bunnies', endpoint='bunnies')
api.add_resource(Bunnies, '/bunnies/<int:bunny_id>/', endpoint='bunnies_by_id')

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
    def post(self):
        form_json = request.get_json()
        new_path = Path(
            name=form_json['name'],
            directions=form_json['directions']
        )
        db.session.add(new_path)
        db.session.commit()

        response = make_response(
            new_path.to_dict(), 
            201
        )

        return response
    
    # delete a path 
    def delete(self, path_id):
        path = Path.query.filter_by(id=path_id).first()
        db.session.delete(path)
        db.session.commit()

        response = make_response(
            "deletion completed", 
            204
        )

        return response
    
    # edit a path's details
    def patch(self, path_id):
        form_json = request.get_json()
        path = Path.query.filter_by(id=path_id).first()
        path.name = form_json['name']
        path.description = form_json['description']
        db.session.commit()

        response = make_response(
            path.to_dict(), 
            200
        )

        return response

api.add_resource(Paths, '/paths', endpoint="paths")
api.add_resource(Paths, '/paths/<int:path_id>/', endpoint="path_by_id")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
