import express, { Express, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { getSummarised } from '../model/user_model.js'
import * as Handler from '../util/handler.js';

export const profileRoute = express.Router();

profileRoute.get('/scenario/summary/:uid', (req: Request, res: Response): void => {
    try {
        const uid: string = req.params.uid;
        const scenario = new Scenario(uid);
        getSummarised(uid).then((result) => {
            return scenario.generateSummary(JSON.stringify(result))
        }).then((result) => {
            res.status(200).json(Handler.handleSuccessResponse("Summarised", result));
        })
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Generation Failed"));
    }

});