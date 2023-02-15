import React from "react";
// import logo from './logo.svg';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResult/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { spotify } from "../../util/Spotify";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: "Song1", artist: "Singing1", album: "album1", id: "1", uri: "song1URI"}, 
                      {name: "Song2", artist: "Singing2", album: "album2", id: "2", uri: "song2URI"}, 
                      {name: "Song3", artist: "Singing3", album: "album3", id: "3", uri: "song3URI"}],
      
      playlistName: "My_Playlist",

      playlistTracks: [{name: "Song4", artist: "Singing4", album: "album4", id: "4", uri: "song4URI"}, 
                       {name: "Song5", artist: "Singing5", album: "album5", id: "5", uri: "song5URI"}, 
                       {name: "Song6", artist: "Singing6", album: "album6", id: "6", uri: "song6URI"}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let returnPlaylistTracks = this.state.playlistTracks;
    returnPlaylistTracks.push(track);
    this.setState({
      playlistTracks: returnPlaylistTracks
    });
  }

  removeTrack(track) {
    this.state.playlistTracks = this.state.playlistTracks.filter( (element) => {
      return element.id !== track.id;
    });
    let returnPlaylistTracks = this.state.playlistTracks;
    this.setState({
      playlistTracks: returnPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
  }

  async search(searchTerm) {
    let returnArray = await spotify.search(searchTerm);
    this.setState({
      searchResults: returnArray
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
