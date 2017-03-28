window.onload = function() {
  
  var searchForm = document.querySelector("#film_title")
  var searchBox = document.querySelector("#quickSearchBox")
  var searchBack = document.querySelector("#quickSearchBackground")
  
  searchForm.addEventListener("click", showSearchBox)
  searchBack.addEventListener("click", exitSearchBox)
  searchForm.addEventListener("keypress", loadQuickSearchResult)

  function showSearchBox(){
    console.log("searchbox")
    searchBox.style.height="auto"
    searchBox.style.opacity="1"
    searchBack.style.height="100%"
    searchBack.style.opacity="1"
  }
  
  function exitSearchBox(){
    searchBox.style.height="0"
    searchBox.style.opacity="0"
    searchBack.style.height="0"
    searchBack.style.opacity="0"
  }
  
  function loadQuickSearchResult(movieId) {
    console.log(searchForm.value)
    wrapper = createElement("card-wrapper", searchBox)
    card = createElement("card tinyCard", wrapper)
    card.appendChild(createPosterByMovieId(1))
    var movieTitle = movies_object[1]["otitle"]
    movieInfo = createElement("movieInfo", card)
    createElement("movieTitle", movieInfo, movieTitle) 
  }
}