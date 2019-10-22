//Dependencias
import multer from "multer";
import { Request } from "express";
import Utils from "../class/Utils";
import { extname } from "path";

//Declaraciones e intancias
const { getNamePhoto } = Utils;

/**
 * STORAGE:
 * Establese la configuración de almacenamiento de las fotografias.
 */
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req: Request, file , cb: Function) => {
        cb(null, getNamePhoto() + extname(file.originalname));
    }
});

//Exportación del modulo 
export default multer({storage});