const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const logger = require("../src/utils/logger");

const api = supertest(app);
const testedRoute = "/api/users";

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    userName: "initialJoe",
    name: "Joe Initial",
    passwordHash: "password",
  },
];

const duplicateJoe = {
  username: "initialJoe",
  name: "Joe Initial",
  password: "password",
};

const testUser = {
  username: "johndoe",
  name: "John Doe",
  password: "password",
};

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

describe(`${testedRoute}`, () => {
  describe(`POST ${testedRoute}`, () => {
    test("valid user can be created", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send(testUser)
        .set("Accept", "application/json")
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.userName, testUser.username);

      // Check that the user was added.
      const users = await User.find({});
      assert.strictEqual(users.length, initialUsers.length + 1);
    });

    test("user with duplicate username cannot be created", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send(duplicateJoe)
        .set("Accept", "application/json")
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "username must be unique");

      // Check that the user was not added.
      const users = await User.find({});
      assert.strictEqual(users.length, initialUsers.length);
    });

    test("user with no password cannot be created", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ username: "johndoe", name: "John Doe" })
        .set("Accept", "application/json")
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "password is required");

      // Check that the user was not added.
      const users = await User.find({});
      assert.strictEqual(users.length, initialUsers.length);
    });

    test("user with no username cannot be created", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ name: "John Doe", password: "password" })
        .set("Accept", "application/json")
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "username is required");

      // Check that the user was not added.
      const users = await User.find({});
      assert.strictEqual(users.length, initialUsers.length);
    });

    test("user with password less than 3 characters cannot be created", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ username: "johndoe", name: "John Doe", password: "12" })
        .set("Accept", "application/json")
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "password must be at least 3 characters long");

      // Check that the user was not added.
      const users = await User.find({});
      assert.strictEqual(users.length, initialUsers.length);
    });
  });

  describe(`GET ${testedRoute}`, () => {
    test(`users are returned as json and there's ${initialUsers.length} users`, async () => {
      const response = await api
        .get(`${testedRoute}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, initialUsers.length);
    });
  });
});

after(async () => {
  mongoose.connection.close();
});
