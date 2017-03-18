function search_for(title, actor, director, genre, country) {  
  var results = []
  
  if (title     === '' &&
      actor     === '' && 
      director  === '' &&
      country   === '' && 
      genre     === '')
    {console.log("no input")}
  else {
    for (movie_id in movies_object){
      movie_object = movies_object[movie_id]
      
      if (inputMatchesData(title, movie_object["otitle"])     && 
          inputMatchesData(actor, movie_object["folk"])       &&
          inputMatchesData(director, movie_object["dir"])     &&
          inputMatchesData(country, movie_object["country"])  &&
          genreMatches(genre, movie_id))
          { results.push(movie_id) 
          //console.log(movie_object)
          //console.log(genres_object[movie_id])
          }
    }
  }//end else
  displayResults(results)
}

function listAllGenres(){
  uniqueGenres = []
  for (movie_id in genres_object){
    for (i in genres_object[movie_id]) {
      var genre = genres_object[movie_id][i];
      if(!uniqueGenres.includes(genre)){uniqueGenres.push(genre)}
    } 
  }
  for (i in uniqueGenres){console.log(uniqueGenres[i])}
}

function genreMatches(genreInput, movie_id) {
  for (i in genres_object[movie_id]) {
    var genreData = genres_object[movie_id][i]
    if (inputMatchesData(genreInput, genreData)){return true}
  } return false
}

var inputMatchesData = function(iData, oData) {
  if (iData === '') {return true} //user did not search for anything
  if (oData != null) {return oData.toLowerCase().includes(iData.toLowerCase())}
  else {return false}             //user searched for x but data is null
}

function displayResults(results) {
  if (results.length > 0){ resetSearchResults() }
  var resultList = document.getElementById("resultList")
  var j = 0;
  for(var i = 0; i < results.length; i++) {
    if (j < 10){
        loadMovieCard(results[i])
        j++;
    }
  }
}

function resetSearchResults() {
	document.getElementById("insertAMovies").innerHTML = "";
}

window.onload = function() {
	query_params = get_query_string_parameters();
  
    var film_title  = ''
    var actor       = ''
    var director    = ''
    var genre       = ''
    var country     = ''

	if (query_params.film_title) {
        film_title = query_params.film_title;
    }
	if (query_params.actor) {
		actor = query_params.actor;
    }
	if (query_params.director) {
		director = query_params.director;
    }
	if (query_params.genre) {
		genre = query_params.genre;
    }
	if (query_params.country) {
		country = query_params.country;
    }
  
    search_for(film_title, actor, director, genre, country)
}