import React from "react";
// import logo from './logo.svg';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResult/SearchResults';
import { SuccessView } from "../SuccessView/SuccessView";
import { Playlist } from '../Playlist/Playlist';
import { spotify } from "../../util/Spotify";
import { NavBar } from "../NavBar/NavBar";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],

      playlistTracks: [],

      showAddSuccess: false,

      hasLogin: false,

      displayName: null,

      userPlaylist: [],

      playlistName: "New_Playlist",

      isLoading: false
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userSwitchAcc = this.userSwitchAcc.bind(this);
    this.closeSuccessView = this.closeSuccessView.bind(this);
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
    let playlistTracksArr = this.state.playlistTracks.filter( (element) => {
      return element.id !== track.id;
    });
    console.log(playlistTracksArr);
    this.setState({
      playlistTracks: playlistTracksArr
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

  closeSuccessView() {
    this.setState({
      showAddSuccess: false
    });
  }

  async search(searchTerm) {
    this.setState({isLoading: true});
    let returnArray = await spotify.search(searchTerm);
    this.setState({
      searchResults: returnArray
    });
    this.setState({isLoading: false});
  }

  handleLogin() {
    if (this.state.hasLogin){
      this.userSwitchAcc();
    } else {
      this.userLogin();
    }
  }

  async userLogin() {
    spotify.getAccessToken();
    let usrName = await spotify.getUserProfile();
    let usrPlaylist = await spotify.getUserPlaylistsName();

    this.setState({
      hasLogin: true,
      displayName: usrName,
      userPlaylist: usrPlaylist,
      playlistName: usrPlaylist[0]
    });
  }

  userSwitchAcc() {
    this.setState({
      hasLogin: false,
      displayName: null,
      searchResults: [],
      playlistName: "My_Playlist",
      playlistTracks: []
    });
    spotify.logout();
    this.userLogin();
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
            <Playlist playlistName={this.state.playlistName} userPlaylist={this.state.userPlaylist} 
            playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
          <SuccessView closeSuccessView={this.closeSuccessView} show={this.state.showAddSuccess}/>
        </div>
        <LoadingScreen isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default App;
