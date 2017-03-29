window.onload = function() {
  
  var searchForm = document.querySelector("#film_title")
  var resultList = document.querySelector("#quickSearchBox")
  var searchBack = document.querySelector("#quickSearchBackground")
  
  searchForm.addEventListener("click", showResultList)
  searchBack.addEventListener("click", exitResultList)
  searchForm.addEventListener("keyup", instantSearch)

  function showResultList(){
    console.log("resultList")
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
	// Hvis verdien i input-feltet er tom
	if(this.value === '') {
		// Da resetter vi søkeresultatene 
		resetSearchResults();
		// og returnerer fra metoden
		return;
	}
	// Ellers så bruker vi fuzzyAnimalSearch-metoden
	var results = fuzzyAnimalSearch(this.value);
    console.log(results)
	// Og viser resultatene
	displayResults(results);
  }
  
  function resetSearchResults() {
	resultList.innerHTML = "";
  }
  
  function displayResults(results) {
    
    resetSearchResults()
    
    var index = 0;
    while (index < results.length && index < 10) {
      wrapper = createElement("card-wrapper", resultList)
      card = createElement("card movieCard tinyCard", wrapper)
      item_link = createElement(null, card, null, "a")
      item_link.href = "../movie.html?id=" + results[index]
      item_link.appendChild(createPosterByMovieId(results[index]))
      var movieTitle = movies_object[results[index]]["otitle"]
      movieInfo = createElement("movieInfo", item_link)
      createElement("movieTitle", movieInfo, movieTitle)
      index++;
    }
  }
  
  function fuzzyAnimalSearch(searchTerm) {
	
    var nameMatches = function(id) {
      var movieName = movies_object[id]["otitle"]
      return movieName.toLowerCase().includes(searchTerm.toLowerCase());
    }

	return validIDs.filter(id => nameMatches(id));
  }
}


