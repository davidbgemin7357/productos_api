import express from "express";
import cors from "cors";
import { dbConnection } from "../db/connection.js";
import { router as product_router} from "../routes/producto.routes.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.paths = {
            products: "/api/products",
        };

        this.connectDB();

        this.middlewares();

        this.router();
    }

    // conexion a bd
    async connectDB() {
        await dbConnection();
    }

    // middlewares:
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    // rutas:
    router() {
        this.app.use(this.paths.products, product_router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
}
