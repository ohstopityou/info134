console.log("loadMovies")

var validIDs = []

function loadMovieCard(movieId) {
  movieObject = movies_object[movieId]
  list_element = document.getElementById("insertAMovies")
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
  //createElement("button", movieInfo, "save")
  //createElement("button", movieInfo, "leie")
}

function createElement (classname, containerElement, innerHtml, type){
  if (type == null) {type = "div"}
  newDiv = document.createElement(type)
  if (classname != null){newDiv.className = classname}
  if (innerHtml != null){newDiv.innerHTML = innerHtml}
  if (containerElement != null) {containerElement.appendChild(newDiv)}
  return newDiv
}

function loadMovieImages(containerId){
  cardScroller = document.getElementById(containerId)
  
  for (var i = 0; i < 10; i++){
    id = getRandomId()
    movie = createElement("movie", cardScroller)
    movie_link = createElement(null, movie, null, "a")
    movie_link.href = "../movie.html?id=" + id;
    poster = createPosterByMovieId(id);   
    movie_link.appendChild(poster)
  }
}

function getRandomId(){
  var randomId = validIDs[Math.floor(Math.random()*3100)]
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
  for (var i = 0; i < 6; i++){
    loadMovieCard(getRandomId())
  }
}
