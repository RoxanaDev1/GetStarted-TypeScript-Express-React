# GetStarted-TypeScript-Express-React

Welcome to my "Get Started" series!

In this repository I am going to build the minimum settings to get started with TypeScript, Express and React.

# Getting started

`npm init` - This will create package.json file which is very important for any JS project. Just accept all the defaults, and we will change them later.

`touch .gitignore` - This will create a file in the directory, where we will tell git what changes we will not be committing. Usually we will gitignore folders like node_modules, where all the dependencies are being installed. As preparation, add the following to .gitignore:

```
node_modules
```

# Installing dependencies

`npm install -D typescript` - This will install our main dependency, TypeScript! TypeScript is a wrapper around JavaScript which makes the language less error friendly and more readable.
Notice that a node_modules folder was created where the dependency was installed.
Notice that package.json was also updated with the dev dependency.

`tsc --init` - This will create a tsconfig.json file which our config file for TypeScript. The file is created with A LOT of options which are commented out. I think it is great to see how many options there are, but for this project I would suggest cleaning the file up and leaving the default selected options.

### Possible hickup - tsc is not found
In the case where the command is not found, it might be because TypeScript is not installed globally. Run the following:
`npm install -g typescript`

# Create project structure
Every project should have a set project structure. Project structure might seem like a minor thing to consider early on, but it is actually quite important! As project advances and more files are added, if our project structure was not considered properly, there is a higher chance we would need to refactor. 

Here is a general project structure, which I like using:

`mkdir src` - One folder where all the code we will write will be included in. 

`cd src` 

`mkdir server` - Folder for all the server code.

`mkdir client` - Folder for all the client/frontend code.

This is a general preference, and the reasoning behind it is that from looking at the structure we understand instantly more or less how the project works.

# Build a backend server using express
In order to run the application locally we need a server. There are many options to install a server, but I think the easiest way is to create a server. Creating a server is quite easy using express.

`npm install -D ts-node` - Installing typescript execution. If we were not using typescript, all scripts would run with only node. All typescript files which are executables, would need to be run with ts-node.

`npm install -g ts-node` - As we want to run ts-node commands from terminal, it would be nice to have it installed globally. If we do not install globally, running ts-node in terminal would pop an error. There are other ways, this is just the most simple.
More info: https://www.npmjs.com/package/ts-node

`npm install express @types/express` - Install express and types for express as we are running a typescript application. Notice the changes in package.json.

`cd src`

`cd server`

`touch server.ts`

### Building the server file:

```
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
```

### Running the server:
In the `package.json` file, add the following under `scripts` section:
`"start": "ts-node src/server/server.ts"`
Keep in mind this is a .json file, so don't forget the comma after, if it is not the last commnd in scripts section.

`npm start` - Executing this command in the terminal would not strat the server.

Open the browser with `localhost:8080` or the port you have chosen, and see that the application is running.

### Stopping the server:
`ctrl + c` - In the terminal where the server is running.

### Possible hickups

ts-node not installed globally:
```
ts-node : The term 'ts-node' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ ts-node src/server/server.ts
```

# Build the frontend using React
React is one of the more popular frontend frameworks. The main benefit with React is the way we arrange the code in components and communicate between them. One more benefit with React is the fact that not all components would update every time the UI changes, but only the ones which need change.
Short explanation: https://www.codecademy.com/articles/react-virtual-dom

Install the following react libs including their types:

`npm install react @types/react` 

`npm install react-dom @types/react-dom`

Navigate to the client lib:

`cd src`

`cd client`

`touch index.html`

The index.html file is the entry point for the project, it is the initial html which is used for the whole client code. The html file is very small, and all the frontend components would be attached to one element in the html called "appContainer" - or any similar name.

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello World - Frontend</title>
    </head>
    <body>
        <div id="appContainer"></div>
    </body>
</html>
```

`touch index.tsx`

The index.tsx will be the entry point for react to attach its elements to the html. The file ending must be `.tsx` as it will render some content into the page, similarly with JS where `.jsx` is used. 

```
import * as React  from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
   <div>"Hello World - Frontend"</div>,
    document.getElementById("appContainer")
);
```

At this point some modifications should be made to the project configuration. We will fix them one by one under possible hickups.

### Possible hickups

When creating the index.tsx, the div element would have the following error:

```
[ts] Cannot use JSX unless the '--jsx' flag is provided.
```

The cause is due to the fact that our tsconfig has no jsx flag.
Update the `tsconfig.json` file with the following under compile options:
The error would go away, as we have told have setup react as the framework to render jsx.

`"jsx": "react"`

In this section we will not run anything for now, as we would like the server to load our frontend, or as we say: serve it.

