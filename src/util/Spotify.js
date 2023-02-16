let accessToken;
let expiresIn;
const clientID = "d925661ca96240788ab4663997b0ed8d";
const redirectURL = "http://localhost:3000/";
const spotify = {
    async search(searchTerm) {
        accessToken = await this.getAccessToken();
        let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        let jsonResponse = await response.json();
        
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

    async getAccessToken() {
        console.log("access token called");
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
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
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
        let response = await fetch("https://api.spotify.com/v1/me", { headers: headerObj});
        let jsonResponse = await response.json();
        userID = jsonResponse.id;
    
        let jsonBody = JSON.stringify({
            name: playlistName,
            description: "New playlist description"
        });
    
        //create new playlist =======================
        response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: jsonBody
        });
    
        jsonResponse = await response.json();
        let playlistID = jsonResponse.id;

        //append playlist
        jsonBody = await JSON.stringify({
            uris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]
        });

        response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: jsonBody
        });
        
        console.log(await response.json());
    }
};


export {spotify};