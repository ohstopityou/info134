window.onload = function() {
  
  searchForm = document.querySelector("#film_title")
  resultList = document.querySelector("#quickSearchBox")
  searchBack = document.querySelector("#quickSearchBackground")

  searchForm.addEventListener("click", showResultList)
  searchBack.addEventListener("click", exitResultList)
  searchForm.addEventListener("keyup", instantSearch)
  
  loadValidIDs()
  loadMovieScrollers()
  loadProfile()
}

var validIDs = []

function loadValidIDs(){
  for (id in movies_object){
    validIDs.push(movies_object[id]["id"])
  }
}

//search

function showResultList(){
  //shows the resultlist and adds a filter to page
  resultList.style.height="auto"
  resultList.style.opacity="1"
  searchBack.style.height="100%"
  searchBack.style.opacity="1"
}

function exitResultList(){
  //exits the resultList and removes filter
  resultList.style.height="0"
  resultList.style.opacity="0"
  searchBack.style.height="0"
  searchBack.style.opacity="0"
}

function instantSearch(e) {
  
  //clears resultlist if searchterm is empty
  if ( this.value === '' ) { resultList.innerHTML = "" }
  //else displays the results
  else { displayResults( fuzzySearch(this.value) ) }
  
}

function fuzzySearch(searchTerm) {
  
  //method for filtering id´s
  var nameMatches = function(id) {
    var movieName = movies_object[id]["otitle"]
    return movieName.toLowerCase().includes(searchTerm.toLowerCase());
  }
  
  return validIDs.filter(id => nameMatches(id));
}

function displayResults(results) {

  //clears resultlist
  resultList.innerHTML = "";

  var index = 0;
  //adds movies to DOM until results is empty or resultList is full
  while (index < results.length && index < 10) {
    createMovieCard(results[index], resultList, "tinyCard")
    index++;
  }
}

//moviescrollers

function loadMoviePosters(container, fromThisArray, howMany){
  if( !howMany ){ howMany = 12 } //default value
  for (var i = 0; i < howMany; i++){
    var id = fromThisArray[i]
    var poster = createElement("scrollerMovie", container)
    movie_link = createElement(null, poster, null, "a")
    movie_link.href = "show_movie.html?id=" + id;
    movie_link.appendChild(createMoviePoster(movies_object[id]))
  }
}

function createMovieScroller(name){
  movieScroller = createElement("card-wrapper moviescroller", cardsContainer)
  createElement("card-title", movieScroller, name, "h2")
  card = createElement("card", movieScroller)
  return card
}

function loadMovieScrollers(){
  cardsContainer = document.querySelector(".cards-container")
  
  newScroller = createMovieScroller("Nylig lagt til")
  loadMoviePosters(newScroller, getMoviesByNewest())
  
  recScroller = createMovieScroller("Anbefalinger")
  loadMoviePosters(recScroller, getMoviesByRecommended())
  
  lastLoanedScroller = createMovieScroller("Nylig lånt")
  loadMoviePosters(lastLoanedScroller, getMoviesByLoaned())
}

function getMoviesByNewest(howMany){
  if( !howMany ){ howMany = 15 } //default value
  var moviesByNewest = []
  var i = Object.keys(movies_object).length
  while (moviesByNewest.length < howMany && i != 0){
    if (movies_object[i]){
      moviesByNewest.push(i)
    }
    i--
  }
  return moviesByNewest;
}

function getMoviesByRecommended(howMany){
  if( !howMany ){ howMany = 15 } //default value
  var moviesByRating = []
  var i = Object.keys(movies_object).length; //start from end
  
  //find more movies until no more movies or satisfied with howmany
  while (moviesByRating.length < howMany && i != 0){
    var movie = movies_object[i]
    
    //add movie if its a valid movie avg rating is above 4.5
    if (movie && getAverageRating(movie) > 4.5){
      moviesByRating.push(i)
    }
    i--
  }
  return moviesByRating;
}

function getMoviesByLoaned(howMany){
  if( !howMany ){ howMany = 15 } //default value
  var moviesByLoaned = []
  for (var i = 0; i < howMany; i++){
    moviesByLoaned.push(getRandomId())
  }
  return moviesByLoaned;
}

function getRandomId(){
  var length = Object.keys(movies_object).length
  
  //try a new id until a valid one is found
  do { randomId = Math.floor(Math.random()*length) } 
  while (!movies_object[randomId])
  
  return randomId;
}