function loadDescription(){
  description = movie_object["description"]
  if (description){
    descriptionCard = createDataCard("Beskrivelse", cardsContainer)
    descriptionCard.innerHTML=description
  }
}

function loadActors(){
  if (movie_object["folk"] != null){
    actors = movie_object["folk"].split(", ")
    if (actors[0]){
      actorsCard = createDataCard("Skuespillere", cardsContainer)
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
  reviewsCard = createDataCard("Anmeldelser", cardsContainer)
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
  
  buttonBar = document.createElement("div")
  buttonBar.className="buttonBar"
  
  createElement("button", buttonBar, "Lagre")
  createElement("button", buttonBar, "Leie")
  movieTitle = document.querySelector(".movieInfo")
  console.log(movieTitle)
  insertAfter(buttonBar, movieTitle.lastChild)
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
  
  //get query parameters and movie databases
  query_params = get_query_string_parameters()
  genre_object = genres_object[query_params.id]
  review_object = reviews_object[query_params.id]
  
  //Create new http request
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  
  xhr.onload = function(){ 
    movie_object = xhr.response.rows[0]
    //load page when request recieved
    loadPage()
  }
  
  xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/?filter_id=" + query_params.id, true);
  
  xhr.send();
}

function loadPage() {

  //ends load if no valid id or no movie object found
  if (!query_params.id || !movie_object) { return }
  
  //set short names for often used elements
  movieID = movie_object["id"]
  cardsContainer = document.querySelector(".cards-container")
  movieHeader = document.querySelector(".movieHeader")
  
  //load data into movieHeader
  loadInfo()
  
  //load data into boxes below header
  loadDescription()
  loadActors()
  loadTrailer()
  loadReviews()
  loadButtons()
}

function loadInfo() {
  var rating = "Snitt Rating : " + getAverageRating(movieID) + " ★"
  if (window.innerWidth < 640){
    loadMovieCardInfo(movieID, movieHeader, false)
    
    infoCard = createDataCard("Info", cardsContainer)
    
    createElement("genre", infoCard, "Sjanger : "+genres_object[query_params.id], "p")
    createElement("year", infoCard, "År : "+movie_object["year"], "p")
    createElement("country", infoCard, "Land : "+movie_object["country"], "p")
    createElement("runtime", infoCard, "Løpetid :  "+movie_object["length"] + " min", "p")
    createElement("rating", infoCard, rating, "p")
    
  } else {
    loadMovieCardInfo(movieID, movieHeader, true)
    createElement("rating", movieInfo, rating, "p")
  }
}

