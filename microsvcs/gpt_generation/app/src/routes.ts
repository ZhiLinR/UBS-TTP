import express, { Express, Request, Response } from "express";
import { scenarioRoute } from "./controller/scenario_con.js"
import { profileRoute } from "./controller/profile_con.js"

export const routes = express.Router();

routes.use(scenarioRoute);
routes.use(profileRoute);