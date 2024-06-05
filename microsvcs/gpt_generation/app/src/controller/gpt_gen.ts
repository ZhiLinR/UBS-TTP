//Express Types
import express, { Express, Request, Response } from "express";
import { Scenario } from '../ext_api/ScenarioClass.js'

// FUNCTION EXPORTS --------------------------------------------------------
/**
 * Somewhat of a complex microservice.
 * 
 * 1 parameter expected.
 * @param {String} post_id - unique post_id field in each document
 * @success HTTP status 200 & array of documents
 * @error HTTP error status with error message
 */
exports.generateScenario = async (req: Request, res: Response) => {
    try {
        const post_id = req.params.post_id;
        //const result = await QUERIES.getPostbyID(post_id)
        //res.status(200).send(result);
    } catch (error: any) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};

