import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models, { connectDb } from './models'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
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
        image: 'https://obsolete-storage.s3.amazonaws.com/Test-Image.JPG',
        user: user1.id,
    })

    const event2 = new models.Event({
        description: 'The Connors',
        location: 'The House of Connor',
        date: 'a year from now',
        time: '8 am',
        cover: '$10',
        image: 'https://obsolete-storage.s3.amazonaws.com/Test-Image2.jpg',
        user: user1.id,
    })

    const event3 = new models.Event({
        description: 'Lorenzo Senni',
        location: 'somewhere in italy',
        date: 'thursday',
        time: '11 pm',
        cover: '$4',
        image: 'https://obsolete-storage.s3.amazonaws.com/Test-Image2.jpg',
        user: user1.id,
    })

    const event4 = new models.Event({
        description: 'Steve',
        location: 'Mars',
        date: 'Always',
        time: '13 PM',
        cover: '$400',
        image: 'https://obsolete-storage.s3.amazonaws.com/Test-Image.JPG',
        user: user1.id,
    })

    await event1.save()
    await event2.save()
    await event3.save()
    await event4.save()


    await user1.save()


}