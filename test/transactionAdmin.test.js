const app = require("../app");
const request = require("supertest");
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
test("get all data transaction", (done) => {
  request(app)
    .get("/transaction/")
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const product = response.body;
      expect(Array.isArray(product)).toBeTruthy();
      product.forEach((product) => {
        expect(product).toBeTruthy();
      });
      done();
    })
    .catch(done);
});

test("get one data transaction", (done) => {
  request(app)
    .get("/transaction/1")
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const todo = response.body;
      expect(todo).toBeTruthy();
      done();
    })
    .catch(done);
});

test("message data not found", (done) => {
  request(app)
    .get("/transaction/0")
    .set("Authorization", token)
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});


test("incorrect input message", (done) => {
  request(app)
    .put("/transaction/1")
    .set("Authorization", token)
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Parameter Tidak Boleh Kosong");
      done();
    })
    .catch(done);
});

test("missing header", (done) => {
  request(app)
    .get("/transaction/")
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Authorization header missing");
      done();
    })
    .catch(done);
});

test("update transaction status", (done) => {
    request(app)
      .put("/transaction/1")
      .set("Authorization", token)
      .send({
        transaction_status : "dibayar"
      })
      .expect(200)
      .then((response) => {
        const {status} = response.body;
        expect(status).toBe("success");
        done();
      })
      .catch(done);
  });

