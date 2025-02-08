const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model

const Model = mongoose.model('trips');

// GET: /trips lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  try {
    const q = await Model.find({}).exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if (!q || q.length === 0) { // Database returned no data
      return res.status(404).json({ "message": "Trips not found" });
    } else { // Return resulting trip list
      return res.status(200).json(q);
    }
  } catch (err) {
    console.error("Error fetching trips:", err);
    return res.status(500).json({ "message": "An error occurred" });
  }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    try {
      const q = await Model.findOne({ 'code': req.params.tripCode }).exec(); // Use findOne for a single record
  
      // Uncomment the following line to show results of query
      // on the console
      // console.log(q);
  
      if (!q) { // Database returned no data
        return res.status(404).json({ "message": "Trip not found" });
      } else { // Return resulting trip
        return res.status(200).json(q);
      }
    } catch (err) {
      console.error("Error finding trip by code:", err);
      return res.status(500).json({ "message": "An error occurred" });
    }
  };
  
  module.exports = {
    tripsList, 
    tripsFindByCode
  };