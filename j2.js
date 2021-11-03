var canvas = document.querySelector("canvas");
//ajustement de la taille du site par rapport à la taille de la fenêtre du navigateur.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//définie le type de dimension (ici 2d)
var c = canvas.getContext("2d");


//définition des variables du jeu
var lScore = 0;
var RScore = 0;
var test =0;
var playerspeed=10;
var rebond=false;

var reboot = false;
// définie la vitesse de la balle.
var ballSpeedXY = [10, -10];


//calcul des distances pour le système de collision.

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2.3) + Math.pow(yDistance, 1.9));
}

//définition de la variable balle.
var ball = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 20,
    dx: 10,
    dy: 10,
    //dessin de la balle
    draw: function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        if (test == 1)  {
            c.fillStyle="Red"
        }
        if(test==2){
            c.fillStyle="Blue"
        }
        c.fill();
    },
    update: function () {

        //calcul des collisions à droite et ajout d'un point du côté gauche.
        if (this.x > window.innerWidth - this.radius ) {
            this.dx = -this.dx;
            reboot = true;
            lScore += 1
        }
        //idem à gauche
        else if (this.x - this.radius < 0){
            reboot = true
            RScore += 1
        }
        //renvoi de la balle lors de la collision avec le bas et le haut de l'écran.
        else if (this.y > window.innerHeight - this.radius
            || this.y - this.radius < 0) {
            this.dy = -this.dy

        }
        //calcul des collision avec la raquette de gauche
        if (getDistance(l.x, l.y+5, ball.x, ball.y) + this.dy < ball.radius + l.h+5 + ball.dy ) {
            ball.dx = -ball.dx
            test=2
            rebond=true;
            bruit();
        }
        //collision de la raquette de droite.
        if (getDistance(r.x-20, r.y+5, ball.x, ball.y) + this.dy < ball.radius + r.h+5 + ball.dy) {
            ball.dx = -ball.dx
            test=1
            rebond=true;
            bruit();
        }
        if (ball.x == window.innerWidth/2&&rebond===true){
            this.dx=this.dx*1.15
            this.dy=this.dy*1.15
            rebond=false;
        }
        //Réinitialisation des positions après avoir marqué un point. 
        if (reboot == true) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            l.y=window.innerHeight/2;
            r.y=window.innerHeight/2;
            ball.dx = ballSpeedXY[Math.floor(Math.random() * ballSpeedXY.length)];
            ball.dy = ballSpeedXY[Math.floor(Math.random() * ballSpeedXY.length)];
            Gscore = 0
            reboot = false
        }

        //ajout de vitesse à la balle
        this.y += this.dy;
        this.x += this.dx;

        //arrêt du jeu lorsque le score est atteint.
        if(lScore==10){
            alert('Joueur bleu vainqueur !');
            lScore=0;
            RScore=0;
            reboot=true;
        }
        else if(RScore==10){
            alert('Joueur rouge vainqueur !');
            lScore=0;
            RScore=0;
            reboot=true;
        }
        this.draw()
    }
};
//écoute des frappe de clavier pour connaitre l'intention des deux joueurs.
document.addEventListener('keydown',function(e){
    //flèche du haut
    if (e.which === 79){
        r.dy =-playerspeed;
    }
    //flèche du bas
    else if (e.which === 76){
        r.dy=+playerspeed;
    }

    //touche z
    if (e.which === 90){
        l.dy=-playerspeed;
    }
    //touche s
    else if (e.which === 83){
        l.dy=+playerspeed;
    }
    //Menu pause (echap)
    if (e.which===27){
        alert('Jeu en pause !');
    }
});
document.addEventListener('keyup',function(e){
    if (e.which===79||e.which===76){
        r.dy=0;
    }
    if (e.which===90||e.which===83){
        l.dy=0;
    }
});
//dessin du décor
var net = {
    x: window.innerHeight / 2,
    y: window.innerHeight / 2,
    draw: function () {
        c.strokeStyle = "White";
        c.beginPath();
        c.setLineDash([9, 10]);
        c.moveTo(window.innerWidth / 2, window.innerHeight / 2);
        c.lineTo(window.innerWidth / 2, -window.innerHeight);
        c.lineWidth = 5;
        c.stroke();

        c.strokeStyle = "White";
        c.beginPath();
        c.setLineDash([9, 10]);
        c.moveTo(window.innerWidth / 2, window.innerHeight / 2);
        c.lineTo(window.innerWidth / 2, window.innerHeight);
        c.lineWidth = 5;
        c.stroke();
    }

}
//raquette gauche
var l = {
    x: undefined,
    y: window.innerHeight / 2,
    h: 100,
    w: 20,
    dy: 0,

    draw: function () {
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y, this.w, this.h);
    },
    //actualisation de la position
    update: function () {
        this.x = 30 + this.w
        this.draw()
        this.y+=this.dy;
    }
}
//raquette droite
var r = {
    x: undefined,
    y: window.innerHeight / 2,
    h: 100,
    w: 20,
    dy: 0,

    draw: function(){
        c.fillStyle="red";
        c.fillRect(this.x, this.y, this.w, this.h);
    },
    update: function() {
        this.x =window.innerWidth-100;
        this.draw()
        this.y+=this.dy;
    }
}

//affichage du score.
var score = {
    x: window.innerHeight / 2,
    y: window.innerHeight / 2,
    draw: function () {
        c.font = "70px Arial Black";
        c.textAlign = "center"
        c.fillStyle = "Blue"
        c.fillText(lScore,window.innerWidth / 2 / 1.7, window.innerHeight / 2 / 3);
        c.font = "70px Arial Black";
        c.textAlign = "center"
        c.fillStyle = "Red"
        c.fillText(RScore,window.innerWidth / 2 * 1.5 , window.innerHeight/ 2 / 3);
    },
}

// musique du jeu
var musique=new Audio('song.mp3');

// son de rebond.
function bruit(){
    var bam=new Audio();
    bam.src="BAM.mp3";
    bam.play();
}

//fonction principale du jeu.
function main() {

    //réinitialisation de l'affichage à chaque frame
    c.clearRect(0, 0, innerHeight, innerWidth);

    c.fillStyle = "black";
    c.fillRect(0, 0, innerWidth, innerHeight);


    //appel des fonctions à exécuter.

    l.update();
    r.update();
    ball.update();
    net.draw();
    score.draw();
    requestAnimationFrame(main);
    musique.play();
}
main();