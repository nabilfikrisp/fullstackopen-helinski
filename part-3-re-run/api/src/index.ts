import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { IPerson, Person } from "./models/person.model.js";
import { connectToDatabase } from "./mongo.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

await connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());

morgan.token("body", (req) => {
  const r = req as express.Request;
  return r.body ? JSON.stringify(r.body) : "";
});

app.use(morgan(":method :url :status :response-time ms :body"));

// Client static files
app.use(express.static("client-dist"));

app.get(
  "/api/info",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const date = new Date();
      const personCount = await Person.countDocuments().exec();
      response.send(
        `<p>Phonebook has info for ${personCount} people</p><p>${date}</p>`
      );
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/persons",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const persons = await Person.find({}).exec();
      response.json(persons);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/persons/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;

    try {
      const person = await Person.findById(id).exec();

      if (!person) {
        return response.status(404).json({ error: "person not found" });
      }

      return response.json(person);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/persons/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;

    try {
      const person = await Person.findByIdAndDelete(id).exec();

      if (!person) {
        return response.status(404).json({ error: "person not found" });
      }

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/persons",
  async (request: Request, response: Response, next: NextFunction) => {
    const body: IPerson = request.body;

    try {
      // Check for existing person
      const existingPerson = await Person.findOne({
        name: body.name,
      }).exec();

      if (existingPerson) {
        return response.status(400).json({
          error: "name must be unique",
        });
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      });

      const savedPerson = await person.save();
      response.status(201).json(savedPerson);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/persons/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const body: IPerson = request.body;

    try {
      const existingPerson = await Person.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: "query",
      });

      if (!existingPerson) {
        return response.status(404).json({ error: "person not found" });
      }
      return response.json(body);
    } catch (error) {
      next(error);
    }
  }
);

// 404 handler for unknown endpoints
app.use((request: express.Request, response: express.Response) => {
  response.status(404).json({ error: "Unknown endpoint" });
});

// Error handling middleware
app.use(
  (error: Error, request: express.Request, response: express.Response) => {
    if (error instanceof mongoose.Error.ValidationError) {
      return response.status(400).json({ error: error.message });
    }

    if (error instanceof mongoose.Error.CastError) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    console.error("Unhandled error:", error);
    response.status(500).json({ error: "Internal server error" });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
