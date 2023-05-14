const ejs = require("ejs");
const path = require("path");
const getShortestPath = require("./dijkstra");

const handleSubmit = (req, res) => {
  const { location_from, location_destination } = req?.body;
  if (!location_from || !location_destination)
    return res
      .status(400)
      .json({ message: "Location source and destination must be specified!" });
  const routesResult = getShortestPath(location_from, location_destination);
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
