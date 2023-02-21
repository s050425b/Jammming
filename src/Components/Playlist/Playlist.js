import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdown: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleDropdownOptionClick = this.handleDropdownOptionClick.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    toggleDropdown() {
        this.setState({
            isDropdown: !this.state.isDropdown
        });
    }

    handleDropdownOptionClick(e) {
        this.props.onNameChange(e.target.innerHTML);
        this.toggleDropdown();
    }

    render() {
        let optionArr = []
        for (let x=0; x < this.props.userPlaylist.length; x++)  {
            optionArr.push(<div className="playlist-dropdown-option" onClick={this.handleDropdownOptionClick}>{this.props.userPlaylist[x]}</div>);
        } 

        return (
            <div className="Playlist">
                <div className="playlist-name-parent-div">
                    <div className="playlist-input-div">
                        <input value={this.props.playlistName}
                        onChange={this.handleNameChange} type="text" />
                        <button onClick={this.toggleDropdown}>V</button>
                    </div>
                    <div className="playlist-dropdown" style={this.state.isDropdown ? {visibility: "visible"} : {visibility: "hidden"}}>
                        {optionArr}
                    </div>
                </div>
                
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save round-btn" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}