import wordsEn from "./dic-en.json";
import wordsPt from "./dic-pt.json";

const languages = ["pt", "en"];

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

function analyzeWords(dic) {
	const letters = analyzeDic(dic);
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

const args = process.argv;

if (args.length !== 3) {
	console.log("Usage: yarn best", languages);
} else {
	const lang = args[2];
	if (!languages.includes(lang)) {
		console.log("Language not implemented yet. Valid languages: ", languages);
	} else {
		const dic = lang === "pt" ? wordsPt : wordsEn;
		const ranking = analyzeWords(dic);
		console.log(JSON.stringify(ranking.slice(0, 10), null, 2));
	}
}
