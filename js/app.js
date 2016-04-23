'use strict';

var app = angular.module("app", ['app.controllers','app.services','uiBreadcrumbs','xeditable','ui.router','ui.bootstrap']); /*Dependency Injection*/

/*xeditable bootstrap theme*/

app.run(function(editableOptions){
  editableOptions.theme = 'bs3';
});

/*Configuration of UI-Routing*/

app.config(function($stateProvider,$urlRouterProvider){
$stateProvider
  .state('/',{
    url: "",
    templateUrl: 'templates/others/login.html'           
    })
  .state('forgot-password',{
    url: "/forgot-password",
    templateUrl: 'templates/others/forgot-password.html'           
    })
  .state('new-account',{
    url: "/new-account",    
    templateUrl: 'templates/others/new-account.html'      
    })
  .state('app',{
    url: "/app",
    templateUrl: 'templates/others/landingpage.html'
   })
  .state('logout',{
    url: "/logout",
    templateUrl: 'templates/others/logout.html' 
    })
  .state('app.dashboard',{
    url: "/dashboard",
    templateUrl: 'templates/others/Dashboard.html'
    })
  .state('app.introduction',{
    url: "/introduction",
    templateUrl: 'templates/others/Introduction.html'
    })
  });