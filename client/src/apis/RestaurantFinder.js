import axios from "axios";

export default axios.create({
  baseURL: "http://blooming-mesa-76571.herokuapp.com/api/v1/restaurants",
  timeout: 1000,
});
