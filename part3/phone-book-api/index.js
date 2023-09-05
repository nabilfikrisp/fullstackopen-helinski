const person_controller = require("./controllers/personController");
const PORT = 3001;

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", person_controller.index);

app.get("/api/persons/:id", person_controller.show);

app.get("/api/info", person_controller.info);

app.delete("/api/persons/:id", person_controller.delete);

app.post("/api/persons", person_controller.create);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
