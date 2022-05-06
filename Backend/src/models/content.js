import mongoose from 'mongoose';

const {Schema} = mongoose;

const contentSchema = new Schema({
    acronym: {type: String},
    definition: {type: String}, 
});

export default mongoose.model('Content', contentSchema);
