import * as InitUser from './init/user.js'
import * as InitTopic from './init/topic.js';
import { connectOpenAI } from './init/openai_conf.js';
import { _Prompt } from './PromptClass.js';

/**
 * 
 * @param {string | null | undefined} profile 
 * @returns 
 */
export class Scenario {
  private uid: string;
  private topic: string;
  private promptClass: _Prompt;

  public constructor(uid: string, topic?: string) {
    this.uid = uid;
    this.topic = topic || InitTopic.RANDOM_TOPIC;
    this.promptClass = new _Prompt();
  }
  public async generateScenario() {
    let profile_info = await InitUser._initialiseProfile("sammyho@email.com");
    let generate_audience = await this._generateProfile() || "generic"
    let content = this.promptClass.createScenarioPrompt(profile_info, generate_audience, this.topic);
    let result = await connectOpenAI(content);
    return result;
  }

  public async _generateProfile() {
    let content = this.promptClass.createProfilePrompt(this.topic);
    let result = await connectOpenAI(content);
    return result
  }
}

let new_prompt = new Scenario("sammyho@email.com");
let response = await new_prompt.generateScenario()
console.log(response)



