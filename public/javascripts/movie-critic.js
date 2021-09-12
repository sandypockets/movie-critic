const svg = d3.select("svg")

svg
  .attr("height", 40 * data.length)
  .attr("width", 960)

const scoreScale = d3.scaleLinear()
  .domain([0, 100])
  .range([420, 900])

const groups = svg
  .selectAll("g.movie")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "movie")
  .attr("transform", (d, i) => { return `translate(0, ${i * 40})`})

groups
  .append("text")
  .attr("x", 90)
  .attr("y", 20)
  .attr("class", "title")
  .text((d, i) => { return d.title })

groups
  .append("text")
  .attr("x", 24)
  .attr("y", 20)
  .attr("class", "year")
  .text((d, i) => { return d.year } )

groups
  .append("circle")
  .attr("cx", (d, i) => { return scoreScale(d.imdb) })
  .attr("cy", 20)
  .attr("r", 8)
  .attr("class", "imdb")

groups
  .append("circle")
  .attr("cx", (d, i) => { return scoreScale(d.metascore) })
  .attr("cy", 20)
  .attr("r", 8)
  .attr("class", "metascore")



const selectTag = document.querySelector("select")

selectTag.addEventListener("change", function() {
  data.sort((a, b) => {
    return d3.descending(a[selectTag.value], b[selectTag.value])
  })
  groups
    .data(data, (d, i) => { return d.title })
    .transition()
    .duration(1000)
    .attr("transform", (d, i) => { return `translate(0, ${i * 40})`})
})