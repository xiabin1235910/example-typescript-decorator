/**
 * Created by Ben on 7/15/2016.
 */
export class Sql {
    select_column: Array<string>;
    table_name: string;
    where_state: string;
    order_by: string;
    limit: string;

    constructor(_table_name:string, _select_column?: Array<string>, _where_state?: string, _order_by?: string, _limit?: string) {
        this.select_column = _select_column ? _select_column : ['*'];
        this.table_name = _table_name;
        this.where_state = _where_state;
        this.order_by = _order_by;
        this.limit = _limit;
    }

    getSql() {
        return 'select ' + this.select_column.join(',') + ' from ' + this.table_name
            + (this.where_state ? (' where ' + this.where_state) : '')
            + (this.order_by ? (' ' + this.order_by) : '')
            + (this.limit ? (' ' + this.limit) : '');
    }

    static translateHump2UnderLineByAnd(source: string) {
        let fname2 = source.split('And');
        return fname2.map(function(e) {
            // e.g CreateDate -> create_date=?
            let bls = e.split(/[A-Z]/);
            let fls = e.match(/[A-Z]/g).map(function(upper) {
                return upper.toLowerCase();
            });
            // [''  'reate'  'ate'] ['c'  'd']  -> create_date
            let cls = [];
            fls.forEach(function(fl, index) {
                cls[index] = fl + bls[index + 1];
            });
            return cls.join('_');
        });
    }
}