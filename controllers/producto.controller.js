import Product from "../models/product.js";

export const getAllProductsStatic = async (req, res) => {
    // !* MUESTRA TODOS LOS PRODUCTOS QUE EN SU NAME CONTENGAN LA CADENA "AB":
    /*  const search = "ab";
    const products = await Product.find({
        name: { $regex: search, $options: "i" },
    }); */

    // !* FILTRAR POR ATRIBUTOS:
    const products = await Product.find({
        // feature: true,
        // company: 'marcos',
    })
        // !* ORDENAR SEGÚN NAME ALFABÉTICAMENTE DESCENDENTE Y SEGÚN EL PRECIO ASCENDENTEMENTE:
        // .sort('-name price')
        // !* MUESTRA SOLAMENTE EL NAME Y EL PRICE, Y QUITA EL _ID QUE POR DEFECTO SE ENVÍA OBLIGATORIO:
        // .select('name price -_id')
        // !* LIMITA LA CANTIDAD DE OBJETOS QUE SE RESPONDEN:
        .limit(10)
        // !* MUESTRA A PARTIR DEL OBJETO DE ÍNDICE 2:
        .skip(2);
    return res.status(200).json({ products, quantity: products.length });
};

export const getAllProducts = async (req, res) => {
    // http://localhost:3000/api/products?sort=name,-price
    // http://localhost:3000/api/products?sort=name,-price&fields=company,rating
    // http://localhost:3000/api/products?sort=name&fields=name,price&limit=3&page=3
    // http://localhost:3000/api/products?numericFilters=price>=115,rating>=4
    const { feature, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (feature) {
        queryObject.feature = feature === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (numericFilters) {
        const operatorsMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorsMap[match]}-`
        );
        // console.log(filters);
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }
    // console.log(queryObject);
    let result = Product.find(queryObject);
    // sort
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }
    // select:
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result;
    return res.status(200).json({ products, quantity: products.length });
};