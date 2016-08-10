/**
 * Created by Enix on 3/11/2016.
 */
import * as mysql from 'mysql';
import * as winston from 'winston';
import {baseDB} from "./baseDB";

export class serviceServerDB extends baseDB {
    static serviceDB: mysql.IPool;
    private static _instance:serviceServerDB = new serviceServerDB();

    constructor() {
        super();
    }

    public static init() {
        let config = require(process.cwd() + '/config');
        this.serviceDB = baseDB.createPool(config.serviceServerDB, 'service');
    }

    public static getInstance(): serviceServerDB {
        return serviceServerDB._instance;
    }

    getPool(param?:any):mysql.IPool {
        winston.debug("in database:[service]");
        return serviceServerDB.serviceDB;
    }
}
