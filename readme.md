# Proyecto básico con NODE, EXPRESS, MONGODB
## Tablas: products
## Ruta dinámica (recomendado)


http://localhost:8000/api/products\
http://localhost:3000/api/products?sort=name,-price\
http://localhost:3000/api/products?sort=name,-price&fields=company,rating\
http://localhost:3000/api/products?sort=name&fields=name,price&limit=3&page=3\
http://localhost:3000/api/products?numericFilters=price>=115,rating>=4

node populate.js para rellenar la bd