import express from 'express';
import path from 'path';

const BUILD_DIR = path.join(__dirname, "../build");
const INDEX_DIR = path.join(BUILD_DIR, "index.html");

const app: express.Application = express(); //Define the app which is going to run.
const port: string | number = process.env.port || 8080; //Define the port.

/** 
 * Define where the content would be served from - in our case it is static content.
*/
app.use(express.static(BUILD_DIR))

/** 
 * Define the entry point. When loading the app on localhost:8080 we will send the content
 * inside res.send(<Content>)
*/
app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(INDEX_DIR);
});

/** 
 * Define on which port the app is running on.
*/
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});