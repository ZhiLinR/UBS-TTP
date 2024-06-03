import OpenAI from "openai";

import { OPENAI_API_KEY } from '../var/variables.js';
import { _Prompt } from './PromptClass.js';
import * as InitUser from './init/user.js'
import * as InitTopic from './init/topic.js';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 * 
 * @param {string | null | undefined} profile 
 * @returns 
 */
export class Scenario {
  private uid: string;
  private profile_info: string
  private user_topic: string
  private promptClass: _Prompt;

  public constructor(uid: string, user_topic?: string) {
    this.uid = uid;
    this.profile_info = InitUser.USER_PROFILE;
    this.user_topic = user_topic || InitTopic.RANDOM_TOPIC;
    this.promptClass = new _Prompt();
  }
  public async generateScenario(profile?: string) {
    let content = this.promptClass.createScenarioPrompt();
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: content }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0].message.content)
    return completion;
  }
  
  private async _generateProfile() {
    let content = this.promptClass.createProfilePrompt(this.user_topic);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: content }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content;
  }
}



