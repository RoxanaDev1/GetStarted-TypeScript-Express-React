# GetStarted-TypeScript-Express-React

Welcome to my "Get Started" series!

In this repository I am going to build the minimum settings to get started with TypeScript, Express and React.

My motivation for this repository is to understand how the most basic things are being setup. I know today we have plenty of projects we can just npm install, and would work without any kind of problem. When I install a bunch of stuff, if something doe not work as expected I usually feel I need to dig in to much, so I decided to create this together with all the problems I run into, this way I and other learn how to deal with those annoying installation problems.
Another point is that most of us really setup a project once in a while, and then we forget those really simple stuff.

Feedback is welcome, and other kind of problems are welcome to be documented.

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

Navigate from project root: 

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

`npm start` - Executing this command in the terminal would strat the server.

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

Navigate to the client lib from project root:

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


# Bring the project together - Build with Webpack
In this stage of the project we have a simple server, and we have a simple frontend. At this stage we would like to tie them both together, and have the server serve the frontend code through a package which we will create. 
This phase is called: Build. 

Frontend applications are usually compiled into one file called bundle.js - this is the would appear in the final built index.html as a single script tag.
When using Typescript, all Typescript files are compiled into Javascript and then bundled into this single file we call bundle.

### Setup webpack

`npm install -g webpack`

From project root, create the following file:

`touch webpack.config.js` - This file is used to define webpack how to build the project.

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CLINET_DIR = path.join(__dirname, "./src/client");
const BUILD_DIR = path.join(__dirname, "./src/build");

module.exports = {
    entry: path.join(CLINET_DIR, "index.tsx"), //Define the entry point for the project
    output: {   //Define where the compliation package would be placed
        filename: "bundle.js",
        path: BUILD_DIR
    },

    // Enable sourcemaps for debugging webpack's output.
    // http://blog.teamtreehouse.com/introduction-source-maps
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My first React app',
            template: path.join(CLINET_DIR, "index.html")
          })
    ]
};
```

Some of the things to pay attention to when configuring webpack:
1. The paths to the client and build directions are correct.
2. Module rules - those are called loaders, and for each type of file used in the project there would be a loader. For example for .ts and .tsx we use `awesome-typescript-loader`. Those loaders need to be npm installed. When a new type of file is used, make sure to resolve the extension and also to add a loader - searching for one would usually give an example of how to use.

### Webpack - Loaders installation

`npm install -D awesome-typescript-loader`

`npm install -D source-map-loader`

### Webpack - Plugins

Plugins are like small extra things one can apply during the build process. I like using `HtmlWebpackPlugin` because it gives some options to create an index.html file.
I think the most important part about having the index.html file generate is that the location of where the bundle is referenced from is set by webpack.

`npm install -D html-webpack-plugin`

### Webpack - Running the build

`webpack` - Running this command should be enough, tho recently there were some changes in webpack and webpack-cli is the new thing. For the purpose of this project starter, I will stick to webpack and recommend installing the following:

`npm install -g webpack-command`

`npm install -D webpack-command`

The reason I am installing globally also, is as I would like to run the command in the terminal.

More reading material: https://medium.com/webpack/announcing-the-new-webpack-cli-75ce1d9b8663

Run `webpck` command again, If everything went well, the build folder should now contain `bundle.js` and `index.html`

In the `package.json` file, add the following under `scripts` section:
`"build": "webpack"`
Keep in mind this is a .json file, so don't forget the comma after, if it is not the last commnd in scripts section.

`npm run build` - Executing this command in the terminal would build the bundle.

### Add build to .gitignore
Since every time someone uses this project ideally they should build it, exclude the build from the git.

Add the following line to `.gitignore`:

```
src/build
```

### Modify the server.ts to serve the bundle

```
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
```

In the `server.ts` we now need to define which content would be served:
1. We will set the app to use static content - our content is built and is served as a bundle from our build folder. 
https://expressjs.com/en/starter/static-files.html
2. The server now will send to the frontend when localhost loads the `index.html` file, which as mentioned before is served as the entry point for the project.

# Run the project
In order to run the project, make sure to build and then start the server.

`npm run build`

`npm start`

Navigate to `localhost:8080` and you will be able to see your app running!

# Adding React components

Usually frontend code is not build in one big file, but we are encouraged to use components and break the code into logical sections.

You can observe the changes in the index.tsx file, where I added the `App.tsx` which is a React component.

`App.tsx` uses `SimpleComponent.tsx` as an example.

# You are now ready to go! 

As usual big thanks to https://www.typescriptlang.org/docs/handbook/react-&-webpack.html for making this post! I always use it as my base for setting up a TypeScript & React project.

