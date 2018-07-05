(function (){

    // 构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }

    // 初始化
    Game.prototype.init = function() {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bingKey();
    }

    // 小蛇移动
    Game.prototype.runSnake = function (food,map) {
        var that = this;
        var timer = setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);

            // 横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;

            // 纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;

            // 蛇头横坐标
            var headX = this.snake.body[0].x;

//                console.log(headX + "====" + maxX);

            // 蛇头纵坐标
            var headY = this.snake.body[0].y;

            if(headX < 0 || headX >= maxX) {
                alert("Game over");
                clearInterval(timer);
            }

            if(headY < 0 || headY >= maxY) {
                alert("Game over");
                clearInterval(timer);
            }
        }.bind(that),150);
    }

    // 绑定按键事件
    Game.prototype.bingKey = function () {
        var that = this;
        document.addEventListener("keydown",function (e) {
            switch (e.keyCode) {
                case 37 : this.snake.direction = "left"; break;
                case 38 : this.snake.direction = "top"; break;
                case 39 : this.snake.direction = "right"; break;
                case 40 : this.snake.direction = "bottom"; break;
            }
        }.bind(that),false)
    }

    window.Game = Game;
}());