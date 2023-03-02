const { Schema, model } = require('mongoose');

const storySchema = new Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
})
const Story = model('Story', storySchema);
  
 module.exports = Story;