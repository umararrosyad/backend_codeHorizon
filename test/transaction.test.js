const app = require("../app");
const request = require("supertest");
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
test("get all data transaction", (done) => {
  request(app)
    .get("/api/v1/users/1/transactions/")
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
    .get("/api/v1/users/1/transactions/1")
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
    .get("/api/v1/users/1/transactions/0")
    .set("Authorization", token)
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});

let transaction;
let upload;
test("create data transaction", (done) => {
  request(app)
    .post("/api/v1/users/1/transactions")
    .set("Authorization", token)
    .send({
      addresses_id: "1",
      product_price: "20000",
      shipping_price: "10000",
      total_price: "30000",
      transaction_detail: [
        {
          product_variant_id: "1",
          price: "10000",
          qty: "1"
        },
        {
          product_variant_id: "2",
          price: "10000",
          qty: "1"
        }
      ]
    })
    .expect(201)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      transaction = "/api/v1/users/1/transactions/" + product.id;
      upload = "/api/v1/users/1/transactions/" + product.id+"/upload";
      done();
    })
    .catch(done);
});

test("incorrect input message", (done) => {
  request(app)
    .post("/api/v1/users/1/transactions")
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
    .post("/api/v1/users/1/transactions")
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Authorization header missing");
      done();
    })
    .catch(done);
});

test("upload payment photo", (done) => {
    request(app)
      .put(upload)
      .set("Authorization", token)
      .set("Content-Type", "multipart/form-data")
      .attach("image", image)
      .expect(200)
      .then((response) => {
        const {status} = response.body;
        expect(status).toBe("success");
        done();
      })
      .catch(done);
  });

test("should successfully delete data transaction", (done) => {
  request(app)
    .delete(transaction)
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});
