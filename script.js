$(document).ready(function() {
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);
    // https://financialmodelingprep.com/developer/docs
    
   // var url = "https://financialmodelingprep.com/api/company/historical-price/GOOG?serietype=line&serieformat=array&datatype=json";
    //
   
    var url = "https://financialmodelingprep.com/api/company/historical-price/GOOG?from=2019-03-12&to=2019-11-12&serietype=line&serieformat=array&datatype=json"
 
  function drawChart () {
  
  $.ajax({
      url: url,
      type: "GET",
      crossDomain: true,
      success: function(response) {
      
         var graphData = response.historical;

     	graphData.forEach((item) => {
                        if(typeof item[0] === "string"){
                            var split = (item[0]).split(" ");
                            item[0] = new Date(split[3]+'/'+split[1]+'/'+split[2]);
                        }
                        });
             		console.log(graphData) ;        
				graphData.unshift(['Date', 'Close', 'Close']);
        var data = google.visualization.arrayToDataTable(graphData);

        var options =  {
                    crosshair: { trigger: 'both',orientation: 'both' },
                    seriesType: "line",
                    colors:['#3365cc'],
                    series: {
                        0: {targetAxisIndex:1 },
                        1:{targetAxisIndex:0, color: '#f1efb8'},
                    },
                    height: 300,
                    backgroundColor: {fill: '#FFFFFF'},
                     chartArea: {
                        height:'90%',
                        width: "90%",
                    },
                    legend: 'none',
 
                    trendlines: {
                    	0: {
                         type: 'polynomial',
                         degree: 3,
                         visibleInLegend: true,
                      	}
                     	 
                      },
                    vAxes: {
                        0: {
                            textStyle: {
                                fontSize: 10,
                                color: 'black'
                            },
                            gridlines: {
                                color: '#dcd7da'
                            },
                        },
                        1: {
                            textStyle: {
                                fontSize: 10,
                                color: 'black'
                            },
                            gridlines: {
                                color: '#dcd7da'
                            },
                        }
                        
                    },
        }
        

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);

      },

      error: function(xhr, status) {
        alert("error");
      }

    });
  
  }
 
 
});
