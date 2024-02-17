const app = require("../app");
const request = require("supertest");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");

test("get all data expedition", (done) => {
  request(app)
    .get("/api/v1/expeditions/")
    .expect(200)
    .then((response) => {
      const product = response.body;
      expect(Array.isArray(product.data)).toBeTruthy();
      product.data.forEach((product) => {
        expect(product).toBeTruthy();
      });
      done();
    })
    .catch(done);
});

test("get one data expedition", (done) => {
  request(app)
    .get("/api/v1/expeditions/1")
    .expect(200)
    .then((response) => {
      const todo = response.body;
      expect(todo.data).toBeTruthy();
      done();
    })
    .catch(done);
});

test("message data not found", (done) => {
  request(app)
    .get("/api/v1/expeditions/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let expedition;
test("create data product expedition", (done) => {
  request(app)
    .post("/api/v1/expeditions/")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("expedition_name", "name")
    .attach("image", image)
    .expect(201)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      expedition = "/api/v1/expeditions/" + product.id;
      done();
    })
    .catch(done);
});

test("edit data product expedition", (done) => {
    request(app)
      .put(expedition)
      .set("Authorization", token)
      .set("Content-Type", "multipart/form-data")
      .field("expedition_name", "name")
      .attach("image", image)
      .expect(200)
      .then((response) => {
        const {status} = response.body;
        expect(status).toBe("success");
        done();
      })
      .catch(done);
  });

test("incorrect input message", (done) => {
  request(app)
    .post("/api/v1/expeditions/")
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
    .post("/api/v1/expeditions/")
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
    .post("/api/v1/expeditions/")
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
    .delete(expedition)
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});
