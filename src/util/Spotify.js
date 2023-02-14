let accessToken;
let expiresIn;
const clientID = "d925661ca96240788ab4663997b0ed8d";
const redirectURL = "http://localhost:3000/";
const spotify = {
    async search() {
        let response = await fetch("https://api.spotify.com/v1/search?type=track&q=TERM", {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        let jsonResponse = await response.json();
        let tracksArr;
        for (let track in jsonResponse) {
            console.log(track);
        }
    }
};

const getAccessToken = () => {
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
}

export {spotify, getAccessToken};