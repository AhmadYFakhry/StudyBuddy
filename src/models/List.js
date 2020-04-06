const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    userid: {
          type: mongoose.ObjectId,
          required: true,
    }
})

listSchema.virtual('listId').get(function() {
    return this._id;
});


const List = mongoose.model("Lists", listSchema);


module.exports = List
