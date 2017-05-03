window.onload = function() {
  
  //get query parameters and movie databases
  query_params = get_query_string_parameters()
  genre_object = genres_object[query_params.id]
  review_object = reviews_object[query_params.id]
  
  //Create new http request
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  
  xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/?filter_id=" + query_params.id, true);
  
  xhr.onload = function(){ 
    movie_object = xhr.response.rows[0]
    //load page when response recieved
    loadPage()
  }
  
  xhr.send();
}

function createDataCard(name, container, flexbasis){
  wrapper = createElement("card-wrapper")
  if (flexbasis){
    wrapper.style.flexBasis = flexbasis + "px"
  }
  createElement("card-title", wrapper, name, "h2")
  card = createElement("card", wrapper)
  card.id=name
  container.appendChild(wrapper)
  return card
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
  
  
  //load actors before description on mobile
  if (window.innerWidth < 640){ 
    loadActors()
    loadDescription()
  } else {
    loadDescription()
    loadActors()
  }
  
  //load rest of data cards
  loadTrailer()
  loadReviews()
  
  //load user related data
  loadButtons()
  loadProfile()
}

function loadInfo() {
  
  var rating = "Snitt Rating : " + getAverageRating(movie_object) + " ★"
  
  if (window.innerWidth < 640){
    //if mobile, only load poster and title to header
    loadMovieCardInfo(movie_object, movieHeader, false)
    
    //create seperate card for info
    infoCard = createDataCard("Info", cardsContainer, 250)
    
    //load info data into info card
    createElement(null, infoCard, "År : "+movie_object["year"], "p")
    createElement(null, infoCard, "Løpetid :  "+movie_object["length"] + " min", "p")
    createElement(null, infoCard, "Sjanger : "+genres_object[query_params.id], "p")
    createElement(null, infoCard, "Land : "+movie_object["country"], "p")
    createElement(null, infoCard, rating, "p")
    
  } else {
    //desktop: load all info to movie header, and add rating
    loadMovieCardInfo(movie_object, movieHeader, true)
    createElement("rating", movieInfo, rating, "p")
  }
}

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
      actorsCard = createDataCard("Skuespillere", cardsContainer, 250)
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

function createReview(review_object, container) {
  
  var username  =  review_object["username"]
  var comment   =  review_object["comment"]
  var stars     =  review_object["rating"]
  var date      =  review_object["mod_date"]
  
  reviewContainer = createElement("review", container)
  
  createElement("username", reviewContainer, username, "p")
  createElement("stars",    reviewContainer, stars + " ★", "p")
  createElement("date",     reviewContainer, date, "p")
  if (comment) { 
    createElement("comment", reviewContainer, "Kommentar: "+comment, "p") }
}

function loadReviews(){
  
  var reviewsCard = createDataCard("Anmeldelser", cardsContainer, 550)
  var reviews = reviews_object[movieID]
  
  for (review in reviews){
    createReview(reviews[review], reviewsCard)
  }  
  
  //create form where user can post a review
  var userReview = createElement("userReview", reviewsCard, null, "form")
  var comment = createElement("commentForm", userReview, null, "input")
  comment.placeholder = "Kommentar"
  var ratingForm = createElement("ratingForm", userReview, null, "input")
  ratingForm.placeholder = " ★"
  createElement("button", userReview, "Send", "submit")
}

function loadButtons(){
  
  var buttonBar = createElement("buttonBar", movieInfo)  
  createElement("button", buttonBar, "Lagre")
  createElement("button", buttonBar, "Leie")
  
}
