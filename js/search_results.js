console.log("searchResults")

inputTitle      = ''
inputActor      = ''
inputDirector   = ''
inputGenre      = ''
inputCountry    = ''
inputList       = ''

function search_for() {
  console.log("searching")
  var results = []
  if (!noInput()){
    for (movie_id in movies_object){
      movie_object = movies_object[movie_id]
      
      if (inputMatchesData(inputTitle, movie_object["otitle"])     && 
          inputMatchesData(inputActor, movie_object["folk"])       &&
          inputMatchesData(inputDirector, movie_object["dir"])     &&
          inputMatchesData(inputCountry, movie_object["country"])  &&
          genreMatches(inputGenre, movie_id))
          { results.push(movie_id) }
    }
  }
  if (inputList == "mymovies") {
    results = getMoviesByNewest()
  }
  displayResults(results)
}

function noInput(){
  if (inputTitle    === ''  && 
      inputActor    === ''  && 
      inputDirector === ''  && 
      inputCountry  === ''  && 
      inputGenre    === '')
    {
      console.log("no input found")
      return true
    }
  console.log("input found")
  return false
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
  if (!iData) //user did not search for anything
    {return true}
  if (oData)  //checks if data is valid
    {return oData.toLowerCase().includes(iData.toLowerCase())}
  else        //user searched for x but data is invalid
    {return false}
}

function displayResults(results) {
  console.log(results.length)
  if (results.length == 0){ resetSearchResults() }
  var j = 0;
  for(var i = 0; i < results.length; i++) {
    if (j < 10){
      loadMovieCard(results[i])
      j++;
    }
  }
}

function resetSearchResults() {
  document.querySelector(".cards-container").innerHTML = "";
}

window.onload = function() {
  console.log("searchOnload")
  search_for()
}

function getQuerys() {
    query_params = get_query_string_parameters();

  if (query_params.film_title) {
      inputTitle = query_params.film_title;
  }
  if (query_params.actor) {
      inputActor = query_params.actor;
  }
  if (query_params.director) {
      inputDirector = query_params.director;
  }
  if (query_params.genre) {
      inputGenre = query_params.genre;
  }
  if (query_params.country) {
      inputCountry = query_params.country;
  }
  if (query_params.list) {
      inputList = query_params.list;
  }
}