import mongoose from 'mongoose'

import User from './user'
import Event from './event'

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL)
}

const models = { User, Event }

export { connectDb }

export default models