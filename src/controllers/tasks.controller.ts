//Dependencias
import { Request, Response } from "express";
import MySQL from "../class/MySQL";
import Utils from "../class/Utils";

//Intancias
const conn: MySQL = new MySQL();
const { getIdTask } = Utils;

//Controladores

/**
 * getTask():
 * Retorna todas las tareas que tiene el usuario guardadas en la base de datos para su 
 * posterior uso.
 * @param req objeto Request del servidor
 * @param res objeto Response del servidor
 */
export async function getTasks(req: Request, res: Response): Promise<void> {
    try {
        //Adquiero la id del usuario para su uso posterior
        const { idUser } = req.app.locals;
        //Realizo la sentencia SQL para el retorno de las tareas.
        const sql: string = `SELECT * FROM Tasks WHERE idUser = ${conn.escape(idUser)}`;
        const tasks = await conn.executeQuery(sql);
        res.json(tasks);
    } catch (error) {
        console.error(error);
    }
}

/**
 * getTask():
 * Retorna una tarea en especifico que el usuario busque con la id de la tareas
 * @param req objeto Request del servidor
 * @param res objeto Response del servidor
 */
export async function getTask(req: Request, res: Response): Promise<void> {
    try {
        //Adquiero la id de la rarea mandada por el parametro de la URL
        const { idTask } = req.params;
        //Se realiza la sentensia en MySQL y se ejecuta
        const sql: string = `SELECT * FROM Tasks WHERE idTask = ${conn.escape(idTask)};`;
        const task: JSON | any = await conn.executeQuery(sql);
        res.json(task[0]);
    } catch (error) {
        console.error(error);
    }
}

/**
 * postTask():
 * Inserta la tarea en la base de datos
 * @param req Objeto Request del servidor
 * @param res Objeto Response del servidor
 */
export async function postTask(req: Request, res: Response): Promise<void> {
    try {
        //Se adquiere la id del usuario y de la tareas
        const { idUser } = req.app.locals;
        const idTask: string = getIdTask();
        const { task, description, done, date_finish } = req.body;
        //Se establecen los parametros para el guardado de la tarea y se crea el query con los parametros
        const params: string = `${conn.escape(idTask)},${conn.escape(idUser)},${conn.escape(task)},${conn.escape(description)},${conn.escape(done)},NOW(),${conn.escape(date_finish)}`;
        const sql: string = `INSERT INTO Tasks(idTask,idUser,task,description,done,date_init,date_finish) 
                            VALUE(${params});`;
        //Se ejecuta el query y se muestra la respuesta al usuario
        const newTask: JSON = await conn.executeQuery(sql);
        res.json(newTask);
    } catch (error) {
        console.error(error);
    }
}

/**
 * putTask():
 * Actualiza los datos de la tareas para su insercion en la base de datos
 * @param req objeto Request del Servidor
 * @param res objeto Response del Servidor
 */
export async function putTask(req: Request, res: Response): Promise<void> {
    try {
        //Se adquieron los datos del cuerpo de la peticion y se crea el query para su ejecución
        const { idTask, task, description, done, date_finish } = req.body;
        const sql: string = `UPDATE Tasks SET task = ${conn.escape(task)}, description = ${conn.escape(description)}, done = ${conn.escape(done)}, date_finish = ${conn.escape(date_finish)}
                            WHERE idTask =${conn.escape(idTask)};`;
        //Se ejecuta el query y muestra su respuesta al cliente
        const putTask: JSON = await conn.executeQuery(sql);
        res.json(putTask);
    } catch (error) {
        console.error(error);
    }
}

/**
 * deleteTask():
 * Elimina una tarea de la base de datos
 * @param req objeto Request del Servidor
 * @param res objeto Response del Servidor
 */
export async function deleteTask(req: Request, res: Response): Promise<void> {
    try {
        //Se aquiere la id de la tarea mandada por la URL y se crea el query
        const { idTask } = req.params;
        const sql: string = `DELETE FROM Tasks WHERE idTask = ${conn.escape(idTask)}`;
        //Se ejecuta el query y se muestra la respuesta al cliente
        const deleteTask: JSON = await conn.executeQuery(sql);
        res.json(deleteTask);
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function searchTask(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
}