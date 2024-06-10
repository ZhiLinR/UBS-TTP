import express, { Express, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { OAThreadsAPI } from "../ext_api/helpers/OAThreadsAPIClass.js";
import * as UModel from '../model/user_model.js'
import * as Handler from '../util/handler.js';

export const scenarioRoute = express.Router();

/**
 * Generates a new scenario for the user
 * 
 * @param {String} req.body.uid - the user's ID, currently email
 * @param {String | undefined} req.body.topic - optional topic field if the user specifically selects a topic
 */
scenarioRoute.post('/scenario', (req: Request, res: Response): void => {
    try {
        const uid: string = req.body.uid;
        const topic: string | undefined = req.body.topic;

        const userScenario: Scenario = new Scenario(uid, topic)
        const userThread: OAThreadsAPI = new OAThreadsAPI(uid);

        // Writing out steps cos im confused
        UModel.getUserThread(uid).then((db_record) => {
            // 1.1 If user does not have existing record in database for uid
            if (!db_record) {
                // 1.11 generate new OA thread
                let new_thread_data = userThread.newThread().then((data) => {
                    // 1.12 put the OA thread into the DB
                    UModel.createEntry(uid, data)
                    // return the object to be used
                    return data;
                })
                return new_thread_data;
            } else {
                // 1.2 else return the stored thread object to be used
                return db_record;
            }
        }).then((elem) => {
            userScenario.generateScenario().then((response) => {
                res.status(200).json(Handler.handleSuccessResponse("Scenario Generated", response || "No Scenario"));
            });
        })
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Generation Failed"));
    }

});

scenarioRoute.put('/scenario/end', (req: Request, res: Response): void => {
    try {
        const uid: string = req.body.uid;
        const scenario: string = req.body.content.scenario;
        const option_chosen: string = req.body.content.options;

        const userThread: OAThreadsAPI = new OAThreadsAPI(uid);

        // Writing out steps cos im confused
        UModel.getUserThread(uid).then((db_record) => {
            userThread.newAssistantMessage(db_record?.id || "NIL", scenario).then(()=>{
                userThread.newUserMessage(db_record?.id || "No Option Selected", option_chosen).then(()=>{
                    res.status(200).json(Handler.handleSuccessResponse("Response Recorded in Threads"));
                })
            })
        }).catch((err) => {
            throw new Error(err.message)
        })

    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Thread Failed"));
    }

});

// Just for me to delete threads from testing
scenarioRoute.delete('/scenario/:thread_id', (req: Request, res: Response): void => {
    try {
        const thread_id: string = req.params.thread_id;
        const userThread: OAThreadsAPI = new OAThreadsAPI(thread_id);
        userThread.deleteThread(thread_id).then((del_status) => {
            res.status(200).json(del_status);
        })
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Deletion Failed"));
    }

})
