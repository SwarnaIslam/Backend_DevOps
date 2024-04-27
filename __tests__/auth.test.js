const request = require("supertest");
const { server, app } = require("../app"); // Assuming your Express app is exported from app.js
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

describe("Auth endpoints", () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user before each test
    testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10), // Hash the password before storing
    });
  });

  afterEach(async () => {
    // Delete the test user after each test
    await User.deleteMany();
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123", // Please don't use plain passwords in production!
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "ok");

      // Additional assertions to ensure the user is created in the database
      const newUser = await User.findOne({ email: "newuser@example.com" });
      expect(newUser).toBeTruthy();
      expect(newUser.name).toBe("New User");
    });

    it("should return error for duplicate email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123", // Please don't use plain passwords in production!
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "error");
      expect(res.body).toHaveProperty("error", "Duplicate email");
    });
  });

  describe("POST /login", () => {
    it("should log in an existing user with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "ok");
      expect(res.body.user).toBeTruthy();

      // Additional assertions to verify the returned JWT token
      const decoded = jwt.verify(res.body.user, process.env.API_SECRET_KEY);
      expect(decoded).toHaveProperty("email", "test@example.com");
    });

    it("should return error for invalid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "error");
      expect(res.body).toHaveProperty("user", false);
    });
  });
});
