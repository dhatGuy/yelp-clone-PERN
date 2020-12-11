import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(1);

  useEffect(() => {
    RestaurantFinder.get(`/${id}`)
      .then((response) => {
        const data = response.data.data.restaurant;
        setName(data.name);
        setLocation(data.location);
        setPrice(data.price_range);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: price,
    })
      .then(function () {
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="font-weight-light display-2 text-center">
        Update {name}
      </h1>
      <div>
        <form onSubmit={onSubmit} action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              id="location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              max="5"
              className="form-control"
              id="price_range"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UpdateRestaurant;
