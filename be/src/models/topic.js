const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const topicSchema = mongoose.Schema({
  topicId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',
  }]
});

// find 
topicSchema.statics.create = function ( payload ) {
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// find all 
topicSchema.statics.findAll =  function() {
  // return promise 

  return this.find({});
}

// find one by topicId 
topicSchema.statics.findOneById = function(topicId){
  return this.findOne({ topicId })
}

// Update by topicId
topicSchema.statics.updateByTopicId = function (topicId, payload) {
  return this.findOneAndUpdate({topicId}, payload, { new: true }); 
}

// Delete by topicId
topicSchema.statics.deleteByTodoId = function(topicId) {
  return this.remove({topicId});
}

// create Model & Export 
const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic; 

