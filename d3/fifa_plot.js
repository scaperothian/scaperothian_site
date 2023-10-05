console.log('hello from berkeley')

const width = window.innerWidth;
const height = window.innerHeight;

console.log(`Viewport Width: ${width}`);
console.log(`Viewport Height: ${height}`);

/* the margin, iwidth, iheight, gDrawing patternn is used to 
     create an svg that is bounded by the margin requirements.
     then replacing the svg object 'target' with the margin object
     you can place the data right where you want it to go 
  */
const margin = {
  left: 50,
  right: 50,
  top: height / 5,
  bottom: 50
}

let iwidth = width - margin.left - margin.right
let iheight = height - margin.top - margin.bottom

console.log(`Width within margin: ${iwidth}`);
console.log(`Height within margin: ${iheight}`);


//reading in the data
let data = await d3.csv("./players_20.csv")
console.log(typeof data);
console.log(data);


//objects for finding out things about the data
const shooting_specs = ({
  min: d3.min(data.map((d) => Number(d.shooting))),
  max: d3.max(data.map((d) => Number(d.shooting)))
})

const passing_specs = ({
  min: d3.min(data.map((d) => Number(d.passing))),
  max: d3.max(data.map((d) => Number(d.passing)))
})

const overall_specs = ({
  min: d3.min(data.map((d) => Number(d.overall))),
  max: d3.max(data.map((d) => Number(d.overall))),
  range:
    d3.max(data.map((d) => Number(d.overall))) -
    d3.min(data.map((d) => Number(d.overall)))
})


const legend_data = Array.from({ length: overall_specs.range })
    .map((d, i) => i + 1)
    .map((d) => overall_specs.min + d)

const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

const gDrawing = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x_scale = d3
    .scaleLinear()
    .domain([shooting_specs.min, shooting_specs.max])
    .range([0, iwidth]);

const y_scale = d3
    .scaleLinear()
    .domain([passing_specs.min, passing_specs.max])
    .range([iheight, 0]);

const c = d3
    .scaleSequential(d3.interpolateRdBu)
    .domain(d3.extent(data, (d) => d.overall));

gDrawing
    .append("rect")
    .attr("width", iwidth)
    .attr("height", iheight)
    .style("fill", "white");

gDrawing
    .append("g")
    .attr("class", "x--axis")
    .attr("transform", `translate(0,${iheight})`)
    .call(d3.axisBottom(x_scale));

gDrawing
    .append("g")
    .attr("class", "y--axis")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(y_scale));

const tooltip = (d) => `Name: ${d.short_name}
Nation: ${d.nationality}
Club: ${d.club}`

const circles = gDrawing
    .selectAll("cicle")
    .data(data)
    .join("circle")
    .attr("id", (d, i) => i)
    .attr("cx", (d) => x_scale(d.shooting))
    .attr("cy", (d) => y_scale(d.passing))
    .attr("name", (d) => d.short_name)
    .attr("r", 0.02 * iheight)
    .style("fill", (d) => c(d.overall));
circles.append("title").text(tooltip)

svg.append()


//scale the font size of the axis titles by
  // the height of the svg.
  // 50 is a magic number. =)
  const y_axis_title_font_size = iwidth / margin.left;
  const x_axis_title_font_size = iheight / margin.bottom;
  const title_font_size = iheight / 25;

  const titleContent =
    "FIFA Passing vs. Scoring and It's effect on Overall Performance (out of 100)";

  // Create a titleObject element
  const titleObject = gDrawing
    .append("foreignObject")
    .attr("x", 0)
    .attr("y", -margin.top)
    .attr("width", iwidth) // Set the width of the text box
    .attr("height", 0.75 * margin.top); // Set the height of the text box

  // Add a div inside the foreignObject
  const div = titleObject
    .append("xhtml:div")
    .style("width", "100%") // Set the width of the div to 100%
    .style("height", "100%") // Set the height of the div to 100%
    .style("overflow-wrap", "break-word") // Enable word wrapping
    .style("word-wrap", "break-word") // Enable word wrapping (for older browsers)
    .style("text-align", "center") // Center-justify the text
    .html(titleContent);

  // Style the text within the div
  div.style("font-size", `${title_font_size}px`).style("line-height", "1.2");

  //x-axis axis title
  gDrawing
    .append("text")
    .attr("x", iwidth / 2)
    .attr("y", iheight + margin.bottom - x_axis_title_font_size / 2)
    .style("font-size", `${x_axis_title_font_size}pt`)
    .style("text-anchor", "middle")
    .text("Shooting Percentage");

  //y-axis axis title
  //rotating the text by 90 degrees and moving off the axis.
  gDrawing
    .append("text")
    .style("font-size", `${y_axis_title_font_size}pt`)
    .style("text-anchor", "middle")
    .attr(
      "transform",
      `translate(${-margin.left + y_axis_title_font_size},${
        iheight / 2
      }) rotate(-90)`
    )
    .text("Passing Percentage");


function makeLegend() {
  //{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(legend_data, (d) => d))
    .range([iheight / 4, 0])
    .nice();

  const c = d3
    .scaleSequential(d3.interpolateRdBu)
    .domain(d3.extent(legend_data, (d) => d));

  g.selectAll(".row")
    .data(legend_data)
    .join("rect")
    .attr("width", iwidth / 24)
    .attr("height", iheight / 92)
    .attr("x", iwidth / 48)
    //.attr("x", 0)
    .attr("y", (d) => x(d))
    .attr(
      "transform",
      `translate(${iwidth - margin.left}, ${
        iheight - margin.bottom - iheight / 4 - iheight / 24
      })`
    )
    .style("fill", (d) => c(d));

  g.append("g")
    .attr(
      "transform",
      `translate(${iwidth - margin.left}, ${
        iheight - margin.bottom - iheight / 4 - iheight / 24
      })`
    )
    .call(d3.axisLeft(x));
  //.style("font-size", `${iwidth / 140}pt`);

  //legend title
  g.append("text")
    .attr("x", iwidth - margin.right)
    .attr("y", iheight - margin.bottom - iheight / 4 - iheight / 12)
    .style("font-size", `${iwidth / 70}pt`)
    .style("text-anchor", "middle")
    .text("Player Overall Score");

  return svg.node();
}


document.body.append(svg.node())

