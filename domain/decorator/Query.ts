/**
 * Created by Ben on 7/13/2016.
 */
import * as Q from "q";
import {Sql} from "./Sql";

/*
 optionParam: {
    sql      // If sql exists, use user-defined sql.  (The table name 'Repository' will be replaced by 'this.domainObject.getTableName()')
                If not, generating the sql by method name

    order    // sql 'order by' syntax

    limit    // sql 'limit' syntax

    use_sql_in_return_value   // Default, false
                                 If true, sql will be the value defined in the method return value(not in the optionParam), and must use it
 }
 */
export function Query(optionParam?:any) {
    return function (target:any, key:string, desc:any) {
        var originalMethod = desc.value;

        desc.value = function (...args:any[]) {
            var defer = Q.defer<any>();
            var sql = '';

            if (!optionParam.use_sql_in_return_value) {

                if (!optionParam || !optionParam.sql) {
                    // split key name
                    let where_state = '';
                    let fname = key.split('By');
                    let s_index = 0;
                    if (key.startsWith('query') || key.startsWith('count')) {
                        s_index = 5
                    } else if (key.startsWith('find') || key.startsWith('read')) {
                        s_index = 4;
                    } else if (key.startsWith('get')) {
                        s_index = 3;
                    } else {
                        throw new Error('error method definition');
                    }
                    let fname1 = fname[0].substr(s_index);
                    let select_cl = [];
                    if (!fname1) {
                        select_cl.push('*');
                    } else {
                        select_cl = Sql.translateHump2UnderLineByAnd(fname1);
                    }

                    if (fname[1]) {
                        let wheres = Sql.translateHump2UnderLineByAnd(fname[1]).map(function (element) {
                            return element + '=?';
                        });

                        wheres.forEach(function (where, index) {
                            if (index !== 0) {
                                where_state = where_state + ' and ' + where;
                            } else {
                                where_state = where;
                            }
                        })
                    }

                    sql = new Sql(this.domainObject.getTableName(), select_cl, where_state, optionParam.order, optionParam.limit).getSql();
                } else {
                    sql = optionParam.sql;
                    sql = sql.replace('Repository', this.domainObject.getTableName());
                }
            }

            var desPromise = originalMethod.apply(this, args);

            // defer.resolve(sql);
            desPromise.then((desObj) => {
                var callback = desObj.callback;
                var param = desObj.param;
                var meid = desObj.meid;
                if (optionParam.use_sql_in_return_value) {
                    sql = desObj.sql;
                }

                var pool = this.getDB(this.domainObject.getDBType());
                pool.query(
                    sql,
                    param,
                    defer,
                    callback,
                    meid
                );
            });

            return defer.promise;
        };

        return desc;
    }
}