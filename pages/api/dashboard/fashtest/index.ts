import client from "../../../../config/ElasticSearchClient";
const handler = async (req, res) => {

	try {
		const { body } = await client.search({
			index: "fash-test-result",
			body: {
				query: {
					matchAll: {}
				},
				size: 1000
			},
		});

		res.status(200).json(body);

	} catch (err) {
		res.status(500).json({statusCode: 500, message: err.message})
	}
}

export default handler;
