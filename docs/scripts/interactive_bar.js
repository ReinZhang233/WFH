// Create svg and initial bars


  var w = 700;
  var h = 400;
  var margin = {top: 80, right: 0, bottom: 25,
      left: 50};
  var innerWidth = w - margin.left - margin.right;
  var innerHeight = h - margin.top - margin.bottom;

  var bardata = [6132,5853,5177,5066,4837,4420,4328,4855];
  

  var xScale = d3.scaleBand()
      .domain(d3.range(bardata.length))
      .range([0, innerWidth])
      .paddingInner(0.1);

  var yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata)])
      .range([innerHeight,0]);

  var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickFormat((d, i) => ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]);

  var yAxis = d3.axisLeft()
      		.scale(yScale);

// add svg

  var svg = d3.select("div#plot")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

// add background rectangle

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "white");

// add bars as a group

  var bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bardata);

  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d))
      .attr("fill", "green");

// add axes

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);

  svg.append("text")
     .attr("transform", "translate(100,0)")
     .attr("x", 15)
     .attr("y", 40)
     .attr("font-size", "24px")
     .text("2020 WFH employees");
   


// General Update Pattern
  function update(data) {
      xScale.domain(d3.range(data.length));

      yScale.domain([0, d3.max(data)]);

      var bars = svg.select("g")
          .selectAll("rect")
          .data(data);

      bars.enter()
        .append("rect")
          .attr("x", w)
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d))
          .attr("fill", "blue")
        .merge(bars)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("x", (d, i) => xScale(i))
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d));
	

      bars.exit().remove();

      svg.select(".xAxis")
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .call(xAxis);

      svg.select(".yAxis")
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .call(yAxis);
    }
    
    
    
  // Interactivity

    d3.selectAll("p")
        .on("click", function() {

            var paraID = d3.select(this).attr("id");

            if (paraID == "manufacturing") {
                bardata = [4221,3732,3349,3184,2884,2691,2867,2990];}
	    else if (paraID == "durableGoods") {
		bardata = [2690,2440,2257,2148,1905,1781,1862,2050];}
	    else if (paraID == "nonDurableGoods") {
		bardata = [1531,1292,1092,1036,980,909,1005,940];}
	    else if (paraID == "nonFinancial") {
		bardata = [42416,38646,32890,30650,28567,27450,28311,30539];}
	    else if (paraID == "nonFarm") {
		bardata = [48548,44499,38067,35716,33404,31870,32639,35394];}
	    else {bardata = [6132,5853,5177,5066,4837,4420,4328,4855];}

            update(bardata);

        });
