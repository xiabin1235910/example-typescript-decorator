/**
 * Created by Ben on 8/8/2016.
 */
import {baseController} from "./baseController";

export abstract class baseCRUDController<T> extends baseController {

    constructor(protected _domainObject) {
        super();
    }

    createCRUD() {
        let domainObject = this._domainObject();
        let restUrl = domainObject.getRESTUrl();

        this.get(restUrl, (req, res, next)=> {

        })
    }

}