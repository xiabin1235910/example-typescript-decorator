/**
 * Created by Ben on 8/1/2016.
 */
import {baseDomainObject} from "../entity/baseDomainObject";
import {baseDB} from "../../db/baseDB";
import {serviceServerDB} from "../../db/serviceServerDB";

export abstract class baseRepository<T extends baseDomainObject> {
    serviceDB: serviceServerDB = serviceServerDB.getInstance();
    domainObject: T;

    constructor(protected _domainObject) {
        this.domainObject = new this._domainObject();
    }

    insert(objectToInsert:T):Q.Promise<number> {
        let defer = Q.defer<number>();
        let db = this.getDB();
        db.query(
            "insert into " + this.domainObject.getTableName() + " set ?",
            objectToInsert,
            defer,
            (rows)=> {
                defer.resolve(rows.insertId);
            });
        return defer.promise;
    }


    // util
    protected getDB():baseDB {
        return this.serviceDB;
    }
}