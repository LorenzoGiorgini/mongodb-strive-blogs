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
        type: Object,
        required: true,
        nested: {
            value: {
                type: Number,
                required: false
            },
            unit: {
                type: String,
                required: true,
                default: 'minutes'
            }
        }
    },
    author: {
        type: Object,
        required: true,
        nested: {
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }
        }
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        text: {type: String, required: true},
        image: {type: String, required: true},
        postedAt: {type: Date, required: true}
    }]
}, {
    timestamp: true
})



export default mongoose.model("BlogPost", BlogPostSchema)