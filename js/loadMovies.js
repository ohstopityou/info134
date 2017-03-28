console.log("loadMovies")

var validIDs = []
var myMovies = []
var myLoans = []

function loadMovieCard(movieId) {
  movieObject = movies_object[movieId]
  list_element = document.querySelector(".cards-container")
  wrapper = createElement("card-wrapper", list_element)
  card = createElement("card movieCard", wrapper)
  item_link = createElement(null, card, null, "a")
  item_link.href = "../movie.html?id=" + movieId
  loadMovieCardInfo(movieId, item_link)
}

function loadMovieCardInfo(movieId, container){
  movieObject = movies_object[movieId]
  container.appendChild(createPosterByMovieId(movieId))
  movieInfo = createElement("movieInfo", container)
  createElement("movieTitle", movieInfo, movieObject["otitle"])
  createElement("genre", movieInfo, genres_object[movieId], "p")
  createElement("year", movieInfo, "("+ movieObject["year"]+")", "p")
  createElement("country", movieInfo, movieObject["country"], "p")
  createElement("runtime", movieInfo, movieObject["length"] + " min", "p")
  createElement("button", movieInfo, "save")
  createElement("button", movieInfo, "leie")
}

function loadMovieScrollers(){
  cardsContainer = document.querySelector(".cards-container")
  recScroller = createMovieScroller("recommendations")
  newScroller = createMovieScroller("newly added")
  newMovies = getMoviesByNewest()
  loadMoviePosters(newScroller, newMovies)
  recMovies = getMoviesByRecommended()
  loadMoviePosters(recScroller, recMovies)
}

function createMovieScroller(name){
  movieScroller = createElement("card-wrapper moviescroller", cardsContainer)
  createElement("card-title", movieScroller, name, "h2")
  card = createElement("card", movieScroller)
  return card
}

function loadMoviePosters(container, fromThisArray, howMany){
  if( !howMany ){ howMany = 15 } //default value
  for (var i = 0; i < howMany; i++){
    id = fromThisArray[i]
    movie = createElement("movie", container)
    movie_link = createElement(null, movie, null, "a")
    movie_link.href = "../movie.html?id=" + id;
    movie_link.appendChild(createPosterByMovieId(id))
  }
}

function getMoviesByGenre(){
  
}

function getMoviesByNewest(){
  var moviesByNewest = []
  var i = validIDs.length - 1
  while (moviesByNewest.length < 50 && i != 0){
    moviesByNewest.push(validIDs[i])
    i--
  }
  return moviesByNewest;
}

function getMoviesByRecommended(){
  var moviesByRating = []
  var i = 0;
  while (moviesByRating.length < 50 && i != validIDs.length){
    if (getAverageRating(validIDs[i]) > 4.5){
      moviesByRating.push(validIDs[i])
    }
    i++
  }
  return moviesByRating;
}

function getAverageRating(id) {
  if (!reviews_object[id]){return 0}
  var rating = 0;
  var numbOfRatings = 0;
  for (review in reviews_object[id]){
    rating += reviews_object[id][review]["rating"]
    numbOfRatings ++;
  }
  return (rating / numbOfRatings).toFixed(3)
}

function getRandomId(idArray){
  var randomId = idArray[Math.floor(Math.random()*idArray.length)]
  return randomId;
}

function getIDs(){
  console.log("getIDs")
  for (id in movies_object){
    validIDs.push(movies_object[id]["id"])
  }
}

function getUrlByMovieId(id){
  var url = "https://nelson.uib.no/o/"
  var i = 0
  if (id >= 1000) {i = 1}
  if (id >= 2000) {i = 2}
  if (id >= 3000) {i = 3}
  if (id >= 4000) {i = 4}
  url += i+"/"+id+".jpg"
  return url
}

function createPosterByMovieId(id){
  poster = createElement("moviePoster")
  createElement("posterTitle", poster, movies_object[id]["otitle"], "h2")
  img = document.createElement("img");
  img.src = getUrlByMovieId(id);
  img.onerror = function(){
    this.style.display="none";
    this.parentElement.style.border = "10px solid black";
  }
  poster.appendChild(img)
  return poster
}

function loadMore() {
  console.log("loadMore")
  for (var i = 0; i < 2; i++){
    loadMovieCard(getRandomId(validIDs))
  }
}

function createElement (classname, container, innerHtml, type){
  if (type == null) {type = "div"}
  newDiv = document.createElement(type)
  if (classname){newDiv.className = classname}
  if (innerHtml){newDiv.innerHTML = innerHtml}
  if (container) {container.appendChild(newDiv)}
  return newDiv
}
