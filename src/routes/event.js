import { Router } from 'express'
import models from '../models'

const router = Router()

router.get('/', async (req, res) => {
    const event = await req.context.models.Event.find()

    return res.send(event)
})

router.get('/:userId', async (req, res) => {
    const event = await req.context.models.Event.findById(req.params.userId)
    return res.send(event)
})

router.post('/', async (req, res) => {
    const event = new models.Event({
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        cover: req.body.cover,
        image: req.body.image,
        user: req.context.me.id
    })
    await event.save()
    return res.send(event)
})

router.delete('/:eventId', async (req, res) => {
    const event = await req.context.models.Event.findById(req.params.eventId)

    let result = null
    if (event) {
        result = await event.remove()
    }

    return res.send(result)
})
export default router