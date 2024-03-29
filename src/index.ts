import server from './server';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`\x1b[35m Escuchando desde el puerto: ${port} \x1b[37m`)
})