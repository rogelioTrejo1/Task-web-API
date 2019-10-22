//Variables de entorno
require('dotenv').config();

//Dependencias
import express, { Application, json, urlencoded, static as staticFiles } from "express";
import morgan from "morgan";
import cors from "cors";
import { resolve } from "path";

//Rutas del servidor
import api from "./routes/api.routes";
import routes from "./routes/routes";

class App {
    private app: Application;

    constructor(port?: number) {
        this.app = express();
        this.staticFiles();
        this.middleware();
        this.setting(port);
        this.routes();
    }

    /**
     * SETTING:
     * Establece las configuraciones para que se pueedan ocupar
     * a lo largo de el servidor tales como: Puests, motores de plantillas etc 
     * @param port
     * Se puede establecer un puerto cuando se intancia la clase por si no se tiene 
     * una variable de entorno
     */
    private setting(port?: number) {
        this.app.set('port', port || process.env.PORT_SERVER || 4000);
    }

    /**
     * MIDDLEWARES:
     * Establece todos aquellos middlewares que se ocuparan en el servidor.
     */
    private middleware(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: false}))
    }

    /**
     * ROUTES:
     * Establece las rutas en el servidor
     */
    private routes(): void {
        this.app.use(routes);
        this.app.use('/api', api);
    }

    /**
      * STATICFILES:
      * Deja en acceso publico todas al imagenes desde el servidor
    */
    private staticFiles(): void {
        this.app.use('/uploads', staticFiles(resolve('uploads')));
    }

    /**
     * LISTEN:
     * Motodo en le cual se pone a trabajar el servidor en el puerto
     * establecido en "setting" para poder trabajar en http://localhost:PORT_SERVER
     */
    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port ${this.app.get('port')}`);
    }
}
//exportamiento del modulo
export default App;