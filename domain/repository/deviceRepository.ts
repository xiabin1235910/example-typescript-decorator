/**
 * Created by Ben on 8/5/2016.
 */
import {baseRepository} from "./baseRepository";
import {Device} from "../entity/Device";
import {Query} from "../decorator/Query";
export class deviceRepository extends baseRepository<Device> {
    private static _instance: deviceRepository = new deviceRepository();

    constructor() {
        super(Device);
    }

    public static getInstance(): deviceRepository {
        return deviceRepository._instance;
    }

    @Query({
        sql: "select d.*,ud.alias,ud.type from Repository d ,ekey ud where d.id = ud.device_id and (ud.type=0 or ud.type=1) and ud.user_id=?"
    })
    public queryByUserID(userID):Q.Promise<any> {
        var param = [userID];
        var callback = function (result, defer) {
            defer.resolve(result);
        };

        return Q.resolve({
            callback: callback,
            param: param,
            self: this
        });
    }


    @Query({
        order: "order by id desc",
        limit: 'limit 1'
    })
    public queryByDeviceMeid(meid:any):Q.Promise<any> {
        var param = [meid];
        var callback = function (result, defer) {
            defer.resolve(result);
        };
        return Q.resolve({
            callback: callback,
            param: param,
            meid: meid
        });
    }


    @Query({
        use_sql_in_return_value: true
    })
    public queryByMeidByCondition(meid:any, query, limit:boolean = true):Q.Promise<any> {
        var where = " and DATEDIFF(NOW(),open_door_time) < ? ";

        return Q.resolve({
            sql: "select * from " + this.domainObject.getTableName() + " where device_meid = ?" + where + " order by open_door_time desc ",
            meid: meid
        });
    }
}