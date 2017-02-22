var diameter = 800
format = d3.format(",d"),
color = d3.scale.category10(),
minWeight = 0,
maxWeight = 1,
weightStep = 0.1,
// filter vars
width = 950,
height = 800,
padding = 20,
min = 0,
max = 100,
minSize = 0;
maxSize = 5;

// sliders

$("#attempts_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#hints_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#time_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#attempts_aft_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#hints_aft_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#time_aft_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

$("#incorrect_ratio_slider")
  .slider({
    min: minWeight,
    max: maxWeight,
    step: weightStep,
    value: 1,
    change: function(event, ui) {
      sliderUpdate();
    }
  })
  .slider("pips", {
    handle: true,
  })
  .slider("float");

var pack = d3.layout.pack()
  .size([diameter - 5, diameter - 5])
  .sort(function(a, b) {
    return -(a.value - b.value);
  })
  .value(function(d) {
    return d.size;
  })
  .padding(3);

// title
var titleSvg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", 50)
  .attr("class", "titleSvg");

titleSvg.append("text")
  .attr("x", 10)
  .attr("y", 25)
  .style("font-size", "16px")
  .text("OpenDSA CS3114 Course Exercises Analysis: ")
  .attr("font-family", "sans-serif")
  .attr("font-size", "20px")
  .attr("fill", "Black");;

// filter
var filterSvg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", 50)
  .attr("class", "filterSvg");

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "pack");

// exercises linear scale
var sizeScale = d3.scale.linear()
  .domain([minSize, maxSize])
  .range([0, 100])
  .clamp(true);

// exercises filter slider text
filterSvg.append("text")
  .attr("x", 10)
  .attr("y", 25)
  .style("font-size", "16px")
  .text("Exercises Filter: ")
  .attr("font-family", "sans-serif")
  .attr("font-size", "20px")
  .attr("fill", "Black");;

// Axis linear scale
var x = d3.scale.linear()
  .domain([min, max])
  .range([padding + 100, width - 6 * padding])
  .clamp(true);

var xAxis = d3.svg.axis()
  .scale(x)
  .tickSize(0)
  .tickPadding(12);

var brush = d3.svg.brush()
  .x(x)
  .extent([min, max])
  .on("brush", brushed)
  .on("brushend", function() {
    slider.selectAll(".resize.s")
      .style("display", "inline")
  });

//append stuff
var slidercontainer = filterSvg.append("g")
  .attr("transform", "translate(" + padding + ", " + padding + ")");

var axis = slidercontainer.append("g")
  .attr("class", "axis")
  .call(xAxis);

var slider = slidercontainer.append("g")
  .call(brush)
  .classed("slider", true);

//manipulate stuff
d3.selectAll(".slider .resize")
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 10)
  .classed("handle", true);

d3.select(".axis .domain")
  .select(function() {
    return this.parentNode.appendChild(this.cloneNode(true))
  })
  .classed("halo", true);

function brushed() {
  var lower = min,
    upper = max;

  if (brush.extent()[0] > brush.extent()[1]) {
    lower = brush.extent()[1];
    upper = brush.extent()[0];
  } else {
    lower = brush.extent()[0];
    upper = brush.extent()[1];
  }

  // console.log("brushed, lower: " + lower + " upper " + upper);
  updateVis(lower, upper);
}

function sliderUpdate() {
  var counter = 1;
  data.children.forEach(function(d) {
    var sum = 0;
    columns.forEach(function(q) {
      sum = sum + (d["norm-" + q] * $('#' + q + '_slider').slider('option', 'value'));
    });
    d["size"] = sum + d["incorrect_ratio"] * $('#incorrect_ratio_slider').slider('option', 'value');
    // If all sliders are zeros give all bubbles equal size.
    d["size"] = (d["size"] != 0) ? d["size"] : 100;

    if (counter == 1) {
      minSize = (d["size"] !== "undefined") ? d["size"] : minSize;
      maxSize = (d["size"] !== "undefined") ? d["size"] : maxSize;
    }

    if (d["size"] < minSize) {
      minSize = d["size"];
    }

    if (d["size"] > maxSize) {
      maxSize = d["size"];
    }
    counter += 1;
  });

  sizeScale = d3.scale.linear()
    .domain([minSize, maxSize])
    .range([0, 100])
    .clamp(true);

  brushed();
}

