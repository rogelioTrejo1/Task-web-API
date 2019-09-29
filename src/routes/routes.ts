//Dependencias
import { Router, Request, Response } from "express";

//intancias de la clase
const router: Router = Router();

/**Rutas get */
router.route('/')
    .get((req: Request, res: Response) => {
        res.json({ message: "Welcom to my API!!!!" });
    });

//exportación del modulo 
export default router;