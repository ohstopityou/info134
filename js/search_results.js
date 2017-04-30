var results = []
var resultIndex = 0

var inputTitle      = ''
var inputActor      = ''
var inputDirector   = ''
var inputCountry    = ''
var inputGenre      = ''
var inputList       = ''

function getQuerys() {
  console.log("getQuerys")
  
  query_params = get_query_string_parameters();
  
  inputDirector = query_params.director;
  inputTitle = query_params.film_title;
  inputActor = query_params.actor;
  inputGenre = query_params.genre;
  inputCountry = query_params.country;
  inputList = query_params.list;
}

function search_for() {
  console.log("searching")
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

function inputMatchesData (iData, oData) {
  if (!iData) //user did not search for anything
    {return true}
  if (oData)  //checks if data is valid
    {return oData.toLowerCase().includes(iData.toLowerCase())}
  else        //user searched for x but data is invalid
    {return false}
}

function genreMatches(genreInput, id) {
  for (genre in genres_object[id]) {
    var genreData = genres_object[id][genre]
    if (inputMatchesData(genreInput, genreData)){return true}
  } 
  return false
}

function displayResults() {

  if (results.length == 0){ 
    document.querySelector(".cards-container").innerHTML = "" 
  }
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

window.onload = function() {
  getQuerys()
  search_for()
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