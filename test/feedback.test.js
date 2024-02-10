const app = require("../app");
const request = require("supertest");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");

test("get all data product feedback", (done) => {
  request(app)
    .get("/product/1/feedback/")
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

test("get one data product feedback", (done) => {
  request(app)
    .get("/product/1/feedback/1")
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
    .get("/product/1/feedback/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let url;
test("create data product type", (done) => {
  request(app)
    .post("/product/1/feedback/")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("user_id", "1")
    .field("product_variant_id", "1")
    .field("rating", "5")
    .field("feedback", "name")
    .attach("image", image)
    .expect(201)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      url = "/product/1/feedback/" + product.id;
      done();
    })
    .catch(done);
});

test("edit data product feedback", (done) => {
    request(app)
      .put("/product/1/feedback/1")
      .set("Authorization", token)
      .send({
            "rating" : "5",
            "feedback" : "bagus" 
        })

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
    .post("/product/1/feedback/")
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
    .post("/product/1/feedback/")
    .expect(400)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Authorization header missing");
      done();
    })
    .catch(done);
});

test("should successfully delete data product", (done) => {
  request(app)
    .delete(url)
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});
