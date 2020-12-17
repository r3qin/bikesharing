var margin = {top: 40, right: 20, bottom: 50, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
var svg = d3.select("#part3_svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/cai0909/data/main/prcp.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
    d.PRCP = +d.PRCP;
    d.num = +d.num;
  });

// Add X axis
  var x = d3.scaleLinear()
    .domain([0, 4])
    .range([ 0, width ]);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 12000])
    .range([ height, 0]);
  var yAxis = svg.append("g")
    .call(d3.axisLeft(y));

  //clip path
  var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

    var scatter = svg.append('g')
    .attr("clip-path", "url(#clip)")
  
  // add data points
  scatter.selectAll("circle")
      .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.PRCP); })
      .attr("cy", function(d) { return y(d.num); })
      .attr("r","5")
      .style("fill","steelblue")
      .attr("opacity","0.6")
      
      
  var zoom = d3.zoom()
      .scaleExtent([.5, 40])  // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([[0, 0], [width, height]])
      .on("zoom", function(event){
    var newX = event.transform.rescaleX(x);
   

    // update axes with these new boundaries
    xAxis.call(d3.axisBottom(newX))


    // update circle position
    scatter
      .selectAll("circle")
      .attr('cx', function(d) {return newX(d.PRCP)});
  });
  
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);
      
    svg.append("text")
    .attr("y",500-margin.bottom)
    .attr("x",480)
    .style("text-anchor", "middle")
    .text("prcp (inches) ")

    
    svg.append("text")
    .attr("y",0-margin.left+20)
    .attr("x",0-(height/2)-20)
    .attr('transform', 'rotate(-90)')
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Average trip counts per day ")
    
    svg.append("text")
    .attr("y",margin.top-50)
    .attr("x",350)
    .style('font-size',"25px")
    .style("text-anchor", "middle")
    .text("relationship between daily counts and precipitation ")  
   

});