const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../utils/members");

// Get all members
router.get("/", (req, res) => res.json(members));

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id}` });
  }
});

// Create a Member

router.post("/", (req, res) => {
  const newMem = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: true,
  };

  if (!newMem.name || !newMem.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMem);

  // res.redirect("/");
  res.status(200).json(members);
});

// Edit Single Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const upMem = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = upMem.name ? upMem.name : member.name;
        member.email = upMem.email ? upMem.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id}` });
  }
});

// Delete the member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id}` });
  }
});

module.exports = router;
