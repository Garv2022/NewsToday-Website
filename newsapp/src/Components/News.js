import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c468d28f7de64753a8cd4cd061de816b";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsToday : Top Headlines of the day !!</h1>
        <div className='row'>
          {this.state.articles.map((element) => {
            const title = element.title ? element.title.slice(0, 50) : "";
            const description = element.description ? element.description.slice(0, 100) : "";
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem 
                  title={title} 
                  description={description} 
                  imageUrl={element.urlToImage} 
                  newsUrl={element.url} // Corrected the prop name
                />
              </div>
            );
          })}
        </div>
        <div className="container">
            <button type="button" class="btn btn-dark">Previous</button>
            <button type="button" class="btn btn-dark">Next</button>
        </div>
      </div>
    );
  }
}

export default News;
