"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
	const translator = new Translator();

	app.route("/api/translate").post((req, res) => {
		const { text, locale } = req.body;

		if (!text) {
			return res.json({error: "No text to translate"})
		}

		if (!locale || text == undefined) {
			return res.json({ error: "Required field(s) missing" });
		}
		
		
		
		if (locale !== "american-to-british" && locale !== "british-to-american") {
			return res.json({ error: "Invalid value for locale field" });
		}

		let translation;

		if (locale === "american-to-british") {
			translation = translator.toBritishEnglish(text);
			return res.json({
				text: text,
				translation: translation.markup,
			});
		} else {
			translation = translator.toAmericanEnglish(text);
			return res.json({
				text: translation.text,
				translation: translation.markup,
			});
		}
	});
};

