import { NextResponse } from "next/server";
import Database from "../../../../../utils/Database";
import PostsModel from "../../../../../models/Posts.model";

export const GET = async (req: Request) => {
	try {
		await Database();
		const allPosts = await PostsModel.find();
		if (allPosts && allPosts.length > 0) {
			return NextResponse.json({ success: true, data: allPosts });
		} else {
			return NextResponse.json({ success: false, message: "Something went wrong." });
		}
	} catch (error) {
		console.log("getAll, try catch:", error);
		return NextResponse.json({ success: false, message: "Internal server error." });
	}
};
