
/*Define Service module */

angular.module("app.services", ["ngResource"])  /*ng-resource as dependency Injection*/

/*Getting all areas service*/

.factory('Organizations', function($resource) {
    return Organizations = $resource('http://192.168.0.107:9003/org',{
      },{
      update : {
    	method: 'PUT'
      }
    });

    Organizations.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };
})

.factory('Organization', function($resource) {
    return Organization = $resource('http://192.168.0.107:9003/org/:org_Id',{
      org_Id: '@id'
    },{
      update: {
      method: 'PUT'
    }  
 })
    Organization.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };
})

/*.factory('Orgssuborg', function($resource) {
    return Orgssuborg = $resource('http://192.168.0.107:9003/org/suborg/:org_Id',{
      org_Id: '@id'
      },{
      update: {
        method: 'PUT'
      }
    });
    Orgssuborg.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    }; 
})
*/
.factory('Orgssuborg', function($resource) {
    return Orgssuborg = $resource('http://192.168.0.107:9003/org/suborg/:org_Id',{
      org_Id: '@id'
      },{
      update: {
      method: 'PUT'
      }
    });
    Orgssuborg.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})


.factory('Suborg', function($resource) {
    return Suborg = $resource('http://192.168.0.107:9003/suborg/:suborg_Id',{
      suborg_Id: '@id'
      },{
      update: {
        method: 'PUT'
      }
   });

   Suborg.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Suborgschools', function($resource) {
    return Suborgschools = $resource('http://192.168.0.107:9003/suborg/school/:suborg_Id',{
      suborg_Id: '@id'
      },{
      update: {
      method: 'PUT'
      }
    });
    Suborgschools.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('School', function($resource) {
    return School = $resource('http://192.168.0.107:9003/school/:school_Id',{
      school_Id: '@id'
      },{
      update: {
      method: 'PUT'
      }
    });

    School.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Schoolbatches', function($resource) {
    return Schoolbatches = $resource('http://192.168.0.107:9003/school/batch/:school_Id',{
      school_Id: '@id'
      },{
      update: {
      method: 'PUT'
      }
    });

    Schoolbatches.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Batche', function($resource) {
    return Batche = $resource('http://192.168.0.107:9003/batch/:batche_Id',{
      batche_Id: '@id'
      },{
        update:{
          method: 'PUT'
      }
    });

    Batche.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Batcheclassrooms', function($resource) {
    return Batcheclassrooms = $resource('http://192.168.0.107:9003/batch/classroom/:batch_Id',{
      batch_Id: '@id'
      },{
      update:{
        method: 'PUT'
      }
    });

    Batcheclassrooms.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})


.factory('Classroom', function($resource) {
    return Classroom = $resource('http://192.168.0.107:9003/classroom/:classroom_Id',{
      classroom_Id: '@id'
      },{
      update:{
      method: 'PUT'
      }
    });

    Classroom.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})


// Permissions Services

.factory('Permissions', function($resource) {
    return Permissions = $resource('http://192.168.0.107:9003/permission',{
      permission_Id: '@id'
    },{
    update: {
      method: 'PUT'
     }
    });


    Permissions.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Permission', function($resource) {
    return Permission = $resource('http://192.168.0.107:9003/permission/:permission_Id',{
      permission_Id: '@id'
      },{
      update:{
      method: 'PUT'
      }
    });
    Permission.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Myroles', function($resource) {
    return Myroles = $resource('http://192.168.0.107:9003/role',{
    role_Id : '@id'
    },{
      update:{
        method: 'PUT'
      }
    });

    Myroles.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Role', function($resource) {
    return Role = $resource('http://192.168.0.107:9003/role/:roleId',{
      roleId: '@id'
      },{
      update:{
      method: 'PUT'
      }
    });
    Role.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('Users', function($resource) {
    return Users = $resource('http://192.168.0.107:9003/classroom/user/:classroom_Id',{
    classroom_Id : '@id'
    },{
      update:{
        method: 'PUT'
      }
    });

    Users.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})

.factory('User', function($resource) {
    return User = $resource('http://192.168.0.107:9003/user/:user_Id',{
      user_Id: '@id'
      },{
      update:{
      method: 'PUT'
      }
    });
    User.prototype.isNew = function() {
      return (typeof (this.id) === 'undefined');
    };  
})