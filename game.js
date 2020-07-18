var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var userPress=0;
var key=0;
$(document).keypress(function(){
  if(key==0){
  setTimeout(nextSequence,500);
    key=1;
  }
  return ;
});
$(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");
  // $(this).fadeOut(100).fadeIn(100);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  userPress+=1;
  if(userChosenColor!=gamePattern[userPress-1]){
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").html("Game-Over! Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    restartGame();
    return ;
  }
  if(userPress===level){
    setTimeout(nextSequence,1000);
    userPress=0;
    userClickedPattern=[];
  }
});

function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level+=1;
  $("h1").html("Level "+level);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
function restartGame(){
  level=0;
  userPress=0;
  gamePattern=[];
  userClickedPattern=[];
  key=0;
}

function playSound(value){
  var audio= new Audio("sounds/"+value+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
