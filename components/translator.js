const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishToAmericanTitles = require("./british-to-american-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
	reverseDict(dict) {
		return Object.assign(
			{},
			...Object.entries(dict).map(([k, v]) => ({ [v]: k }))
		);
	}

	removeMarkup(markup) {
		const regex = /<span class="highlight">|<\/span>/g;
		const translation = markup.replace(regex, "");
		return translation;
	}

	toBritishEnglish(text) {
		let dict = {
			...americanOnly,
			...americanToBritishSpelling,
		};

		let titles = americanToBritishTitles;

		const timeRegex = [/(\d{1,2}):(\d{2})/g, "$1.$2"];

		const translated = this.translate(text, dict, titles, timeRegex);

		return translated;
	}

	toAmericanEnglish(text) {
		let dict = {
			...britishOnly,
			...this.reverseDict(americanToBritishSpelling),
		};

		let titles = britishToAmericanTitles;

		const timeRegex = [/(\d{1,2})\.(\d{2})/g, "$1:$2"];

		const translated = this.translate(text, dict, titles, timeRegex);

		return translated;
	}

	translate(text, dict, titles, timeRegex) {
		const matches = [];
		const titleMatches = [];
		let markup = text;

		// Discover spelling/translation matches
		Object.keys(dict).forEach((key) => {
			let regex = new RegExp(key, "i");
			if (text.match(regex)) {
				matches.push(key);
			}
		});

		// Replace word/spelling matches
		matches.forEach((match) => {
			let regex = new RegExp(`\\b${match}\\b`, "gi");
			markup = markup.replace(
				regex,
				`<span class="highlight">${dict[match]}</span>`
			);
		});

		// Discover title matches
		Object.keys(titles).forEach((key) => {
			let escapedKey = key.replace(/[.]/g, "\\$&");
			let regex = new RegExp(`${escapedKey}(?=\\s|$)`, "i");
			if (text.match(regex)) {
				titleMatches.push(key);
			}
		});

		// Replace title matches
		titleMatches.forEach((match) => {
			let regex = new RegExp(`${match}`, "gi");
			markup = markup.replace(
				regex,
				`<span class="highlight">${titles[match]}</span>`
			);
		});

		// Replace time formats
		markup = markup.replace(
			timeRegex[0],
			`<span class="highlight">${timeRegex[1]}</span>`
		);

		// Create plain translation
		let translation = this.removeMarkup(markup);

		if (text == translation) {
			markup = "Everything looks good to me!"
		}
		
		return { text, markup, translation };
	}
}

module.exports = Translator;
