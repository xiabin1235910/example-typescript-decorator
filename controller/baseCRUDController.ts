/**
 * Created by Ben on 8/8/2016.
 */
import {baseController} from "./baseController";
import {baseDomainObject} from "../domain/entity/baseDomainObject";
import {baseRepository} from "../domain/repository/baseRepository";

export abstract class baseCRUDController<R extends baseDomainObject, T extends baseRepository<R>> extends baseController {
    private repository: T;

    constructor(protected _domainObject, protected _domainRepository) {
        super();
        this.repository = _domainRepository.getInstance();
        this.initRouter();
        this.createCRUD();
    }

    createCRUD() {
        let domainObject = new this._domainObject();

        let restUrl = domainObject.getRESTUrl();

        this.get(restUrl, (req, res, next)=> {
            this.repository
                .listAll()
                .then(
                    (rows)=> res.status(200).json(rows),
                    (error)=> this.handleError(error, res)
                )
        });
        
        this.post(restUrl, (req, res, next)=> {
            this.repository
                .insert(req.body)
                .then(
                    (insertId)=> res.status(201).json({id: insertId}),
                    (error)=> this.handleError(error, res)
                )
        });
    }

}