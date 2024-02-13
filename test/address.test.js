const app = require("../app");
const request = require("supertest");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
const path = require("path");

let address;
test("create data address", (done) => {
  request(app)
    .post("/users/1/address")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("name", "name")
    .expect(201)
    .then((response) => {
      const data = response.body;
      expect(data).toBeTruthy();
      data = "/users/1/address" + data.id;
      done();
    })
    .catch(done);
});

// test("edit data address", (done) => {
//   request(app)
//     .put(address)
//     .set("Authorization", token)
//     .set("Content-Type", "multipart/form-data")
//     .field("name", "name")
//     .expect(200)
//     .then((response) => {
//       const { status } = response.body;
//       expect(status).toBe("success");
//       done();
//     })
//     .catch(done);
// });

// test("incorrect input message", (done) => {
//   request(app)
//     .post("/users/1/address")
//     .set("Authorization", token)
//     .expect(400)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("Parameter Tidak Boleh Kosong");
//       done();
//     })
//     .catch(done);
// });

// test("incorrect input file message", (done) => {
//   request(app)
//     .post("/users/1/address")
//     .set("Authorization", token)
//     .field("name", "name")
//     .expect(400)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("Tidak Ada File Yang Dikirimkan");
//       done();
//     })
//     .catch(done);
// });

// test("missing header", (done) => {
//   request(app)
//     .post("/users/1/address")
//     .expect(400)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("Authorization header missing");
//       done();
//     })
//     .catch(done);
// });

// test("should successfully delete data address", (done) => {
//   request(app)
//     .delete(address)
//     .set("Authorization", token)
//     .expect(200)
//     .then((response) => {
//       const { status } = response.body;
//       expect(status).toBe("success");
//       done();
//     })
//     .catch(done);
// });


