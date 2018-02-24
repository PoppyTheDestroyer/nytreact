import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import SearchBar from "./search_bar";

const API = "24ad0c2914ee4ca7983d996ef1128800";
let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${API}`
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      selectedArticle: null
    };
  }

  NYTSearch(term) {
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
      }).fail(function(err) {
        throw err;
      });
  }

  articleSearch(term) {
    NYTSearch({ API, term }, articles => {
      this.setState({
        articles: articles,
        selectedArticle: articles[0]
      });
    });
  }

  render() {
      const articleSearch = _.debounce((term) => {this.videoSearch(term)}, 500)
    return (
      <div>
        <SearchBar onSearchTermChange={articleSearch} />
      </div>
    );
  }
}
