/**
 * Created by Ben on 8/1/2016.
 */
export interface RESTEntityOption {
    table:string;
    URL:string;
}

export function RESTEntity(option:RESTEntityOption) {
    return function (target: any) {
        return function decorator(target) {
            target.prototype.getTableName = ()=>option.table;
            target.prototype.getRESTUrl = ()=>option.URL;
        };
    }
}