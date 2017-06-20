 $(function() {
      var treeData = {
          "name": "Top Level",
          "children": [{
                  "name": "Level 2: A",
                  "children": [{
                          "name": "Son of A"
                      },
                      {
                          "name": "Daughter of A"
                      }
                  ]
              },
              {
                  "name": "Level 2: B"
              }
          ]
      };

      var table = [{
              "name": "Hawkeye",
              "haschild": ""
          },
          {
              "name": "Richland",
              "haschild": "Hawkeye"
          },
          {
              "name": "Mukden",
              "haschild": "Hawkeye"
          },
          {
              "name": "Adams",
              "haschild": "Richland"
          },
          {
              "name": "john",
              "haschild": "Richland"
          },
          {
              "name": "jam",
              "haschild": "john"
          },
          {
              "name": "jam1",
              "haschild": "jam"
          },
          {
              "name": "wiz",
              "haschild": "jam1"
          },
          {
              "name": "khalifa",
              "haschild": "jam1"
          },
          {
              "name": "jam2",
              "haschild": "jam"
          },
          {
              "name": "jeremy",
              "haschild": "jam2"
          },
          {
              "name": "nutt",
              "haschild": "jam2"
          },
          {
              "name": "sam",
              "haschild": "john"
          },
          {
              "name": "sam1",
              "haschild": "sam"
          },
          {
              "name": "kapil",
              "haschild": "sam1"
          },
          {
              "name": "joshi",
              "haschild": "sam1"
          },
          {
              "name": "sam2",
              "haschild": "sam"
          },
          {
              "name": "samosa",
              "haschild": "sam2"
          },
          {
              "name": "chatni",
              "haschild": "sam2"
          },
          {
              "name": "Harly",
              "haschild": "Mukden"
          },
          {
              "name": "Harly1",
              "haschild": "Harly"
          },
          {
              "name": "Harly2",
              "haschild": "Harly"
          },
          {
              "name": "Monroe",
              "haschild": "Mukden"
          },
          {
              "name": "Monroe1",
              "haschild": "Monroe"
          },
          {
              "name": "Monroe2",
              "haschild": "Monroe"
          },
          {
              "name": "Dunfield",
              "haschild": "Adams"
          },
          {
              "name": "Illini",
              "haschild": "Adams"
          },
          {
              "name": "bill1",
              "haschild": "Illini"
          },
          {
              "name": "johnthan",
              "haschild": "bill1"
          },
          {
              "name": "martin",
              "haschild": "bill1"
          },
          {
              "name": "bill2",
              "haschild": "Illini"
          },
          {
              "name": "kay",
              "haschild": "bill2"
          },
          {
              "name": "eliyana",
              "haschild": "bill2"
          },
          {
              "name": "Lee",
              "haschild": "Dunfield"
          },
          {
              "name": "jackey",
              "haschild": "Lee"
          },
          {
              "name": "chan",
              "haschild": "Lee"
          },
          {
              "name": "bruse",
              "haschild": "Dunfield"
          },
          {
              "name": "bruse1",
              "haschild": "bruse"
          },
          {
              "name": "bruse2",
              "haschild": "bruse"
          }
      ]

      // Set the dimensions and margins of the diagram
      var margin = {
              top: 20,
              right: 90,
              bottom: 30,
              left: 90
          },
          width = 1332 - margin.left - margin.right,
          height = 900 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#treeSection").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .call(d3.zoom()
              .scaleExtent([1 / 2, 4])
              .on("zoom", zoomed));;

      var g = svg.append("g")
          .attr("transform", "translate(" +
              margin.left + "," + margin.top + ")");

      svg.append("rect")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("fill", "none")
      //.style("pointer-events", "all")


      function zoomed() {
          g.attr("transform", d3.event.transform);
      }

      var i = 0,
          duration = 750,
          root;

      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([height, width]);


      root = d3.stratify()
          .id(function(d) {
              return d.name;
          })
          .parentId(function(d) {
              return d.haschild;
          })
          (table);


      // Assigns parent, children, height, depth
      //root = d3.hierarchy(treeData, function(d) { return d.children; });
      root.x0 = height / 2;
      root.y0 = 0;

      // Collapse after the second level
      //root.children.forEach(collapse);

      update(root);

      // Collapse the node and all it's children
      function collapse(d) {
          if (d.children) {
              d._children = d.children
              d._children.forEach(collapse)
              d.children = null
          }
      }

      function update(source) {

          // Assigns the x and y position for the nodes
          var treeData = treemap(root);

          // Compute the new tree layout.
          var nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

          // Normalize for fixed-depth.
          nodes.forEach(function(d) {
              d.y = d.depth * 180
          });

          // ****************** Nodes section ***************************

          // Update the nodes...
          var node = g.selectAll('g.node')
              .data(nodes, function(d) {
                  return d.id || (d.id = ++i);
              });

          // Enter any new modes at the parent's previous position.
          var nodeEnter = node.enter().append('g')
              .attr('class', 'node')
              .attr("transform", function(d) {
                  return "translate(" + source.y0 + "," + source.x0 + ")";
              })
          //.on('click', click);

          // Add Circle for the nodes
          nodeEnter.append('circle')
              .attr('class', 'node')
              .attr('r', 1e-6)
              .style("fill", function(d) {
                  return d._children ? "lightsteelblue" : "#fff";
              }).on('click', click);

          // Add labels for the nodes
          // nodeEnter.append('text')
          //     .attr("dy", ".35em")
          //     .attr("x", function(d) {
          //         return d.children || d._children ? -13 : 13;
          //     })
          //     .attr("text-anchor", function(d) {
          //         return d.children || d._children ? "end" : "start";
          //     })
          //     .text(function(d) { return d.data.name + d.data.paretnt; });

          var foreignobj = nodeEnter.append("foreignObject")
              .attr("width", 50)
              .attr("height", 60)
              .attr("y", -20)
              .attr("x", function(d) {
                  return d.children || d._children ? -52 : 13;
              })
              .attr("text-anchor", function(d) {
                  return d.children || d._children ? "end" : "start";
              })
              // .append("xhtml:div")
              // //.style("font", "14px 'Helvetica Neue'")
              // .html(function(d) {
              //     return d.data.name + "</br>" + d.data.name + "</br>" + d.data.name
              // })
              ;

          // UPDATE
          var nodeUpdate = nodeEnter.merge(node);

          // Transition to the proper position for the node
          nodeUpdate.transition()
              .duration(duration)
              .attr("transform", function(d) {
                  return "translate(" + d.y + "," + d.x + ")";
              });

          // Update the node attributes and style
          nodeUpdate.select('circle.node')
              .attr('r', 10)
              .style("fill", function(d) {
                  return d._children ? "lightsteelblue" : "#fff";
              })
              .attr('cursor', 'pointer');


          // Remove any exiting nodes
          var nodeExit = node.exit().transition()
              .duration(duration)
              .attr("transform", function(d) {
                  return "translate(" + source.y + "," + source.x + ")";
              })
              .remove();

          // On exit reduce the node circles size to 0
          nodeExit.select('circle')
              .attr('r', 1e-6);

          // On exit reduce the opacity of text labels
          nodeExit.select('text')
              .style('fill-opacity', 1e-6);

          // ****************** links section ***************************

          // Update the links...
          var link = g.selectAll('path.link')
              .data(links, function(d) {
                  return d.id;
              });

          // Enter any new links at the parent's previous position.
          var linkEnter = link.enter().insert('path', "g")
              .attr("class", "link")
              .attr('d', function(d) {
                  var o = {
                      x: source.x0,
                      y: source.y0
                  }
                  return diagonal(o, o)
              });

          // UPDATE
          var linkUpdate = linkEnter.merge(link);

          // Transition back to the parent element position
          linkUpdate.transition()
              .duration(duration)
              .attr('d', function(d) {
                  return diagonal(d, d.parent)
              });

          // Remove any exiting links
          var linkExit = link.exit().transition()
              .duration(duration)
              .attr('d', function(d) {
                  var o = {
                      x: source.x,
                      y: source.y
                  }
                  return diagonal(o, o)
              })
              .remove();

          // Store the old positions for transition.
          nodes.forEach(function(d) {
              d.x0 = d.x;
              d.y0 = d.y;
          });

          // Creates a curved (diagonal) path from parent to the child nodes
          function diagonal(s, d) {

              path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

              return path
          }

          // Toggle children on click.
          function click(d) {
              console.log("click event fired");
              if (d.children) {
                  d._children = d.children;
                  d.children = null;
              } else {
                  d.children = d._children;
                  d._children = null;
              }
              update(d);
          }
      }

      $("#button1").click(function() {
          d3.selectAll("foreignObject > div").remove();
      });

      $("#button2").click(function() {
         d3.selectAll("foreignObject").append("xhtml:div")
             .style("word-wrap" , "break-word")
             .html(function(d) {
                  return d.data.name + "</br>" + d.data.name + "</br>" + d.data.name
              });
      });
  });