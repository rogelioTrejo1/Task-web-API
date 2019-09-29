//Dependencias
import App from "./App";
import MySQL from "./class/MySQL";

async function main(): Promise<void> {
    try {
        const app: App = new App();
        const conn: MySQL = new MySQL();
        const idConecction = await conn.getConnection();

        console.log(`>>DB is conected. ID: ${idConecction}`);
        app.listen();
    } catch (error) {
        console.error(error);
    }
}

main();