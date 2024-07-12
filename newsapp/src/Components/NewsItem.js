import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date } = props;

  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img 
          src={imageUrl || "https://www.radhavallabhmandir.com/banner/n5eycw.jpg"} 
          className="card-img-top" 
          alt="News" 
        />
        <div className="card-body">
          <h5 className="card-title">{title ? `${title}...` : "No Title"}</h5>
          <p className="card-text">{description ? `${description}...` : "No Description"}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {date}
            </small>
          </p>
          <a 
            href={newsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-sm btn-dark"
          >
            Read more...
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
