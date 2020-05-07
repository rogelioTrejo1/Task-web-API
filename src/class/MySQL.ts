//Variables de entorno
require('dotenv').config();

//Dependencias
import { createConnection, Connection, MysqlError } from "mysql";

class MySQL {
    private conn: Connection;

    constructor() {
        this.conn = createConnection(process.env.DB_URL as string);
    }

    /**
     * getConnection():
     * Retorna la conección de MySQL
     */
    public getConnection(): Promise<void> {
        return new Promise((resolve: Function, reject: Function) => {
            this.conn.connect((error: MysqlError) => {
                if (error) return reject(error);
                return resolve(this.conn.threadId);
            });
        });
    }

    /**
     * executeQuery():
     * Ejecuta el query en el motor de mysql
     * @param query es la sentensias para su ejecucion.
     */
    public executeQuery(query: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.conn.query(query, (error: MysqlError, result: Array<JSON>) => {
                if (error) return reject(error);
                return resolve(result);
            });
        });
    }

    /**
     * escape(): 
     * Retorna un parametro para poner '' en un parametro
     * @param param es el parametro que se desea poner ''
     */
    public escape(param: string): string {
        return this.conn.escape(param);
    }
}

//Interfaces
/**
 * Respuesta del servidor de mysql para alguna sentencia de insersion, actualización y delete
 */
export interface SQLResponce {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

export default MySQL;
