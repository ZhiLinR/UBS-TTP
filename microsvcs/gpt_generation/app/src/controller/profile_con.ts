import express, { Express, NextFunction, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { OAThreadsAPI } from "../ext_api/helpers/OAThreadsAPIClass.js";
import * as UserModel from '../model/user_model.js'
import * as Handler from '../util/handler.js';

export const profileRoute = express.Router();

// get thread and then process
profileRoute.get('/scenario/summary/:uid', async (req: Request, res: Response, next: NextFunction) => {
    const uid: string = req.params.uid;
    const scenario = new Scenario(uid);
    const userThread = new OAThreadsAPI(uid)
    try {
        let user_thread = await UserModel.getUserThread(uid);
        let user_thread_messages = await userThread.getMessages(user_thread?.id || "No ID");
        let user_personality_summary = await scenario.generateSummary(JSON.stringify(user_thread_messages))
        next({ success: true, status: 200, message: "Summarised", content: user_personality_summary });
    } catch (error) {
        next({ success: true, status: 500, message: "Database Error" });
    }

});