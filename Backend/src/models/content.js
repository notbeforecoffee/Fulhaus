import mongoose from 'mongoose';

const {Schema} = mongoose;

const productSchema = new Schema({
    acronym: {type: String, required: true},
    definition: {type: String, required: true}, 
});

export default mongoose.model('Products', productSchema);
