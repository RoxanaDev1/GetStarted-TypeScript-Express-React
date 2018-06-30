import express from 'express';

const app: express.Application = express(); //Define the app which is going to run.
const port: string | number = process.env.port || 8080; //Define the port.

/** 
 * Define the entry point. When loading the app on localhost:8080 we will send the content
 * inside res.send(<Content>)
*/
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello world!");
});

/** 
 * Define on which port the app is running on.
*/
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});