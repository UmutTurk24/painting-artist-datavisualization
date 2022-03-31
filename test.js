import d3 from "d3";
const d3 = require('d3');
// Constants
var margin = { top: 20, right: 20, bottom: 70, left: 80 },
  width = 950 - margin.left - margin.right,
  height = 560 - margin.top - margin.bottom;

// Chart SVGs
var svg = d3
  .select("#chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "bar-chart")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var x = d3.scaleTime().range([0, width]),
  y = d3.scaleLinear().range([height, 0]),
  z = d3.scaleOrdinal(d3.schemeSet1);

var line = d3
  .line()
  .curve(d3.curveLinear)
  .x((d) => {
    return x(d.decade);
  })
  .y((d) => {
    return y(d.count);
  });

const drawAxisLabels = (svg) => {
  // Horizontal Axis Label
  svg
    .append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom * 0.65)
    .text("Artwork's Date of Creation (Decade)");

  // Vertical Axis Label
  svg
    .append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left * 0.65)
    .text("Number of Artists");
};

const drawLegend = (data) => {
  svg
    .selectAll("mydots")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", 100)
    .attr("cy", (d, i) => 100 + i * 25)
    .attr("r", 7)
    .style("fill", (d) => z(d.key));

  svg
    .selectAll("mylabels")
    .data(data)
    .enter()
    .append("text")
    .attr("x", 120)
    .attr("y", (d, i) => 100 + i * 25)
    .style("fill", (d) => z(d.key))
    .text((d) => d.key)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
};

data = d3.json("Artworks.json").then((data) => {
  // make array w processed year as int all artworks
  // collect array into decades object
  // plot using decades on x-axis and decades.length on y axis
  arr = [];

  data.forEach((d) => {
    const gender = d.Gender;
    const year = d.Date;

    if (gender !== undefined && year !== undefined) {
      // Count entries with gender of (Male), (male). Account for group artworks
      const maleCount =
        (gender.match(/(Male)/g) || []).length +
        (gender.match(/(male)/g) || []).length;

      // Count entries with gender of (Female), (female). Account for group artworks
      const femaleCount =
        (gender.match(/(Female)/g) || []).length +
        (gender.match(/(female)/g) || []).length;

      var parsedYear = parseInt(year);
      if (isNaN(parsedYear)) {
        year.replace("c.", "");
        var number = year.substring(0, 4);
        parsedYear = parseInt(number);
      }
      var decade = Math.abs(parsedYear - (parsedYear % 10));

      if (decade >= 1000) {
        decade = parseTime(decade);

        // Create unique entries for every instance of male artists in each decade
        for (let i = 0; i < maleCount; i++) {
          arr.push({ gender: "Male", decade: decade });
        }
        for (let i = 0; i < femaleCount; i++) {
          arr.push({ gender: "Female", decade: decade });
        }
      }
    }
  });

  // Nest data using gender as key, and an array of how many
  // artists were counted in each decade
  var genders = d3
    .nest()
    .key(function (d) {
      return d.gender;
    })
    .rollup(function (v) {
      sumData = {};
      v.forEach((e) => {
        const decade = e.decade;
        if (!sumData.hasOwnProperty(decade)) {
          sumData[decade] = { decade: decade, count: 0 };
        }
        sumData[decade].count++;
      });
      return d3.values(sumData);
    })
    .entries(arr);

  genders.forEach((d) => {
    d.value.sort((a, b) => d3.ascending(a.decade, b.decade));
  });

  x.domain(d3.extent(arr, (d) => d.decade));
  y.domain([0, d3.max(genders, (g) => d3.max(g.value, (d) => d.count))]);
  z.domain(genders.map((c) => c.key));

  svg
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));

  var gender = svg
    .selectAll(".gender")
    .data(genders)
    .enter()
    .append("g")
    .attr("class", "gender");

  gender
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.value))
    .style("stroke", (d) => z(d.key))
    .style("stroke-width", "3px")
    .style("stroke-linecap", "round");

  drawAxisLabels(svg);

  drawLegend(genders);
  fs.writeFile("data.txt", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
});
