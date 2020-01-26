import { Router } from 'express'
import urlGoogle from '../utils/google-util'

const router = Router()

router.get('/', async (req, res) => {
    return res.send(urlGoogle)
})

export default router