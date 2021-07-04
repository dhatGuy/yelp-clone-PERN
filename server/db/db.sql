CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(
    price_range >= 1
    AND price_range <= 5
  )
);

INSERT INTO restaurants(name, location, price_range)
VALUES ('Iya Toyosi', 'Sagamu', 3);

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(
    rating >= 1
    AND rating <= 5
  )
);
