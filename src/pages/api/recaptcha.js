import axios from 'axios';

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

export default async function handler(req, res) {
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.token}`,
            {
                response: req.body.token,
                secret: SECRET_KEY,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                }
            }

        )

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error })
    }
    // res.status(200).json({ name: 'John Doe' })
}
