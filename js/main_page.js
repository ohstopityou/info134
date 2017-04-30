var validIDs = []

window.onload = function() {
  
  searchForm = document.querySelector("#film_title")
  resultList = document.querySelector("#quickSearchBox")
  searchBack = document.querySelector("#quickSearchBackground")

  searchForm.addEventListener("click", showResultList)
  searchBack.addEventListener("click", exitResultList)
  searchForm.addEventListener("keyup", instantSearch)
  
  getIDs()
  loadMovieScrollers()
}

function showResultList(){
  resultList.style.height="auto"
  resultList.style.opacity="1"
  searchBack.style.height="100%"
  searchBack.style.opacity="1"
}

function exitResultList(){
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

function displayResults(results) {

  resultList.innerHTML = "";

  var index = 0;
  while (index < results.length && index < 10) {
    createMovieCard(results[index], resultList, "tinyCard")
    index++;
  }
}

function fuzzySearch(searchTerm) {

  var nameMatches = function(id) {
    var movieName = movies_object[id]["otitle"]
    return movieName.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return validIDs.filter(id => nameMatches(id));
}

function getIDs(){
  for (id in movies_object){
    validIDs.push(movies_object[id]["id"])
  }
}

//    wrapper = createElement("card-wrapper", resultList)
//    card = createElement("card movieCard tinyCard", wrapper)
//    item_link = createElement(null, card, null, "a")
//    item_link.href = "../movie.html?id=" + results[index]
//    item_link.appendChild(createPosterByMovieId(results[index]))
//    var movieTitle = movies_object[results[index]]["otitle"]
//    movieInfo = createElement("movieInfo", item_link)
//    createElement("movieTitle", movieInfo, movieTitle)