window.onload = function() {
    
    var i = 0;
    for (movie_id in movies_object){
      movie_object = movies_object[movie_id];
      if (i < 0){
        i++;
        loadMovie(movie_id)
    }
}
}

function loadMovie(movieId) {
      movieObject = movies_object[movieId];
      list_element = document.getElementById("insertAMovies");
      
      wrapper = document.createElement("div");
      wrapper.className="card-wrapper";
      
      card = document.createElement("div");
      card.className="card movieCard tinyCard";
      
      moviePoster = document.createElement("div");
      moviePoster.className="moviePoster";
      
      img = document.createElement("img");
      img.src="http://placehold.it/40x40";
      
      movieinfo = document.createElement("div");
      movieinfo.className="movieinfo";
      
      item_link = document.createElement("A");
      item_link.href = "../movie.html?id=" + movieId;
      movie_title = document.createTextNode(movieObject["otitle"]);
      
      director = document.createTextNode(movieObject["dir"]);
      
      list_element.appendChild(wrapper);
      wrapper.appendChild(card);
      card.appendChild(item_link);
      item_link.appendChild(moviePoster);
      moviePoster.appendChild(img);
      item_link.appendChild(movieinfo);
      movieinfo.appendChild(movie_title);
}