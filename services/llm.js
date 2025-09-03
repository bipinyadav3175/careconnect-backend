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