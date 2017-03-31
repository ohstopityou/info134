// Prevent default behaviour
// Typisk brukt på kode som jobber med form-elementer
// eller andre steder hvor man vil stoppe default behaviour
function detteSkjerNaarJegTrykkerPaaEnKnapp(e) {
	e.preventDefault();
}

// Hente ut elementer fra html-dokumentet

// Henter ut ett element med gitt id
var elem = document.getElementById("minID");

// Henter ut alle elementer med samme klasse
// Metoden returnerer HTMLCollection
var elements = document.getElementsByClassName("minKlasse");

// Henter ut det første elementet basert på en CSS-selector
var cssElements = document.querySelector("#minID");

// Henter ut alle elementer som matcher en CSS-selector
// Metoden returnerer en NodeList
var nodeList = document.querySelectorAll("div");

// Tilgang på navngitt formelement
// <form name="minForm" action="#" type="POST">
// <input type="text" name="reminder">
var minForm = document.forms.minForm; // minForm == navn på formen fra name-attributten

// hent ut form-element inne i formen
var inputFelt = document.forms.minForm.reminder; // reminder == navn på input-elementet

// Hent ut verdi fra input
var verdi = inputFelt.value;

// Reset en form - eks. Sette alle input-felt til blank
minForm.reset();

// Opprette nytt html-element i Javascript
var h1 = document.createElement("h1"); // her kan vi skrive feks, li, ul, p, img, div, section, article, aside osv....

// Sette tekstinnhold til h1-elementet
h1.innerHTML = "Dette er en H1-overskrift";
// Kan også bruke .innerText, men da vil html-tagger bli enkoded til vanlig tekst.

// Hente ut element og legge til nytt element
var div = document.querySelector("div"); // Henter ut første div på siden
// Legger til et element (i dette tilfelle h1) som barn av div'en
div.appendChild(h1);

