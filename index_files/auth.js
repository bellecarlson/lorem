/*! updated; 02-27-2018 04:46 PM **/


Modulr.define("core.components:auth",["require","cdn"],function(require,CDN){var App=function(){this.AUTH_TYPE="auth0"};return App.prototype.init=function(callback){require(["core.auth:api"],function(Auth){Auth.init()})},App.prototype.initNew=function(callback){require(["core.auth:api"],function(Auth){Auth.init()})},App.prototype.middleware=function(callback){"function"==typeof callback&&require(["core.auth:models/middleware"],function(Middleware){callback(Middleware)})},new App});