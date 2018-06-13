var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        //^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$
        type: String,
        unique: [true, 'Username existed'],
        required: [true, 'Username is required'],
        minlength: [7, 'Min length of username is 7 chars'],
        maxlength: [30, 'Max length username is 30 chars'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/.test(v);
            },
            message: '{VALUE} is not include special chars!'
          },
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [7, 'Min length of Password is 7 chars'],
        maxlength: [30, 'Max length Password is 30 chars']
    },
    level: {
        type: String,
        required: true,
        default: 'memb'
    },
    score: {
        type: Number,
        default: 0
    },
    studentid: String,
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);