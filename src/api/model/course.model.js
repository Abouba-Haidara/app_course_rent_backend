module.exports = mongoose =>  {
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    departureAddress: { type: String, required: true },
    arrivalAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['en attente', 'en cours', 'terminée'],
        default: 'en attente'
    },
    user: [ { type: mongoose.Schema.Types.ObjectId, ref: "User"}],
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
return Course;
}

