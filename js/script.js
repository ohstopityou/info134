function changeCardLength() {
  
  var status = document.getElementById("status");
  //var getCard = document.getElementsByClassName("moviecard");
  var getWrapper = document.getElementsByClassName("card-wrapper");
  var mq = window.matchMedia( "(min-width: 1200px)" );
  
  if (mq.matches) {
    status.style.backgroundColor="red";
  for (var i = 0; i < getWrapper.length; i++) {

    if (getWrapper[i].style.maxWidth == "1200px"){
      
      //sjekker object style, not media query style
      getWrapper[i].style.maxWidth = "580px";
      status.innerHTML="580";
    } else {
      
      getWrapper[i].style.maxWidth = "1200px";
      status.innerHTML="1200";
    }
  }
}
}