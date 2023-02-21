import React from "react";
import "./SuccessView.css";

export class SuccessView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    //close the successView
    handleClick() {
        document.getElementsByClassName("successView")[0].style.visibility = "hidden"; 
        this.props.closeSuccessView();
    }

    componentDidUpdate() {
        if (this.props.show){
            document.getElementsByClassName("successView")[0].style.visibility = "visible";
        } else {
           document.getElementsByClassName("successView")[0].style.visibility = "hidden"; 
        }
        
    }

    render() {
        return (
            <div className="successView">
                <div className="successView-wordBox">
                    <span>Tracks added!</span>
                    <button className="round-btn" onClick={this.handleClick}>Confirm</button>
                </div>
            </div>
        );
    }
}