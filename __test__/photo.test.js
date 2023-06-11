const request = require('supertest');
const app = require('../app');
const { Photo, User } = require('../models');
const { generateToken } = require("../helpers/jwt");

const photoData = {
    title: "photo1",
    caption: "photo1",
    poster_image_url: "photo1.com"
}

const photoData2 = {
    title: "photo2",
    caption: "photo2",
    poster_image_url: "photo2.com"
}

const photoWrong = {
    title: "photo2",
    caption: "photo2",
    poster_image_url: "photo2"
}

const userData = {
    full_name: "admin",
    email: "admin@gmail.com",
    username: "admin",
    password: "123456",
    profile_image_url: "admin.com",
    age: 21,
    phone_number: "82112324",
}

describe("POST /photos", () => {
    let access_token = "";
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            userId = user.id;
            access_token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} });
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    })

    // Success Testing Create Photo
    it("should return 201 status code", (done) => {
        request(app)
            .post("/photos")
            .set("token", access_token)
            .send(photoData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("id");
                    expect(res.body).toHaveProperty("poster_image_url");
                    expect(res.body).toHaveProperty("title");
                    expect(res.body).toHaveProperty("caption");
                    expect(res.body).toHaveProperty("UserId");
                    done();
                }
            })
    })

    // Fail Testing Create Photo
    it("should return 401 status code", (done) => {
        request(app)
            .post("/photos")
            .set("token", access_token)
            .send(photoWrong)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("errors");
                    done();
                }
            })
    })

    // Fail Testing Create Photo (No Token)
    it("should return 401 status code", (done) => {
        request(app)
            .post("/photos")
            .send(photoData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    expect(res.body.devMassage).toHaveProperty("name");
                    expect(res.body.devMassage).toHaveProperty("message");
                    done();
                }
            })
    })
})

describe("GET /photos", () => {
    let access_token = "";
    let userId = 0;
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            userId = user.id;
            const photoData = {
                title: "coba",
                caption: "coba",
                poster_image_url: "coba.com",
                UserId: userId,
            };
            await Photo.create(photoData);

            userId = user.id;
            access_token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} });
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    })

    // Success Testing Get All Photos have been created
    it("should return 200 status code", (done) => {
        request(app)
            .get("/photos")
            .set("token", access_token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("photos");
                    done();
                }
            })
    })

    // Fail Testing Get All Photos (No Token)
    it("should return 401 status code", (done) => {
        request(app)
            .get("/photos")
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    expect(res.body.devMassage).toHaveProperty("name");
                    expect(res.body.devMassage).toHaveProperty("message");
                    done();
                }
            })
    })
})

describe("PUT /photos/:id", () => {
    let access_token = "";
    let userId = 0;
    let photoId = 0;
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            userId = user.id;
            const photoData = {
                title: "coba",
                caption: "coba",
                poster_image_url: "coba.com",
                UserId: userId,
            };
            const photo = await Photo.create(photoData);
            photoId = photo.id;

            userId = user.id;
            access_token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} });
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    })

    // Success Testing Update Photo
    it("should return 200 status code", (done) => {
        request(app)
            .put('/photos/' + photoId)
            .set("token", access_token)
            .send(photoData2)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("Photo");
                    expect(res.body.Photo).toHaveProperty("id");
                    expect(res.body.Photo).toHaveProperty("title");
                    expect(res.body.Photo).toHaveProperty("caption");
                    expect(res.body.Photo).toHaveProperty("poster_image_url");
                    done();
                }
            })
    })

    // Fail Testing Update Photo (No Token)
    it("should return 401 status code", (done) => {
        request(app)
            .put('/photos/' + photoId)
            .send(photoData2)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    expect(res.body.devMassage).toHaveProperty("name");
                    expect(res.body.devMassage).toHaveProperty("message");
                    done();
                }
            })
    })

    // Fail Testing Update Photo (Wrong Data)
    it("should return 401 status code", (done) => {
        request(app)
            .put('/photos/' + photoId)
            .set("token", access_token)
            .send(photoWrong)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("errors");
                    done();
                }
            })
    })

    // Fail Testing Update Photo (No Photo)
    it("should return 404 status code", (done) => {
        request(app)
            .put('/photos/' + 0)
            .set("token", access_token)
            .send(photoData2)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(404);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })
})

describe("DELETE /photos/:id", () => {
    let access_token = "";
    let userId = 0;
    let photoId = 0;
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            userId = user.id;
            const photoData = {
                title: "coba",
                caption: "coba",
                poster_image_url: "coba.com",
                UserId: userId,
            };
            const photo = await Photo.create(photoData);
            photoId = photo.id;

            userId = user.id;
            access_token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} });
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    })

    // Success Testing Delete Photo
    it("should return 200 status code", (done) => {
        request(app)
            .delete('/photos/' + photoId)
            .set("token", access_token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("message");
                    done();
                }
            })
    })

    // Fail Testing Delete Photo (No Token)
    it("should return 401 status code", (done) => {
        request(app)
            .delete('/photos/' + photoId)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    expect(res.body.devMassage).toHaveProperty("name");
                    expect(res.body.devMassage).toHaveProperty("message");
                    done();
                }
            })
    })

    // Fail Testing Delete Photo (No Photo)
    it("should return 404 status code", (done) => {
        request(app)
            .delete('/photos/' + 0)
            .set("token", access_token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(404);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })
})