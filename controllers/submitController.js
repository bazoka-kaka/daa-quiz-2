const ejs = require("ejs");
const path = require("path");
const getShortestPath = require("./dijkstra");
const cities = require("../config/cities");

const handleSubmit = (req, res) => {
  let { location_from, location_destination } = req?.body;
  if (!location_from || !location_destination)
    return res
      .status(400)
      .json({ message: "Location source and destination must be specified!" });
  else if (location_from === location_destination)
    return res
      .status(400)
      .json({ message: "Location source and destination must be different!" });
  const routesResult = getShortestPath(location_from, location_destination);
  // swap for image
  if (cities.indexOf(location_from) > cities.indexOf(location_destination)) {
    let tmp = location_from;
    location_from = location_destination;
    location_destination = tmp;
  }
  ejs.renderFile(
    path.join(__dirname, "..", "views", "result.ejs"),
    {
      routesResult,
      from: location_from,
      destination: location_destination,
    },
    (err, str) => {
      res.send(str);
    }
  );
};

module.exports = { handleSubmit };
