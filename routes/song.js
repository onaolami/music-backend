const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

router.post("", async (req, res) => {
  const songSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    image: yup.string().required("Required"),
    music: yup.string().required("Required"),
    duration: yup.number().required("Required"),
    year: yup.number().required("Required"),
    genre: yup.string().required("Required"),
    artist: yup.string().required("Required"),
  });

  const body = req.body;

  try {
    await songSchema.validate(body);

    const { title, description, image, music, duration, year, genre, artist } =
      body;

    connection.query(
      "INSERT INTO songs (title, description, image, music, duration, year, genre, artist, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        image,
        music,
        duration,
        year,
        genre,
        artist,
        new Date(),
      ],
      (err, result) => {
        if (err) return res.status(500).send("An error occurred");

        console.log(result);
        return res.status(201).json({ message: "Song added successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put("", async (req, res) => {
  const songSchema = yup.object().shape({
    id: yup.number().required("Required"),
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    image: yup.string().required("Required"),
    music: yup.string().required("Required"),
    duration: yup.number().required("Required"),
    year: yup.number().required("Required"),
    genre: yup.string().required("Required"),
    artist: yup.string().required("Required"),
  });

  const body = req.body;

  try {
    await songSchema.validate(body);

    const {
      title,
      description,
      image,
      music,
      duration,
      year,
      genre,
      artist,
      id,
    } = body;

    connection.query(
      "UPDATE songs SET title = ?, description = ?, image = ?, music = ?, duration = ?, year = ?, genre = ?, artist = ? WHERE id = ?",
      [title, description, image, music, duration, year, genre, artist, id],
      (err, result) => {
        if (err) return res.status(500).send("An error occurred");

        console.log(result);
        return res.status(201).json({ message: "Song updated successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get("/all", (req, res) => {
  connection.query("SELECT * FROM songs", (err, result) => {
    return res.status(200).json(result);
  });
});

router.get("/search", (req, res) => {
  const query = req.query.query;

  connection.query(
    `SELECT * FROM songs WHERE title LIKE '%${query}%'`,
    (err, result) => {
      return res.status(200).json(result);
    }
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  connection.query("SELECT * FROM songs WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("An error occurred");

    if (result.length === 0) {
      return res.status(404).json({ message: "Song not found" });
    } else {
      return res.status(200).json(result[0]);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM songs WHERE id = ?", [id], (err, result) => {
    return res.status(200).json({ message: "Deleted successfully" });
  });
});

router.post("/:songId/playlist/:playlistId", (req, res) => {
  const { songId, playlistId } = req.params;

  connection.query(
    "INSERT INTO song_playlists (song_id, playlist_id) VALUES (?, ?)",
    [Number(songId), Number(playlistId)],
    (err, result) => {
      console.log(err);
      if (err) return res.status(500).send("An error occurred");

      return res.status(200).json({ message: "Song added successfully" });
    }
  );
});

router.get("/playlist/:playlistId", (req, res) => {
  const { playlistId } = req.params;

  connection.query(
    "SELECT songs.* FROM song_playlists INNER JOIN songs ON songs.id = song_playlists.song_id WHERE song_playlists.playlist_id = ? ",
    [playlistId], (err,result)=>{
      if (err) return res.status(500).send("An error occured");
      return res.status(200).json(result)
    }
  );
});

module.exports = router;
