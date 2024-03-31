import {connectDB} from '../server';
import db from '../config/db'

jest.mock('../config/db')

describe('ConnectDB', () => {
    it('Should handle database connection error', async() => {

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error al conectarse a la base de datos'))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith( expect.stringContaining('Error al conectarse a la base de datos') )

    })
})

