/*! updated; 02-27-2018 04:46 PM **/


Modulr.define("core.base:modules/breaking-news",["require","jquery","core.templates:controls/api","core.base:utils/environment"],function(require,$){var Template=Modulr.require("core.templates:controls/api"),Environment=require("core.base:utils/environment");return new function(){function cacheBuster(freq){freq=freq||!1;var date=new Date,str=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate().toString(),hr=date.getHours()+1,min=date.getMinutes();return str+=hr.toString()+(freq&&!isNaN(freq)?Math.floor(min/parseFloat(freq)).toString():"")}var CONFIG={auto_poll:!0,poll_interval_in_min:2},Proto=this,template=!1,timer=!1,container=$(".post-content"),showing=!1,prefix=Environment.isProd()||Environment.isStaging()?"www.":"dev.api.";Proto.renderAlert=function(data){var compiled=_.template(template);container.length>0&&(container.html(compiled(data)),$(container).find(".close").click(function(evt){evt.preventDefault(),$(this).closest(".alert-banner").removeClass("slide-in").addClass("slide-out"),showing=!1,window.localStorage&&localStorage.setItem("FNBNABURL",data.link)}),$(container).find(".alert-title > a").click(function(evt){window.localStorage&&localStorage.setItem("FNBNABURL",data.link),$(this).closest(".alert-banner").removeClass("slide-in").addClass("slide-out"),showing=!1}),$(".alert-banner.slide-in").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).removeClass("slide-in"),showing=!0}))},Proto.poll=function(){!1===showing&&$.ajax({url:"https://"+(/foxnews.com$/.test(window.location.hostname)?prefix+"foxnews.com":"")+"/js/breakingNews.js?cb="+cacheBuster(2),dataType:"script",cache:!0,async:!0})},Proto.init=function(configuration){Template.get("/static/orion/scripts/core/base/app/templates/breaking.news.html",function(response){if(response&&(template=response,configuration&&(CONFIG=_.merge(CONFIG,configuration)),window.fox_header_breakingnews=function(data){if(data&&data.length>0&&data[0].type){var previousURL=!1;if(window.localStorage&&(previousURL=localStorage.getItem("FNBNABURL")),previousURL!==data[0].link){if("BreakingNews"===data[0].type)data[0].classname="is-breaking",data[0].displayname="Breaking News",data[0].tracking="hp1bbkn";else switch(data[0].classname="is-programming",data[0].type){case"ProgrammingAlert":data[0].displayname="Programming Alert",data[0].tracking="hp1bprog";break;case"LiveCoverage":data[0].displayname="Live Coverage",data[0].tracking="hp1blc";break;case"DevelopingStory":data[0].displayname="Developing Story",data[0].tracking="hp1bds";break;case"WatchLive":data[0].displayname="Watch Live",data[0].tracking="hp1bwn";break;default:data[0].displayname="",data[0].tracking="hp1bblank",data[0].classname="is-programming"}Proto.renderAlert(data[0])}}},0===container.find(".alert-container").length&&container.append('<div class="alert-container"></div>'),container=container.find(".alert-container"),Proto.poll(),CONFIG.auto_poll)){var updateInterval=6e4*CONFIG.poll_interval_in_min;timer=setInterval(function(){Proto.poll()},updateInterval)}})}}});