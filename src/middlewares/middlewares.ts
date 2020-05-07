//Dependencias
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
/**
 * validateToken():
 * Valida el token que se envia al servidor desde la cabesera "x-access-token"
 * @param req objeto Request del servidor 
 * @param res objeto Response del servidor
 * @param next callback para continuar con el proseso
 */
export function validateToken(req: Request, res: Response, next: NextFunction): void {
    //Se declara lo elemntos nesesarios para la respuesta al cliente
    let information: IInformation = {};
    let status: number | undefined;
    //Se valida el token
    try {
        if (!req.headers['x-access-token'] || req.headers['x-access-token']?.length) {
            //Se comprueba si exixte el token en las cabecera y se prepara una respuesta.
            information = {
                message: "Cabesera invalida \"x-acces-token\"",
                status: status = 401,
                resp: false
            };
        } else {
            //Si existe el token se guarda en una variable local para su posterior uso
            const token: string = req.headers['x-access-token'] as string;
            const decoded: any = jwt.verify(token, process.env.SECRET_TOKEN as string);
            req.app.locals.idUser = decoded.idUser;
        }
        next();
    } catch (error) {
        //En caso de exixtir algun error se forman las siguientes respuesta al cliente
        switch (error.name) {
            //Token Expirado
            case "TokenExpiredError":
                information = {
                    message: "Token expirado",
                    status: status = 401,
                    resp: false
                }
                break;
            //Token invalido 
            case "JsonWebTokenError":
                information = {
                    message: "Token invalido",
                    status: status = 401,
                    resp: false
                }
                break;
            //En caso que ocurra, se manejara errores internos
            default: 
                information = {
                    message: "Error interno en el servidor",
                    status: status = 400,
                    resp: false,
                    error
                }
        }
    }

    //Se prepara y manda la respuesta al cliente
    res.status(status as number).json(information);
}

/**
 * Ejecuta un error 404 "Not found" en la peticiones HTTP
 * @param req objeto Request del servidor 
 * @param res objeto Response del servidor
 */
export function validateRoute(req: Request, res: Response): void {
   //Se declara lo elemntos nesesarios para la respuesta al cliente
   let information: IInformation = {};
   let status: number | undefined;

   //Se prepara la respuesta
   information = {
       message: "Error 404 \"Not Found\"!!!",
       resp: false,
       status: status = 404
   }

   //Se manda la respuesta al cliente
   res.status(status as number).json(information);
}

//Modelo de la respuesta
interface IInformation {
    message?: string;
    status?: number;
    resp?: boolean;
    error?: Error | ExceptionInformation;
}