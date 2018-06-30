import * as React from "react";

interface SimpleComponentProps {
    text: string;
}

export default class SimpleComponent extends React.Component<SimpleComponentProps, {}> {

    render() {
        return <div>{this.props.text}</div>
    }
}