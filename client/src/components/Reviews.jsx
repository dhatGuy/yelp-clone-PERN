import React from "react";
import StarRating from "./StarRating";

const Reviews = (props) => {
  const { reviews } = props.reviews;
  
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card text-white bg-primary mb-3 mr-3"
          style={{ maxWidth: "15rem" }}
        >
          <div className="card-header">{review.name}</div>
          <div className="card-body">
            <h5 className="card-title">
              <StarRating rating={review.rating} />
            </h5>
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
