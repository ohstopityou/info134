function loadDescription(){
  console.log("loadDesc")
  description = movie_object["description"]
  if (description){
    descriptionCard = createDataCard("Description", cardsContainer)
    descriptionCard.innerHTML=description
  }
}

function loadActors(){
  if (movie_object["folk"] != null){
    actors = movie_object["folk"].split(", ")
    if (actors[0]){
      actorsCard = createDataCard("Actors", cardsContainer)
      actorsList = createElement(null, actorsCard, null, "ul")
      for (var i = 0; i < actors.length; i++){
        createElement(null, actorsList, actors[i], "li")
      }
    }
  }
}

function loadTrailer() {
  trailerId = movie_object["youtube trailer id"]
  if(trailerId != null && trailerId != ""){
    trailerCard = createDataCard("Trailer", cardsContainer)
    iframe = createElement(null, trailerCard, null, "iframe")
    iframe.src="https://www.youtube.com/embed/"+trailerId
  }
}

function loadReviews(){
  reviewsCard = createDataCard("Reviews", cardsContainer)
  tableHead = "<thead><tr><th>name</th><th>comment</th><th>rating</th><th>date</th></tr></thead>"
  table = createElement(null, reviewsCard, tableHead, "table")
  
  reviews = reviews_object[movieID]
  for (review in reviews){
    newRow = createElement(null, table, null, "tr")
    createElement(null, newRow, reviews[review]["username"], "td")
    createElement(null, newRow, reviews[review]["comment"], "td")
    createElement(null, newRow, reviews[review]["rating"], "td")
    createElement(null, newRow, reviews[review]["mod_date"], "td")
  }  
  console.log(getAverageRating(movieID))
  var reviewBar = "<td colspan='2'><input id='commentForm' placeholder='comment'></td><td><input id='ratingForm'></td><td><div class='button'>send</div></td>"
  createElement("reviewBar", table, reviewBar, "tr")
}

function loadButtons(){
  createElement("button", movieInfo, "save")
  createElement("button", movieInfo, "leie")
}

function createDataCard(name, container){
  wrapper = createElement("card-wrapper")
  createElement("card-title", wrapper, name, "h2")
  card = createElement("card", wrapper)
  card.id=name
  container.appendChild(wrapper)
  return card
}

window.onload = function() {
  
  //get the query params
  query_params = get_query_string_parameters();
  // get the movie_object from the "database" movies_object
  movie_object = movies_object[query_params.id];
  // get the genre info (if it exists)
  genre_object = genres_object[query_params.id];
  // get the review info (if it exists)
  review_object = reviews_object[query_params.id];
  
  //ends load if no valid id or no movie object found
  if (!query_params.id || !movie_object) {return}

  movieID = movie_object["id"]
  loadMovieCardInfo(movieID, document.querySelector(".movieHeader"), true)
  
  cardsContainer = document.querySelector(".cards-container")
  loadDescription()
  loadActors()
  loadTrailer()
  loadReviews()
  //loadButtons()
}