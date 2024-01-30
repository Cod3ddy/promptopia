"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { usePathname, usepPathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	// check whether the prompt has been copied or not
	const [copied, setCopied] = useState("");

	// session 
	const {data: session} = useSession();

	// pathname 

	const pathName = usePathname();

	// router 

	const router = useRouter();

	// copy the prompt
	const handleCopy = () => {
		console.log("copying....");
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);

		setTimeout(() => {
			setCopied("");
		}, 3000);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					{/* user image */}
					<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					{/* username and email */}
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator.email}
						</p>
					</div>
					{/* copy button and the prompt */}
					<div className="copy_btn" onClick={handleCopy}>
						<Image
							src={
								copied === post.prompt
									? "/assets/icons/tick.svg"
									: "/assets/icons/copy.svg"
							}
							alt="copy_icon"
							width={12}
							height={12}
						/>
					</div>
				</div>
			</div>
			<p className="my-4 font-satoshi text0-sm text-gray-700">{post.prompt}</p>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>

			{/* check ther currently logged in users */}

			{session?.user.id === post.creator._id && pathName === '/profile' &&  (
				<div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
					{/* edit */}
					<p className="font-inter text-sm green_gradient cursor-pointer"
					onClick={handleEdit}>
						Edit
					</p>

					{/* delete */}
					<p className="font-inter text-sm orange_gradient cursor-pointer"
					onClick={handleDelete}>
						Delete
					</p>


				</div>
			)}

		</div>
	);
};

export default PromptCard;
