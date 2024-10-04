const dbConfig = require('../config/config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {} ;

db.mongoose = mongoose;
db.url = dbConfig.urlDB;

db.users = require("../model/user.model")(mongoose);
db.courses = require("../model/course.model")(mongoose);
module.exports  = db;