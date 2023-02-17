import React from "react";
import "./NavBar.css";
import { LoginBtn } from "../LoginBtn/LoginBtn";

export class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div>
                    <span className="usernamme">{this.props.userName && "Hello, " + this.props.userName}</span>
                    <LoginBtn  hasLogin={this.props.hasLogin} onClick={this.props.onClick} />
                </div>
                
            </div>
        );
    }
}
