import express, { Express, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'
import { createEntry } from '../model/user_model.js'
import * as Handler from '../util/handler.js';


export const scenarioRoute = express.Router();

/**
 * Somewhat of a complex microservice.
 * 
 * @param {String} req.body.uid - the user's ID, currently email
 * @param {String | undefined} req.body.topic - optional topic field if the user specifically selects a topic
 */
scenarioRoute.post('/scenario', (req: Request, res: Response): void => {
    try {
        const uid: string = req.body.uid;
        const topic: string | undefined = req.body.topic

        const userScenario: Scenario = new Scenario(uid, topic)
        userScenario.generateScenario().then((response) => {
            res.status(200).json(Handler.handleSuccessResponse("Scenario Generated", response || "No Scenario"));
        });
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Generation Failed"));
    }

});

// taking ideas on better names - this function is for when the user actually selects their decision
// itll record their option and store it in the database
scenarioRoute.post('/scenario/end', (req: Request, res: Response): void => {
    try {
        const uid: string = req.body.uid;
        const scenario: string = req.body.content.scenario
        const option_chosen: string = req.body.content.options;
        createEntry(uid, scenario, option_chosen).then((response) => {
            console.log(response);
            res.status(200).json(Handler.handleSuccessResponse("Response Logged"));
        });
    } catch (error) {
        res.status(500).json(Handler.handleErrorResponse("Creation Failed"));
    }

});
