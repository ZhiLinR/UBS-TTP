import OpenAI from "openai";
import { OPENAI_API_KEY } from '../../var/variables.js';
import * as UsersDB from '../../model/user_model.js'
import { Thread } from "openai/resources/beta/index.mjs";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 * Contains methods to communicate with the Messages and Threads API for OpenAI.
 */
export class OAThreadsAPI {
    private uid: string;

    public constructor(uid: string) {
        this.uid = uid;
    }

    /**
     * creates a new thread. [OpenAI Reference: Create Thread](https://platform.openai.com/docs/api-reference/threads/createThread)
     * @returns returns a Thread interfaced {@link Thread} object
     */
    public async newThread() {
        try {
            let user_thread: Thread = await openai.beta.threads.create({ metadata: { "uid": this.uid } });
            return user_thread;
        } catch (error) {
            throw new Error("Thread Creation Failed")
        }
    }

    /**
     * get the specified thread. [OpenAI Reference: Retrieve Thread](https://platform.openai.com/docs/api-reference/threads/getThread)
     * @param thread_id the thread's unique id
     * @returns 
     */
    public async getThread(thread_id: string) {
        try {
            let user_thread: Thread = await openai.beta.threads.retrieve(thread_id);
            return user_thread;
        } catch (error) {
            throw new Error("Thread Retrieval Failed");
        }
    }

    /**
     * this facilititates the role definition for the interaction between the user and the assistant in the thread. 
     * [OpenAI Reference](https://platform.openai.com/docs/api-reference/messages/createMessage)
     * @param thread_id 
     * @param assistant_message the scenario presented
     * @returns 
     */
    public async newAssistantMessage(thread_id: string, assistant_message: string) {
        let result = await openai.beta.threads.messages.create(
            thread_id,
            { role: "assistant", content: assistant_message }
        );
        return result;
    }

    /**
     * similar to {@link newAssistantMessage} but this is the user's definition instead
     * @param thread_id 
     * @param user_message the option that the user had selected
     * @returns 
     */
    public async newUserMessage(thread_id: string, user_message: string) {
        let result = await openai.beta.threads.messages.create(
            thread_id,
            { role: "user", content: user_message }
        );
        return result;
    }

    public async getMessages(thread_id: string) {
        let result = await openai.beta.threads.messages.list(thread_id);
        return result;
    }

    public async deleteThread(thread_id: string) {
        let result = await openai.beta.threads.del(thread_id);
        return result;
    }
}
