import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    cover: {
        type: String,
    },
    image: {
        type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

eventSchema.statics.findByDate = async function (dateToFind){
    let events = await this.find({
        date: dateToFind
    })

    return events
}

const Event = mongoose.model('Event', eventSchema)

export default Event