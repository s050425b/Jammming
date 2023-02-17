import React from "react";
// import logo from './logo.svg';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResult/SearchResults';
import { SuccessView } from "../SuccessView/SuccessView";
import { Playlist } from '../Playlist/Playlist';
import { spotify } from "../../util/Spotify";
import { NavBar } from "../NavBar/NavBar";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      
      playlistName: "My_Playlist",

      playlistTracks: [],

      showAddSuccess: false,

      hasLogin: false,

      displayName: null
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
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
    let uriArr = [];
    for (let element of this.state.playlistTracks) {
      uriArr.push(element.uri);
    }
    let isSuccess = spotify.savePlaylist(this.state.playlistName, uriArr);
    this.setState({
      showAddSuccess: isSuccess
    });
  }

  async search(searchTerm) {
    let returnArray = await spotify.search(searchTerm);
    this.setState({
      searchResults: returnArray
    });
  }

  handleLogin() {
    if (this.state.hasLogin){
      this.userLogout();
    } else {
      this.userLogin();
    }
  }

  async userLogin() {
    spotify.getAccessToken();
    let usrName = await spotify.getUserProfile();
    this.setState({
      hasLogin: true,
      displayName: usrName
    });
    console.log(await spotify.getUserPlaylistsName());
  }

  userLogout() {
    spotify.logout();
    this.setState({
      hasLogin: false,
      displayName: null,
      searchResults: [],
      playlistName: "My_Playlist",
      playlistTracks: []
    });
  }

  componentDidMount() {
    this.userLogin();
  }

  render() {
    return (
      <div>
        <NavBar hasLogin={this.state.hasLogin} onClick={this.handleLogin} userName={this.state.displayName} />
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
          <SuccessView show={this.state.showAddSuccess}/>
        </div>
      </div>
    );
  }
}

export default App;
