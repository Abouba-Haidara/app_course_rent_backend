const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    departureAddress: { type: String, required: true },
    arrivalAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['en attente', 'en cours', 'terminée'],
        default: 'en attente'
    }
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
