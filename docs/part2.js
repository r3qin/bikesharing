var casual_1 = [6.985915,4.963636,5.127660,3.714286,1.820513,2.083333,2.835616,7.395349,16.471910,20.561798,
    31.600000,46.425287,54.640449,62.500000,71.179775,76.233333,76.577778,72.966667,49.438202,
    31.651163,20.409639,16.418605,13.658824,9.253333];
var member_1 = [35.02222,19.92222,13.58621,6.569767,9.325843,49.28889,141.0889,329.9333,581.5222,344.9889,
    217.8111,242.8889,288.3444,283.7889,277.1667,324.8667,436.8889,651.6556,508.2222,312.4778,
    196.9778,140.2778,96.74444,59.67778];

var casual_2 = [19.86813,12.27907,9.696203,6.189189,3.4,5.125,10.87778,23.26374,44.71429,66.12088,94.48352,
    120.5824,134.8462,144.1978,156.4945,159.4725,162.1538,177.4066,154.7033,120.9451,85.83516,
    61.51648,48.32967,30.03297];
var member_2 = [65.72527,34.85714,23.01099,12.25275,15.67033,74.89011,243.2637,562.9011,914.9121,544.7473,
    379.6264,428,494.1429,489.978,466.2637,537.3187,685.3297,1066.187,870.5495,592.1319,415.5165,
    282.6703,207.0989,127.0879];

var casual_3 = [21.8913,13.97826,8.865169,6.027027,2.972603,4.344444,9.456522,22.36957,45.48913,64.68478,
    88.96739,106.1413,116.5326,118.0652,122.8261,124.8696,126.1522,141.9022,130.087,109.7826,
    82.79348,65.01087,51.23913,34.54348];
var member_3 = [89.59783,49.48913,31.61957,16.45055,20.15217,82.3587,265.2283,610.2609,961.7065,559.2283,
    405.5652,443.1739,502.6304,491.087,472.75,540.0543,710.9457,1084.848,916.9674,650.0326,
    454.0109,330.8587,242.6413,157.2935];

var casual_4 = [8.421687,5.256757,3.898305,3.025,1.648649,2.179104,3.947368,9.944444,21.46739,27.01099,
    38.70652,50.86813,59.93478,63.89011,66.62637,70,66.30769,60.6087,43.29348,26.27473,
    20.17045,14.82955,14.03333,10.94382];
var member_4 = [61.33696,28.55435,16.56044,8.443182,12.44565,61.31522,181.8913,449.0435,785.7283,451.0326,
    287.6087,314.5543,371.6739,368.663,363.8913,427.4891,553.6304,774.3478,609.7283,380.6739,
    252.4674,187.413,132.8152,96.91304];

var casual_5 = [14.887240, 9.785016, 7.394161, 5.179372, 2.711790, 3.649180, 7.117825, 15.894150, 32.129121, 
    44.782369, 63.528767, 81.457064, 91.673077, 97.315934, 104.515152, 107.673973, 107.934066, 
    113.265753, 94.585165, 72.830556, 53.381356, 40.044818, 32.223464, 21.841499];

var member_5 = [63.06575, 33.27397, 21.30748, 11.01124, 14.43681, 67.03836, 208.13699, 488.69589, 811.93973, 
    475.52055, 323.07123, 357.58630, 414.66849, 408.83836, 395.46849, 457.93973, 597.33151, 
    895.11781, 727.16712, 484.47123, 330.23562, 235.69589, 170.12329, 110.47397];

var casual = casual_5;
var member = member_5;

var svg = d3.select("#part2_svg");

var ctr = 100;

var x_axis = d3.scaleLinear()
    .domain([-200, 1000])
    .range([0, 600]);

var ax = d3.axisBottom(x_axis);
ax.ticks(13);
ax.tickValues([-100,0,100,200,300,400,500,600,700,800,900,1,000]);
var v = [100,0,100,200,300,400,500,600,700,800,900,1,000]
ax.tickFormat((d,i)=>v[i]);

svg.append("g")
    .attr("transform", "translate(0,520)")
    .call(ax);

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "10px")
    .style("padding", "10px");

