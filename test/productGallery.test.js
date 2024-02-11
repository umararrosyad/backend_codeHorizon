const app = require("../app");
const request = require("supertest");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
const path = require("path");
const image = path.join(__dirname, "../public/test_image/logo.jpg");

test("get all data product gallery", (done) => {
  request(app)
    .get("/api/v1/products/1/galleries/")
    .expect(200)
    .then((response) => {
      const gallery = response.body;
      expect(Array.isArray(gallery)).toBeTruthy();
      gallery.forEach((gallery) => {
        expect(gallery).toBeTruthy();
      });
      done();
    })
    .catch(done);
});

test("get one data product type", (done) => {
  request(app)
    .get("/api/v1/products/1/galleries/1")
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
    .get("/api/v1/products/1/galleries/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let product_gallery_id;
test("create data product gallery", (done) => {
  request(app)
    .post("/api/v1/products/1/galleries/")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .attach("image", image)
    .expect(200)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      product_gallery_id = "/api/v1/products/1/galleries/" + product.id;
      done();
    })
    .catch(done);
});

test("incorrect input message", (done) => {
  request(app)
    .post("/api/v1/products/1/galleries/")
    .set("Authorization", token)
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
    .post("/api/v1/products/1/galleries/")
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
    .delete(product_gallery_id)
    .set("Authorization", token)
    .expect(200)
    .then((response) => {
      const { status } = response.body;
      expect(status).toBe("success");
      done();
    })
    .catch(done);
});
