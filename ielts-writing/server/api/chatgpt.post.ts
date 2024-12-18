import axios from 'axios';


export default defineEventHandler(async (event) => {
    const res = await readBody(event)
    try {
        const result = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [
              { role: 'user', content: res.message }
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        )
        return result.data.choices[0].message.content
    } catch (error) {
        console.error(error)
        return error
    }
})