window.onload = function() {
  
  var searchForm = document.querySelector("#film_title")
  var searchBox = document.querySelector("#quickSearchBox")
  var searchBack = document.querySelector("#quickSearchBackground")
  
  searchForm.addEventListener("click", showSearchBox)
  searchBack.addEventListener("click", exitSearchBox)
  searchForm.addEventListener("keydown", loadTinyCard)

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
  
  function loadTinyCard() {
    wrapper = createElement("card-wrapper", searchBox)
    createElement("card tinyCard", wrapper, "hey")
  }
}