//Variables de entorno
require('dotenv').config();

//Dependencias
import { Request, Response } from "express";
import MySQL from "../class/MySQL";
import Utils from "../class/Utils";
import jwt from "jsonwebtoken";

//Intansias
const conn: MySQL = new MySQL();
const { getIdUser, comparePass, encryPass } = Utils;

//Controladores

/**
 * login():
 * Funcion para realizar un logueo en el servidor para su uso de la API
 * @param req objeto Request del servidor
 * @param res objeto Response del servidor
 */
export async function login(req: Request, res: Response) {
    //Varible "information" creado para adjuntar toda la información que se mostrara
    let information: IInformation = {};
    let status: number | undefined;
    try {
        const { username, password }: IUser = req.body;
        const sql1: string = `SELECT * FROM Users WHERE userName = ${conn.escape(username)};`;
        const searchUser: IUserDB[] = await conn.executeQuery(sql1);
        //Validación del usuario
        if (searchUser.length > 0) {
            //Si exixte el usuario, realizara lo siguiente
            const idUser = searchUser[0].idUser;
            const dbPassword = searchUser[0].password;
            const validedPass: boolean = await comparePass(dbPassword, password);
            //Validación de contraseña encriptada 
            if(!validedPass) {
                //Si la contraseña es correcta
                information = {
                    message: "Las credenciales son incorrectas",
                    resp: false,
                    status: status = 401    
                };
            } else {
                //Si la contraseña es incorrecta
                information = {
                    message: "Usuario valido",
                    status: status = 200,
                    resp: true,
                    //Genera un token que dejara de funcionar en 24 horas
                    token: jwt.sign({idUser},`${process.env.SECRET_TOKEN}`, {
                        expiresIn: 60 * 60 * 24
                    })
                };
            } 
        } else {
            //Si el usuario no exixte y/o no esta registrado
            information = {
                message: "Usuario no encontrado",
                resp: false,
                status: status = 401
            }
        }
        
    } catch (error) {
        information = {
            message: "Error interno!!!!!",
            resp: false,
            status: status = 400,
            error 
        }
    }
    //Envio de respuesta en formato JSON
    res.status(status as number).json(information);
}

/**
 * register():
 * Funsión que registra a un usuario para el uso de la API
 * @param req objeto Request del servidor
 * @param res onjeto Response del servidor
 */
export async function register(req: Request, res: Response) {
    try {
        //Varible "information" creado para adjuntar toda la información que se mostrara
        let information: object = {};
        const { username, email, password }: IUser = req.body;
        //Generacion de la ID del Usuario
        const idUser: string = getIdUser();
        //Encriptamiento de la contraseña
        const newPassword: string = await encryPass(password);
        const sql1: string = `SELECT * FROM Users WHERE userName = ${conn.escape(username)};`
        const validarUsuario: any = await conn.executeQuery(sql1);
        //Validación del usuario registrado
        if (validarUsuario.length > 0) {
            //Si el nombre de usuario esta registrado mostrara:
            information = {
                message: "El usuario se encuentra registrada!",
                resp: false
            };
        } else {
            //Si el usuario no esta registrado realisara y mostrara:
            const sql: string = `INSERT INTO Users VALUE(${conn.escape(idUser)},${conn.escape(username)},${conn.escape(newPassword)},${conn.escape(email)});`;
            const newUser: JSON = await conn.executeQuery(sql);
            information = {
                message: "Usuario Registrado correctamente!",
                resp: true,
                body: newUser,
                //Genera un token que dejara de funcionar en 24 horas
                token: jwt.sign({ idUser }, process.env.SECRET_TOKEN as string, {
                    expiresIn: 60 * 60 * 24
                })
            };
        }
        //Responde en un formato JSON
        res.json(information);
    } catch (error) {
        console.error(error);
    }
}

//Modelos del usuario

/**
 * Modelo del usuario que se insertara
 */
interface IUser {
    username: string;
    password: string;
    email:string;
}

/**
 * Modelo de la base de datos que se inserto 
 */
interface IUserDB extends IUser {
    idUser: string;
}

/**
 * Modelo de la respuesta del servidor al cliente
 */
interface IInformation {
    message?: string;
    resp?: boolean;
    status?: number;
    token?: string;
    error?: Error | ExceptionInformation;
}