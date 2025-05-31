from flask_pymongo import PyMongo
from data.products import products

def initialize(mongo: PyMongo):
    '''
        This function looks for 'watchesDatabase' and if it doesn't exist, then it 
        creates it. Also it creates a 'watches' collection inside, and inserts default
        products data
        @return the 'watches' database 
    '''
    databases = mongo.cx.list_database_names()
    database_name = "watchesDatabase"
    collection_name = "watches"

    print("Databases = ")
    print(databases)

    # Check if database already exists 
    if (database_name in databases):
        return mongo.cx[database_name]
    else:
        # Insert default products in the 'watches' collection
        mongo.cx[database_name][collection_name].insert_many(products)


    return mongo.cx[database_name]