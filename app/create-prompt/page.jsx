"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/form";

export const CreatePrompt = () => {
	const [submitting, setsubmitting] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	
	// console.log(`the session: ${session?.user.id}`);


	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	// create prompt
	const createPrompt = async (e) => {
		e.preventDefault();
		setsubmitting(true);

		try {
			// api call
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setsubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setpost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
