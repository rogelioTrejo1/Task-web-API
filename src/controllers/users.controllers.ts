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
    try {
        //Varible "information" creado para adjuntar toda la información que se mostrara
        let information: object = {};
        const { name, passUser } = req.body;
        const sql1: string = `SELECT * FROM Users WHERE userName = ${conn.escape(name)};`;
        const searchUser: any = await conn.executeQuery(sql1);
        //Validación del usuario
        if (searchUser.length > 0) {
            //Si exixte el usuario, realizara lo siguiente
            const { idUser ,pass } = searchUser[0];
            const validedPass: boolean = await comparePass(pass, passUser);
            //Validación de contraseña encriptada 
            if(!validedPass) {
                //Si la contraseña es correcta
                information = {
                    message: "Las credenciales son incorrectas",
                    valided: false,    
                };
            } else {
                //Si la contraseña es incorrecta
                information = {
                    message: "Usuario valido",
                    valided: true,
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
                valided: false
            }
        }
        //Envio de respuesta en formato JSON
        res.json(information);
    } catch (error) {
        console.error(error);
    }
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
        const { name, email, passUser } = req.body;
        //Generacion de la ID del Usuario
        const idUser: string = getIdUser();
        //Encriptamiento de la contraseña
        const newPass: string = await encryPass(passUser);
        const sql1: string = `SELECT * FROM Users WHERE userName = ${conn.escape(name)};`
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
            const sql: string = `INSERT INTO Users VALUE(${conn.escape(idUser)},${conn.escape(name)},${conn.escape(newPass)},${conn.escape(email)});`;
            const newUser: JSON = await conn.executeQuery(sql);
            information = {
                message: "Usuario Registrado correctamente!",
                resp: true,
                body: newUser,
                //Genera un token que dejara de funcionar en 24 horas
                token: jwt.sign({ idUser }, `${process.env.SECRET_TOKEN}`, {
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