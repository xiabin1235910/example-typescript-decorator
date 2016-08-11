/**
 * Created by Ben on 8/5/2016.
 */
import * as express from "express";
import * as winston from "winston";

export abstract class baseController{
    router: express.Router;
    
    constructor() {
        this.router = express.Router();
    }

    abstract initRouter();

    getRouter() {
        return this.router;
    }

    get(url: string, callback:(req, res, next)=>void) {
        winston.info("router get method, url: " + url);
        this.router.get(url, callback);
    }
    
    post(url: string, callback:(req, res, next)=>void) {
        winston.info("router post method, url: " + url);
        this.router.post(url, callback);
    }

    put(url: string, callback:(req, res, next)=>void) {
        winston.info("router put method, url: " + url);
        this.router.put(url, callback);
    }

    delete(url: string, callback:(req, res, next)=>void) {
        winston.info("router delete method, url: " + url);
        this.router.delete(url, callback);
    }

    handleError(error:any, res) {
        res.status(error.exceptionConfig.statusCode).jsonp(error);
        winston.error(`server error:${JSON.stringify(error)}`);
    }
    
}