document.getElementById("playBox").style.display="none";
document.getElementById("score").style.display="none";
document.getElementById("instructions").style.display="none";
document.getElementById("scoreTwo").style.display="none";
document.getElementById("instructionsTwo").style.display="none";
document.getElementById("retry").style.display="none";
document.getElementById("board").style.display="none";

function playGame(url){
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = "game"
  script.src = url;
  head.appendChild(script);
  document.getElementById("startBox").style.display="none";
  document.getElementById("playBox").style.removeProperty('display');
  document.getElementById("score").style.removeProperty('display');
  document.getElementById("instructions").style.removeProperty('display');
  document.getElementById("scoreTwo").style.removeProperty('display');
  document.getElementById("instructionsTwo").style.removeProperty('display');
  document.getElementById("retry").style.removeProperty('display');
  document.getElementById("board").style.removeProperty('display');
}