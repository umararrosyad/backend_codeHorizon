const app = require("../app");
const request = require("supertest");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
test("get all data product variant", (done) => {
  request(app)
    .get("/api/v1/products/1/variants/")
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

test("get one data product variant", (done) => {
  request(app)
    .get("/api/v1/products/1/variants/1")
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
    .get("/api/v1/products/1/variants/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let product_variant_id;
test("create data product", (done) => {
  request(app)
    .post("/api/v1/products/1/variants/")
    .set("Authorization", token)
    .send({
      product_type_id: "2",
      product_size_id: "2",
      weight: "2333",
      price: "1",
      stock : "1"
    })
    .expect(201)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      product_variant_id = "/api/v1/products/1/variants/" + product.id;
      done();
    })
    .catch(done);
});

test("edit data product", (done) => {
    request(app)
      .put(product_variant_id)
      .set("Authorization", token)
      .send({
        weight: "2333",
        price: "1",
        stock : "1"
      })
      .expect(200)
      .then((response) => {
        const {status} = response.body;
        expect(status).toBe("success");
        done();
      })
      .catch(done);
  });

test("incorrect input message", (done)=>{
    request(app)
        .post('/api/v1/products/1/variants/')
        .set("Authorization", token)
        .expect(400)
            .then(response=>{
                const {message} = response.body;
                expect(message).toBe("Parameter Tidak Boleh Kosong")
                done()
            })
            .catch(done)
})

test("missing header", (done)=>{
    request(app)
        .post('/api/v1/products/1/variants/')
        .expect(400)
            .then(response=>{
                const {message} = response.body;
                expect(message).toBe("Authorization header missing")
                done()
            })
            .catch(done)
})


test("should successfully delete data product variant", (done)=>{
    request(app)
        .delete(product_variant_id)
        .set("Authorization", token)
        .expect(200)
            .then(response=>{
                const {status} = response.body;
                expect(status).toBe("success")
                done()
            })
            .catch(done)
})
