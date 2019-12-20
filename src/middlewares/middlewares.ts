//Dependencias
import { Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
/**
 * validateToken():
 * Valida el token que se envia al servidor desde la cabesera "x-access-token"
 * @param req objeto Request del servidor 
 * @param res objeto Response del servidor
 * @param next callback para continuar con el proseso
 */
export function validateToken(req: Request, res: Response, next: Function) {
    try { 
        if (!req.headers['x-access-token']) {
            //Se comprueba si exixte el token en las cabecera.
            res.status(401).json({
                messages: "No se envio un token",
                res: false
            });
        } else {
            //Si exixte el token se guarda en una variable local para su posterior uso
            const token: string | any = req.headers['x-access-token']
            const decoded: object | any = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
            req.app.locals.idUser = decoded.idUser;
        }
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            //Si el token a expirado mandara lo siguiente
            res.status(401).json({
                messages: "Token expirado",
                resp: false
            });
        } else if (error.name === "JsonWebTokenError") {
            //Si el token es incorrecto al que se le envio al principio, manda el siguiente mensaje
            res.status(401).json({
                messages: "Token invalido",
                resp: false
            });
        } else {
            console.log(error);
        }
    }
}