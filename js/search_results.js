function search_for(title, actor, director, genre, country) {  
  var results = []
  
  var titleMatch = function(object){
    return movie_object["otitle"].toLowerCase().includes(title.toLowerCase())
  }
  var actorMatch = function(object){
    return movie_object["actor"].toLowerCase().includes(actor.toLowerCase())
  }
  var directorMatch = function(object){
    return movie_object["otitle"].toLowerCase().includes(director.toLowerCase())
  }
  var genreMatch = function(object){
    return movie_object["otitle"].toLowerCase().includes(genre.toLowerCase())
  }
  var countryMatch = function(object){
    return movie_object["otitle"].toLowerCase().includes(country.toLowerCase())
  }
  
  if (title     === '' && 
      actor     === '' && 
      director  === '' && 
      genre     === '' && 
      country   === ''){
      console.log("No input")}
  else{
    var j = 0;
    for (movie_id in movies_object){
      if (j < 5){
      movie_object = movies_object[movie_id]
      console.log(country.toLowerCase())
      
      console.log(movie_object["country"].toLowerCase().includes(country.toLowerCase()))
      console.log((country === ''))
      if ((movie_object["otitle"].toLowerCase().includes(title.toLowerCase())    || (title === ''))    &&
         (movie_object["folk"].toLowerCase().includes(actor.toLowerCase())       || (actor === ''))    &&
         (movie_object["dir"].toLowerCase().includes(director.toLowerCase())     || (director === '')) &&
         //(movie_object["genre"].toLowerCase().includes(genre.toLowerCase())   || genre === '')     &&
         (movie_object["country"].toLowerCase().includes(country.toLowerCase())  || (country === ''))) {
        results.push(movie_id) 
        console.log(results.length)
        }
      j++;
    }
    }
  }//end else
  displayResults(results)
}

function displayResults(results) {
  if (results.length > 0){ resetSearchResults() }
  
  var resultList = document.getElementById("resultList")
  var j = 0;
  for(var i = 0; i < results.length; i++) {
    if (j < 20){
        loadMovie(results[i])
        j++;
    }
  }
}

function resetSearchResults() {
	document.getElementById("insertAMovies").innerHTML = "";
}

window.onload = function() {
  
	query_params = get_query_string_parameters();
  
    var film_title = ''
    var actor = ''
    var director = ''
    var genre = ''
    var country = ''

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