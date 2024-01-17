import mongoose from "mongoose";

// track connection status
let isconnected = false;

export const connectionToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isconnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "share_prompt",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isconnected = true;
		console.log("MongoDb is connected");
	} catch (error) {
		console.log(error);
	}
};

export default connectionToDB;
