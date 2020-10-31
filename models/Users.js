var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max: 100},
        firstname: {type: String, required: true, max: 100},
        lastname: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        email: {type: String, required: true, max: 100},
    }
);

//virtual url
UserSchema.virtual('url').get(
    function(){
        return '/Users/'+this._id;
    }
);

module.exports = mongoose.model('Users', UserSchema);