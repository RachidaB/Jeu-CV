var obj = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	skillsSrc :["angular.png","css.png","html.png","javascript.png","nodejs.png","mongodb.png","meteor.png","bootsrap.png","express.png","jquery.png"],

  src:'a',
	create: function(x, y,width,height) {
		var object = Object.create(this);
		object.x = x;
		object.y = y;
		object.width = width;
		object.height = height;
		object.name = 0;
		return object;
	},

  left: function() {
  this.x -= +3;
  },

  right: function() {
    this.x+= +3;
  },

  top: function() {
    this.y -= +3;
  },

  bottom: function() {
    this.y+= +3;
  },
  creerEnnemi : function() {
		// for(var i=0;i<3;i++) {
		// 	tab[i] = this.create(width +(i*300) ,Math.random() * height,40,40);
		// }
		// for(var i=0;i<3;i++) {
		// 	context.fillRect(tab[i].x,tab[i].y,tab[i].width,tab[i].height);
		// 	tab[i].left();
		// }
  },

  deplacement : function(direction,r) {
    switch(direction){
      case 37: //left
        this.x -= 5;
      break;
      case 38: // haut
        this.y -= +5;
      break;
      case 39: //right
        this.x+= +5;
      break;
      case 40: // bas
        this.y+= +5;
				r;
      break;
       default:

     };
  },
	rangeIntersect : function(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1);
  },
  rectIntersect : function(r0, r1) {
    return this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
         this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
  }


};
