import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
ReactDOM.render(<App />, document.getElementById('root'))

var results1 = [];
var results2 = [];
var combine = [];
		
$(".searchbox").on("input", function() {
  AutoComplete();
});
   
function AutoComplete() {
  $(".searchbox").autocomplete({
    source: function(request, response) {   
      $.when(GetSeries(request), GetMovies(request)
            ).done(function() {
            	//Only combine the results when both "result" objects contain values.
              if (results1 != undefined && results2 != undefined) {
                combine = results2.concat(results1);   
                combine.sort(function(a, b){
                  return b.value.toLowerCase() > a.value.toLowerCase();
                });
          			response(combine);   
        			}
              else if (results1 != undefined) { //Set the response to results1 - Movies
                response(results1);
              }
              else if (results2 != undefined) { //Set the response to results2 - Series
                response(results2);
              }
      	});
    	}
	});
}
    
  
function GetMovies(request) {
	//Replace spaces with a '+'
	var url = request.term.replace(/\s/g,"+");
  return $.ajax({
    'url': 'https://www.omdbapi.com/?s=' + 
    url +
    '&type=movie&r=json',
    'dataType': 'json',
    'success': function(data) {
      var list = data.Search;
      if (list != undefined) {
        results1 = $.map(list, function(v,i){
          return {
            label: v.Title + ' MOVIE (' + v.Year + ')',
            value: v.Title
          }
        });
      }
      else results1 = undefined;
    }
  });
}


function GetSeries(request) {     
	var url = request.term.replace(/\s/g,"+");
  return $.ajax({
    'url': 'https://www.omdbapi.com/?s=' + 
    url +
    '&type=series&r=json',
    'dataType': 'json',
    'success': function(data) {
      var list = data.Search;
      if (list != undefined) {
        results2 = $.map(list, function(v,i){
          return {
            label: v.Title + ' SERIES (' + v.Year + ')',
            value: v.Title
          };
        });
      }
      else results2 = undefined;
    }
  });
}