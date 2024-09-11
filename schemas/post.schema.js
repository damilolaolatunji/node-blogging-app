const postSchema = {
	type: "object",
	required: ["title", "content"],
	properties: {
		title: {
			type: "string",
		},
		content: {
			type: "string",
		},
	},
};

export default postSchema;
