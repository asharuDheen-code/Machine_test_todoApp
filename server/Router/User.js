const { response } = require("express");
const express = require("express");
const userHelper = require("../helpers/userHelper");
const router = express.Router();
// const helper = require("../helpers/userHelper");
const helper = require("../helpers/userHelper");

// router.get("/", (req, res) => {
//   res.send("welcome dude");
// });

// router.get("/getalluser", (req, res) => {
//   helper.getAllUser().then((users) => {
//     return res.json(users);
//   });
// });

// router.post("/adduser", (req, res) => {
//   helper.addUser(req.body).then((user) => {
//     return res.json(user);
//   });
// });

// router.get("/deleteitem", (req, res) => {
//   helper.deleteUser(req.query.userId).then((users) => {
//     return res.json(users);
//   });
// });

// router.get("/getuser", (req, res) => {
//   helper.getUser(req.query.userId).then((user) => {
//     return res.json(user);
//   });
// });

// router.post("/edituser", (req, res) => {
//   helper.updateUser(req.query.userId, req.body).then((users) => {
//     return res.json(users);
//   });
// });

router.post("/sendinputval", (req, res) => {
  const inputItem = req.body;
  helper.addItem(inputItem).then((items) => {
    return res.json(items);
  });
});

router.get("/collectalldata", (req, res) => {
  helper.getAllData().then((datas) => {
    return res.json(datas);
  });
});

router.get("/deleteItems", (req, res) => {
  const itemId = req.query.itemId;
  helper.deleteItem(itemId).then((balamceItems) => {
    return res.json(balamceItems);
  });
});

router.get("/getItem", (req, res) => {
  const itemId = req.query.itemId;
  helper.getEditItem(itemId).then((item) => {
    return res.json(item);
  });
});

router.post("/editItem", (req, res) => {
  const itemId = req.query.itemId;
  const data = req.body.editedItem;

  helper.editItem(itemId, data).then((editedItems) => {
    return res.json(editedItems);
  });
});

module.exports = router;
