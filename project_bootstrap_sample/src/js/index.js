import $ from 'jquery'
import('imports-loader?$=jquery!jquery.scrollto');
import Swiper from 'swiper/dist/js/swiper.min'

// window.$ = $;
// window.jQuery = $;

/**
 * 初始化元素
 */
const initElement = () => {

}


/**
 * 初始化事件
 */
const initEvent = () => {

  var swiper = new Swiper('.swiper-container');


  $('body').scrollTo($('#btn'), 8000)

}



const init = () => {
  console.log('index init')

  initElement();
  initEvent();
}


/**
 * 页面ready后开始执行程序
 */
setTimeout(() => $(document).ready(() => init()));
