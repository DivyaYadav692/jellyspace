(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

// Tabs
function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Risk Assessment chart
var matrix = [
  {//position 0
    Low: {  cost: 4},
    Medium: {  cost: 3},
     High: {  cost: 2}
  },
  {//position 1
    Low: {  cost: 3},
    Medium: {  cost: 4},
     High: {  cost: 2}
  },
  {//position 2
    Low: {  cost: 2},
    Medium: {  cost: 3},
     High: {  cost: 4}
  },
  {//position 3
    Low: {  cost: 3},
    Medium: {  cost: 2},
     High: {  cost: 4}
  },
   {//position 4
    Low: {  cost: 4},
    Medium: {  cost: 2},
     High: {  cost: 3}
  }];
//countsData for chart will be build using matrix
 var countsData = [  ['Low'], ['Medium'], ['High']];
_.each(matrix, function(category) {
    countsData[0].push(category['Low']['cost']);
    countsData[1].push(category['Medium']['cost']);
    countsData[2].push(category['High']['cost']);
});

var riskToColor = {
            Low: '#ACBCFF',
            Medium: '#98EECC',
            High: '#79E0EE'
        };
var categoriesList = ['Supply Disruptions', 'Demand Variability', 'Quality Issues', 'Cyber Security','Regulatory Compliance'];

var chart = c3.generate({
  bindto: '#cool-chart',
  size: {
    height: 350
    },
    data: {
        columns: countsData,
        type: 'bar',
        colors: riskToColor,
        groups: [
            ['Low', 'Medium', 'High']
        ],
       order: null,
       labels: {
         format: function (v, id, i, j) {
           return v;
         }},
      },
      axis: {
         rotated: true,
         x: {
          type: 'category',
          categories: categoriesList
         },
        y: {show: false}
       },
      tooltip: {
        contents: function (d) {
          var $$ = this, config = $$.config,text;
          console.log(d[0]);
          text = "<table class='" + $$.CLASS.tooltip + "'><tr><th colspan='3'>"+categoriesList[d[0].index]+"</th></tr>";
          text += "<tr class='" + $$.CLASS.tooltipName + "'>";
          text += "<td class='name'>Risk</td>";
          for (i = 0; i < d.length; i++) {
            text += "<tr class='" + $$.CLASS.tooltipName + "'>";
            text += "<td class='name'><span style='background-color:"+matrix[d[i].name]+"'></span>"+d[i].name+"</td>";
            text += "<td class='value'>"+matrix[d[i].x][d[i].name]['cost'];
           }
          return text + "</table>";
        }
     }
});

// Radar charts

var marksCanvas = document.getElementById("marksChart");

var marksData = {
  labels: ["International Market Expansion", "Cost Savings", "Customer Satisfaction", "Innovation", "Sustainability"],
  datasets: [{
    label: "Collaborative Partnerships",
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: 'rgb(54, 162, 235)',
    data: [7, 8, 9, 6, 7]
  },
   {
    label: "Technology Advancements",
    backgroundColor: "rgb(232, 147, 207,0.2)",
     borderColor:  "rgb(232, 147, 207)",
    data: [9, 8, 7, 9, 6]
  },
   {
    label: "Sustainability Initiatives",
    backgroundColor: "rgb(255, 99, 132,0.2)",
      borderColor: 'rgb(255, 99, 132)',
    data: [6, 7, 7, 5, 9]
  },
   {
    label: "International Market Expansion",
    backgroundColor: "rgb(196, 176, 255, 0.2)",
    borderColor: 'rgb(196, 176, 255)',
    data: [9, 6, 7, 8, 5]
  }]
};

var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: marksData
});


var barOptions_stacked = {
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            gridLines: {
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },

    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#fff";

            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    data = dataset.data[index];
                    if(i==0){
                        ctx.fillText(data, 50, bar._model.y+4);
                    } else {
                        ctx.fillText(data, bar._model.x-25, bar._model.y+4);
                    }
                }),this)
            }),this);
        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
};

var ctx = document.getElementById("Chart1");
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["2014", "2013", "2012", "2011"],

        datasets: [{
            data: [727, 589, 537, 543, 574],
            backgroundColor: "rgba(63,103,126,1)",
            hoverBackgroundColor: "rgba(50,90,100,1)"
        },{
            data: [238, 553, 746, 884, 903],
            backgroundColor: "rgba(163,103,126,1)",
            hoverBackgroundColor: "rgba(140,85,100,1)"
        },{
            data: [1238, 553, 746, 884, 903],
            backgroundColor: "rgba(63,203,226,1)",
            hoverBackgroundColor: "rgba(46,185,235,1)"
        }]
    },

    options: barOptions_stacked,
});
