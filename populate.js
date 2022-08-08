// código para agregar objetos a la bd:
import {} from "dotenv/config";
import { dbConnection } from "./db/connection.js";
import Product from "./models/product.js";

import { readFile } from 'fs/promises';
const json = JSON.parse(await readFile(new URL('./products.json', import.meta.url)));


const start = async () => {
    try {
        await dbConnection(process.env.MONGO_CNN);
        await Product.deleteMany();
        await Product.create(json);
        console.log("Success");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();