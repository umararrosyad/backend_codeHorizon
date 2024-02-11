// const app = require("../app");
// const request = require("supertest");
// const token =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NDgyNTc5fQ.ysGhtGlGnNWotkUahNz-vOSuOy20gSlXW4-0rzszimM";
// const path = require("path");
// const image = path.join(__dirname, "../public/test_image/logo.jpg");

// test("get all data user", (done) => {
//   request(app)
//     .get("/users/")
//     .expect(200)
//     .then((response) => {
//       const data = response.body;
//       expect(Array.isArray(data)).toBeTruthy();
//       data.forEach((data) => {
//         expect(data).toBeTruthy();
//       });
//       done();
//     })
//     .catch(done);
// });

// test("get one data user", (done) => {
//   request(app)
//     .get("/users/1")
//     .expect(200)
//     .then((response) => {
//       const data = response.body;
//       expect(data).toBeTruthy();
//       done();
//     })
//     .catch(done);
// });

// test("message data not found", (done) => {
//   request(app)
//     .get("/users/0")
//     .expect(404)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("Target Tidak Ditemukan");
//       done();
//     })
//     .catch(done);
// });
// let users;
// test("create data user", (done) => {
//   request(app)
//     .post("/users/")
//     .set("Authorization", token)
//     .set("Content-Type", "multipart/form-data")
//     .field("name", "name")
//     .attach("image", image)
//     .expect(201)
//     .then((response) => {
//       const data = response.body;
//       expect(data).toBeTruthy();
//       data = "/users/" + data.id;
//       done();
//     })
//     .catch(done);
// });

// test("edit data user", (done) => {
//   request(app)
//     .put(users)
//     .set("Authorization", token)
//     .set("Content-Type", "multipart/form-data")
//     .field("name", "name")
//     .attach("image", image)
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
//     .post("/users/")
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
//     .post("/users/")
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
//     .post("/users/")
//     .expect(400)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("Authorization header missing");
//       done();
//     })
//     .catch(done);
// });

// test("should successfully delete data user", (done) => {
//   request(app)
//     .delete(users)
//     .set("Authorization", token)
//     .expect(200)
//     .then((response) => {
//       const { status } = response.body;
//       expect(status).toBe("success");
//       done();
//     })
//     .catch(done);
// });

// // Unit test for user login
// test("user login", (done) => {
//   request(app)
//     .post("/users/login")
//     .send({ email: "test@example.com", password: "password123" })
//     .expect(200)
//     .then((response) => {
//       const { token } = response.body;
//       expect(token).toBeTruthy();
//       done();
//     })
//     .catch(done);
// });

// // Unit test for user registration
// test("user registration", (done) => {
//   request(app)
//     .post("/users/register")
//     .send({ email: "test@example.com", password: "password123", name: "Test User" })
//     .expect(201)
//     .then((response) => {
//       const { message } = response.body;
//       expect(message).toBe("User registered successfully");
//       done();
//     })
//     .catch(done);
// });
