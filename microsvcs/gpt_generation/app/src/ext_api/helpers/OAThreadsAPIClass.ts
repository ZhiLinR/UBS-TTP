import OpenAI from "openai";
import { OPENAI_API_KEY } from '../../var/variables.js';
import * as UsersDB from '../../model/user_model.js'
import { Thread } from "openai/resources/beta/index.mjs";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export class OAThreadsAPI {
    private uid: string;

    public constructor(uid: string) {
        this.uid = uid;
    }

    public async newThread() {
        try {
            let user_thread: Thread = await openai.beta.threads.create({ metadata: { "uid": this.uid } });
            return user_thread;
        } catch (error) {
            throw new Error("Thread Creation Failed")
        }
    }

    public async getThread(thread_id: string) {
        try {
            let user_thread: Thread = await openai.beta.threads.retrieve(thread_id);
            return user_thread;
        } catch (error) {
            throw new Error("Thread Retrieval Failed");
        }
    }

    public async newAssistantMessage(thread_id: string, assistant_message: string) {
        let result = await openai.beta.threads.messages.create(
            thread_id,
            { role: "assistant", content: assistant_message }
        );
        return result;
    }

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

    public async deleteThread(thread_id: string){
        let result = await openai.beta.threads.del(thread_id);
        return result;
    }
}
