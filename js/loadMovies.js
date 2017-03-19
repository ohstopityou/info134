console.log("loadMovies")

var validIDs = []

function loadMovieCard(movieId) {
  movieObject = movies_object[movieId]
  list_element = document.getElementById("insertAMovies")
  wrapper = document.createElement("div")
  wrapper.className="card-wrapper"
  card = document.createElement("div")
  card.className="card movieCard"
  item_link = document.createElement("A")
  item_link.href = "../movie.html?id=" + movieId

  list_element.appendChild(wrapper)
  wrapper.appendChild(card)
  card.appendChild(item_link)
  loadMovieCardInfo(movieId, item_link)
}

function loadMovieCardInfo(movieId, container){
  movieObject = movies_object[movieId]
  poster = createPosterByMovieId(movieId)
  
  movieinfo = document.createElement("div")
  movieinfo.className="movieInfo"
  title = document.createElement("p")
  title.className = "movieTitle"
  title.innerHTML=movieObject["otitle"]
  year = document.createElement("p")
  year.className= "year"
  year.innerHTML=( "("+ movieObject["year"]+")")
  runtime = document.createElement("p")
  runtime.className= "runtime"
  runtime.innerHTML=(movieObject["length"] + " min")
  genre = document.createElement("p")
  genre.className= "genre"
  genre.innerHTML=genres_object[movieId]
  country = document.createElement("p")
  country.className="country"
  country.innerHTML=movieObject["country"]
  
  container.appendChild(poster)
  container.appendChild(movieinfo)
  movieinfo.appendChild(title)
  movieinfo.appendChild(year)
  movieinfo.appendChild(runtime)
  movieinfo.appendChild(genre)
  movieinfo.appendChild(country)
}

function loadMovieRatingBar(){
  
}

function loadMovieImages(containerId){
  cardScroller = document.getElementById(containerId)
  
  for (var i = 0; i < 10; i++){
    id = getRandomId()
    
    movie = document.createElement("div")
    movie.className="movie"

    movie_link = document.createElement("a");
    movie_link.href = "../movie.html?id=" + id;
    
    poster = createPosterByMovieId(id)
    
    cardScroller.appendChild(movie)
    movie.appendChild(movie_link)
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
  console.log("createPoster")
  poster = document.createElement("div")
  poster.className="moviePoster"
  img = document.createElement("img");
  img.src = getUrlByMovieId(id)
  poster.appendChild(img)
  return poster
}

function loadMore() {
  for (var i = 0; i < 6; i++){
    loadMovieCard(getRandomId())
  }
}





