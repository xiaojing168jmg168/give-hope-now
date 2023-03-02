const db = require('../config/connection');
const { User, Story } = require('../models');
const userData = require('./userData.json');
const storyData = require('./storyData.json');


db.once("open", async () =>{
    await User.deleteMany({});

    await User.insertMany(userData);

    await Story.deleteMany({});

    await Story.insertMany(storyData);

    console.log('done deel brother');
})