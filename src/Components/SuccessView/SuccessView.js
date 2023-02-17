import React from "react";
import "./SuccessView.css";

export class SuccessView extends React.Component {
    handleClick() {
        document.getElementsByClassName("successView")[0].style.visibility = "hidden"; 
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
                    <button onClick={this.handleClick}>Confirm</button>
                </div>
            </div>
        );
    }
}