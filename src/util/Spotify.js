import { fetchSpotify } from "./apiFetchUtil";

let accessToken;
let expiresIn;
const clientID = "d925661ca96240788ab4663997b0ed8d";
const redirectURL = "http://localhost:3000/";
const spotify = {
    constructor() {
        this._userID = null;
    },

    async getUserID(){
        if (!this._userID) {
            accessToken = await this.getAccessToken();
            let jsonResponse = await fetchSpotify("/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            } );
            this._userID = jsonResponse.id;
            return jsonResponse.id;
        }
        return this._userID;
    },

    async getUserPlaylistsName() {
        let userID = await this.getUserID();
        let jsonResponse = await fetchSpotify(`/users/${userID}/playlists`, {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json" 
            }
        });
        let nameArr = [];
        for (let element of jsonResponse.items) {
            nameArr.push(element.name);
        }
        return nameArr;
    },

    async search(searchTerm) {
        accessToken = await this.getAccessToken();

        let jsonResponse = await fetchSpotify(`/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        
        let returnArray = [];
        for (let track of jsonResponse.tracks.items) {
            returnArray.push(this.returnObjFactory(track));
        }

        return returnArray;
    },

    returnObjFactory(track) {
        return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }
    },

    logout() {
        console.log("Logout");
        accessToken = null;
        expiresIn = null;
        window.history.pushState('Access Token', null, '/');
    },

    async getUserProfile() {
        let jsonResponse = await fetchSpotify("/me", {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json" 
            }
        });
        return jsonResponse.display_name;
    },


    async getAccessToken() {
        console.log(accessToken);
        let hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (accessToken) {
            return accessToken;
        } else if (hasAccessToken && hasExpiresIn) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            expiresIn = parseInt(window.location.href.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(() => {
                accessToken = '';
            }, expiresIn * 1000);
    
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}&show_dialog=true`;
            
        }
    },

    async savePlaylist(playlistName, uriArr) {
        accessToken = await this.getAccessToken();
        if (!(playlistName && uriArr)) {
            return;
        }
    
        let headerObj = { Authorization: `Bearer ${accessToken}` };
        let userID;
    
        //get userID ============================
        let jsonResponse = await fetchSpotify("/me", { headers: headerObj} );
        userID = jsonResponse.id;
    
        
    
        // get user's playlists ====================
        let playlistID;
        let trackFound = false;

        jsonResponse = await fetchSpotify(`/users/${userID}/playlists`, { headers: headerObj} );
        for (let element of jsonResponse.items) {
            if (playlistName === element.name) {
                playlistID = element.id;
                trackFound = true;
                break;
            }
        }

        let jsonBody;
        //create new playlist if not found =======================
        if (!trackFound) {
            jsonBody = JSON.stringify({
                name: playlistName,
                description: "New playlist description"
            });

            jsonResponse = await fetchSpotify(`/users/${userID}/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: jsonBody
            });
            playlistID = jsonResponse.id;
        }
    

        //append playlist ========================
        if (uriArr.length > 0){
            jsonBody = await JSON.stringify({
                uris: uriArr
            });

            jsonResponse = await fetchSpotify(`/playlists/${playlistID}/tracks`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: jsonBody
            });
        }
        
        return true;
    }
};



export {spotify};