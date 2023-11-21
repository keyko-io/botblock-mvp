import axios from 'axios';


export const fetchRobotsTxt = async (req: any, res: any) => {
    const { url } = req.query; // Extract the 'url' query parameter

    if (!url) {
        return res.status(400).send("Missing url parameter");
    }

    try {
        const response = await axios.get(`${url}/robots.txt`);
        res.send(JSON.stringify(response.data));
    } catch (error) {
        res.status(500).send("Error fetching robots.txt");
    }
}