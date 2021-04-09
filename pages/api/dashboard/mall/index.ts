import axios from "axios";

const handler = async (req, res) => {
    try {
        let result = await axios.get('http://api.ssho.tech:8080/mall/list');
        res.status(200).json(result.data)
    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}

export default handler;