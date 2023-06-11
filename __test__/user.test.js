const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const { generateToken } = require("../helpers/jwt");

const userData = {
    full_name: "admin",
    email: "admin@gmail.com",
    username: "admin",
    password: "123456",
    profile_image_url: "admin.com",
    age: 21,
    phone_number: "82112324",
}
const userData2 = {
    full_name: "admin2",
    email: "admin2@gmail.com",
    username: "admin2",
    password: "123456",
    profile_image_url: "admin.com",
    age: 21,
    phone_number: "82112324",
}

const userWrong = {
    full_name: "admin2",
    email: "admin2@gmail",
    username: "admin4",
    password: "123456",
    profile_image_url: "admin2.com",
    age: 21,
    phone_number: "82112324",
}

describe("POST /users", () => {
    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    });

    // Success Testing Register
    it("should return 201 status code", (done) => {
        request(app)
            .post("/users/register")
            .send(userData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body.user).toHaveProperty("email");
                    expect(res.body.user).toHaveProperty("full_name");
                    expect(res.body.user).toHaveProperty("username");
                    expect(res.body.user).toHaveProperty("profile_image_url");
                    expect(res.body.user).toHaveProperty("age");
                    expect(res.body.user).toHaveProperty("phone_number");
                    done();
                }
            });
    })

    // Fail Testing Register
    it("should return 401 status code", (done) => {
        request(app)
            .post("/users/register")
            .send({
                userWrong
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("message");
                    done();
                }
            })
    })

    // Success Testing Login
    it("should return 200 status code", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: "admin@gmail.com",
                password: "123456"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("token");
                    expect(typeof res.body.token).toEqual("string");
                    done();
                }
            })
    })

    // Fail Testing Login
    it("should return 401 status code", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: "admin2@mail.com",
                password: "1234561"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })

});

describe("PUT /users/:id", () => {
    let id
    let token
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            id = user.id;
            token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    });
    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
        } catch (err) {
            console.log(err);
        }
    });

    // Success Testing Update
    it("should return 200 status code", (done) => {
        request(app)
            .put("/users/" + id)
            .set("token", token)
            .send(userData2)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("email");
                    expect(res.body).toHaveProperty("full_name");
                    expect(res.body).toHaveProperty("username");
                    expect(res.body).toHaveProperty("profile_image_url");
                    expect(res.body).toHaveProperty("age");
                    expect(res.body).toHaveProperty("phone_number");
                    done();
                }
            })
    })

    // Fail Testing Update without token
    it("should return 401 status code", (done) => {
        request(app)
            .put("/users/" + id)
            .send(userData2)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })

    // Fail Testing Update with wrong data
    it("should return 401 status code", (done) => {
        request(app)
            .put("/users/" + id)
            .set("token", token)
            .send({
                userWrong
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })

})

describe("DELETE /users/:id", () => {
    let id
    let token
    beforeAll(async () => {
        try {
            const user = await User.create(userData);
            id = user.id;
            token = generateToken({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
        }
    });

    // Success Testing Delete
    it("should return 200 status code", (done) => {
        request(app)
            .delete("/users/" + id)
            .set("token", token)
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

    // Fail Testing Delete without token
    it("should return 401 status code", (done) => {
        request(app)
            .delete("/users/" + id)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })

    // Fail Testing Delete with wrong id
    it("should return 401 status code", (done) => {
        request(app)
            .delete("/users/" + 100)
            .set("token", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("name");
                    expect(res.body).toHaveProperty("devMassage");
                    done();
                }
            })
    })
})