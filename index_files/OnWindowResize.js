/*! updated; 02-27-2018 04:46 PM **/


Modulr.define("core.plugins:OnWindowResize",["jquery"],function($){return function(callback,threshold){if(threshold="number"!=typeof threshold?25:threshold,"function"!=typeof callback||!$)return!1;var timeout,hasOrientation="onorientationchange"in window,onEvent=hasOrientation?"orientationchange":"resize";$(window).bind(onEvent,function(){clearTimeout(timeout),timeout=setTimeout(function(){callback()},threshold)})}});