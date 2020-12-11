import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const history = useHistory();
  const { restaurants, setRestaurants, deleteRestaurant } = useContext(
    RestaurantsContext
  );

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (rating, count) => {
    if (!count) {
      return <span className="text-warning">0 review</span>;
    } else {
      return (
        <>
          <StarRating rating={rating} />
          <span className="text-warning ml-1">({count})</span>
        </>
      );
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    RestaurantFinder.delete(`/${id}`)
      .then(function (response) {
        deleteRestaurant(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    RestaurantFinder.get("/")
      .then((response) => {
        setRestaurants(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRestaurants]);

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(({ id, name, location, price_range, count,average_rating }) => (
            <tr onClick={() => handleRestaurantSelect(id)} key={id}>
              <th scope="row">{name}</th>
              <td>{location}</td>
              <td>{"$".repeat(price_range)}</td>
              <td>{renderRating(average_rating, count)}</td>
              <td>
                <button
                  onClick={(e) => handleUpdate(e, id)}
                  className="btn btn-warning"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={(e) => handleDelete(e, id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
