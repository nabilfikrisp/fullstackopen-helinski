const express = require("express");
const routes = require("./routes/index");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const morgan = require("./middlewares/customMorgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan);
app.use(cors());
app.use(express.static("dist"));

app.use("/", routes);

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
