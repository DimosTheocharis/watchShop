from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
from data.products import products
from static.database_initialization import initialize

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017"
mongo = PyMongo(app)

db = initialize(mongo)
print('------------------------------------------------')
print(db)

@app.route('/')
def homepage_route():
    print(products)
    return render_template("homepage.html", products=products)

@app.route('/products')
def products_route():
    return render_template("products.html")


########################################  API  ########################################

@app.route('/api/popular-products', methods=['GET'])
def popular_products():
    # Find the top 5 most liked watches (in descending order)
    popular = list(db.watches.find(sort=[('likes', -1)], limit=5))

    return jsonify(popular)

@app.route('/api/products')
def api_products():
    # pull everything from Mongo, omit the internal _id
    items = list(db.watches.find({}, {'_id': False}))
    return jsonify(items)

@app.route('/api/search/<string:name>', methods=['GET'])
def searchWithParameter(name):
    results = list(db.watches.find({"name": {"$regex": name, "$options": "i"}}, sort=[('price', -1)]))

    return jsonify(results)


@app.route('/api/search/', methods=['GET'])
def searchWithoutParameter():
    results = list(db.watches.find())

    return jsonify(results)


@app.route('/api/like/<int:id>', methods=['POST'])
def like(id):
    product = db.watches.find_one({"id": id})
    
    if (product):
        db.watches.update_one({'id': id}, {'$set': {'likes': product['likes'] + 1}})
        return jsonify(True)

    return jsonify(False)

if __name__ == "__main__":
    app.run(debug=True)