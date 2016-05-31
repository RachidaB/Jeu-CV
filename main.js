

window.addEventListener('DOMContentLoaded',function () {



  window.requestAnimFrame = (function(){
      return window.requestAnimationFrame       || // La forme standardisée
             window.webkitRequestAnimationFrame || // Pour Chrome et Safari
             window.mozRequestAnimationFrame    || // Pour Firefox
             window.oRequestAnimationFrame      || // Pour Opera
             window.msRequestAnimationFrame     || // Pour Internet Explorer
             function(callback){
                 window.setTimeout(callback, 1000 / 60);
             };
  })();


  var canvas = window.document.getElementById('frontCanvas'),
      context = canvas.getContext('2d'),
      width = canvas.width ,
      height = canvas.height ,
      joueur = obj.create(20, 20,50,50),
      skillsSrc =["css.png","html.png","javascript.png","angular.png","nodejs.png","mongodb.png","meteor.png","bootsrap.png","express.png","jquery.png"],
      skillsNames = ["css","html","javascript","angular","nodejs","mongodb","meteor","bootsrap","express","jquery"],
      skills = [
      {
        src :"angular.png",
        name :"angular",
        width : 482 ,
        height : 512
      },
      {
        src : "css.png",
        name :"css",
        width : 363 ,
        height : 512
      },
      {
        src :"html.png",
        name :"html",
        width : 363 ,
        height : 512
      },
      {
        src :"javascript.png",
        name :"javascript",
        width : 512 ,
        height : 512
      },
      {
        src :"nodejs.png"  ,
        name :"nodejs",
        width : 454 ,
        height : 512
      },
      {
        src :"mongodb.png" ,
        name :"mongodb",
        width : 1796 ,
        height : 512
      },
      {
        src :"meteor.png" ,
        name :"meteor",
        width : 522 ,
        height : 512
      },
      {
        src :"bootsrap.png"  ,
        name :"bootsrap",
        width : 512 ,
        height : 512
      },
      {
        src :"express.png"   ,
        name :"express",
        width : 1759 ,
        height : 512
      },
      {
        src :"jquery.png" ,
        name :"jquery",
        width : 2260 ,
        height : 512
      }
    ],
      tab =[],
      bonus =[],
      lastEnemy =  0,
      lastBonus = 0,
      pause = true,
      score = 0,
      vie = 3;
      var sample = document.getElementById("music")[0];
////////////////  Affichage  //////////////////////////////
      var textScore = window.document.getElementById('textScore');
      var textVie = window.document.getElementById('textVie');

      context.fillStyle = "#ffee88";
      var img = new Image();
      var img2 = new Image();
      var img3 = new Image();

      $( ".monImg" ).click(function() {
        document.getElementById("music")[0];
  			$("#accueil").css( 'display', 'none');
  			$('#espaceJeu').css( 'display', 'block');
  			pause = true;
  		});

////////////// Creation des objets //////////////////////
      for(var i=0;i<10;i++) {
        tab[i] = obj.create(Math.random() * width +(i*300) ,Math.random() * height,40,40);
        bonus[i] = obj.create(Math.random() * width +(i*200) ,Math.random() * height,150,150);
      };


      update();
// console.log('dehors boucle pause = '+pause);
    	function update() {
        textScore.innerHTML = "Score : "+score;
        textVie.innerHTML = "Vie : "+vie;
        if(pause){
    		context.clearRect(0, 0, width, height);


/////////////////      Generation       ////////////////////

        img.src = 'images/witch.png';
        context.drawImage(img,450,210,64,64, joueur.x, joueur.y,50,50); /// joueur


        for(var i=0;i<10;i++) {
          if(bonus[i]){

            img2.src = 'images/'+ skills[i].src;
            context.drawImage(img2,0,0,skills[i].width,512,bonus[i].x, bonus[i].y,150,150);
            bonus[i].name = skills[i].name;
            bonus[i].left();
          }
        };

        for(var i=0;i<3;i++) {    // ennemis
          img3.src = 'images/enemy.png';
          context.drawImage(img3,0,0,100,100,tab[i].x, tab[i].y,40,40);
          tab[i].left();
        };

//////////////// edge handling /////////////////////////
        if(joueur.x + joueur.width > 290) {  // left
          joueur.x --;
        }else {
          if(joueur.x - 1 < 0) {
            joueur.x ++; // right
          }else {
            if(joueur.y - 1 < 0) {
              joueur.y ++; // top
            }else {
              if(joueur.y + 1 > 100) { // bottom
                joueur.y --;
              }
            }
          }
        }
  //////////////       Regeneration     ///////////////////
        for(var i=0;i<3;i++) {
          if(tab[i].x + 40 < 0 ) {
            tab[i] = obj.create(width ,Math.random() * height,40,40);// ennemis
          };
        };

        for(var i=0;i<bonus.length;i++) {     // bonus
          if(bonus[i] && bonus[i].x + 64 < 0 ) {
              bonus[i].x = width ;
              bonus[i].y = Math.random() * height;
              bonus[i].left();
          }
        };
///////////////     deplacement       ////////////////////////////
        window.onkeydown = function(event){

          switch(event.keyCode){
            case 37: //left
              joueur.left();
            break;
            case 38: // haut
              joueur.top();
              event.preventDefault();
            break;
            case 39: // right
              joueur.right();
            break;
            case 40: // bas
              joueur.bottom();
      				event.preventDefault();
            break;
            default:

           };
        };
///////////////       Colistion       //////////////////////
        for(var i=0;i<10;i++) {
          if(obj.rectIntersect(joueur,tab[i])) {  // tester la collision entre joueur et ennemis
            if (vie == 0){
              pause = true;
              var menuJeux = window.document.getElementById('pause');
              menuJeux.style.visibility = "visible";
              context.font = "57px cool";
          		context.fillStyle = "#8E3557";
          		context.fillText("Game over" ,20, 90);
          } else {
              if(lastEnemy != tab[i]) {
                vie -= 1;
                lastEnemy = tab[i];
              }
            }
          };
        };

        for(var i=0;i<bonus.length;i++) {   // tester la collision entre joueur et bonus
          if(bonus[i] && obj.rectIntersect(joueur,bonus[i])) {
            if (score == 10){
              pause = false;         //  You win
              var menuJeux = window.document.getElementById('pause');
              menuJeux.style.visibility = "visible";
              context.font = "57px cool";
          		context.fillStyle = "#8E3557";
          		context.fillText("You win" ,55, 90);
              context.font = "14px cool";
              context.fillText("vous pouver acceder a mon CV" ,65, 120);
            } else {
              if(bonus[i] && lastBonus != bonus[i]) {
                score += 1;
                lastBonus = bonus[i];
                document.getElementById(bonus[i].name).style.visibility = 'visible';
                bonus.splice(i, 1);
              }
            }
          };
        };

    		window.requestAnimFrame(update);
      }
    	}


});
