import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models, { connectDb } from './models'
import routes from './routes'

const app = express()

app.use(cors())
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('gigasturtz'),
    }
    next()
})

app.use('/user', routes.user)
app.use('/event', routes.event)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

const eraseDatabaseOnSync = true; 

connectDb().then(async () => { 

if (eraseDatabaseOnSync) {
    await Promise.all([
        models.User.deleteMany({}),
        models.Event.deleteMany({}),
    ])

    createUserWithEvents();
}

app.listen(process.env.PORT, () => 
    console.log(`Listening on port ${process.env.PORT}!`),)
})


const createUserWithEvents = async () => {
    const user1 = new models.User({
        username: 'gigasturtz',
    })

    const event1 = new models.Event({
        description: 'show with bands and stuff',
        location: 'my house',
        date: 'tomorrow',
        time: '4 am',
        cover: '$40',
        user: user1.id,
    })

    await event1.save()

    await user1.save()


}