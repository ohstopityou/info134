function toggleClass(elements, className) {
  console.log(elements, className);
  
  var getElements = document.getElementsByClassName(elements);
  //var mq = window.matchMedia( "(min-width: 1200px)" );
  for (var i = 0; i < getElements.length; i++) {

    if (getElements[i].classList.contains(className)){
      getElements[i].classList.remove(className);
    } else {
      getElements[i].className += " " + className;
    }
  }
}