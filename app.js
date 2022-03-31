// Reading the file using default
// fs npm package
const fs = require("fs");
csv = fs.readFileSync("Artworks.csv")

// Convert the data to String and
// split it in an array
var array = csv.toString().split("\r");

// All the rows of the CSV will be
// converted to JSON objects which
// will be added to result in an array
let result = [];

// The array[0] contains all the
// header columns so we store them
// in headers array
let headers = array[0].split(",")
headers[0] = "Title"

// Since headers are separated, we
// need to traverse remaining n-1 rows.
for (let i = 1; i < array.length - 1; i++) {
	let obj = {}

	// Create an empty object to later add
	// values of the current row to it
	// Declare string str as current array
	// value to change the delimiter and
	// store the generated string in a new
	// string s
	let str = array[i]
	let s = ''

	// By Default, we get the comma separated
	// values of a cell in quotes " " so we
	// use flag to keep track of quotes and
	// split the string accordingly
	// If we encounter opening quote (")
	// then we keep commas as it is otherwise
	// we replace them with pipe |
	// We keep adding the characters we
	// traverse to a String s
	let flag = 0
	for (let ch of str) {
		if (ch === '"' && flag === 0) {
			flag = 1
		}
		else if (ch === '"' && flag == 1) flag = 0
		if (ch === ',' && flag === 0) ch = '|'
		if (ch !== '"' && ch !== "\n") s += ch
	}

	// Split the string using pipe delimiter |
	// and store the values in a properties array
	let properties = s.split("|")

	// For each header, if the value contains
	// multiple comma separated data, then we
	// store it in the form of array otherwise
	// directly the value is stored
	for (let j in headers) {
		// if (properties[j].includes(",")) {
		// obj[headers[j]] = properties[j]
		// 	.split(",").map(item => item.trim())
		// }
		// else 
		obj[headers[j]] = properties[j]
	}

	// Add the generated object to our
	// result array
	result.push(obj)
}

newresult = []

result.forEach(d => {
	genderCount = {
		Male: 0,
		Female: 0
	};

	const gender = String(d.Gender);

	// Count entries with gender of (Male), (male). Account for group artworks
	const maleCount = (gender.match(/(Male)/g) || []).length
		+ (gender.match(/(male)/g) || []).length

	genderCount.Male += maleCount;

	const femaleCount = (gender.match(/(Female)/g) || []).length
		+ (gender.match(/(female)/g) || []).length

	genderCount.Female += femaleCount;

	const year = d.Date;
	var parsedYear = parseInt(year);

	if (isNaN(parsedYear) && year !== undefined) {
		year.replace("c.", "");
		var number = year.substring(0, 4);
		parsedYear = parseInt(number);
	}

	if (gender !== undefined && year !== undefined) {
		newresult.push({
			Title: d.Title,
			Gender: genderCount,
			Date: parsedYear
		})
	}
});

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(newresult);
fs.writeFileSync('Artworks.json', json);
