import mongoose from 'mongoose';

const { Schema , model } = mongoose;


const UsersSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true}
}, {
    timestamps: false
})



export default model('User', UsersSchema);