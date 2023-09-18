import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		pin: {
			type: Number,
			required: true,
			min: 6
		}
	},
	{ timestamps: true },
);

export default models.User || model("User", userSchema);
