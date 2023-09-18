import { NextResponse } from "next/server";
import Database from "../../../../../utils/Database";
import UsersModel from "../../../../../models/Users.model";

export const GET = async (req: Request) => {
	try {
		await Database();
		const createdUser = await UsersModel.create({
			username: "iam_harshil",
			pin: 123456,
		});
		if (createdUser) {
			return NextResponse.json({ success: true, message: "User created successfully." });
		} else {
			return NextResponse.json({ success: false, message: "Something went wrong." });
		}
	} catch (error) {
		console.log("🚀 ~ file: create.ts:5 ~ GET ~ error:", error);
		return NextResponse.json({ success: false, message: "Internal server error." });
	}
};