var casual_bar = svg.selectAll(".casual")
    .data(casual)
    .enter()
    .append("rect")
    .attr("x", d=>ctr-d*0.5)
    .attr("y", (d, i) => i*20+30)
    .attr("id", (d, i) => i)
    .attr("width", d=>d*0.5)
    .attr("height", "15")
    .attr("fill", "pink")
    .attr("class", "casual")
    .on("mouseenter", (d) => {		
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);
    })
    .on("mousemove", function(event,d) {
        var t = d3.select(this).attr("id");
        tooltip.html(t +":00" + " Number: " + Math.round(d * 100) / 100)
            .style("left",  (event.pageX -60) + "px")		
            .style("top", (event.pageY -60) + "px")
    })
    .on("mouseleave", (d) => {		
        tooltip.transition()
            .duration(200)
            .style("opacity", 0)
    });

var member_bar = svg.selectAll(".member")
    .data(member)
    .enter()
    .append("rect")
    .attr("x", ctr)
    .attr("y", (d, i) => i*20+30)
    .attr("id", (d, i) => i)
    .attr("width", d=>d*0.5)
    .attr("height", "15")
    .attr("fill", "SkyBlue")
    .attr("class", "member")
    .on("mouseenter", (d) => {		
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);
    })
    .on("mousemove", function(event,d) {
        var t = d3.select(this).attr("id")
        tooltip.html(t +":00" + " Number: " + Math.round(d * 100) / 100)
            .style("left",  (event.pageX -60) + "px")		
            .style("top", (event.pageY -60) + "px")
    })
    .on("mouseleave", (d) => {		
        tooltip.transition()
            .duration(200)
            .style("opacity", 0)
    });

var buttons = [50, 200, 350, 500, 650];
var but1 = svg.selectAll(".button5")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 620)
    .attr("r", 5)
    .attr("fill", "blue")
    .attr("class", "button5")
    .attr("id", "5")
    .style("stroke", "black")
    .on("click", function() {
        d3.select(this)
            .attr("fill", "blue");
        but5.attr("fill", "white");
        but2.attr("fill", "white");
        but3.attr("fill", "white");
        but4.attr("fill", "white");
        svg.selectAll(".casual")
            .data(casual_5)
            .transition()
            .duration(1000)
            .attr("x", d=>ctr-d*0.5)
            .attr("width", d=>d*0.5);
        svg.selectAll(".member")
            .data(member_5)
            .transition()
            .duration(1000)
            .attr("width", d=>d*0.5);
    });

var but2 = svg.selectAll(".button1")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", 170)
    .attr("cy", 620)
    .attr("r", 5)
    .attr("fill", "white")
    .attr("class", "button1")
    .attr("id", "1")
    .style("stroke", "black")
    .on("click", function() {
        d3.select(this)
            .attr("fill", "blue");
        but1.attr("fill", "white");
        but5.attr("fill", "white");
        but3.attr("fill", "white");
        but4.attr("fill", "white");
        svg.selectAll(".casual")
            .data(casual_1)
            .transition()
            .duration(1000)
            .attr("x", d=>ctr-d*0.5)
            .attr("width", d=>d*0.5);
        svg.selectAll(".member")
            .data(member_1)
            .transition()
            .duration(1000)
            .attr("width", d=>d*0.5);
    });

var but3 = svg.selectAll(".button2")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", 290)
    .attr("cy", 620)
    .attr("r", 5)
    .attr("fill", "white")
    .attr("class", "button2")
    .attr("id", "2")
    .style("stroke", "black")
    .on("click", function() {
        d3.select(this)
            .attr("fill", "blue");
        but1.attr("fill", "white");
        but2.attr("fill", "white");
        but5.attr("fill", "white");
        but4.attr("fill", "white");
        svg.selectAll(".casual")
            .data(casual_2)
            .transition()
            .duration(1000)
            .attr("x", d=>ctr-d*0.5)
            .attr("width", d=>d*0.5);
        svg.selectAll(".member")
            .data(member_2)
            .transition()
            .duration(1000)
            .attr("width", d=>d*0.5);
    });

