import * as InitUser from './init/user.js'
import * as InitTopic from '../var/topic.js';
import { _Prompt } from './helpers/PromptClass.js';

import { OAConnect } from './init/openai_conf.js';
import { OAThreadsAPI } from './helpers/OAThreadsAPIClass.js';

/**
 * Extends {@link _Prompt} which allows for the text prompts to be accessed directly
 */
export class Scenario extends _Prompt {
  private uid: string;
  private topic: string;

  /**
   * @param uid - user id, currently email
   * @param topic - optional. either a user defined parameter or a randomly generated one.
   */
  public constructor(uid: string, topic?: string) {
    super();
    this.uid = uid;
    this.topic = topic || InitTopic.RANDOM_TOPIC;
  }

  /**
   * This function creates a scenario for the user to interact with.
   * @returns A JSON body in the following format: 
   * 
   * ```{"scenario":"","options":{ "passive":"","reactive":"","proactive":"","active":"" }}```
   */
  public async generateScenario(){
    let profile_info = await InitUser._initialiseProfile(this.uid);
    let generate_audience = await this._generateProfile() || "generic"
    let content = super.createScenarioPrompt(profile_info, generate_audience, this.topic);
    let result = await OAConnect(content);
    return JSON.parse(result || "No Scenario");
  }

/**
 * 
 * @param scenario_data takes in the full text chunk of scenario data to be processed by OpenAI API
 * @returns JSON body with the following data:
 *  
 * ``` {"profile_summary":""} ```
 */
  public async generateSummary(scenario_data: string) {
    let profile_info = await InitUser._initialiseProfile(this.uid);
    let content = super.createSummaryPrompt(profile_info, scenario_data);
    let result = await OAConnect(content);
    return JSON.parse(result || "Failed");
  }

  /**
   * Generate a random audience profile.
   * @returns A stringified JSON body containing the following data: 
   * 
   * ``` {"gender":"","age":"","job_title":"","seniority":"","biography":""}``` 
   */
  private async _generateProfile() {
    let content = super.createProfilePrompt(this.topic);
    let result = await OAConnect(content);
    return result
  }
}



