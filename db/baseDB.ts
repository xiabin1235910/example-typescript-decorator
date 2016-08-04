/**
 * Created by Ben on 8/2/2016.
 */
import * as mysql from 'mysql';
import * as winston from 'winston';
export abstract class baseDB {
    protected static createPool(cfg, name):mysql.IPool {
        let pool = mysql.createPool({
            connectionLimit: cfg.connectionLimit,
            host: cfg.host,
            database: cfg.database,
            user: cfg.user,
            password: cfg.password,
            dateStrings: true
        });
        winston.info("database(" + name + ") at:" + cfg.host + " pool created.");
        return pool;
    }

    constructor() {

    }
    
    abstract getPool(param: any):mysql.IPool;
}