var but4 = svg.selectAll(".button3")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", 410)
    .attr("cy", 620)
    .attr("r", 5)
    .attr("fill", "white")
    .attr("class", "button3")
    .attr("id", "3")
    .style("stroke", "black")
    .on("click", function() {
        d3.select(this)
            .attr("fill", "blue");
        but1.attr("fill", "white");
        but2.attr("fill", "white");
        but3.attr("fill", "white");
        but5.attr("fill", "white");
        svg.selectAll(".casual")
            .data(casual_3)
            .transition()
            .duration(1000)
            .attr("x", d=>ctr-d*0.5)
            .attr("width", d=>d*0.5);
        svg.selectAll(".member")
            .data(member_3)
            .transition()
            .duration(1000)
            .attr("width", d=>d*0.5);
    });

var but5 = svg.selectAll(".button4")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", 530)
    .attr("cy", 620)
    .attr("r", 5)
    .attr("fill", "white")
    .attr("class", "button4")
    .attr("id", "4")
    .style("stroke", "black")
    .on("click", function() {
        d3.select(this)
            .attr("fill", "blue");
        but1.attr("fill", "white");
        but2.attr("fill", "white");
        but3.attr("fill", "white");
        but4.attr("fill", "white");
        svg.selectAll(".casual")
            .data(casual_4)
            .transition()
            .duration(1000)
            .attr("x", d=>ctr-d*0.5)
            .attr("width", d=>d*0.5);
        svg.selectAll(".member")
            .data(member_4)
            .transition()
            .duration(1000)
            .attr("width", d=>d*0.5);
    });

svg.append("text")
    .attr("x", 300)
    .attr("y", 15)
    .text("Average number of riders each hour")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")

svg.append("text")
    .attr("x", 300)
    .attr("y", 560)
    .text("Average number of riders")
    .style("text-anchor", "middle");

svg.append("text")
    .attr("x", 0)
    .attr("y", 220)
    .text("Time")
    .style("text_anchor", "middle")
    .attr("transform", "translate(-180,250) rotate(-90)");

svg.append("text")
    .attr("x", 50)
    .attr("y", 650)
    .text("Whole year")
    .style("text-anchor", "middle");

svg.append("text")
    .attr("x", 170)
    .attr("y", 650)
    .text("First quarter")
    .style("text-anchor", "middle");

svg.append("text")
    .attr("x", 290)
    .attr("y", 650)
    .text("Second quarter")
    .style("text-anchor", "middle");

svg.append("text")
    .attr("x", 410)
    .attr("y", 650)
    .text("Third quarter")
    .style("text-anchor", "middle");

svg.append("text")
    .attr("x", 530)
    .attr("y", 650)
    .text("Fourth quarter")
    .style("text-anchor", "middle");




svg.append("rect")
    .attr("x", 600)
    .attr("y", 30)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "pink");

svg.append("rect")
    .attr("x", 600)
    .attr("y", 60)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "SkyBlue");

svg.append("text")
    .attr("x", 630)
    .attr("y", 46)
    .text("Casual");

svg.append("text")
    .attr("x", 630)
    .attr("y", 76)
    .text("Member");

svg.selectAll(".member")
    .on("mouseover", function() {
        var y_now = +d3.select(this).attr("y")
        d3.select(this)
            .attr("fill", "DodgerBlue")
            .attr("height", 20)
            .attr("y", y_now-2.5)
    });

svg.selectAll(".member")
    .on("mouseout", function() {
        var y_now = +d3.select(this).attr("y")
        d3.select(this)
            .attr("fill", "SkyBlue")
            .attr("height", 15)
            .attr("y", y_now+2.5)
    });

svg.selectAll(".casual")
    .on("mouseover", function() {
        var y_now = +d3.select(this).attr("y")
        d3.select(this)
            .attr("fill", "HotPink")
            .attr("height", 20)
            .attr("y", y_now-2.5)
    });

svg.selectAll(".casual")
    .on("mouseout", function() {
        var y_now = +d3.select(this).attr("y")
        d3.select(this)
            .attr("fill", "pink")
            .attr("height", 15)
            .attr("y", y_now+2.5)
    });