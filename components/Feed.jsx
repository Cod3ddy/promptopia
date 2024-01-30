"user client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// PromptCardList
const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data[0].map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");

	// handle user searching
	const handleSearchChange = (e) => {};

	const [posts, setPosts] = useState([]);

	// fetch posts || prompts
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			// alert(data[0].creator.image);
		
			setPosts(data);
		};

		// console.log("data from feed:", posts);
		fetchPosts();
	}, []);

	//
	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{/* prompts */}

			<PromptCardList data={[posts]} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
