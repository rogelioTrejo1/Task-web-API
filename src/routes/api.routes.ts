//Dependencias
import { Router } from "express";
import { login, register } from "../controllers/users.controllers";
import { getTasks, getTask, postTask, putTask, deleteTask, searchTask, putDone } from "../controllers/tasks.controller";
import { validateToken } from "../middlewares/middlewares";
import multer from "../libs/multer";

//Intancias
const router: Router = Router();

//Establecimiento de rutas
/* Rutas de los usuario! */
router.post('/register', register);
router.post('/login', login);

/* Rutas de las Tareas */
router.route('/task/:idTask')
    .get(validateToken, getTask)
    .delete(validateToken, deleteTask);

router.route('/tasks')
    .get(validateToken, getTasks)
    .post(validateToken,multer.single('image'),postTask)
    .put(validateToken, putTask);

router.get('/serachTask/:task',validateToken, searchTask);
router.put('/updateDone',validateToken, putDone)

//Exportacion del modulo
export default router;