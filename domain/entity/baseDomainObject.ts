/**
 * Created by Ben on 8/1/2016.
 */
export abstract class baseDomainObject extends Object {
    id:number;
    create_date:Date;
    update_date:Date;

    constructor() {
        super();
    }

    getTableName():string {
        throw new Error('table name of this object is not defined!');
    }

    getRESTUrl():string {
        throw new Error('REST URL of this object is not defined!');
    }
}