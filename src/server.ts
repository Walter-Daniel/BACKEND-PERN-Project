import express from 'express';
import productRouter from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';


//Connected DB

export async function connectDB() {
    try {
        console.log('\x1b[36m iniciando la conexión\x1b[37m')
        await db.authenticate()
        db.sync()
        // console.log('\x1b[34m conectado a la base de datos \x1b[37m')        
    } catch (error) {
        console.log('\x1b[31m Error al conectarse a la base de datos \x1b[37m')
    }
}
connectDB()

//Server instance

const server = express();

//Read data

server.use(express.json());

//Routing

server.use('/api/products', productRouter);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));


export default server;