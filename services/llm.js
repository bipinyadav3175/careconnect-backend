import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
});

class llm {
    async findDept(symptoms) {
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