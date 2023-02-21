import React from "react";
import './LoginBtn.css';

export class LoginBtn extends React.Component {
    

    render() {
        return (
            <button className="round-btn LoginBtn" onClick={this.props.onClick}>{ this.props.hasLogin ? "Switch Account" : "Login" }</button>
        );
    }
}