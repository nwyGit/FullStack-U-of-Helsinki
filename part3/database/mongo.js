import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: { type: String, minLength: 3, required: true },
	number: {
		type: String,
		validate: {
			validator: function (v) {
				// Check if the input has a length of 8 or more and consists of two parts separated by a hyphen
				if (v.length >= 8 && /^(\d{2,3})-(\d+)$/.test(v)) {
					return true;
				}
				return false;
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
		required: true,
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const Person = mongoose.model('Person', personSchema);
