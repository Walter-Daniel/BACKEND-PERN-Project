import { Router } from 'express';

const router =  Router();


router.get('/', (req, res) => {

    res.json('Hola mundo en express')

})

export default router;