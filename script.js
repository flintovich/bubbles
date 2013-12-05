window.onload=function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
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
        var radius = rand (50,200);
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
            }
            green.onclick=function(){
                gr = true;
            }
            blue.onclick=function(){
                bl = true;
            }
            cheсk.onclick=function(){
                if(re == true && finishResult == R_result){
                    alert('Привильный ответ: Красный! Ура!');
                } else if (gr == true && finishResult == G_result){
                    alert('Привильный ответ: Зеленый! Ура!');
                } else if (bl == true && finishResult == B_result){
                    alert('Привильный ответ: Синий! Ура!');
                } else {
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
        location.reload();
    }

}
