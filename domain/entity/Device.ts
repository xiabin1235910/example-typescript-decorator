import {RESTEntity} from "../decorator/RESTEntity";
import {baseDomainObject} from "./baseDomainObject";
/**
 * Created by Ben on 8/1/2016.
 */
    
@RESTEntity({
    table: "device",
    URL: "/devices"
})
export class Device extends baseDomainObject {
    device_meid:string;
    device_phone:string;
    device_name:string;
}