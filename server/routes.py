from flask import Blueprint, request, jsonify, make_response
from models import db, Lab, Test, Price

api_routes = Blueprint('api', __name__)

@api_routes.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to JJ Diagnostics!"})

# LABS

@api_routes.route('/labs', methods=['GET'])
def get_labs():
    labs = Lab.query.all()
    return jsonify([lab.to_dict() for lab in labs]), 200

@api_routes.route('/labs', methods=['POST'])
def add_lab():
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Missing required fields"}), 422

    try:
        new_lab = Lab(name=data['name'], email=data['email'])
        db.session.add(new_lab)
        db.session.commit()
        return jsonify(new_lab.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api_routes.route('/labs/<int:id>', methods=['DELETE'])
def delete_lab(id):
    lab = Lab.query.get(id)
    if not lab:
        return jsonify({"error": "Lab not found"}), 404

    db.session.delete(lab)
    db.session.commit()
    return jsonify({"message": "Lab deleted"}), 200

@api_routes.route('/labs/<int:id>', methods=['PATCH'])
def update_lab(id):
    data = request.get_json()
    lab = Lab.query.get(id)
    if not lab:
        return jsonify({"error": "Lab not found"}), 404

    if 'name' in data:
        lab.name = data['name']
    if 'email' in data:
        lab.email = data['email']
    
    db.session.commit()
    return jsonify(lab.to_dict()), 200

# TESTS

@api_routes.route('/tests', methods=['GET'])
def get_tests():
    tests = Test.query.all()
    return jsonify([
        {
            "id": test.id,
            "name": test.name,
            "initial": test.initial,
            "prices": [
                {
                    "id": price.id,
                    "amount": price.amount,
                    "lab": {"id": price.lab.id, "name": price.lab.name}
                }
                for price in test.prices
            ]
        }
        for test in tests
    ]), 200

@api_routes.route('/tests/<int:id>', methods=['GET'])
def get_test(id):
    test = Test.query.get(id)
    if not test:
        return jsonify({"error": "Test not found"}), 404

    return jsonify({
        "id": test.id,
        "name": test.name,
        "initial": test.initial,
        "prices": [
            {
                "id": price.id,
                "amount": price.amount,
                "lab": {"id": price.lab.id, "name": price.lab.name}
            }
            for price in test.prices
        ]
    }), 200

@api_routes.route('/tests', methods=['POST'])
def add_test():
    data = request.get_json()
    if not data or 'name' not in data or 'initial' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_test = Test(name=data['name'], initial=data['initial'])
        db.session.add(new_test)
        db.session.commit()
        return jsonify(new_test.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api_routes.route('/tests/<int:id>', methods=['PUT'])
def update_test(id):
    test = Test.query.get(id)
    if not test:
        return jsonify({"error": "Test not found"}), 404

    data = request.get_json()
    test.name = data.get('name', test.name)
    test.initial = data.get('initial', test.initial)
    db.session.commit()

    return jsonify(test.to_dict()), 200

@api_routes.route('/tests/<int:id>', methods=['DELETE'])
def delete_test(id):
    test = Test.query.get(id)
    if not test:
        return jsonify({"error": "Test not found"}), 404

    db.session.delete(test)
    db.session.commit()
    return jsonify({"message": "Test and associated prices deleted"}), 200

# PRICES

@api_routes.route('/prices', methods=['GET'])
def get_prices():
    try:
        prices = Price.query.all()
        return jsonify([price.to_dict() for price in prices]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_routes.route('/tests/<int:test_id>/prices', methods=['GET'])
def get_prices_id(test_id):
    test = Test.query.get(test_id)
    if not test:
        return jsonify({"error": "Test not found"}), 404

    return jsonify([price.to_dict() for price in test.prices]), 200

@api_routes.route('/prices', methods=['POST'])
def add_price():
    try:
        data = request.get_json()  # Corrected method to retrieve JSON data
        lab = data.get("lab")      # Corrected method to access dictionary items
        test = data.get("test")
        price = data.get("price")
        lab_id = data.get("lab_id")
        test_id = data.get("test_id")

        if not lab or not test:
            return jsonify({"error": "Lab or Test not found"}), 404

        new_price = Price(
            price=price,
            lab=lab,
            test=test,
            lab_id=lab_id,
            test_id=test_id
        )

        db.session.add(new_price)
        db.session.commit()
        return jsonify(new_price.to_dict()), 201  # Changed make_response to jsonify
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api_routes.route('/prices/<int:id>', methods=['PUT'])
def update_price(id):
    price = Price.query.get(id)
    if not price:
        return jsonify({"error": "Price not found"}), 404

    data = request.get_json()
    price.amount = data.get('amount', price.amount)
    db.session.commit()

    return jsonify(price.to_dict()), 200

@api_routes.route('/prices/<int:price_id>', methods=['DELETE'])
def delete_price(price_id):
    try:
        price = Price.query.get(price_id)
        if not price:
            return jsonify({"error": "Price not found"}), 404

        db.session.delete(price)
        db.session.commit()
        return jsonify({"message": "Price deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 