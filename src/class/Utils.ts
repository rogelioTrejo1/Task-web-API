//Dependencias
import timestamp from "uuid/v1";
import random from "uuid/v4";
import bcryptjs from "bcryptjs";

class Uitils {
    /**
     * getIdTask():
     * Genera una id con base a la fecha que se cruza (timestamp),
     * para establesercela en la id para la tareas creada.
     */
    public static getIdTask(): string {
        const idTask: string = timestamp();
        return idTask;
    }

    /**
     * getIdUser():
     * Genera una id random que se se puede asignar a un usuario para su
     * identificación
     */
    public static getIdUser(): string {
        const idUser: string = random();
        return idUser
    }

    /**
     * getNamePhoto():
     * Genera el nombre de la foto que se guardara en el servidor.
     */
    public static getNamePhoto(): string {
        const namePhoto: string = random();
        return namePhoto;
    }

    /**
     * encryPass():
     * Encrypta una contraseña para con un salt de 10
     * @param pass es la contraseña que se desea encryptar
     * para su uso posterior.
     */
    public static async encryPass(pass: string): Promise<string> {
        const salt: string = await bcryptjs.genSalt(10);
        const newPass: string = await bcryptjs.hash(pass, salt);
        return newPass;
    }

    /**
     * comparePass():
     * Compara las 2 contraseñas devolviendo un valor booleano
     * @param newPass es la contraseña que se le genero con el metodo encryPass():
     * @param oldPass es la vieja contraseña que se desea comparar con la anterior.
     */
    public static async comparePass(newPass: string, oldPass: string): Promise<boolean> {
        const result: boolean = await bcryptjs.compare(oldPass, newPass);
        return result;
    }
}

//exportacion del modulo
export default Uitils;