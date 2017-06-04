window.onload = function () {
  var canvas = window.document.getElementById('myCanvas');
  var width = canvas.width = window.innerWidth;
  var height = canvas.height;
  if(canvas.getContext){
    var context = canvas.getContext('2d');

    // 用于绘制渐变阴影
    var clearColor = 'rgba(0, 0, 0, .1)';
    // 文字颜色
    var wordColor = "#33ff33";
    // 文字种子
    var words = "君不見黃河之水天上來，奔流到海不復回？君不見高堂明鏡悲白髮，朝如青絲暮成雪？人生得意須盡歡，莫使金樽空對月。天生我材必有用，千金散盡還復來。烹羊宰牛且為樂，會須一飲三百杯。岑夫子，丹丘生，將進酒，君莫停。與君歌一曲，請君為我傾耳聽。鐘鼓饌玉不足貴，但願長醉不復醒。古來聖賢皆寂寞，唯有飲者留其名。陳王昔時宴平樂，斗酒十千恣讙謔。主人何為言少錢，徑須沽取對君酌。五花馬，千金裘，呼兒將出換美酒，與爾同銷萬古愁。";
    // 文字数组
    var wordsArr = words.split('');
    // 文字大小
    var font_size = 20;
    // 频率
    var speed = 20;
    // 下落的列数
    var cols = width / font_size;
    // 往下偏移几个字
    var drops = [];
    // 初始化偏移
    for(var i = 0; i < cols; i++){
      drops[i] = 1;
    }

    // 绘制文字
    function draw () {
      context.save();
      context.font =  font_size + "px serif";
      context.fillStyle = wordColor;
      var text = '';
      for(var i = 0; i < drops.length; i++){
        text = wordsArr[Math.floor( Math.random() * wordsArr.length )];
        context.fillText(text, i * font_size, drops[i] * font_size);
        // 当字的偏移高度大于窗口高度，随机产生那个数>0.98,重新从顶部开始
        if(drops[i] * font_size > height && Math.random() > .98){
          drops[i] = 0;
        }
        drops[i] ++;
      }
      context.restore();
    }

    // 自适应
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height;
    }

    // 监听窗口大小改变，执行自适应
    window.addEventListener('resize',resize);

    // 定时绘制
    /*setInterval(function (){
     context.fillStyle = clearColor;
     context.fillRect(0, 0, width, height);
     draw ();
     }, speed);*/
    /*(function startDraw(){
     context.fillStyle = clearColor;
     context.fillRect(0, 0, width, height);
     draw ();
     setTimeout(startDraw, 16.7);
     })();*/

    //动画循环, 推荐
    (function drawFrame(){
      window.requestAnimationFrame(drawFrame);
      context.fillStyle = clearColor;
      context.fillRect(0, 0, width, height);
      draw();
    }());

  }
};
