import * as PromptOptions from './init/topic.js';
import * as OpenAIConfig from './ScenarioClass.js';

import * as InitUser from './init/user.js'
import * as InitPrompt from './init/topic.js';

/**
 * This class should not interact with the controller at all. Contains the text prompts to be inserted into OpenAI API.
 * Lowkey what is this code :wtf:
 */
export class _Prompt {
    //Public Function Call Accessible by OpenAI API
    public createScenarioPrompt(profile: string, audience: string, topic: string) {
        let generated_prompt: string = `
            User Profile: ${profile}
            Audience Profile: ${audience}
            Generate a inclusivity training scenario on the topic of ${topic}. You will play as the main character in the situation who 
            interacts with the defined audience profile.

            Generate a passive, reactive, active, proactive response toward this scenario.

            Remove any identifiable traits. Use first person language for these options.
            Place the options in the following JSON format 
            {"scenario":"","options":{ "passive":"","reactive":"","proactive":"","active":"" }}
            `
        return generated_prompt;
    }
    public createProfilePrompt(topic: string) {
        let generated_prompt: string = `
            Topic: ${topic}
            Generate a random user profile using this topic.

            Remove any identifiable traits. Use first person language for these options.
            Place the data in the following JSON format {"gender":"","age":"","job_title":"","company_seniority":""}
    `
        return generated_prompt;
    }

}
