import OpenAI from "openai";


class llm {
    async findDept(symptoms) {
        // console.log("Api key =====> ", process.env.OPENAI_API_KEY)
        const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
        });
        try {
            const response = await openai.responses.create({
                prompt: {
                    "id": "pmpt_68b83d4b9fb8819594dd331173cd07630a38dd547a8e9deb",
                    "version": "2",
                    "variables": {
                    "symptoms": symptoms
                    }
                }
            });
            return response
        } catch (err) {
           console.log(err);
           throw err;
        }
    }
}

export default new llm();