var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        ispn: {type: String, required: true, max: 100},
        coursename: {type: String, required: true, max: 100},
        coursenumber: {type: String, required: true, max: 100},
        booktitle: {type: String, required: true, max: 100},
        price: {type: String, required: true, max: 100},
        imagename: {type: String, required: true, max: 100},
        username: {type: String, required: true, max: 100},
    }
);

//virtual url
BookSchema.virtual('url').get(
    function(){
        return '/Books/'+this._id;
    }
);

module.exports = mongoose.model('Books', BookSchema);