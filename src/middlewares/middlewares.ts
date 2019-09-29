//Dependencias
import { Request, Response } from "express";

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
            res.status(401).json({
                messages: "Las credenciales son incorectas",
                res: false
            });
        }
        next();
    } catch (error) {
        console.error(error);
    }
}