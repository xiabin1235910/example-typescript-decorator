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

    constructor() {}
    
    abstract getPool(param?: any):mysql.IPool;

    query(sql:string, param: any, defer: Q.Deferred<any>, callback:(rows: any, defer?: Q.Deferred<any>) => void) {
        this.getPool().query(
            sql, param, (err, rows)=> {
                if (err) {
                    winston.error("while execute SQL: " + sql);
                    winston.error("with params: " + JSON.stringify(param));
                    winston.error(err.toString());
                    defer.reject(new Error("ERR_DB"));
                } else {
                    if (callback) {
                        callback(rows, defer);
                    }
                }
            }
        );
    }
}