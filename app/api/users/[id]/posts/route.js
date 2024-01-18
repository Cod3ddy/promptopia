import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		// access the params [params are populated is you pass dynamic parameters ]
		// get posts[prompts] for a specific creator
		const prompts = await Prompt.find({
			creator: params.id,
		}).populate("creator");

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response("failed to fetch all prompts", { status: 500 });
	}
};
