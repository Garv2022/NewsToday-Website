import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

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

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
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
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c468d28f7de64753a8cd4cd061de816b&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ loading: true });
      const nextPage = this.state.page + 1;
      this.setState({ page: nextPage }, () => {
        this.fetchArticles(nextPage);
      });
    }
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState({ loading: true });
      const prevPage = this.state.page - 1;
      this.setState({ page: prevPage }, () => {
        this.fetchArticles(prevPage);
      });
    }
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    const { pageSize } = this.props;

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '40px 0px' }}>
          NewsToday: Top Headlines of the day !!
        </h1>
        {loading && <Spinner />}
        <div className="row">
          {articles && articles.map((element) => {
            const title = element.title ? element.title.slice(0, 50) : '';
            const description = element.description ? element.description.slice(0, 100) : '';
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={title}
                  description={description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={page + 1 > Math.ceil(totalResults / pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
