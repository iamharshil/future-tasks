import { NextResponse } from "next/server";
import Database from "../../../../../utils/Database";
import PostsModel from "../../../../../models/Posts.model";

export const GET = async (req: Request) => {
	try {
		await Database();
		const createdPost = await PostsModel.create({
			content: "First post content, hehe.!!",
			userId: "6508b633ff71b230a82fc489",
		});
		if (createdPost) {
			return NextResponse.json({ success: true, message: "Post created successfully." });
		} else {
			return NextResponse.json({ success: false, message: "Something went wrong." });
		}
	} catch (error) {
		console.log("🚀 ~ file: create.ts:5 ~ GET ~ error:", error);
		return NextResponse.json({ success: false, message: "Internal server error." });
	}
};
