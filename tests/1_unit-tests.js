const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
	test('Translate "Mangoes are my favorite fruit." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("Mangoes are my favorite fruit.").translation,
			"Mangoes are my favourite fruit."
		);
		done();
	});

	test('Translate "I ate yogurt for breakfast." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("I ate yogurt for breakfast.").translation,
			"I ate yoghurt for breakfast."
		);
		done();
	});

	test('Translate "We had a party at my friend\'s condo." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("We had a party at my friend's condo.")
				.translation,
			"We had a party at my friend's flat."
		);
		done();
	});

	test('Translate "Can you toss this in the trashcan for me?" to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("Can you toss this in the trashcan for me?")
				.translation,
			"Can you toss this in the bin for me?"
		);
		done();
	});

	test('Translate "The parking lot was full." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("The parking lot was full.").translation,
			"The car park was full."
		);
		done();
	});

	test('Translate "Like a high tech Rube Goldberg machine." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("Like a high tech Rube Goldberg machine.")
				.translation,
			"Like a high tech Heath Robinson device."
		);
		done();
	});

	test('Translate "To play hooky means to skip class or work." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("To play hooky means to skip class or work.")
				.translation,
			"To bunk off means to skip class or work."
		);
		done();
	});

	test('Translate "No Mr. Bond, I expect you to die." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("No Mr. Bond, I expect you to die.")
				.translation,
			"No Mr Bond, I expect you to die."
		);
		done();
	});

    test('Translate "Dr. Grosh will see you now." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("Dr. Grosh will see you now.")
				.translation,
			"Dr Grosh will see you now."
		);
		done();
	});

    test('Translate "Lunch is at 12:15 today." to British English', function (done) {
		assert.equal(
			translator.toBritishEnglish("Lunch is at 12:15 today.")
				.translation,
			"Lunch is at 12.15 today."
		);
		done();
	});

    test('We watched the footie match for a while." to American English', function (done) {
		assert.equal(
			translator.toAmericanEnglish("We watched the footie match for a while.")
				.translation,
			"We watched the soccer match for a while."
		);
		done();
	});

    test('Translate "Paracetamol takes up to an hour to work." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("Paracetamol takes up to an hour to work.").translation,
            "Tylenol takes up to an hour to work."
        );
        done();
    });
    
    test('Translate "First, caramelise the onions." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("First, caramelise the onions.").translation,
            "First, caramelize the onions."
        );
        done();
    });
    
    test('Translate "I spent the bank holiday at the funfair." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("I spent the bank holiday at the funfair.").translation,
            "I spent the public holiday at the carnival."
        );
        done();
    });
    
    test('Translate "I had a bicky then went to the chippy." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("I had a bicky then went to the chippy.").translation,
            "I had a cookie then went to the fish-and-chip shop."
        );
        done();
    });
    
    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("I've just got bits and bobs in my bum bag.").translation,
            "I've just got odds and ends in my fanny pack."
        );
        done();
    });
    
    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("The car boot sale at Boxted Airfield was called off.").translation,
            "The swap meet at Boxted Airfield was called off."
        );
        done();
    });
    
    test('Translate "Have you met Mrs Kalyani?" to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("Have you met Mrs Kalyani?").translation,
            "Have you met Mrs. Kalyani?"
        );
        done();
    });

	test('Translate "Prof Joyner of King\'s College, London." to American English', function (done) {
        assert.equal(
            translator.toAmericanEnglish("Prof Joyner of King's College, London.").translation,
            "Prof. Joyner of King's College, London."
        );
        done();
    });

	test('Translate "Tea time is usually around 4 or 4.30.', function (done) {
        assert.equal(
            translator.toAmericanEnglish("Tea time is usually around 4 or 4.30.").translation,
            "Tea time is usually around 4 or 4:30."
        );
        done();
    });

	test('Highlight translation in "Mangoes are my favorite fruit.', function (done) {
        assert.equal(
            translator.toBritishEnglish("Mangoes are my favorite fruit.").markup,
            "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
        );
        done();
    });

	test('Highlight translation in "I ate yogurt for breakfast."', function (done) {
        assert.equal(
            translator.toBritishEnglish("I ate yogurt for breakfast.").markup,
            "I ate <span class=\"highlight\">yoghurt</span> for breakfast."
        );
        done();
    });

	test('Highlight translation in "We watched the footie match for a while."', function (done) {
        assert.equal(
            translator.toAmericanEnglish("We watched the footie match for a while.").markup,
            "We watched the <span class=\"highlight\">soccer</span> match for a while."
        );
        done();
    });

	test('Highlight translation in "Paracetamol takes up to an hour to work."', function (done) {
        assert.equal(
            translator.toAmericanEnglish("Paracetamol takes up to an hour to work.").markup,
            "<span class=\"highlight\">Tylenol</span> takes up to an hour to work."
        );
        done();
    });
    
});
