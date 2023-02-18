import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        let optionArr = []
        for (let x=0; x < this.props.userPlaylist.length; x++)  {
            optionArr.push(<option value={this.props.userPlaylist[x]} key={x} />);
        } 
        console.log(optionArr);

        return (
            <div className="Playlist">
                <input deafultValue={ this.props.userPlaylist.length > 0 ? this.props.userPlaylist[0] : "hello playlist" } 
                    onChange={this.handleNameChange} list="playlistName" />
                <datalist id="playlistName">
                     {optionArr}
                </datalist>
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}