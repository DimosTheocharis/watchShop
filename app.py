from flask import Flask, render_template
from data.products import products


app = Flask(__name__)

@app.route('/')
def homepage_route():
    print(products)
    return render_template("homepage.html", products=products)

@app.route('/products')
def products_route():
    return render_template("products.html", var=20)


if __name__ == "__main__":
    app.run(debug=True)