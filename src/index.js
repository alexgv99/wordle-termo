import wordsEn from "./dic-en.json";
import wordsPt from "./dic-pt.json";

const lettersIn = ["l1", "k1"]; // letters to include with minimum quantity; ex: ["t1", "o2"]
const lettersOut = "hpoarec".split(""); // letters to exclude; ex: "bemf"
const regex = /s.i../i; // put the letters you know the spot; ex: /...o./i

function getWords(lang) {
	let wordsOutput = [];
	(lang === "pt" ? wordsPt : wordsEn)
		.filter((word) => regex.test(word))
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

console.log("palavras para https://term.ooo/: ", getWords("pt"));
console.log(
	"palavras para https://www.powerlanguage.co.uk/wordle/: ",
	getWords("en")
);
