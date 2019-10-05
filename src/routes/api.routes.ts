//Dependencias
import { Router } from "express";
import { login, register } from "../controllers/users.controllers";
import { getTasks, getTask, postTask, putTask, deleteTask, searchTask } from "../controllers/tasks.controller";
import { validateToken } from "../middlewares/middlewares";

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
    .post(validateToken, postTask)
    .put(validateToken, putTask);

router.get('/serachTask',validateToken, searchTask);

//Exportacion del modulo
export default router;