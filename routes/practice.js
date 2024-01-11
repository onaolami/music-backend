const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

//create playlists

router.post("", async (req, res) => {
  const songSchema = yup.object().shape({
    title: yup.string().required("Required"),
    song: yup.string().required("Required"),
    song_id: yup.string().required("Required"),
  });

  const body = req.body;

  try {
    await songSchema.validate(body);
    const { title, song, song_id } = body;
    connection.query(
      "UPDATE practice SET title =?, song = ?, song_id = ?,WHERE ID =?"[
        (title, song, song_id)
      ],
      (err, result) => {
        if (err)
          return res.status(500).send("An error occured"), console.log(result);
        return res
          .status(201)
          .json({ message: "Practice updated successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
