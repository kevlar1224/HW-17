// @TODO: YOUR CODE HERE!

var svgHeight = 600;
var svgWidth = 1000;

var leftMargin = 130;
var topMargin = 50;

var chartHeight = svgHeight - 2*topMargin;
var chartWidth = svgWidth - 2*leftMargin;

var svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${leftMargin}, ${topMargin})`);

d3.csv("assets/data/data.csv", function(error, data) {

    if (error) {throw error};

    console.log(data);
    data.forEach(function(entry) {
        entry.obesity = +entry.obesity;
        entry.smokes = +entry.smokes;
    });

    var xScale = d3.scaleLinear()
        .domain([d3.min(data, item => item.obesity)*.8, d3.max(data, item => item.obesity)*1.1])
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, item => item.smokes)*.6, d3.max(data, item => item.smokes)*1.1])
        .range([chartHeight, 0]);

    // Use the scales to make the axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Append the axes to the chart
    
    // Add axis labels
    
    // Use the dataData to make the circles
    chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.obesity))
    .attr("cy", d => yScale(d.smokes))
    .attr("r", "12")
    .attr("fill", "lightblue")
    .attr("stroke", "black");
    
    chartGroup.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.obesity) - 5)        
    .attr("y", d => yScale(d.smokes) + 3)
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .attr("fill", "black")
    ;
    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    chartGroup.append("g")
        .call(yAxis);

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2 - 60}, ${chartHeight + 35})`)
        .text("Obesity Rate (%)");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight + 120)
        .attr("y", -35)
        .text("Percantage of Population Who Smoke");

});