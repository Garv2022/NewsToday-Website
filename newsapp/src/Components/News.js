import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [page, setPage] = useState(1); // State to track current page
  const [totalResults, setTotalResults] = useState(0); // State to hold total number of results

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsToday`;
    updateNews(); // Fetch articles when category changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]); // Run effect only when category changes

  // Function to fetch articles
  const updateNews = async () => {
    props.setProgress(10); // Update progress
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true); // Set loading state to true
    try {
      const data = await fetch(url); // Fetch data from API
      const parsedData = await data.json(); // Parse JSON response
      props.setProgress(70); // Update progress
      setArticles(parsedData.articles || []); // Update articles state
      setTotalResults(parsedData.totalResults || 0); // Update totalResults state
      setLoading(false); // Set loading state to false
      props.setProgress(100); // Update progress
    } catch (error) {
      console.error('Error fetching the articles:', error); // Log error if fetching fails
      setLoading(false); // Set loading state to false
      props.setProgress(100); // Update progress
    }
  };

  // Function to fetch more articles
  const fetchMoreData = async () => {
    const nextPage = page + 1; // Calculate next page number
    setPage(nextPage); // Update page state
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    try {
      const data = await fetch(url); // Fetch data from API
      const parsedData = await data.json(); // Parse JSON response
      setArticles([...articles, ...parsedData.articles]); // Update articles state with new data
      setTotalResults(parsedData.totalResults || 0); // Update totalResults state
    } catch (error) {
      console.error('Error fetching more articles:', error); // Log error if fetching fails
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '40px 0px' }}>
        NewsToday: Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />} {/* Show spinner while loading */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData} // Function to call when reaching the end of the list
        hasMore={articles.length < totalResults} // Check if there are more articles to load
        loader={<Spinner />} // Loader component
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 50) : ''}
                description={element.description ? element.description.slice(0, 100) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author || 'Unknown'}
                date={new Date(element.publishedAt).toGMTString()}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

// Default props
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

// PropTypes
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;


#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<int> v(n);
        for (int i = 0; i < n; i++) cin >> v[i];
        
        vector<int> pf(n, 0);
        vector<vector<int>> nf(n, vector<int>(2, 0));
        
        // Handling the first element
        nf[0][0] = max(abs(v[1] - k), abs(v[1] - 1));
        nf[0][1] = (abs(v[1] - k) > abs(v[1] - 1)) ? k : 1;
        
        // Handling the last element
        nf[n - 1][0] = max(abs(v[n - 2] - 1), abs(v[n - 2] - k));
        nf[n - 1][1] = (abs(v[n - 2] - 1) > abs(v[n - 2] - k)) ? 1 : k;
        
        // Adjust the array at the boundaries
        v[0] = abs(v[0] - v[1]);
        v[n - 1] = abs(v[n - 2] - v[n - 1]);
        
        // Calculate values for the middle elements
        for (int i = 1; i < n - 1; i++) {
            pf[i] = abs(v[i - 1] - v[i]) + abs(v[i + 1] - v[i]);
            int a = abs(v[i - 1] - 1) + abs(v[i + 1] - 1);
            int b = abs(v[i - 1] - k) + abs(v[i + 1] - k);
            nf[i][0] = max(a, b);
            nf[i][1] = (a > b) ? 1 : k;
        }
        
        // Find the index that maximizes the difference
        int ind = 0;
        int maxi = nf[0][0] - pf[0];
        for (int i = 1; i < n; i++) {
            int cnt = nf[i][0] - pf[i];
            if (cnt > maxi) {
                maxi = cnt;
                ind = i;
            }
        }
        
        // Update the array at the determined index
        v[ind] = nf[ind][1];
        
        // Calculate the final difference
        int diff = 0;
        for (int i = 1; i < n; i++) {
            diff += abs(v[i - 1] - v[i]);
        }

        cout << diff << endl;
    }

    return 0;
}
modify my code 