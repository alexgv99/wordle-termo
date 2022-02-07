import wordsEn from "./dic-en.json";
import wordsPt from "./dic-pt.json";

function analyzeDic(dic) {
	const letters = {};
	const regex = /...../i;
	dic
		.filter((word) => regex.test(word))
		.forEach((word) => {
			word.split("").forEach((letter) => {
				if (letters[letter]) {
					letters[letter]++;
				} else {
					letters[letter] = 1;
				}
			});
		});
	return letters;
}

function analyzeWords(dic, letters) {
	const ranking = {};
	dic.forEach((word) => {
		let score = 0;
		let lastLetter = "";
		word
			.split("")
			.sort()
			.forEach((letter) => {
				if (lastLetter !== letter) {
					score += letters[letter] || 0;
				}
				lastLetter = letter;
			});
		ranking[word] = { word, score };
	});

	const words = Object.keys(ranking).sort(
		(w1, w2) => ranking[w2].score - ranking[w1].score
	);

	const output = words.reduce((acc, word) => [...acc, ranking[word]], []);

	return output.filter((word) => word.score > 0);
}

const letters = analyzeDic(wordsEn);
const ranking = analyzeWords(wordsEn, letters);

console.log(JSON.stringify(ranking, null, 2));
