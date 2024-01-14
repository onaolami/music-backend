const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const response = await axios("https://jsonplaceholder.org/users");
    console.log(response.data);
    return res.status(200).send("Successful");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error occurred: " + e.message);
  }
});

module.exports = router;
