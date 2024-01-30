"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/form";

export const EditPrompt = () => {
	const [submitting, setsubmitting] = useState(false);
	const router = useRouter();
    const searchParams = useSearchParams();

    // get the prompt id
    const promptId = searchParams.get('id');
	
	// console.log(`the session: ${session?.user.id}`);


	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

    useEffect(()=>{
        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json();

            // set the prompt to be updated
            setPost({
                prompt: data.prompt ,
                tag: data.tag
            })
        }


        // when prompt id exists

        if(promptId) getPromptDetails();
    }, [promptId])

	// update the prompt
	const updatePrompt = async (e) => {
		e.preventDefault();
		setsubmitting(true);

		if(!promptId) return alert('Prompt id is missing')

		try {
			// api call
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
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
			type="Edit"
			post={post}
			setpost={setPost}
			submitting={submitting}
			handleSubmit={ updatePrompt}
		/>
	);
};

export default EditPrompt;
