// Make UI elements

function createElement (classname, container, innerHtml, type){
  if (type == null) {type = "div"}
  newDiv = document.createElement(type)
  if (classname) {newDiv.className = classname}
  if (innerHtml) {newDiv.innerHTML = innerHtml}
  if (container) {container.appendChild(newDiv)}
  return newDiv
}

function createMovieCard(id, container, extraClass) {
  movie_object = movies_object[id]
  var loadAll = true;
  
  wrapper = createElement("card-wrapper", container)
  card = createElement("card movieCard", wrapper)
  item_link = createElement(null, card, null, "a")
  item_link.href = "show_movie.html?id=" + id
  if (extraClass) {
    card.className += " " + extraClass;
    loadAll = false;
  }
  loadMovieCardInfo(movie_object, item_link, loadAll)
  return card
}

function loadMovieCardInfo(movie, container, loadAll){
  
  container.appendChild(createMoviePoster(movie))
  movieInfo = createElement("movieInfo", container)
  createElement("movieTitle", movieInfo, movie["otitle"])
  
  if (loadAll){
    createElement("genre", movieInfo, genres_object[movie.id], "p")
    createElement("year", movieInfo, "("+ movie["year"]+")", "p")
    createElement("country", movieInfo, movie["country"], "p")
    createElement("runtime", movieInfo, movie["length"] + " min", "p")
  }
}

function createMoviePoster(movie){

  poster = createElement("moviePoster")
  createElement("posterTitle", poster, movie["otitle"], "h2")
  img = document.createElement("img");
  img.src = getImgUrl(movie);
  img.onerror = function(){
    this.style.display="none";
    this.parentElement.style.border = "10px solid black";
  }
  poster.appendChild(img)
  return poster
}

// Other

function getImgUrl(movie){
  
  var url = "https://nelson.uib.no/o/"
  var i = 0
  if (movie.id >= 1000) {i = 1}
  if (movie.id >= 2000) {i = 2}
  if (movie.id >= 3000) {i = 3}
  if (movie.id >= 4000) {i = 4}
  url += i+"/"+movie.id+".jpg"
  return url
}

function getAverageRating(movie) {
  var id = movie.id
  if (!reviews_object[id]){return 0}
  var rating = 0;
  var numbOfRatings = 0;
  for (review in reviews_object[id]){
    rating += reviews_object[id][review]["rating"]
    numbOfRatings ++;
  }
  return (rating / numbOfRatings).toFixed(1)
}

function toggleClass(elements, className) {
  console.log(elements, className);
  
  var getElements = document.getElementsByClassName(elements);
  //var mq = window.matchMedia( "(min-width: 1200px)" );
  for (var i = 0; i < getElements.length; i++) {

    if (getElements[i].classList.contains(className)){
      getElements[i].classList.remove(className);
    } else {
      getElements[i].className += " " + className;
    }
  }
}