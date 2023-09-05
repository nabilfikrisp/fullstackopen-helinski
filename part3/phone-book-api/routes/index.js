const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");
const personRoutes = require("./personRoutes");

router.get("/info", personController.info);
router.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
router.hea

router.use("/api/persons", personRoutes);
//roouter.use("/api/users", userRoutes)

module.exports = router;
