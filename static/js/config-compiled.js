/**
 * Created by Falost on 2016/4/15.
 */
//$(window).load(function(){
//  if($(window).width()>800){
//    $('body').bgSlide({
//      max: 13,
//      times: 1000*60,
//      opacity: 1,
//      speed:'slow'
//    });
//  }
//})
var tagColor = [{ 'c1': '#19a2de', 'c2': '#19A2B4' }, { 'c1': '#d9534f', 'c2': '#d43f3a' }, { 'c1': '#5cb85c', 'c2': '#4cae4c' }, { 'c1': '#ec971f', 'c2': '#d58512' }, { 'c1': '#5bc0de', 'c2': '#46b8da' }, { 'c1': '#007046', 'c2': '#036717' }, { 'c1': '#5cb85c', 'c2': '#1B8C31' }, { 'c1': '#b433ff', 'c2': '#d43f3a' }, { 'c1': '#4a4a4a', 'c2': '#d43f3a' }, { 'c1': '#567e95', 'c2': '#d43f3a' }];
$().ready(function () {
  var tagArr = $(".home .tag span");
  console.log(tagArr.length);
  $.each(tagArr, function (i, item) {
    $(this).css({
      'background-color': tagColor[i]['c1'],
      'border-color': tagColor[i]['c2']
    });
  });
  //get skill
  //各项技能数值
  var skillV = [];
  var skill = [];
  var skills = [{ s1: 'HTML(5)', s2: 98 }, { s1: 'CSS(3)', s2: 92 }, { s1: 'javaScript', s2: 93 }, { s1: 'jQuery', s2: 89 }, { s1: 'Bootstrap', s2: 85 }, { s1: 'Less', s2: 71 }, { s1: 'Angular', s2: 67 }, { s1: 'Node', s2: 59 }, { s1: 'php', s2: 58 }];
  $.each(skills, function (i) {
    skill.push({ text: skills[i]['s1'], max: 100 });
    skillV.push(skills[i]['s2']);
    dH(function () {
      $('.skill_list').append("<li><span>" + skills[i]['s1'] + "</span><span>" + skills[i]['s2'] + "点</span></li>");
    }, 1000);
  });
  function dH(obj, tis) {
    setTimeout(obj, tis);
  }
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('skill'));

  function fetchData(cb) {
    // 通过 setTimeout 模拟异步加载
    setTimeout(function () {
      cb({
        value: skillV
      });
    }, 1000);
  }
  // 指定图表的配置项和数据
  option = {
    title: {
      text: '技能分布图',
      x: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#19a2de'],
    radar: [{
      indicator: skill,
      conter: ['50%', '50%'],
      radius: 100
    }],
    series: [{
      type: 'radar',
      tooltip: {
        trigger: 'item'
      },
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: []
    }]
  };
  //初始 化展示模块
  myChart.setOption(option);
  //监听鼠标滚轮事件
  $(window).scroll(function () {
    var skill = $('.skill'),
        scrollTopValue = $(document).scrollTop(),
        skillHeight = skill.height(),
        skillTopHeight = skill.offset().top;
    //当页面下滑到.skill的高度时，触发动画
    //console.log(skillHeight,skillTopHeight,scrollTopValue)
    if (scrollTopValue - skillTopHeight >= -20 && scrollTopValue - skillTopHeight <= skillHeight / 2 - 100) {
      $.each(skills, function (i) {
        dH(function () {
          $('.skill_list li:eq(' + i + ') span:first').css({
            'background-color': tagColor[i]['c1'],
            'border-color': tagColor[i]['c2'],
            width: skills[i]['s2'] * 2,
            color: '#fff',
            display: 'inline-block'
          });
        }, 1500);
        dH(function () {
          $('.skill_list li:eq(' + i + ') span:last').css({
            display: 'inline-block'
          });
        }, 1600);
      });
      //console.log(skill)
      //延迟加载数据
      fetchData(function (data) {
        myChart.setOption({
          series: [{
            data: [{
              value: data.value,
              name: '技能熟练度'
            }]
          }]
        });
      });
    }
  });
  //Skill End
  //bubble
  function bubble() {
    var width, height, canvas, ctx, circles;
    var bubble = $("#bubble");
    function initHeader() {
      try {
        canvas = document.getElementById('bubble');
        if (bubble.length > 0) {
          width = window.innerWidth * 0.25 > 300 ? window.innerWidth * 0.25 : 300;
          //height = window.innerHeight;
          height = 255;
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          circles = [];
          for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
          }
          animate();
        }
      } catch (ex) {
        if (window.cosole && window.cosole.log) {
          cosole.log(ex);
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (var i in circles) {
        circles[i].draw();
      }
      window.requestAFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        };
      }();
      requestAFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
      var _this = this;

      // constructor
      (function () {
        _this.pos = {};
        init();
      })();

      function init() {
        _this.pos.x = Math.random() * width;
        _this.pos.y = height + Math.random() * 100;
        _this.alpha = 0.1 + Math.random() * 0.3;
        _this.scale = 0.1 + Math.random() * 0.3;
        _this.velocity = Math.random();
      }

      this.draw = function () {
        if (_this.alpha <= 0) {
          init();
        }
        _this.pos.y -= _this.velocity;
        _this.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
        ctx.fill();
      };
    }

    initHeader();
  }
  bubble();
});

//# sourceMappingURL=config-compiled.js.map