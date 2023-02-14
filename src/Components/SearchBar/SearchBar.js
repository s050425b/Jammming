import React from "react";
import "./SearchBar.css";
import { getAccessToken } from "../../util/Spotify";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchTerm: "" };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(searchTerm) {
        this.props.onSearch(searchTerm);
    }

    handleTermChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={getAccessToken}>SEARCH</button>
            </div>
        );
    }
}