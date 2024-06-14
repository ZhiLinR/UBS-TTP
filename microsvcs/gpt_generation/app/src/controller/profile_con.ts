import express, { Express, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { OAThreadsAPI } from "../ext_api/helpers/OAThreadsAPIClass.js";
import * as UModel from '../model/user_model.js'
import * as Handler from '../util/handler.js';

export const profileRoute = express.Router();

// get thread and then process
profileRoute.get('/scenario/summary/:uid', async (req: Request, res: Response) => {
    try {
        const uid: string = req.params.uid;
        const scenario = new Scenario(uid);
        const userThread = new OAThreadsAPI(uid)
        UModel.getUserThread(uid).then((result) => {
            userThread.getMessages(result?.id || "No ID").then((result) => {
                return scenario.generateSummary(JSON.stringify(result))
            }).then((result) => {
                res.status(200).json(Handler.handleSuccessResponse("Summarised", result));
            })
        })
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Generation Failed"));
    }

});