import { Schema, models, model, Types } from "mongoose";

const postSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
			unique: true,
		},
        userId: {
            type: Types.ObjectId
        }
	},
	{ timestamps: true },
);

export default models.Post || model("Post", postSchema);
