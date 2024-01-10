const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

//Create Comments

router.post("", async (req, res) => {
  const songSchema = yup.object().shape({
    body: yup.string().required("Required"),
    user_id: yup.number().required("Required"),
    song_id: yup.number().required("Required"),
  });
  const body = req.body;

  try {
    await songSchema.validate(body);
    const { body: commentBody, user_id, song_id } = body;

    connection.query(
      "INSERT INTO comments (body,user_id,song_id,created_at) VALUES (?,?,?,?)",
      [commentBody, user_id, song_id, new Date()],
      (err, result) => {
        if (err) return res.status(500).send("An Error Occured");
        console.log(result);
        return res.status(201).json({ message: "Comments added successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

//GET ALL COMMENTS
router.get("/:id/all", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM comments WHERE song_id = ? ",
    [id],
    (err, result) => {
      if (err) return res.status(500).send("An error occured");

      return res.status(200).json(result);
    }
  );
});

//DELETE ALL COMMENTS
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE  FROM comments WHERE id = ?",
    [id],
    (err, result) => {
      return res.status(200).json({ message: "Comment deleted sucessfully" });
    }
  );
});
module.exports = router;
