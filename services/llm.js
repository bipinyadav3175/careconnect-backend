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