import React from "react";
import './LoadingScreen.css';

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={this.props.isLoading ? {visibility: "visible"} :{visibility: "hidden"}} className="LoadingScreen">
                <div></div>
            </div>
        );
    }
}