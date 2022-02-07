import wordsEn from "./dic-en.json";
import wordsPt from "./dic-pt.json";

const languages = ["pt", "en"];

const lettersIn = []; // letters to include with minimum quantity; ex: ["t1", "o2"]
const lettersOut = "".split(""); // letters to exclude; ex: "bemf"
const regex = /...../i; // put the letters you know the spot; ex: /...o./i
const notRegex = []; // positions where letters are not in the right spot; ex: [/...r./i, /r..../i, /....l/i, /.e.../i]

function getWords(lang) {
	let wordsOutput = [];
	(lang === "pt" ? wordsPt : wordsEn)
		.filter((word) => regex.test(word))
		.filter((word) => !notRegex.some((re) => re.test(word)))
		.filter((word) => {
			return lettersIn.reduce((acc, ltr) => {
				const [letter, min] = ltr.split("");
				const re = new RegExp(letter, "g");
				const qtd = (word.match(re) || []).length;
				return acc && qtd >= min;
			}, true);
		})
		.filter((word) =>
			lettersOut.reduce(
				(acc, letter) =>
					acc && word.toLowerCase().indexOf(letter.toLowerCase()) === -1,
				true
			)
		)
		.forEach((word) => {
			wordsOutput.push(word);
		});
	return wordsOutput;
}

const args = process.argv;

if (args.length !== 3) {
	console.log("Usage: yarn start", languages);
} else {
	const lang = args[2];
	if (!languages.includes(lang)) {
		console.log("Language not implemented yet. Valid languages: ", languages);
	} else {
		console.log("palavras para https://term.ooo/: ", getWords(lang));
		console.log(JSON.stringify(getWords(lang), null, 2));
	}
}
