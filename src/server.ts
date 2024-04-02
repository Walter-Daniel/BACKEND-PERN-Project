import express from 'express';
import productRouter from './router';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';


//Connected DB

export async function connectDB() {
    try {
        console.log('\x1b[36m iniciando la conexión\x1b[37m')
        await db.authenticate()
        await db.sync()
        // console.log('\x1b[34m conectado a la base de datos \x1b[37m')        
    } catch (error) {
        console.log('\x1b[31m Error al conectarse a la base de datos \x1b[37m')
    }
}
connectDB()

//Server instance

const server = express();

//Connect Cors
const corsOptions: CorsOptions = {
    origin: '*'
    // origin: function(origin, callback) {
    //     if(origin === `${process.env.FRONTEND_URL}`){
    //         callback(null, true)
    //     }else{
    //         callback(new Error('Error CORS'))
    //     }
    // }
} 
server.use(cors(corsOptions))

//Read data

server.use(express.json());

server.use(morgan('dev'));

//Routing

server.use('/api/products', productRouter);

//Docs - make Swagger documentation public
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Allow CORS for frontend
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


export default server;