import React from "react";
import './LoginBtn.css';

export class LoginBtn extends React.Component {
    

    render() {
        return (
            <button onClick={this.props.onClick}>{ this.props.hasLogin ? "Logout" : "Login" }</button>
        );
    }
}