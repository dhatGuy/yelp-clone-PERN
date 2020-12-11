import axios from "axios";

export default axios.create({
  baseURL: "https://yelp-cloney.herokuapp.com/api/v1/restaurants",
  timeout: 5000,
});
