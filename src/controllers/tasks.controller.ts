//Dependencias
import { Request, Response } from "express";
import MySQL from "../class/MySQL";
import Utils from "../class/Utils";
import jwt from "jsonwebtoken";

//Intancias
const conn: MySQL = new MySQL();
const { getIdTask } = Utils;

//Controladores

/**
 * 
 * @param req 
 * @param res 
 */
export async function getTasks(req: Request, res: Response): Promise<void> {
    try {
        res.json("task!!!!!");
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function getTask(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function postTask(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function putTask(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function deleteTask(req: Request, res: Response): Promise<void> {
    try {

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