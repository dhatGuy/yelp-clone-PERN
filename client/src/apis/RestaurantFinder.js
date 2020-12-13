import axios from "axios";
import axiosRetry from 'axios-retry';

const RestaurantFinder = axios.create({
  baseURL: "https://yelp-cloney.herokuapp.com/api/v1/restaurants",
  timeout: 5000,
});

axiosRetry(RestaurantFinder, { retries: 3 });

export default RestaurantFinder;
