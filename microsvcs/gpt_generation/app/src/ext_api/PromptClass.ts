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
    public createProfilePrompt(topic: string) {
        let generated_prompt: string = `
            Topic: ${topic}
            Generate a random user profile using this topic. Include their gender, age, job title, company seniority and a 50 word biography. 
            Remove any identifiable traits.
            Place the options in the following JSON format, ensure that the keys are enclosed in quotes
            {"gender":"","age":"","job_title":"","seniority":"","biography":""}`
        return generated_prompt;
    }

}
