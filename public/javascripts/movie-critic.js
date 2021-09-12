const svg = d3.select("svg")

data = data.map((d, i) => {
  d.difference = d.imdb - d.metascore
  return d
})

svg
  .attr("height", 40 * data.length)
  .attr("width", 960)

const scoreScale = d3.scaleLinear()
  .domain([0, 100])
  .range([420, 900])

const area = d3.area()
  .x0((d, i) => { return scoreScale(d.imdb) })
  .x1((d, i) => { return scoreScale(d.metascore) })
  .y0((d, i) => { return 40 * i + 20 })
  .y1((d, i) => { return 40 * i + 20 })
  .curve(d3.curveCardinal.tension(0.25))

const areaPath = svg
  .append("path")
  .datum(data)
  .attr("d", area)
  .attr("class", "area")

const imdbLine = d3.line()
  .x((d, i) => { return scoreScale(d.imdb) })
  .y((d, i) => { return 40 * i + 20 })
  .curve(d3.curveCardinal.tension(0.25))

const imdbPath = svg
  .append("path")
  .datum(data)
  .attr("d", imdbLine)
  .attr("class", "imdb")

const metascoreLine = d3.line()
  .x((d, i) => { return scoreScale(d.metascore) })
  .y((d, i) => { return 40 * i + 20 })
  .curve(d3.curveCardinal.tension(0.25))

const metascorePath = svg
  .append("path")
  .datum(data)
  .attr("d", metascoreLine)
  .attr("class", "metascore")

const groups = svg
  .selectAll("g.movie")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "movie")
  .attr("transform", (d, i) => { return `translate(0, ${i * 40})`})


groups
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 40)
  .attr("width", 960)
  .attr("class", "background")

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

groups
  .append("text")
  .attr("x", (d, i) => {
    if (d.difference > 0) {
      return scoreScale(d.imdb + 5)
    } else {
      return scoreScale(d.imdb - 5)
    }
  })
  .attr("y", 20)
  .text((d, i) => { return d.imdb })
  .attr("class", "imdb")
  .style("text-anchor", (d, i) => {
    if (d.difference > 0) {
      return "start"
    } else {
      return "end"
    }
  })

groups
  .append("text")
  .attr("x", (d, i) => {
    if (d.difference > 0) {
      return scoreScale(d.metascore - 9)
    } else {
      return scoreScale(d.metascore + 9)
    }
  })
  .attr("y", 20)
  .text((d, i) => { return d.metascore })
  .attr("class", "metascore")
  .style("text-anchor", (d, i) => {
    if (d.difference > 0) {
      return "start"
    } else {
      return "end"
    }
  })

const selectTag = document.querySelector("select")

selectTag.addEventListener("change", function() {
  data.sort((a, b) => {
    if (selectTag.value === 'title') {
      return d3.ascending(a[selectTag.value], b[selectTag.value])
    } else {
      return d3.descending(a[selectTag.value], b[selectTag.value])
    }
  })
  groups
    .data(data, (d, i) => { return d.title })
    .transition()
    .duration(1000)
    .attr("transform", (d, i) => { return `translate(0, ${i * 40})`})

  imdbPath
    .datum(data, (d, i) => { return d.title })
    .transition()
    .duration(1300)
    .attr("d", imdbLine)

  metascorePath
    .datum(data, (d, i) => { return d.title })
    .transition()
    .duration(1300)
    .attr("d", metascoreLine)

  areaPath
    .datum(data, (d, i) => { return d.title })
    .transition()
    .duration(1300)
    .attr("d", area)
})