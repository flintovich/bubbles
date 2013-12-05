window.onload=function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var body = document.getElementsByTagName('body');

    canvas.width = body[0].offsetWidth;
    canvas.height = body[0].offsetHeight - 5;
    var width = canvas.width;
    var height = canvas.height;

    // create circle
    function circle(ctx, x, y, radius, r, g, b, transparent){
        ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', .'+transparent+')';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    // rand
    function rand (min, max){
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor( Math.random() * (max - min + 1)) + min;
    }
    function clear(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
    function Circle(x,y,radius, r, g, b){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    function Result(R_result,G_result,B_result){
        this.R_result = R_result;
        this.G_result = G_result;
        this.B_result = B_result;
    }
    var Game = {
        circles: [],
        result: []
    };

    // start
    var i = 0;
    function timedCount(){
        var x = rand (0, width);
        var y = rand (0, height);
        var radius = rand (80,200);
        var red = rand (50,255);
        var green = rand (50,255);
        var blue = rand (50,255);
        var transparent = rand (8,9);

        circle(ctx, x, y, radius, red, green, blue, transparent);
        Game.circles.push(new Circle(x,y,radius, red, green, blue));

        i++
        if(i <= 50){
            setTimeout(timedCount,80);
        } else {
            var quesion = document.getElementById('quesion');
            quesion.style.display='block';

            var R_result = 0;
            var G_result = 0;
            var B_result = 0;
            for(var m=0; m<=10; m++ ){
                R_result = R_result + Game.circles[m]['r'];
                G_result = G_result + Game.circles[m]['g'];
                B_result = B_result + Game.circles[m]['b'];
            }
            Game.result.push(new Result(R_result, G_result, B_result));

            var finishResult = Math.max(R_result, G_result, B_result);

            /*if(finishResult == R_result){
                alert('Привильный ответ: Красный!');
            } else if (finishResult == G_result){
                alert('Привильный ответ: Зеленый!');
            } else if (finishResult == B_result){
                alert('Привильный ответ: Синий!');
            }*/

            var cheсk = document.getElementById('cheсk');
            var re = false;
            var gr = false;
            var bl = false;
            var red = document.getElementById('red');
            var green = document.getElementById('green');
            var blue = document.getElementById('blue');

            red.onclick=function(){
                re = true;
                gr = false;
                bl = false;
                document.getElementById('magic').currentTime = 0;
                document.getElementById('magic').play();
            }
            green.onclick=function(){
                re = false;
                gr = true;
                bl = false;
                document.getElementById('magic').currentTime = 0;
                document.getElementById('magic').play();
            }
            blue.onclick=function(){
                re = false;
                gr = false;
                bl = true;
                document.getElementById('magic').currentTime = 0;
                document.getElementById('magic').play();
            }
            cheсk.onclick=function(){
                if(re == true && finishResult == R_result){
                    document.getElementById('cheer').play();
                    alert('Привильный ответ: Красный! Ура!');
                } else if (gr == true && finishResult == G_result){
                    document.getElementById('cheer').play();
                    alert('Привильный ответ: Зеленый! Ура!');
                } else if (bl == true && finishResult == B_result){
                    document.getElementById('cheer').play();
                    alert('Привильный ответ: Синий! Ура!');
                } else {
                    document.getElementById('boo').play();
                    alert('Не правильно!')
                }
                return false
            }
        }
    }
    timedCount();

    // game more
    var gameMore = document.getElementById('reload');
    gameMore.onclick=function(){
        Game.circles = [];
        Game.result = [];
        i = 0;
        quesion.style.display='none';
        document.getElementById('Bugle').currentTime = 0;
        document.getElementById('Bugle').play();

        clear(ctx);
        timedCount();
    }

}
