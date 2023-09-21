console.log('hello from berkeley')
const width = 100
const height = 100
const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
const circles = svg
    //.selectAll("cicle")
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", height / 2)

document.body.append(svg.node())

