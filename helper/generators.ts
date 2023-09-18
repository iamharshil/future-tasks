import { AvatarGenerator } from "random-avatar-generator";
export function generateAvatars(len: number) {
	const temp = [];
	for (let i = 0; i < len; i++) {
		const generator = new AvatarGenerator();
		const avatar = generator.generateRandomAvatar();
		temp.push(avatar);
	}
	return temp;
}
