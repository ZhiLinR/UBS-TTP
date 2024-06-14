import express, { Express, NextFunction, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { OAThreadsAPI } from "../ext_api/helpers/OAThreadsAPIClass.js";
import * as UserModel from '../model/user_model.js'

export const scenarioRoute = express.Router();

/**
 * Generates a new scenario for the user
 * 
 * @param {String} req.body.uid - the user's ID, currently email
 * @param {String | undefined} req.body.topic - optional topic field if the user specifically selects a topic
 */
scenarioRoute.post('/scenario', async (req: Request, res: Response, next: NextFunction) => {
    const uid: string = req.body.uid;
    const topic: string | undefined = req.body.topic;

    const userScenario: Scenario = new Scenario(uid, topic)
    const userThread: OAThreadsAPI = new OAThreadsAPI(uid);

    try {
        let db_record = await UserModel.getUserThread(uid);
        if (!db_record) {
            let new_thread_data = await userThread.newThread()
            let new_db_entry = await UserModel.createEntry(uid, new_thread_data)
            db_record = new_db_entry;
        }

        let generated_scenario = await userScenario.generateScenario();
        next({ success: true, status: 200, message: "Scenario Generated", content: generated_scenario });

    } catch (error) {
        next({ success: false, status: 500, message: "Generation Failed" });
    }

});

scenarioRoute.put('/scenario', async (req: Request, res: Response, next: NextFunction) => {
    const uid: string = req.body.uid;
    const scenario: string = req.body.content.scenario;
    const option_chosen: string = req.body.content.options;

    const userThread: OAThreadsAPI = new OAThreadsAPI(uid);

    try {
        let user_thread = await UserModel.getUserThread(uid);
        
        await userThread.newAssistantMessage(user_thread?.id || "NIL", scenario);
        await userThread.newUserMessage(user_thread?.id || "No Option Selected", option_chosen);

        next({ success: true, status: 200, message: "Thread Updated" });
    } catch (error) {
        next({ success: false, status: 500, message: "Thread Update Failed" });
    }

});

// Just for me to delete threads from testing
scenarioRoute.delete('/scenario/:thread_id', async (req: Request, res: Response, next: NextFunction) => {
    const thread_id: string = req.params.thread_id;
    const userThread: OAThreadsAPI = new OAThreadsAPI(thread_id);
    try {
        let del_status = userThread.deleteThread(thread_id)
        next({ success: true, status: 200, message: "Thread Updated", content: del_status });
    } catch (error) {
        next({ success: false, status: 500, message: "Thread Update Failed" });
    }
})
