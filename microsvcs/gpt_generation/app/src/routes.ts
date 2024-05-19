import express, { Express, Request, Response } from "express";
import { app } from "./app.js"
// routes.js
const DEF_ROUTE = process.env.API_PATH || "8000".concat(process.env.ROUTE || '/dev');

module.exports = (app: app) => {
    const GPT_GEN = require("./controller/gpt_gen");
    var router = require("express").Router();

    // TODO: GET posts on forum
    //router.get("/getAllPosts", GPT_GEN.getAllPosts);

    // Route Definition
    app.use(DEF_ROUTE, router);
}