const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe("happy path tests", function () {

    it("home page successfully gets tickets", function () {
        return request(app).get("/tickets")
            .then(response => {
                assert.equal(response.status, 200);
            });
    });

    it("pagination is successful when given valid page", function () {
        return request(app).get("/tickets?page=2")
            .then(response => {
                assert.equal(response.status, 200);
            });
    });

    it("ticket is selected by id and renders ticket", function () {
        return request(app).get("/tickets/1")
            .then(response => {
                assert.equal(response.status, 200);
            });
    });
})

describe("sad path tests", function () {

    it("error when invalid page is entered as url query string, appropriate message rendered", function () {
        return request(app).get("/tickets?page=youCantPutTextOrNegativeNumbersHere")
            .then(response => {
                assert.equal(response.status, 400);
                expect(response.text).to.contain("You passed an invalid value for the page attribute."
                + " Invalid parameter: page must be an integer");
            });
    });

    it("error when unfound page is entered as url query string, appropriate message rendered", function () {
        return request(app).get("/tickets?page=63465234")
            .then(response => {
                assert.equal(response.status, 400);
                expect(response.text).to.contain("invalid page requested");
            });
    });

    it("error is returned when invalid ticke# is given in url path, appropriate message rendered", function () {
        return request(app).get("/tickets/youCantPutTextHere")
            .then(response => {
                assert.equal(response.status, 400);
                expect(response.text).to.contain("You passed an invalid value for the id attribute."
                + " Invalid parameter: id must be an integer");
            });
    });

    it("error is returned when unfound ticke# is given in url path, appropriate message rendered", function () {
        return request(app).get("/tickets/12784935619827")
            .then(response => {
                assert.equal(response.status, 404);
                expect(response.text).to.contain("RecordNotFound")
            });
    });
})

