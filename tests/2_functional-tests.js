const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test("Translation with text and locale fields: POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "No Mr. Bond, I expect you to die.", locale: "american-to-british" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(
                    res.body.text,
					"No Mr. Bond, I expect you to die.",
					"Response should return text"
				);
                assert.equal(
                    res.body.translation,
					'No <span class="highlight">Mr</span> Bond, I expect you to die.',
					"Response should return correctly highlighted translation"
				);
				done();
			});
	});
    test("Translation with text and invalid locale fields: POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "No Mr. Bond, I expect you to die.", locale: "INVALID-LOCALE" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
                assert.equal(
                    res.body.error,
					'Invalid value for locale field',
					"Response should return error message correctly"
				);
				done();
			});
	});
    test("Translation with missing text field: POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ locale: "american-to-british" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
                assert.equal(
                    res.body.error,
					'Required field(s) missing',
					"Response should return error message correctly"
				);
				done();
			});
	});
    test("Translation with missing locale field: POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "No Mr. Bond, I expect you to die.", locale: "" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
                assert.equal(
                    res.body.error,
					'Required field(s) missing',
					"Response should return error message correctly"
				);
				done();
			});
	});
    test("Translation with empty text : POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "", locale: "american-to-british" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
                assert.equal(
                    res.body.error,
					'No text to translate',
					"Response should return error message correctly"
				);
				done();
			});
	});
    test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "This doesn't require change.", locale: "american-to-british" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
                assert.equal(
                    res.body.text,
					"This doesn't require change.",
					"Response should return message correctly"
				);
                assert.equal(
                    res.body.translation,
					"Everything looks good to me!",
					"Response should return message correctly"
				);
				done();
			});
	});
});
