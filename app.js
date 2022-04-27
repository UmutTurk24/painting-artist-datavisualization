// Reading the file using default
// fs npm package
const { count } = require("console");
const fs = require("fs");
const { arch } = require("os");
csv = fs.readFileSync("Artworks.csv")

const whatYugov = (artist) => {
	let nationality
	if (artist === "Oskar Kogoj" || artist === "Saša Janez Mächtig"
		|| artist === "Majda Dobravec-Lajovic" || artist === "Janez Bernik"
		|| artist === "Riko Debenjak" || artist === "Bogdan-Kiar Mesko")
		nationality = "Slovenia";
	if (artist === "Stipe Brcic" || artist === "Edo Murtic" ||
		artist === "Adriana Maraz-Bernik" || artist === "Julije Knifer" ||
		artist === "Miroslav Sutej" || artist === "Zdravko Tisljar")
		nationality = "Croatia";
	if (artist === "Vladimir Velickovic" || artist === "Dušan Džamonja"
		|| artist === "Ivan Tabakovic" || artist === "Olja Ivanjicki"
		|| artist === "Dimitrije Martinovic" || artist === "Marina Abramović"
		|| artist === "Jovan Kratohvil" || artist === "Lazar Vujaklija")
		nationality = "Serbia";
	if (artist === "Vlatko Gilic")
		nationality = "Montenegro"
	return nationality
}


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
	let flag = false
	for (let ch of str) {
		if (ch === '"') {
			flag = !flag
		}
		if (ch === ',' && !flag) ch = '|'
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

// Arch, Design, Ill. Book, Prod. Des., Soft., Graph. Des., Poster, Furniture -> ARch & Deisng
// painting -> painting
// Print, Drawing, Work on Paper, Collage, Ephemera -> Work on Paper
// Film, Video, Media, Performance, Audio -> Digital Media & Performance
// Sculpture, Textile, Installation -> Installation
// Photograph, Photography Res. -> Photography

// "Photograph",
// "Photography Research/Reference",


const typeMap = (type) => {
	let newType = ""
	const arch_design = ["Architecture", "Design", "Illustrated Book"
		, "Product Design", "Software", "Poster"
		, "Graphic Design", "Furniture and Interiors"]
	const work_paper = ["Print", "Drawing", "Periodical"
		, "Work on Paper", "Collage", "Ephemera"]
	const digimedia = ["Film", "Video", "Audio", "Media", "Performance"]
	const installation = ["Sculpture", "Textile", "Installation"]
	const photo = ["Photograph", "Photography Research/Reference"]

	if (arch_design.includes(type)) newType = "Architecture & Design"
	if (type === "Painting") newType = "Painting"
	if (work_paper.includes(type)) newType = "Work on Paper"
	if (digimedia.includes(type)) newType = "Digital Media & Performance"
	if (installation.includes(type)) newType = "Digital Media & Performance"
	if (photo.includes(type)) newType = "Photography"

	return newType
}

// const countryMap = { "Austrian": "Austria", "French": "France", "American": "United States", "German": "Germany", "Dutch": "Netherlands", "Italian": "Italy", "Swedish": "Sweden", "British": "United Kingdom", "Japanese": "Japan", "Argentine": "Argentina", "Brazilian": "Brazil", "Swiss": "Switzerland", "Luxembourgish": "Luxembourg", "Spanish": "Spain", "Polish": "Poland", "Russian": "Russia", "Iranian": "Iran", "Canadian": "Canada", "Belgian": "Belgium", "Norwegian": "Norway", "Finnish": "Finland", "Danish": "Denmark", "Czech": "Czech Rep.", "Moroccan": "Morocco", "Colombian": "Colombia", "Australian": "Australia", "Chinese": "China", "Mexican": "Mexico", "Yugoslav": whatYugov(d.Artist), "Scottish": "Scotland", "Hungarian": "Hungary", "Slovenian": "Slovenia", "Chilean": "Chile", "Latvian": "Latvia", "Greek": "Greece", "Israeli": "Israel", "Czechoslovakian": "Czech Rep.", "Icelandic": "Iceland", "Croatian": "Croatia", "Ukrainian": "Ukraine", "Cuban": "Cuba", "Romanian": "Romania", "Venezuelan": "Venezuela", "Uruguayan": "Uruguay", "Irish": "Ireland", "Georgian": "Georgian", "Thai": "Thailand", "Algerian": "Algeria", "Guatemalan": "Guatemala", "Indian": "India", "Costa Rican": "Costa Rica", "Korean": "Korea", "Ethiopian": "Ethiopia", "Kuwaiti": "Kuwait", "Haitian": "Haiti", "South African": "South Africa", "Zimbabwean": "Zimbabwe", "Portuguese": "Portugal", "Panamanian": "Panama", "Ecuadorian": "Ecuador", "Peruvian": "Peru", "Congolese": "Dem. Rep. Congo", "Malian": "Mali", "Turkish": "Turkey", "Cambodian": "Cambodia", "Bosnian": "Bosnia", "Canadian Inuit": "Canada", "Slovak": "Slovakia", "Estonian": "Estonia", "Pakistani": "Pakistan", "Bulgarian": "Bulgaria", "Bolivian": "Bolivia", "Palestinian": "Palestine", "Taiwanese": "Taiwan", "Paraguayan": "Paraguay", "Nicaraguan": "Nicaragua", "Tunisian": "Tunisia", "Sudanese": "Sudan", "Tanzanian": "Tanzania", "Guyanese": "Guyana", "Senegalese": "Senegal", "Bahamian": "Bahamas", "New Zealander": "New Zealand", "Lebanese": "Lebanon", "Cypriot": "Cyprus", "Kenyan": "Kenya", "Nigerian": "Nigeria", "Egyptian": "Egypt", "Albanian": "Albania", "Azerbaijani": "Azerbaijan", "Ivorian": "Cóte d'Ivoire", "Malaysian": "Malaysia", "Serbian": "Serbia", "Singaporean": "Singapore", "Lithuanian": "Lithuania", "Tajik": "Tajikistan", "Namibian": "Namibia", "Native American": "United States", "Ghanaian": "Ghana", "Afghan": "Afghanistan", "Kyrgyzstani": "Kyrgyzstan", "Welsh": "Wales", "Vietnamese": "Vietnam", "Ugandan": "Uganda", "English": "United Kingdom", "Cameroonian": "Cameroon", "Mauritanian": "Mauritania", "Syrian": "Syria", "Iraqi": "Iraq", "Saudi Arabian": "Saudi Arabia", "Kazakhstani": "Kazakhstan", "Rwandan": "Rwanda", "Indonesian": "Indonesia", "Burkinabe": "Burkina Faso", "Macedonian": "Macedonia", "Filipino": "Philippines", "Mozambican": "Mozambique", "Angolan": "Angola", "Puerto Rican": "Puerto Rico", "Catalan": "Spain" }
result.forEach(d => {
	/*	genderCount = {
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

	genderCount.Female += femaleCount; */

	const year = d.DateAcquired;
	var parsedYear = 0;

	if (year && year !== undefined) {
		if (year.includes("/")) {
			var yearEnd = year.substring(year.length - 2, year.length)
			var start = yearEnd >= 20 ? "19" : "20"
			var yearStr = start + yearEnd;
			parsedYear = parseInt(yearStr)
		} else {
			year.replace("-", "")
			parsedYear = parseInt(year.substring(4))
		}
	}

	// const nations = d.Nationality !== undefined ? d.Nationality : "";
	// var countries = []
	// var nation = "";
	// var start = false;
	// for (ch of nations) {
	// 	if (start && ch === ")") {
	// 		if (countryMap[nation])
	// 			countries.push(countryMap[nation]);
	// 		nation = "";
	// 		start = false;
	// 	}
	// 	if (start) {
	// 		nation += ch;
	// 	}
	// 	if (ch === "(") start = true;
	// }

	const type = typeMap(d.Classification);

	if (parsedYear > 1000 && type !== "" /*gender !== undefined &&  */) {
		// for (let country of countries) {

		// 	})
		// }
		newresult.push({
			// Gender: genderCount,
			Date: parsedYear,
			// Nationality: country
			Type: type
		})
	}
});


var classObj = {}
const label = (year, type) => {
	return year + "_" + type;
}

newresult.forEach(d => {
	let key = label(d.Date, d.Type)
	if (!classObj[key]) {
		classObj[key] = {
			Date: d.Date,
			Type: d.Type,
			count: 0
		}
	}
	classObj[key].count++;
});

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(classObj);
fs.writeFileSync('Artworks-test-Umut-2.json', json);
