const app = require("../app");
const request = require("supertest");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM"
test("get all data expedition product", (done) => {
  request(app)
    .get("/api/v1/products/1/expeditions/")
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

test("get one data expedition product ", (done) => {
  request(app)
    .get("/api/v1/products/1/expeditions/1")
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
    .get("/api/v1/products/1/expeditions/0")
    .expect(404)
    .then((response) => {
      const { message } = response.body;
      expect(message).toBe("Target Tidak Ditemukan");
      done();
    })
    .catch(done);
});
let url;
test("create data product", (done) => {
  request(app)
    .post("/api/v1/products/1/expeditions/")
    .set("Authorization", token)
    .send({
      expedition_id: "1"
    })
    .expect(201)
    .then((response) => {
      const product = response.body;
      expect(product).toBeTruthy();
      url = "/api/v1/products/1/expeditions/" + product.id;
      done();
    })
    .catch(done);
});

test("incorrect input message", (done)=>{
    request(app)
        .post('/api/v1/products/1/expeditions/')
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
        .post('/api/v1/products/1/expeditions/')
        .expect(400)
            .then(response=>{
                const {message} = response.body;
                expect(message).toBe("Authorization header missing")
                done()
            })
            .catch(done)
})

test("should successfully delete data expedition product", (done)=>{
    request(app)
        .delete(url)
        .set("Authorization", token)
        .expect(200)
            .then(response=>{
                const {status}= response.body;
                expect(status).toBe("success")
                done()
            })
            .catch(done)
})
