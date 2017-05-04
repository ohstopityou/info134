var current_user = "bruker1"

function loadProfile(callback) {
  var xhr = new XMLHttpRequest();
  
  //sender en GET request som spør om JSON objektet
  xhr.open("GET", "http://wildboy.uib.no/mongodb/profiles/?filter_username=" + current_user + "&limit=1", true);
  //spesifiserer at svaret er av typen json
  xhr.responseType = "json";

  //lager en metode som kjører når server svarer på GET requesten
  xhr.onload = function() {
    profile = xhr.response.rows[0];

    loadUsername()

    //callback method which will run when profile is loaded
    if(callback){
      callback()
    } 
  }
  xhr.send();
}

function loadUsername() {
  
  username_span = document.getElementById("loggedOnUser");
  if (username_span){
    //loads correct username in DOM
    username_span.innerHTML = profile.username;
  } else {
    console.log("Fant ikke brukernavn-elementet.");
  }
} 

//loads movies from users list using loadMoviesFrom()
function loadUserList() {
  
  switch (inputList) {
    case "myMovies":
      loadMoviesFrom(profile.mylist)
      break;
    case "myLoans":
      loadMoviesFrom(profile.loans)
      break;
    default: 
      console.log("Fant ikke listen")
      return;
  }
}
