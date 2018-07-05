// Snake
(function(){
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x:3, y:2, color:"red"},
            {x:2, y:2, color:"orange"},
            {x:1, y:2, color:"orange"}
        ]
        this.direction = direction || "right";
    };

    var elements = [];

    // 初始化小蛇
    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);
            div.style.position = 'absolute';
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            elements.push(div);
        }
    };

    // 小蛇移动
    Snake.prototype.move = function (food,map) {
        var i = this.body.length - 1;
        for(; i > 0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        switch (this.direction) {
            case "right" :
                this.body[0].x++;
                break;
            case "left" :
                this.body[0].x--;
                break;
            case "top" :
                this.body[0].y--;
                break;
            case "bottom" :
                this.body[0].y++;
                break;
        };

        // 获取小蛇的横纵位置
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

//            console.log(headX + "=====>" + food.x);

        if(headX == food.x && headY == food.y) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x : last.x,
                y : last.y,
                color : last.color
            });
            food.init(map);
        }

    };

    // 删除小蛇
    function remove() {
        var i = elements.length-1;
        for(; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }

    window.Snake = Snake;
}());