import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsToday`;
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ page: 1 }, () => {
        this.fetchArticles(1);
      });
    }
  }

  fetchArticles = async (page) => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: page === 1 ? parsedData.articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchArticles(this.state.page);
      });
    }
  };

  render() {
    const { articles, loading, totalResults } = this.state;
    const { pageSize } = this.props;

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '40px 0px' }}>
          NewsToday: Top {this.capitalizeFirstLetter(this.props.category)} Headlines 
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {articles.map((element) => {
              const title = element.title ? element.title.slice(0, 50) : '';
              const description = element.description ? element.description.slice(0, 100) : '';
              const author = element.author ? element.author : "Unknown";
              const publishedAt = element.publishedAt ? new Date(element.publishedAt).toGMTString() : "Unknown date";

              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={title}
                    description={description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={author}
                    date={publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
