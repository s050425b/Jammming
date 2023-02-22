import React from "react";
import './LoadingScreen.css';

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={this.props.isLoading ? {visibility: "visible", animationPlayState: "running"} :{visibility: "hidden",  animationPlayState: "paused"}} className="LoadingScreen centerElement">
                Loading
            </div>
        );
    }
}