function updateVis(lower, upper) {
  // console.log("updateVis lower: " + lower + " upper " + upper);

  pack.value(function(d) {
    if (lower !== "undefined" && upper !== "undefined") {
      // console.log("lower and upper");
      if (sizeScale(d.size) >= lower && sizeScale(d.size) <= upper) {
        return d.size;
      } else {
        return 0;
      }
    } else {
      // console.log("else");
      return d.size;
    }

  });

  var data1 = pack.nodes(data);

  titles.attr("x", function(d) {
    return d.x;
  })
    .attr("y", function(d) {
      return d.y;
    })
    .text(function(d) {
      return d.name +
        (d.children ? "" : ": " + format(d.value));
    });

  circles.transition()
    .duration(500)
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", function(d) {
      return d.r;
    });

  texts.transition()
    .duration(1500)
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.children ? "" : d.exercise.substring(0, d.r / 3);
    });
};

var node,
  // List of column titles (numeric columns only, does not include 'Name'):
  columns = ["attempts", "hints", "time", "attempts_aft", "hints_aft", "time_aft"],
  scales = {}, // Computed min, max, and scale for each column attribute
  data = {},
  vis = null,
  circles = null,
  titles = null,
  texts = null;

d3.json("data/CS3114_KA.json", function(error, exercises) {
  if (error) {
    throw error;
  }

  // Compute min/max ranges and scales for each data attribute
  columns.forEach(function(q) {
    mn = d3.min(exercises, function(d) {
      return d[q];
    });
    mx = d3.max(exercises, function(d) {
      return d[q];
    });
    scales[q] = {
      min: mn,
      max: mx,
      scale: d3.scale.linear().domain([mn, mx]).range([0.0, 1.0])
    };
  });

  // Compute normalized exercise data for each attribute
  var counter = 1
  exercises.forEach(function(d) {
    var sum = 0;
    columns.forEach(function(q) {
      d["norm-" + q] = scales[q].scale(d[q]);
      sum = sum + (d["norm-" + q] * $('#' + q + '_slider').slider('option', 'value'));
    });
    d["incorrect_ratio"] = 1 - (d.corrects / (d.attempts + d.attempts_aft));
    d["size"] = sum + d["incorrect_ratio"] * $('#incorrect_ratio_slider').slider('option', 'value');

    if (counter == 1) {
      minSize = (d["size"] !== "undefined") ? d["size"] : minSize;
      maxSize = (d["size"] !== "undefined") ? d["size"] : maxSize;
    }

    if (d["size"] < minSize) {
      minSize = d["size"];
    }

    if (d["size"] > maxSize) {
      maxSize = d["size"];
    }
    counter += 1;
  });

  sizeScale = d3.scale.linear()
    .domain([minSize, maxSize])
    .range([0, 100])
    .clamp(true);


  data.children = exercises;

  vis = svg.datum(data).selectAll(".node")
    .data(pack.nodes)
    .enter()
    .append("g");

  circles = vis.append("circle")
    .attr("stroke", function(d) {
      return !d.children ? "black" : "#fff";
    })
    .style("fill", function(d) {
      return !d.children ? color(d.type) : "#fff";
    })
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", function(d) {
      return d.r;
    });

  titles = vis.append("title")
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .text(function(d) {
      return d.exercise +
        (d.children ? "" : ": " + format(d.exercise));
    });

  texts = vis.append("text")
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.children ? "" : d.exercise.substring(0, d.r / 3);
    });

  var legendObj = [{
    type: 0,
    name: "JSAV Exercise"
  }, {
    type: 1,
    name: "Programming Exercise"
  }, {
    type: 2,
    name: "Summary Exercise"
  }, {
    type: 3,
    name: "Programming Review Exercise"
  }, {
    type: 4,
    name: "True/False Exercise"
  }]

  // add legend
  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", diameter - 65)
    .attr("y", 50)
    .attr("height", 100)
    .attr("width", 100)
    .attr('transform', 'translate(-20,50)')


  legend.selectAll('rect')
    .data(legendObj)
    .enter()
    .append("rect")
    .attr("x", diameter - 65)
    .attr("y", function(d, i) {
      return i * 20;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d) {
      return color(d.type);
    })

  legend.selectAll('text')
    .data(legendObj)
    .enter()
    .append("text")
    .attr("x", diameter - 52)
    .attr("y", function(d, i) {
      return i * 20 + 9;
    })
    .text(function(d) {
      return d.name;
    });
});