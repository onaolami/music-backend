const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

//create playlists
router.post("", async (req, res) => {
  const songSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    image: yup.string().required("Required"),
    genre: yup.string().required("Required"),
  });

  const body = req.body;

  try {
    await songSchema.validate(body);

    const { title, description, image, genre } = body;

    connection.query(
      "INSERT INTO playlists (title,description,image,genre,created_at) VALUES (?, ?, ?, ?, ?)",
      [title, description, image, genre, new Date()],
      (err, result) => {
        if (err) return res.status(500).send("An error occurred");

        console.log(result);
        return res
          .status(201)
          .json({ message: "Playlists added successsfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

//update playlists

router.put("", async (req, res) => {
  const songSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    image: yup.string().required("Required"),
    genre: yup.string().required("Required"),
    id: yup.string().required("Reqired"),
  });
  const body = req.body;

  try {
    await songSchema.validate(body);

    const { title, description, image, genre, id } = body;

    connection.query(
      "UPDATE playlists SET title = ?, description = ?, image = ?, genre = ?  WHERE id = ?",
      [title, description, image, genre, id],
      (err, result) => {
        if (err)
          return res.status(500).send("An error ocurred"), console.log(result);

        return res
          .status(201)
          .json({ message: "Playlists Updated Successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

//GET ALL PLAYLISTS
router.get("/all", (req, res) => {
  connection.query("SELECT * FROM playlists", (err, result) => {
    return res.status(200).json(result);
  });
});

//SEARCH FOR PLAYLISTS

router.get("/search", (req, res) => {
  const query = req.query.query;

  connection.query(
    `SELECT * FROM playlists WHERE title LIKE '%${query}%'`,
    (err, result) => {
      return res.status(200).json(result);
    }
  );
});

///GET PLAYLIST USING PATH VARIABLES
router.get("/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT *  FROM playlists WHERE id =?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send("An error Occured");

      if (result.length === 0) {
        return res.status(404)({ message: "Song not found" });
      } else {
        return res.status(200).json(result[0]);
      }
    }
  );
});

//Delete Playlists

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM playlists WHERE id = ?",[id],(err, result) => {
      return res.status(200).json({ message: "Deleted Successfully" });
    });
});

module.exports = router;
