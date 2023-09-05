const express = require("express");
const routes = require("./routes/index");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const morgan = require("./middlewares/customMorgan");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(morgan);

app.use("/", routes);

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
