import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl ? "https://www.radhavallabhmandir.com/banner/n5eycw.jpg" : imageUrl} className="card-img-top" alt='...' />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more...</a> {/* Added target and rel attributes */}
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
