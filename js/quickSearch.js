window.onload = function() {
  var searchForm = document.getElementById("search")
  var searchBox = document.getElementById("quickSearchBox")
  var searchBack = document.getElementById("quickSearchBackground")

  function searchBox(){
    console.log("searchbox")
    searchBox.style.display="block"
    searchBack.style.display="block"
  }
  
  function searchExit(){
    searchBox.style.display="none"
    searchBack.style.display="none"
  }
  
  searchForm.addEventListener("keydown", searchBox);
  searchBack.addEventListener("onclick", searchExit);
}