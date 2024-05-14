import request from "supertest";
import { initializeApp, MONGO_URI } from "../../app.js";
import mongoose from "mongoose";

const app = initializeApp();

const userDetails = {
   email: "test99@gmail.com",
   username: "test99",
   password: "test1234",
};

let userId = null;

beforeEach(async () => {
   await mongoose.connect(MONGO_URI);
});

afterEach(async () => {
   await mongoose.connection.close();
});

describe("POST /auth/register", () => {
   it("should fail if email exists", async () => {
      const response = await request(app)
         .post("/auth/register")
         .send(userDetails)
         .set("Accept", "application/json");

      userId = response.body.id;

      expect(response.statusCode).toBe(400);
   });
});

describe("GET /auth/user/:id", () => {
   it("should retrieve user details", async () => {
      const response = await request(app)
         .get(`/auth/user/${userId}`)
         .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
   });
});

describe("DELETE /auth/user/:id", () => {
   it("should delete existing user with id", async () => {
      const response = await request(app)
         .delete(`/auth/user/${userId}`)
         .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
   });
});

describe("POST /auth/register", () => {
   it("should create new user", async () => {
      const response = await request(app)
         .post("/auth/register")
         .send(userDetails)
         .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
   });
});
