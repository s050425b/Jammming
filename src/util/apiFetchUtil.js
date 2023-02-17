const fetchSpotify = async (url, object) => {
    let response = await fetch("https://api.spotify.com/v1" + url, object);
    return response.json();
}

export {fetchSpotify};