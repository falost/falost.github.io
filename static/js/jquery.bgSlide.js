/**
 * Created by Falost on 2016/4/1.
 * Name:jQuert.bgSlide.js
 */
(function ($) {
  $.fn.bgSlide = function (options) {
    var defaults = {
      bgs: [],//储存背景
      model: 'default', //可选项 custom
      max: 13,//切换的个数
      bg: 0,//当前的位置
      times: 5000,//切换时间
      speed: 'fast', // 可换为 mormal  , slow
      opacity: 0.4,//透明度
      abs: this, //默认参数请勿修改，除非你已知他的用处
      arr: [],//请勿修改，缓存区
      url: ''
    };
    var ops = $.extend(defaults, options);
    if (ops.model == 'custom') {
      ops.max = ops.bgs.length
    }
    var fn = {
      rand: function () {
        ops.bg = parseInt(Math.random() * ops.max);
        return ops.bg;
      },
      time: function () {
        setInterval(function () {
          fn.isChangeBg();
        }, ops.times)
      },
      contains: function (arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      isChangeBg: function () {
        fn.rand();
        if (ops.model == 'default') {
          if (ops.bgs.length == ops.max) {
            ops.bgs = [];
          }
          if (fn.contains(ops.bgs, ops.bg)) {
            fn.isChangeBg()
          } else {
            ops.bgs.push(ops.bg);
            fn.changeBg();
          }
        } else if (ops.model == 'custom') {
          if (ops.arr.length == ops.max) {
            ops.arr = [];
          }
          if (fn.contains(ops.arr, ops.bg)) {
            fn.isChangeBg()
          } else {
            ops.arr.push(ops.bg);
            fn.changeBg();
          }
        }
        //console.log(this)
      },
      changeBg: function () {
        switch(ops.model){
          case 'default':
            ops.url = 'url("./static/images/bg/bg' + ops.bg + '.jpg")';
            break;
          case 'custom':
            ops.url = 'url("' + ops.bgs[ops.bg] + '")';
            break;
        }
        $(ops.abs).fadeTo(ops.speed, ops.opacity, function () {
          $(ops.abs).css({
            'background-image': ops.url,
            'background-size': '100%',
            'background-position':'fixed',
            'background-repeat':'no-repeat',
            '-webkit-transition': 'background-image 0.5s',
            '-moz-transition': 'background-image 0.5s',
            '-ms-transition': 'background-image 0.5s',
            '-o-transition': 'background-image 0.5s',
            'transition': 'background-image 0.5s'
          });
        });
      }
    };
    fn.isChangeBg();
    fn.time();
    //console.log(ops.bg, ops.model, ops.url)
  };
})(jQuery);