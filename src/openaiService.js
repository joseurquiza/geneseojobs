// src/openaiService.js
import axios from 'axios';

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generateJobMatch = async (jobDescription, userProfile) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003", // or use "gpt-4" if your key supports it
                prompt: `Based on the job description: "${jobDescription}" and the user profile: "${userProfile}", how well does this job match? Provide a match score and a brief explanation.`,
                max_tokens: 100,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error generating job match:", error);
        return null;
    }
};
