import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantdetailPage = () => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)  

  useEffect(() => {
    RestaurantFinder.get(`/${id}`)
      .then((response) => {
        const data = response.data.data
        setSelectedRestaurant(data);
      })
      .then(()=>{
        setIsLoading(prev => !prev)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSelectedRestaurant, id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      {selectedRestaurant && (
        <>
        <h1 className="font-weight-light display-1 text-center">{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating} />
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ? `(${Number(selectedRestaurant.restaurant.count)})` : "(0)"}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant}/>
        </div>
        <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantdetailPage

