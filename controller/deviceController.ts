/**
 * Created by Ben on 8/8/2016.
 */
import {baseCRUDController} from "./baseCRUDController";
import {Device} from "../domain/entity/Device";
import {baseDomainObject} from "../domain/entity/baseDomainObject";
import {deviceRepository} from "../domain/repository/deviceRepository";

export class deviceController extends baseCRUDController<Device, deviceRepository> {
    
    constructor() {
        super(Device, deviceRepository);
    }
    
    initRouter() {
        let domainObject = new this._domainObject();
        this.queryByMeid(domainObject);
    }

    private queryByMeid(domainObject: baseDomainObject) {
        this.get(domainObject.getRESTUrl() + '/:meid/users', (req, res, next) => {
            deviceRepository.getInstance()
                .queryByDeviceMeid(req.params.meid)
                .then(
                    (result) => res.status(200).json(result),
                    (error) => this.handleError(error, res)
                );
        })
    }
}