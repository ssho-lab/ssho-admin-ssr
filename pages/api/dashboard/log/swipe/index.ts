import axios from "axios";

const handler = async (req, res) => {
    try {
        let result = await axios.get('https://3a3uqctsjk.execute-api.ap-northeast-2.amazonaws.com/dev/swipeSets');
        res.status(200).json(result.data)
    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}

export default handler;