# Dependencies

## Instalation

```
  pip install -r deps.txt
```


# How to run

## 1. Git clone the project

```
  git clone https://github.com/DimosTheocharis/watchShop.git .
```

## 2. Open the cloned project

## 3a. Run the app with flask

```
  python app.py
```

and open the app:

Head to _http://localhost:5000/_


## 3b. Run the app with docker

```
  docker-compose up
```

and open the app:

Head to _http://127.0.0.1:5000/_

after you are done, **stop the containers**:

```
  docker-compose down
```




# Development

## How to remove the database

If for any reason you want to remove the database (for example you added/modified some products) then tell Docker to also remote the volumes when stopping the containers:

```
  docker-compose down -v
```

## How to rebuild the image and run the project afterwards

```
  docker-compose up --build
```
