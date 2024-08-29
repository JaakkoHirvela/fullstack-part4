const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const logger = require("../src/utils/logger");
const bcrypt = require("bcrypt");

const api = supertest(app);
const testedRoute = "/api/login";

const password = "password";

const testUser = {
  userName: "joe",
  name: "Joseph",
  passwordHash: bcrypt.hashSync(password, 10),
};

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany([testUser]);
});

describe(`${testedRoute}`, () => {
  describe(`POST ${testedRoute}`, () => {
    test("valid user can log in", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ userName: testUser.userName, password: password })
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.userName, testUser.userName);
    });
    test("invalid username cannot log in", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ userName: "invalid", password: password })
        .set("Accept", "application/json")
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "invalid username");
    });
    test("invalid password cannot log in", async () => {
      const response = await api
        .post(`${testedRoute}`)
        .send({ userName: testUser.userName, password: "invalid" })
        .set("Accept", "application/json")
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.error, "invalid password");
    });
  });
});
