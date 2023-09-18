import Image from "next/image";
import { generateAvatars } from "../../helper/generators";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let avatars: string[] = [];

async function getAllPosts() {
	return await fetch(`${process.env.API_URL}/posts/getAll`, { cache: "no-cache" })
		.then((response) => response.json())
		.then((response) => {
			if (response?.success) {
				avatars = generateAvatars(response.data.length);
				return response.data;
			} else {
				return [];
			}
		})
		.catch((error) => {
			console.log("🚀 ~ file: page.tsx:18 ~ getAllPosts ~ error:", error);
			return [];
		});
}

function TweetCard({ post, index }: { post: { content: string }; index: number }) {
	"use client";
	return (
		<div className="py-2">
			<div className="bg-slate-900 border-slate-700 p-4 rounded-xl border max-w-full">
				<div className="flex justify-between">
					<div className="flex items-center">
						<Image
							className="h-11 w-11 rounded-full border border-slate-700"
							// src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
							src={avatars[index]}
							alt="profile"
							width={1000}
							height={1000}
						/>
						<div className="ml-1.5 text-sm leading-tight">
							<span className="text-black dark:text-white font-bold block ">Visualize Value</span>
							<span className="text-gray-500 dark:text-gray-400 font-normal block">@visualizevalue</span>
						</div>
					</div>
					<svg className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24">
						<g>
							<path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
						</g>
					</svg>
				</div>
				<p className="text-black dark:text-white block text-xl leading-snug mt-3">{post.content}</p>
				{/* <Image
					className="mt-2 rounded-2xl border border-slate-700 dark:border-gray-700"
					src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
					alt="twitter"
					width={1000}
					height={1000}
				/> */}
				<p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">10:05 AM · Dec 19, 2020</p>
				<div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
				<div className="text-gray-500 dark:text-gray-400 flex mt-3">
					<div className="flex items-center mr-6">
						<svg
							className="fill-current h-5 w-auto"
							viewBox="0 0 24 24"
							// style=""
						>
							<g>
								<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
							</g>
						</svg>
						<span className="ml-3">615</span>
					</div>
					<div className="flex items-center mr-6">
						<svg className="fill-current h-5 w-auto" viewBox="0 0 24 24">
							<g>
								<path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
							</g>
						</svg>
						<span className="ml-3">93 people are Tweeting about this</span>
					</div>
				</div>
			</div>
		</div>
	);
}

function PostsTextBox() {
	const cookieStore = cookies();
	const token = cookieStore.get("token");
	if (!token) {
		return redirect("/login", "push");
	}
	return (
		<form>
			<div className="mb-4 w-full bg-slate-900 rounded-lg border border-slate-950">
				<div className="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
					<div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
						<div className="flex items-center space-x-1 sm:pr-4">
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-wrap items-center space-x-1 sm:pl-4">
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>
					<button
						type="button"
						data-tooltip-target="tooltip-fullscreen"
						className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<div
						id="tooltip-fullscreen"
						role="tooltip"
						className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-slate-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
					>
						Show full screen
						<div className="tooltip-arrow" data-popper-arrow />
					</div>
				</div>
				<div className="py-2 px-4 bg-slate-900 rounded-b-lg dark:bg-gray-800">
					<label htmlFor="editor" className="sr-only">
						Publish post
					</label>
					<textarea
						id="editor"
						rows={8}
						className="block px-0 w-full text-sm text-gray-200 bg-slate-900 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
						placeholder="Write an note here..."
						required
					/>
				</div>
			</div>
			<button
				type="submit"
				className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
			>
				Publish post
			</button>
		</form>
	);
}

export default async function Home() {
	const posts = await getAllPosts();
	return (
		<main className="h-screen w-screen">
			<div className="max-w-2xl mx-auto p-2 flex-row justify-center align-center">
				{posts.map((post: { content: string }, index: number) => (
					<TweetCard post={post} index={index} key={index + index} />
				))}
				<PostsTextBox />
			</div>
		</main>
	);
}
