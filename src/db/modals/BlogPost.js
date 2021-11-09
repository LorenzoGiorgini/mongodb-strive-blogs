import mongoose from 'mongoose';


const BlogPostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    readTime: {
        value: {
            type: Number,
            required: false
        },
        unit: {
            type: String,
            required: true,
            default: 'minutes'
        }
    },
    author: {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})



export default mongoose.model("BlogPost", BlogPostSchema)