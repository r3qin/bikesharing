d3.csv("https://raw.githubusercontent.com/r3qin/bikesharing/main/data/inter.csv",d => ({
            Casual_1: parseInt(d.Casual_1),
            Member_1: parseInt(d.Member_1),
            Casual_2: parseInt(d.Casual_2),
            Member_2: parseInt(d.Member_2),
            Casual_3: parseInt(d.Casual_3),
            Member_3: parseInt(d.Member_3),
            Casual_4: parseInt(d.Casual_4),
            Member_4: parseInt(d.Member_4),
            Casual_5: parseInt(d.Casual_5),
            Member_5: parseInt(d.Member_5),
        }))
    .then(function(data) {
        var casual_1 = [];
        var member_1 = [];
  
        var casual_2 = [];
        var member_2 = [];
  
        var casual_3 = [];
        var member_3 = [];
  
        var casual_4 = [];
        var member_4 = [];
  
        var casual_5 = [];
        var member_5 = [];

        for (var i = 0; i < data.length; ++i) {
            casual_1.push(data[i].Casual_1);
            member_1.push(data[i].Member_1);
            casual_2.push(data[i].Casual_2);
            member_2.push(data[i].Member_2);
            casual_3.push(data[i].Casual_3);
            member_3.push(data[i].Member_3);
            casual_4.push(data[i].Casual_4);
            member_4.push(data[i].Member_4);
            casual_5.push(data[i].Casual_5);
            member_5.push(data[i].Member_5);
        }


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
    .data(casual_5)
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
        tooltip.html("Time: " + t +":00" + "<br />Number: " + Math.round(d * 100) / 100)
            .style("left",  (event.pageX -60) + "px")		
            .style("top", (event.pageY -60) + "px")
    })
    .on("mouseleave", (d) => {		
        tooltip.transition()
            .duration(200)
            .style("opacity", 0)
    });

var member_bar = svg.selectAll(".member")
    .data(member_5)
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
        tooltip.html("Time: " + t +":00" + "<br />Number: " + Math.round(d * 100) / 100)
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
});