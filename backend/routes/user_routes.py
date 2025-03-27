from flask import Blueprint, jsonify
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask import request
from models.user import User, AccountState


user_bp = Blueprint('user', __name__, url_prefix='/api/users')
mongo = None

def init_mongo(mongo_instance):
    global mongo
    mongo = mongo_instance

@user_bp.route('/favourite', methods=['POST'])
def toggle_favourite_institution():
    data = request.json
    username = data.get('username')
    institution_name = data.get('institution_name')

    if not username or not institution_name:
        return jsonify({'error': 'username and institution_name are required'}), 400

    user_collection = mongo.db[User.COLLECTION]

    user = user_collection.find_one({'username': username})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    is_favourited = institution_name in user.get('favourited_institutions', [])

    if is_favourited:
        # Unfavourite using $pull
        user_collection.update_one(
            {'username': username},
            {'$pull': {'favourited_institutions': institution_name}}
        )
        return jsonify({'message': f'{institution_name} removed from favourites', 'favourited': False}), 200
    else:
        # Favourite using $addToSet
        user_collection.update_one(
            {'username': username},
            {'$addToSet': {'favourited_institutions': institution_name}}
        )
        return jsonify({'message': f'{institution_name} added to favourites', 'favourited': True}), 200

@user_bp.route('/get-favourites', methods=['GET'])
def get_favourites():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username required'}), 400

    user = mongo.db[User.COLLECTION].find_one({'username': username})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    favourites = user.get('favourited_institutions', [])
    return jsonify({'favourites': favourites}), 200