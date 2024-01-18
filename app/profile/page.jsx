"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { userRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	// session
	const { data: session } = useSession();

	const [posts, setPosts] = useState("");
	// fetch posts || prompts
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session.user.id}/posts`);
			const data = await response.json();
			// alert(data[0].creator.image);
			setPosts(data);
		};

		// fetch posts only when user id is available
		if (session?.user.id) fetchPosts();
	}, []);
	const handleEdit = () => {};
	const handleDelete = async () => {};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={[posts]}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
