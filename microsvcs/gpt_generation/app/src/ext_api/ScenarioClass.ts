import * as InitUser from './init/user.js'
import * as InitTopic from './init/topic.js';
import { connectOpenAI } from './init/openai_conf.js';
import { _Prompt } from './PromptClass.js';

/**
 * 
 * @param {string | null | undefined} profile 
 * @returns 
 */
export class Scenario extends _Prompt {
  private uid: string;
  private topic: string;

  public constructor(uid: string, topic?: string) {
    super();
    this.uid = uid;
    this.topic = topic || InitTopic.RANDOM_TOPIC;
  }

  public async generateScenario() {
    let profile_info = await InitUser._initialiseProfile(this.uid);
    let generate_audience = await this._generateProfile() || "generic"
    let content = super.createScenarioPrompt(profile_info, generate_audience, this.topic);
    let result = await connectOpenAI(content);
    return result;
  }

  private async _generateProfile() {
    let content =  super.createProfilePrompt(this.topic);
    let result = await connectOpenAI(content);
    return result
  }
}



