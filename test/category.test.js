const app = require("../app");
const request = require("supertest");
const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");

test("get all data category", (done) => {
  request(app)
    .get("/categories/")
    .expect(200)
    .then((response) => {
      const category = response.body;
      expect(Array.isArray(category)).toBeTruthy();
      category.forEach((category) => {
        expect(category).toBeTruthy();
      });
      done();
    })
    .catch(done);
});

test("get one data category", (done) => {
  request(app)
    .get("/categories/1")
    .expect(200)
    .then((response) => {
      const category = response.body;
      expect(category).toBeTruthy();
      done();
    })
    .catch(done);
});

test("message data not found", (done) => {
  request(app)
    .get("/categories/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let categories;
test("create data product expedition", (done) => {
  request(app)
    .post("/categories/")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("category_name", "name")
    .attach("image", image)
    .expect(201)
    .then((response) => {
      const category = response.body;
      expect(category).toBeTruthy();
      categories = "/expedition/" + category.id;
      done();
    })
    .catch(done);
});

test("edit data product expedition", (done) => {
  request(app)
    .put(categories)
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("category_name", "name")
    .attach("image", image)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});

test("incorrect input message", (done) => {
  request(app)
    .post("/categories/")
    .set("Authorization", token)
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Parameter Tidak Boleh Kosong");
      done();
    })
    .catch(done);
});

test("incorrect input file message", (done) => {
  request(app)
    .post("/categories/")
    .set("Authorization", token)
    .field("expedition_name", "name")
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Tidak Ada File Yang Dikirimkan");
      done();
    })
    .catch(done);
});

test("missing header", (done) => {
  request(app)
    .post("/categories/")
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Authorization header missing");
      done();
    })
    .catch(done);
});

test("should successfully delete data expedition", (done) => {
  request(app)
    .delete(categories)
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});
