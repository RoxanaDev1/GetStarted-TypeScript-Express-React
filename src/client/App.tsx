import * as React from "react";
import SimpleComponent from "./components/SimpleComponent"

export default class App extends React.Component {
    render() {
        return <div>
            <label>This is the App component</label>
            <SimpleComponent text={"This is a simple component"}/>
            <SimpleComponent text={"This is another simple component"}/>
        </div>
    }
}