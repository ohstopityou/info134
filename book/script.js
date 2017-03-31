function addToList() {
  
  var form = document.forms.reminderForm;
  var button = form.submit;
  var input = form.reminder;
  var list = document.getElementById("reminderList");
  var newli = document.createElement("li");
  
  //button.addEventListener("click", handleClick);
  
  handleClick();
  
  function handleClick(e) {
    //e.preventDefault();
    addLiElement()
  }
  
  function addLiElement() {
    //if input != empty
    list.appendChild(newli);
    newli.innerHTML=input.value;
    reminderForm.reset();
  }
  
  //function toggleStrikethrough{}
  
}