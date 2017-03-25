function panic(message) {
    // window.history.back();
    alert(message);
}

function setData() {
  cardsContainer = document.querySelector(".cards-container")
  loadDescription()
  loadActors()
  loadTrailer()
  loadReviews()
}

function loadDescription(){
  description = movie_object["description"]
  if (description != "" && description != null){
    cardsContainer.appendChild(createDataCard("Description"))
    descriptionCard = document.querySelector("#Description")
    descriptionCard.innerHTML=description
  }
}

function loadActors(){
  if (movie_object["folk"] != null){
    actors = movie_object["folk"].split(", ")
    if (actors[0] != ""){
      cardsContainer.appendChild(createDataCard("Actors"))
      actorsList = document.createElement("ul")
      actorsCard = document.getElementById("Actors")
      actorsCard.appendChild(actorsList)

      for (var i = 0; i < actors.length; i++){
        createElement(null, actorsList, actors[i], "li")
      }
    }
  }
}

function loadTrailer() {
  trailerId = movie_object["youtube trailer id"]
  if(trailerId != null && trailerId != ""){
    cardsContainer.appendChild(createDataCard("Trailer"))
    iframe = document.createElement("iframe")
    url = "https://www.youtube.com/embed/"+trailerId
    console.log(url)
    iframe.src=url
    trailerCard = document.querySelector("#Trailer")
    trailerCard.appendChild(iframe)
  }
}

function loadReviews(){
  cardsContainer.appendChild(createDataCard("Reviews"))
  commentsBox = document.querySelector("#Reviews")
  commentsList = document.createElement("ul")
  commentsBox.appendChild(commentsList)
  comments = getComments()
  for (var i = 0; i < comments.length; i++){
    li = document.createElement("li")
    li.innerHTML=comments[i]["mod_date"]
    commentsList.appendChild(li)
  } 
}

function createDataCard(name){
  wrapper = createElement("card-wrapper")
  createElement("card-title", wrapper, name, "h2")
  createElement("card", wrapper).id=name
  return wrapper
}

function getComments(){
  var reviews = []
    for (key in reviews_object){
    for (subkey in reviews_object[key]){
      if (reviews_object[key][subkey]["object"] == movie_object["id"])
      reviews.push(reviews_object[key][subkey])
    }
  }return reviews
}


window.onload = function() {
  
  query_params = get_query_string_parameters();
  if (!query_params.id) {
      panic("No id given");
      return;
  }

  // get the movie_object from the "database" movies_object
  movie_object = movies_object[query_params.id];
  if (!movie_object) {
  panic("Could not retrieve movie_object!");
  return;
  }
  
    // get the genre info (if it exists)
  genre_object = genres_object[query_params.id];
  // get the review info (if it exists)
  review_object = reviews_object[query_params.id];
  loadMovieCardInfo(movie_object["id"], document.querySelector(".movieHeader"))
  setData()
}
