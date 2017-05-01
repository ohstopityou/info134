window.onload = function() {
  getQuerys()
  search_for()
}

var results = []
var resultIndex = 0

var inputTitle      = ''
var inputActor      = ''
var inputDirector   = ''
var inputCountry    = ''
var inputGenre      = ''
var inputList       = ''

function getQuerys() {
  
  query_params = get_query_string_parameters();
  
  inputDirector = query_params.director;
  inputTitle = query_params.film_title;
  inputActor = query_params.actor;
  inputGenre = query_params.genre;
  inputCountry = query_params.country;
  inputList = query_params.list;
}

function search_for() {

  if (!noInput()){
    
    for (movie_id in movies_object){
      var movie_object = movies_object[movie_id]
      
      if (searchMatches(inputTitle, movie_object["otitle"])     && 
          searchMatches(inputActor, movie_object["folk"])       &&
          searchMatches(inputDirector, movie_object["dir"])     &&
          searchMatches(inputCountry, movie_object["country"])  &&
          genreMatches(inputGenre, movie_id))
          { results.push(movie_id) }
    }
  }
  if (inputList == "myloans") {
    results = myLoans
  }
  if (inputList == "mymovies") {
    results = myMovies
  }
  
  displayResults()
}

function noInput(){
  if (inputTitle    === ''  && 
      inputActor    === ''  && 
      inputDirector === ''  && 
      inputCountry  === ''  && 
      inputGenre    === '')
    { return true }
  return false
}

function searchMatches (search, checkValue) {
  if (!search)    //user did not search for anything
    {return true}
  if (checkValue) //checks if value is defined
    {return checkValue.toLowerCase().includes(search.toLowerCase())}
  else            //user searched for x but value does not match
    {return false}
}

function genreMatches(search, id) {
  if (!search)    //returns true if user did not search for anything
    {return true}
  
  for (entry in genres_object[id]) {
    //iterates over all genres linked to movie id
    var genre = genres_object[id][entry]
    //checks if search mathes genre
    if (searchMatches(search, genre)) {return true}
  }
  return false
}

function displayResults() {

  if (results.length == 0){ 
    document.querySelector(".cards-container").innerHTML = "" 
  }
  loadMore()
  loadMore()
}

function loadMore() {

  let container = document.querySelector(".cards-container")
  var loadTo = resultIndex + 6
  while (resultIndex < loadTo && resultIndex != results.length){
    if (window.innerWidth < 640){
      //loads small cards if mobile
      createMovieCard(results[resultIndex], container, "tinyCard")
    } else {
      createMovieCard(results[resultIndex], container)
    }
    resultIndex++
  }
  var resultsLeft = results.length - resultIndex
  if (resultsLeft <= 0){
    document.querySelector("#showMore").style.display = 'none';
    return;
  }
  var btnText = "Load more movies (" + resultsLeft + " more)"
}

//not used (made so we could have a dropdown menu for genres)

//function listAllGenres(){
//  uniqueGenres = []
//  for (movie_id in genres_object){
//    for (i in genres_object[movie_id]) {
//      var genre = genres_object[movie_id][i];
//      if(!uniqueGenres.includes(genre)){uniqueGenres.push(genre)}
//    } 
//  }
//  for (i in uniqueGenres){console.log(uniqueGenres[i])}
//}