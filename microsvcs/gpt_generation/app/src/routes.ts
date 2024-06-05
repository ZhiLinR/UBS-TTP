import express, { Express, Request, Response } from "express";
import { scenarioRoute } from "./controller/scenario_con.js"

export const routes = express.Router();

routes.use(scenarioRoute);