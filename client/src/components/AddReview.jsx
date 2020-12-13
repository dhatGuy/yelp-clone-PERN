import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const {id} = useParams()
  const history = useHistory()
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const isDisabled = name.trim().length === 0 || review.trim().length === 0

  const handleSubmit = e => {
    e.preventDefault();
    RestaurantFinder.post(`/${id}/addReview`, {
      name,
      rating,
      review
    })
    .then(function (response) {
      setName("");
      setRating(0);
      setReview("");
      history.push('/')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              name="rating"
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea value={review} onChange={e=> setReview(e.target.value)} className="form-control" rows="5"></textarea>
        </div>
        <button disabled={isDisabled} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
