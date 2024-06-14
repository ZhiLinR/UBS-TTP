/**
 * Contains the text prompts to be inserted into OpenAI API.
 * Lowkey what is this code :wtf:
 */
export class _Prompt {
    /**
     * Inserts the parameters into different parts of the text prompt as appropriate.
     * @param profile - The user profile retrieved from the Profile Microservice.
     * @param audience - The randomly generated audience for the user to interact. See {@link createProfilePrompt} for details.
     * @param topic - A scenario topic. See topic.ts for the current full list of topics.
     * @returns A large chunk of text prompt to be inserted into OpenAI API.
     */
    protected createScenarioPrompt(profile: string, audience: string, topic: string) {
        let generated_prompt: string = `
            User Profile: ${profile}
            Audience Profile: ${audience}
            Generate a inclusivity training scenario on the topic of ${topic} in past tense. You will play as the main character in the situation who 
            interacts with the defined audience profile. Include background specific details from the user profile to include as your personal traits.
            Be specific about the culture, race, gender, job scope or background when creating the scenario.
            Use "I" to refer to yourself for the subject of the scenario and end off the scenario with "What should I do?"

            Generate a detailed passive, reactive, active, proactive response toward this scenario.
            Remove any identifiable traits. Incorporate the use of "you should" for these options.
            Place the options in the following JSON format 
            {"scenario":"","options":{ "passive":"","reactive":"","proactive":"","active":"" }}
            `
        return generated_prompt;
    }

    /**
     * This function randomly generates an audience for the user to interact with.
     * @param topic A scenario topic. See topic.ts for the current full list of topics.
     * @returns A large chunk of text prompt to be inserted into OpenAI API.
     */
    protected createProfilePrompt(topic: string) {
        let generated_prompt: string = `
            Topic: ${topic}
            Generate a random user profile using this topic. Include their gender, age, job title, company seniority and a 50 word biography. 
            Remove any identifiable traits.
            Place the options in the following JSON format, ensure that the keys are enclosed in quotes
            {"gender":"","age":"","job_title":"","seniority":"","biography":""}`
        return generated_prompt;
    }

    /**
     * This function creates a prompt to generate a personality summary from the user's interactions.
     * @param profile_data - The user profile retrieved from the Profile Microservice.
     * @param scenario_data - A compilation of the user's reactions to presented scenarios
     * @returns A large chunk of text prompt to be inserted into OpenAI API.
     */
    protected createSummaryPrompt(profile_data:string, scenario_data: string) {
        let generated_prompt: string = `
        Summarise the following profile data into a personality in 70 words in second person language. Do not include specific occupational information.
        User Profile: ${profile_data}
        Situational Behaviour: ${scenario_data}
        Place the options in the following JSON format, ensure that the keys are enclosed in quotes
        {"profile_summary":""}`

        return generated_prompt;
    }

}
