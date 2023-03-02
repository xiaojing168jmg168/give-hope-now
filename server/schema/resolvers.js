const { AuthenticationError } = require('apollo-server-express');
const { User, Story } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        getAllUsers: async () =>{
            return await User.find({}).select('-__v -password').populate('stories');
        },

        user: async (parent, args) =>{
           
            return await User.findById(args._id);
        },

        stories: async (parent, {userId, name})=>{
           
            const params = {};

            if (userId) {
                params.userId = userId;
            }

            if (name) {
                params.name = {
                $regex: name
                };
            }

            return await Story.find(params).populate('userId');
        },

        story: async (parent, args) =>{
            const story = await Story.findById(args._id).populate('userId');
            console.log(story);
            return story; 
        },
        
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('stories');
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

        },

    Mutation:{
        //Add a user
        addUser: async(parent, args) => {
             
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
      
        },

        login: async (parent, { email, password }) =>{
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('No user found with this email address!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        
        // Delete a user
        deleteUser: async (parent, args, context) => {
            if(context.user){
            Story.find({ userId: args.id }).then((stories) => {
              stories.forEach((story) => {
                story.remove();
              });
            });
       
            return await User.findByIdAndRemove(args.id);
        }
        },
       // Add a story
        addStory: async (parent, args, context) => {
            console.log(context.user);
         if(context.user){
            const story = await Story.create({
                title: args.title,
                description: args.description,
                image: args.image,
                userId: context.user._id,
              });
              await User.findByIdAndUpdate(context.user._id,{
                  $addToSet: {stories: story}
              })  
           return story;
            }
        },
        
        // Delete a story
        deleteStory: async (parent, args, context) =>{
            if(context.user){
            const story = Story.findByIdAndRemove(args._id);
            await User.findByIdAndUpdate(context.user._id,{
                $pull: {stories: story._id}
            },
            {new:true}) 
            return story;
            }
        },

        // Update a story
        updateStory: async (parent, args, context) => {
            if(context.user){
            return await Story.findByIdAndUpdate(
                args._id,
                {
                  $set: {
                    title: args.title,
                    description: args.description,
                    image: args.image,
                  },
                },
                { new: true }
              );
            }
        }
    }
}

module.exports = resolvers;