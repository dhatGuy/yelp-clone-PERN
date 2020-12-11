import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantdetailPage = () => {
  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)  

  useEffect(() => {
    RestaurantFinder.get(`/${id}`)
      .then((response) => {
        const data = response.data.data
        setSelectedRestaurant(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSelectedRestaurant, id]);

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

