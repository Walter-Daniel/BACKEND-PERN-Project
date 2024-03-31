import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';


const options : swaggerJSDoc.Options = {

    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
    customCss:  `
        .topbar-wrapper .link {
            content: url('https://res.cloudinary.com/journal-project/image/upload/v1711859249/uoszlmjulflfxdeu9dlm.png');
            height: 80px;
            width: auto;
            object-fit: contain;
        }
    `,
    customSiteTitle: 'REST API Express / TypeScript Documentation'
}
export default swaggerSpec;
export {
    swaggerUiOptions
}