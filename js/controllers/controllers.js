
/*Controller Module Difining*/

var app = angular.module("app.controllers", ['app.services']);  /*Services as Dependency Injection*/

/*Area get and Delete Controller*/

app.controller('organizationscontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Organizations', function($scope,$stateParams,$rootScope,$uibModal, $log,Organizations){
  
  $scope.orgs = Organizations.query();

   $scope.animationsEnabled = true;

   $scope.deleteorg = function(org){
    /*var result = confirm("do you wonna delete?");
    if (result) {*/
    $rootScope.Org =org;
    var modalInstance = $uibModal.open({
      aimation: $scope.animationsEnabled,
      templateUrl: 'myareaModalContentdelete.html',
      controller: 'areadeleteModalInstanceCtrl'
    });
      
    /*}*/
  }

  /*$scope.deletearea = function(area){
    var result = confirm("do you wonna delete?");
    if (result) {
    $scope.allAreas.splice($scope.allAreas.indexOf(area), 1);
      Area.delete({areaId: area.id});
    }
  }*/
    $scope.animationsEnabled = true;

   $scope.deletearea = function(area){
    /*var result = confirm("do you wonna delete?");
    if (result) {*/
    $rootScope.Area =area;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myareaModalContentdelete.html',
      controller: 'areadeleteModalInstanceCtrl'
    });
      
    /*}*/
  }


  $scope.areagraph = function(){
    
      var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myareagraphModal.html',
      controller: 'areadeleteModalInstanceCtrl'
    });
  }




 //Model Related code

  $scope.open = function(size,id) {
    $rootScope.size =size;
    $rootScope.id =id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myareaModalContent.html',
      controller: 'AreaModalInstanceCtrl'
    });
  };
}]);

/*Model related Controller*/

/*app.controller('areadetailcontroller', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});*/

/*Area Creating and Updating Controller*/

app.controller('AreaModalInstanceCtrl', ['$scope','$rootScope','$stateParams','$uibModalInstance','$uibModal', '$log','$window','Organization','Organizations', function($scope,$rootScope,$stateParams,$uibModalInstance,$uibModal,$log,$window,Organization,Organizations){
  var Id = $stateParams.areaId;
  $rootScope.aid = Id;
  var size =$rootScope.size;
  console.log(size);

  $scope.id = $rootScope.id;


  if(typeof(size) === 'undefined'){
    $scope.org = new Organizations();
  }
  else{
    $scope.org = Organization.get({
      org_Id: size
    })
  }
  
  $scope.regex='^\\w+-\\d{3}$';

  $scope.save = function(id){
    if (id ===1) {
      $uibModalInstance.close();
      $scope.org.$save();
      /*location.reload();*/
      
   /*$window.location.reload();*/
     /*$state.reload();*/
    }
    else{

      $uibModalInstance.close();
      $scope.org.$update();
    }
  };
  
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

/*Course Getting and Deleting Controller*/

app.controller('suborganizationscontroller', ['Suborg','$scope','$stateParams','$rootScope','$uibModal','$log','Orgssuborg',function(Suborg,$scope,$stateParams,$rootScope,$uibModal,$log,Orgssuborg){
  var Id = $stateParams.orgId;
  $rootScope.orgid = Id;
  
  $scope.suborgs = Orgssuborg.query({org_Id: Id});

  $scope.deletecourse= function(suborg){
    $scope.suborgs.splice($scope.suborgs.indexOf(suborg), 1);
      Suborg.delete({suborg_Id: suborg.id});
  }

  // Model of course
  $scope.editcourse = function(courseid, id){
    $rootScope.courseid = courseid;
    $rootScope.id = id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mycourseModalContent.html',
      controller: 'CourseModalInstanceCtrl'
    });
  };

  $scope.open = function (suborg_id, id) {
    $rootScope.suborg_id = suborg_id;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mycourseModalContent.html',
      controller: 'CourseModalInstanceCtrl'
    });
  };
}]);

/*Course Creating and Updating Controller*/

app.controller('CourseModalInstanceCtrl', ['$scope','$stateParams','$rootScope','$uibModalInstance','Suborg','Orgssuborg', function($scope,$stateParams,$rootScope,$uibModalInstance,Suborg, Orgssuborg){
  var Id = $stateParams.courseId;
  $rootScope.courseId =Id;
  $scope.areaid1 = $rootScope.areaid;
  var sub_size =$rootScope.suborg_id;
  console.log(sub_size);
  $scope.size =$rootScope.orgid;
  var coursed = $rootScope.courseid;
  $scope.id = $rootScope.id;

  if(typeof(size)=== 'undefined'){
    $scope.suborg = new Orgssuborg({
      org_Id : $scope.size
    });
  }
  else{
    $scope.suborg = Suborg.get({
      suborg_Id: sub_size
    });
  }

  $scope.save = function(id){
    if (id === 1) {
      $uibModalInstance.close();
      $scope.suborg.$save({org_Id: $scope.size});
    }else{
      $uibModalInstance.close();
      $scope.suborg.$update();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

/*Module Getting and Deleting Controller*/

app.controller('schoolcontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Suborgschools','School', function($scope,$stateParams,$rootScope,$uibModal,$log,Suborgschools,School){
  $scope.Id = $stateParams.suborgId;
  $rootScope.ID = $scope.Id;
  $scope.organizationId = $rootScope.orgid;

  $scope.schools = Suborgschools.query({suborg_Id: $scope.Id});

  $scope.deletemodule= function(school){
    $scope.schools.splice($scope.schools.indexOf(school), 1);
    School.delete({school_Id: school.id});
  }

   /*$scope.editmodule = function(schoolId, id){
    $rootScope.school_Id= schoolId;
    $rootScope.id = id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mymoduleModalContent.html',
      controller: 'ModuleModalInstanceCtrl'
    });
  }*/

  $scope.open = function (size,id) {
    $rootScope.school_size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mymoduleModalContent.html',
      controller: 'ModuleModalInstanceCtrl'
    });
  };

}]);

/*Module Creating and Updating Controller*/

app.controller('ModuleModalInstanceCtrl', ['$scope','$stateParams','$rootScope','$uibModalInstance','School','Suborgschools', function($scope,$stateParams,$rootScope,$uibModalInstance,School,Suborgschools){
  /*var Id = $stateParams.moduleId;
  $scope.courseid1 = $rootScope.courseid;*/

  var size =$rootScope.school_size;
  $scope.suborgId =$rootScope.ID;
  console.log( $scope.suborgId);
  /*var moduled = $rootScope.moduleid;*/
  $scope.id = $rootScope.id;

  if(typeof(size) === 'undefined'){
    $scope.sch = new Suborgschools({
      suborg_Id: $scope.suborgId
    });
  }
  else{
    $scope.sch = School.get({
      school_Id: size
    });
  }

  $scope.save = function(id){
    if (id === 1) {
      $uibModalInstance.close();
      $scope.sch.$save({suborg_Id: $scope.suborgId});
    }
    else {
      $uibModalInstance.close();
      $scope.sch.$update();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

/*Lessson getting and Deleting Controller*/

app.controller('Batchcontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Schoolbatches','Batche', function($scope,$stateParams,$rootScope,$uibModal,$log,Schoolbatches,Batche){
  $scope.Id = $stateParams.schoolId;
  $rootScope.schoolid =$scope.Id;
  $scope.suborganizationId =$rootScope.ID;
  /*$rootScope.moduleid = Id;*/
  /*$scope.courseid = $rootScope.courseid;*/
  $scope.batches= Schoolbatches.query({school_Id: $scope.Id});

  $scope.deletelesson= function(batche){
    $scope.batches.splice($scope.batches.indexOf(batche), 1);
    Batche.delete({batche_Id: batche.id});
  }

  /*$scope.editlesson = function(lessonid,id){
    $rootScope.lessond = lessonid;
    $rootScope.id = id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mylessonModalContent.html',
      controller: 'LessonModalInstanceCtrl'
    });
  }*/

  $scope.open = function (size, id) {
    $rootScope.batche_size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'mylessonModalContent.html',
      controller: 'LessonModalInstanceCtrl'
    });
  };

}]);

/*Lesson Creating and Updating Controller*/

app.controller('LessonModalInstanceCtrl', ['$scope','$stateParams','$rootScope','$uibModalInstance','Batche','Schoolbatches', function($scope,$stateParams,$rootScope,$uibModalInstance,Batche,Schoolbatches){
  /*var Id = $stateParams.lessonId;*/
  $scope.schoolID = $rootScope.schoolid;
/*  $rootScope.lessonid = Id;*/

  var size =$rootScope.batche_size;
 /* var lessond = $rootScope.lessond;*/
  $scope.id = $rootScope.id;

  if(typeof(size) === 'undefined'){
    $scope.batche = new Schoolbatches({
      school_Id: $scope.schoolId
    });
  }
  else{
    $scope.batche = Batche.get({
      batche_Id: size
    });
  }

  $scope.save = function(id){
    if (id === 1) {
      $uibModalInstance.close();
      $scope.batche.$save({school_Id: $scope.schoolID});
    }else {
      $uibModalInstance.close();
      $scope.batche.$update();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);

/*Learning Objective getting and Deleting Controller*/

app.controller('Classroomcontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Batcheclassrooms','Classroom', function($scope,$stateParams,$rootScope,$uibModal,$log,Batcheclassrooms,Classroom){
  $scope.Id = $stateParams.batcheId;
  console.log($scope.Id);
  $rootScope.batcheID = $scope.Id;
  $scope.schoolid = $rootScope.schoolid;
  /*$rootScope.lessonid = Id;*/
  /*$scope.moduleid = $rootScope.moduleid;*/
  $scope.classrooms= Batcheclassrooms.query({batch_Id: $scope.Id});
  
  $scope.deletelo= function(classroom){
    $scope.classrooms.splice($scope.classrooms.indexOf(classroom), 1);
    Classroom.delete({classroom_Id: classroom.id});
  }

  /*$scope.editlo = function(loid,id){
    $rootScope.loid = loid;
    $rootScope.id = id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myloModalContent.html',
      controller: 'LoModalInstanceCtrl'
    });
  }*/
 /* 
   $scope.open = function(size,id) {
    $rootScope.classroom_size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myuserModalContent.html',
      controller: 'UserModalInstanceCtrl'
    });
  };*/


  $scope.open = function(size,id) {
    $rootScope.classroom_size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myloModalContent.html',
      controller: 'LoModalInstanceCtrl'
    });
  };

}]);

/*Learning Objective Creating and Updating Controller*/

app.controller('LoModalInstanceCtrl', ['$scope','$stateParams','$rootScope','$uibModalInstance','Classroom','Batcheclassrooms', function($scope,$stateParams,$rootScope,$uibModalInstance,Classroom,Batcheclassrooms){
  var Id = $stateParams.loId;
  var batchID = $rootScope.batcheID;

  var size =$rootScope.classroom_size;
  /*var lid = $rootScope.loid;*/
  $scope.id = $rootScope.id;

  if(typeof(size) === 'undefined'){
    $scope.class = new Batcheclassrooms({
      batch_Id: batchID
    });
  }
  else{
    $scope.class = Classroom.get({
      classroom_Id: size
    });
  }

  $scope.save = function(id){
    if (id === 1) {
      $uibModalInstance.close();
      $scope.class.$save({batch_Id: batchID});
    }else {
      $uibModalInstance.close();
      $scope.class.$update();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


/*User getting and deleting Controller*/

app.controller('Usercontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Users', function($scope,$stateParams,$rootScope,$uibModal,$log,Users){
  $scope.classroomid = $stateParams.classroomId;
  $rootScope.classid =$scope.classroomid;
  $scope.users = Users.query({classroom_Id: $scope.classroomid});
  

  $scope.open = function(size,id) {
    $rootScope.user_size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myuserModal.html',
      controller: 'UserModalInstanceCtrl'
    });
  };

  $scope.openedit = function(size,id) {
    $rootScope.size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myuserModal.html',
      controller: 'UserModalInstanceCtrl'
    });
  };

}]);

/*Learning Objective Creating and Updating Controller*/

app.controller('UserModalInstanceCtrl', ['$scope','$stateParams','$rootScope','$uibModalInstance','Myroles','User','Users', function($scope,$stateParams,$rootScope,$uibModalInstance,Myroles,User,Users){
  
  var size =$rootScope.user_size;
  /*var lid = $rootScope.loid;*/
  console.log(size);

  /*Its for the edit*/
  var editsize = $rootScope.size; 
  console.log(editsize);

  $scope.id = $rootScope.id;
  $scope.roles = Myroles.query();
  $scope.userid = $stateParams.user_Id;
  $scope.classroomId =$rootScope.classid;

  if(typeof(editsize) === 'undefined'){
    $scope.user = new Users({classroom_Id: $scope.classroomId});
  }
  else{
    $scope.user = User.get({
      user_Id: editsize
    });
  }
  console.log("I am getting the perticular user");
  console.log($scope.user);

  $scope.save = function(id,getroles){
    if (id === 1) {
      console.log($scope.user);
      console.log(getroles[0]);
      $scope.data = [];
      var i;
      for(i=0; i<=getroles.length-1;i++)
      {
        $scope.data[i]= getroles[i].id;
      }
      $scope.user.roles = [];
      $scope.user.roles = $scope.data;

      $uibModalInstance.close();
      $scope.user.$save({classroom_Id: $scope.classroomId});
    }else {
      console.log($scope.user);
      console.log(getroles[0]);
      $scope.data = [];
      var i;
      for(i=0; i<=getroles.length-1;i++)
      {
        $scope.data[i]= getroles[i].id;
      }
      $scope.user.roles = [];
      $scope.user.roles = $scope.data;
      $uibModalInstance.close();
      $scope.user.$update();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('Rolecontroller', ['$scope','$stateParams','$rootScope','$uibModal','$log','Myroles','Permissions', function($scope,$stateParams,$rootScope,$uibModal,$log,Myroles,Permissions){
  
  $scope.roles = Myroles.query();
  console.log($scope.roles);
  
 $scope.permissions = Permissions.query();

  
  /*$scope.deleteskill= function(skill){

  $scope.allSkills.splice($scope.allSkills.indexOf(skill), 1);
    Skill.delete({skillId: skill.id});
  }

    $scope.editskill = function(skillid,id){
    $rootScope.skillid = skillid;
    $rootScope.id = id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myskillModalContent.html',
      controller: 'SkillModalInstanceCtrl'
    });
  }*/

  /*$scope.open = function (size, id) {
    $rootScope.size = size;
    $rootScope.id = id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myskillModalContent.html',
      controller: 'SkillModalInstanceCtrl'
    });
  };*/
}]);

/*Skill creating and updating controller*/

app.controller('Roledetailcontroller', ['$scope','$stateParams','$rootScope','Myroles','Role', function($scope,$stateParams,$rootScope,Myroles,Role){
  
 $scope.roleid = $stateParams.roleId;
 console.log($scope.roleid);
 /* var Id = $stateParams.skillId;
 $rootScope.loid1 = $rootScope.loid;

  var size =$rootScope.size;
  var skilld = $rootScope.skillid;
  $scope.id = $rootScope.id;*/
  $scope.permissions = Permissions.query();

  if(typeof($scope.roleid) === 'undefined'){
    $scope.role = new Myroles();
  }
  else{
    $scope.role = Role.get({
      roleId: $scope.roleid
    });
  }

  $scope.save = function(id, perms){
    if (id === 1) {
      console.log($scope.role.name);
      console.log(perms[0].name);
      $scope.data = [];
      var i;
      for(i=0; i<=perms.length-1;i++)
      {
        $scope.data[i]= perms[i].id;
      }
      $scope.role.permissions = [];
      $scope.role.permissions = $scope.data;
      $scope.role.$save();
    }else {
      console.log($scope.role.name);
      console.log(perms[0].name);
      $scope.data = [];
      var i;
      for(i=0; i<=perms.length-1;i++)
      {
        $scope.data[i]= perms[i].id;
      }
      $scope.role.permissions = [];
      $scope.role.permissions = $scope.data;
      $scope.role.$update({roleId: $scope.roleid});
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
}]);

/*app.controller('Userdetailcontroller',  ['$scope','$stateParams','$rootScope','Users','User','Myroles', function($scope,$stateParams,$rootScope,Users,User,Myroles){

  $scope.roles = Myroles.query();
  $scope.userid = $stateParams.user_Id;

  if(typeof($scope.userid) === 'undefined'){
    $scope.user = new Users();
  }
  else{
    $scope.user = User.get({
      user_Id: $scope.userid
    });
  }

  $scope.save = function(id,getroles){
    if (id === 1) {
      console.log($scope.user);
      console.log(getroles);
      $scope.user.$save({user_Id: $scope.userid});
    }else {
      $scope.skill.$update();
    }
  };
}]);
*/
/*Simple & Comprehension Question/ Item getting and deleting  and comprehension creating controller*/
app.controller('ckeditorcontroller',  ['$scope','Skill','Skills','$stateParams','$rootScope', function($scope,Skill,Skills,$stateParams,$rootScope){

  $scope.lessonid11= $stateParams.lessonId;
  $rootScope.lessonIds = $stateParams.lessonId2;
  $rootScope.lid =$scope.lessonid11;
  console.log($scope.lessonid11);
  
  // Deleting the Item as Simple question

  var Id = $stateParams.skillId;
  $scope.loid1 = $rootScope.loid;

  /*var size =$rootScope.size;
  var skilld = $rootScope.skillid;
  $scope.id = $rootScope.id;*/

  if(typeof(Id) === 'undefined'){
    $scope.skill = new Skills({
      loId: size
    });
  }
  else{
    $scope.skill = Skill.get({
      skillId: Id
    });
  }

  $scope.save = function(id){
    if (id === 1) {
      $scope.skill.$save({loId: loid1});
    }else {
      $scope.skill.$update();
    }
  };
  
}]);

/*Simple & Comprehension Question/ Item getting and deleting  and comprehension creating controller*/



app.controller('Permissioncontroller', ['$rootScope','$stateParams','$scope','Permissions','Permission', function($rootScope,$stateParams,$scope,Permissions,Permission){

// Getting the All Permissions

  $scope.permissions = Permissions.query();
  console.log($scope.permissions);
  
  // Deleting the Permission

  $scope.deletepermission = function(permission){
    $scope.permissions.splice($scope.permissions.indexOf(permission), 1);
    Permission.delete({permission_Id: permission.id});
  }
}]);


/*Item creating and updating controller*/

app.controller('Permissiondetailcontroller', ['$rootScope','$stateParams','$scope','Permissions','Permission', function($rootScope,$stateParams,$scope,Permissions,Permission){
 
  $scope.permissionid = $stateParams.permissionId;
 
  $scope.lessonid2 = $stateParams.lessonId1;
  $scope.lessid =$rootScope.lid;
  var itemid = $stateParams.itemId;

  // the creating item for comprehension code for navigating the template

  console.log($scope.permissionid);

 
  if(typeof($scope.permissionid) === 'undefined'){
     $scope.permission = new Permissions();
    }
  else{
    $scope.permission = Permission.get({
      permission_Id : $scope.permissionid
    })
  }

  $scope.save = function(id){
    if(id === 1){
      $scope.permission.$save();
    }else{
      $scope.permission.$update();
    }
  };

}]);


/*Coursetest getting and deleting controller*/

app.controller('coursetestcontroller', ["$scope","AllCourseTests","CourseTestItems","CourseTestItem","Test","$stateParams","$rootScope","CoursePostTestItem", function($scope,AllCourseTests,CourseTestItems,CourseTestItem,Test,$stateParams,$rootScope,CoursePostTestItem){
  $scope.courseid = $stateParams.courseId;
  $scope.testid = $stateParams.TestId;  
  $scope.CourseTests = AllCourseTests.query();

  $scope.Testdetails = Test.get({TestId: $scope.testid});
  $scope.ItemdetailsofCourseTests = CourseTestItems.query();

  $scope.deleteTest = function(CourseTest){
    $scope.CourseTests.splice($scope.CourseTests.indexOf(CourseTest), 1);
    Test.delete({TestId: CourseTest.id});
  }

  $scope.deleteTestItem = function(ItemdetailsofCourseTest){
    $scope.ItemdetailsofCourseTests.splice($scope.ItemdetailsofCourseTests.indexOf(ItemdetailsofCourseTest), 1);
    CourseTestItem.delete({ItemId: ItemdetailsofCourseTest.id});
  }

/*Publishing the tests calling function*/
  
  $scope.publish = function(id){
    CoursePostTestItem.get({TestId: id});
  }

  $scope.publishingTest =function(id){
    console.log(id);
    CoursePostTestItem.update({TestId: id});
    console.log("Successfully Done");
  }
}]);

/*Cousetest getting and deleting controller*/

app.controller('coursetestdetailcontroller', ["$scope","AllCourseTests","Test","Tests","CoursePostTestItem","$stateParams","$rootScope", function($scope,AllCourseTests,Test,Tests,CoursePostTestItem,$stateParams,$rootScope){
  var courseid = $stateParams.courseId;
  var Id = $stateParams.TestId;

  if(typeof(Id) === 'undefined'){
    $scope.CourseTest = new Tests({
      courseId: courseid
    });
  }
  else{
    $scope.CourseTest= Test.get({
      TestId: Id
    });
  }

  $scope.save = function(id){
    if (id ===1) {
      $scope.CourseTest.$save({courseId: courseid});
    }
    else{
      $scope.CourseTest.$update();
    }
  };

  $scope.publish = function(id){
    CoursePostTestItem.$save({TestId: id});
  }
}]);

/*Moduletset getting and deleting controller*/

app.controller('moduletestcontroller', ["$scope","AllModuleTests","MTest","$stateParams","$rootScope", function($scope,AllModuleTests,MTest,$stateParams,$rootScope){
  $scope.moduleid = $stateParams.moduleId;
  var testid = $stateParams.TestId;  
  $scope.ModuleTests = AllModuleTests.query();
  $scope.Testdetails = MTest.get({TestId: testid});

  $scope.deleteTest = function(ModuleTest){
    $scope.ModuleTests.splice($scope.ModuleTests.indexOf(ModuleTest), 1);
    MTest.delete({TestId: ModuleTest.id});
  }
}]);

/*Moduletest creating and updating controller*/

app.controller('moduletestdetailcontroller', ["$scope","AllModuleTests","MTest","MTests","$stateParams","$rootScope", function($scope,AllModuleTests,MTest,MTests,$stateParams,$rootScope){
  var moduleid = $stateParams.moduleId;
  var Id = $stateParams.TestId;

  if(typeof(Id) === 'undefined'){
    $scope.ModuleTest = new MTests({
      moduleId: moduleid
    });
  }
  else{
    $scope.ModuleTest= MTest.get({
      TestId: Id
    });
  }

  $scope.save = function(id){
    if (id ===1) {
      $scope.ModuleTest.$save({moduleId: moduleid});
    }
    else{
      $scope.ModuleTest.$update();
    }
  };
}]);

/*Lessontest getting and deleting controller*/

app.controller('lessontestcontroller', ["$scope","AllLessonTests","LTest","$stateParams","$rootScope", function($scope,AllLessonTests,LTest,$stateParams,$rootScope){
  $scope.lessonid = $stateParams.lessonId;
  var testid = $stateParams.TestId;  
  $scope.LessonTests = AllLessonTests.query();
  $scope.Testdetails = LTest.get({TestId: testid});

  $scope.deleteTest = function(LessonTest){
    $scope.LessonTests.splice($scope.LessonTests.indexOf(LessonTest), 1);
    LTest.delete({TestId: LessonTest.id});
  }
}]);

/*Lessontest creating and updatnig controler*/

app.controller('lessontestdetailcontroller', ["$scope","AllLessonTests","LTest","LTests","$stateParams","$rootScope", function($scope,AllLessonTests,LTest,LTests,$stateParams,$rootScope){
  var lessonid = $stateParams.lessonId;
  var Id = $stateParams.TestId;

  if(typeof(Id) === 'undefined'){
    $scope.LessonTest = new LTests({
      lessonId: lessonid
    });
  }
  else{
    $scope.LessonTest= LTest.get({
      TestId: Id
    });
  }

  $scope.save = function(id){
    if (id ===1) {
      $scope.LessonTest.$save({lessonId: lessonid});
    }
    else{
      $scope.LessonTest.$update();
    }  };

}]);

/*Coursetest item getting and deleting controller*/

app.controller('coursetestitemcontroller', ["$scope","AllLessonTests","LTest","$stateParams","$rootScope", function($scope,AllLessonTests,LTest,$stateParams,$rootScope){
  $scope.lessonid = $stateParams.lessonId;
  var testid = $stateParams.TestId;  
  $scope.LessonTests = AllLessonTests.query();
  $scope.Testdetails = LTest.get({TestId: testid});

  $scope.deleteTest = function(LessonTest){
    $scope.LessonTests.splice($scope.LessonTests.indexOf(LessonTest), 1);
    LTest.delete({TestId: LessonTest.id});
  }
}]);

/*Coursetestitem creating and updating controller*/

app.controller('coursetestitemdetailcontroller', ["$scope","$stateParams","TestItems","CourseTestItem",function($scope,$stateParams,TestItems,CourseTestItem){
  
  var Id = $stateParams.ItemId;
  var testid =$stateParams.TestId;

  if(typeof(Id) === 'undefined'){
    $scope.item = new TestItems({
      TestId: testid
    });
  }
  else{
    $scope.item= CourseTestItem.get({
      ItemId: Id
    });
  }

  $scope.save = function(id){
    if (id ===1) {
      console.log($scope.item.question.items[0]);
      var item1 = angular.toJson($scope.item.question.items[0]);
      var item2 = "["+ item1 + "]";
      $scope.item.question.items = item2;
      console.log($scope.item);
      
      $scope.item.$save({TestId: testid});
    }
    else{
      var item1 = angular.toJson($scope.item.question.items[0]);
      var item2 = "["+ item1 + "]";
      $scope.item.question.items = item2;
      $scope.item.$update();
    }
  };
}]);

/*Skiil Adjecencies controller*/

app.controller('Skilladdingcontroller', ["$scope","$rootScope","$stateParams","Areas","AreaCourse","Coursemodules","ModuleLessons","LessonLos","LoSkills","Allskillgraphs","SkillgraphDelete","Adjecency",function($scope,$rootScope,$stateParams,Areas,AreaCourse,Coursemodules,ModuleLessons,LessonLos,LoSkills,Allskillgraphs,SkillgraphDelete,Adjecency){
$scope.skillpid = $stateParams.skillId;
$scope.loid = $rootScope.loid;

/*Getting the all areas*/
$scope.areas = Areas.query();

/*Getting the all Courses*/
$scope.passingarea= function(id){
  var aid = id;
  console.log(aid);
  $scope.courses = AreaCourse.query({areaId: aid});
  console.log($scope.courses);
}
$scope.passingcourse= function(id){
  var cid = id;
  console.log(cid);
  $scope.modules = Coursemodules.query({courseId: cid});
  console.log($scope.modules);
}
$scope.passingmodule= function(id){
  var mid = id;
  console.log(mid);
  $scope.lessons = ModuleLessons.query({moduleId: mid});
  console.log($scope.lessons);
}
$scope.passinglesson= function(id){
  var lid = id;
  console.log(lid);
  $scope.los = LessonLos.query({lessonId: lid});
  console.log($scope.los);
}
$scope.passinglo= function(id){
  var loid = id;
  console.log(loid);
  $scope.skills = LoSkills.query({loId: loid});
}
/*$scope.passingskill= function(id){
  var skillid = id;

}*/

$scope.save= function(id){
  Adjecency.get({skillpId: $scope.skillpid,skillcId: id});
  console.log("get saved Successfully");
  $scope.Skills = Allskillgraphs.query({skillpId: $scope.skillpid});
  console.log($scope.Skills);
};

$scope.Delete= function(skill){
  console.log(skill[0].id);
  $scope.Skills.splice($scope.Skills.indexOf(skill[0].skillc), 1);

  SkillgraphDelete.delete({skillpId: $scope.skillpid,skillcId: skill[0].skillc});
  console.log("Deleted Successfully");
  $scope.Skills = Allskillgraphs.query({skillpId: $scope.skillpid});
  alert("Deleted It");
 };
}]);

/*Image LIsting controller*/

app.controller('imagelistingcontroller', ['$scope','$stateParams','Allimages','ImageSearch','ImagePublish', function($scope,$stateParams,Allimages,ImageSearch,ImagePublish){
  $scope.skillid = $stateParams.skillId;

  /*Getting all images from AWS*/

  $scope.images = Allimages.query();

  /*Image Publishing */
  $scope.publish = function(image){
    ImagePublish.get({imageId: image.id});
    /*image.$save({imageId: image.id});*/
  }
}]);

/*Image Uploading Controller*/

app.controller('Imageuploadcontroller', ['$scope','$stateParams','Upload', function($scope, $stateParams,Upload){
  $scope.skillid = $stateParams.skillId;
/*Uploading the Skill Image*/
  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'http://192.168.1.5:8080/files/upload/simage',
      data: {file: file, name: $scope.username, tag1: $scope.tag1, tag2: $scope.tag2, tag3: $scope.tag3, skillid: $scope.skillid}
    });
  }
  /*Uploading Question Image*/
  $scope.uploadPicQ = function(file, id) {
    file.upload = Upload.upload({
      url: 'http://192.168.1.5:8080/files/upload/qimage',
      data: {file: file, name: $scope.username, tag1: $scope.tag1, tag2: $scope.tag2, tag3: $scope.tag3, qid: id}
    });
  }
}]);

/*Searchiing Image Controller*/

app.controller('imagesearchingcontroller', ['$scope','$stateParams','ImageSearch', function($scope,$stateParams,ImageSearch){
  $scope.skillid = $stateParams.skillId;

  /*Getting all images from Seaching*/

  $scope.search= function(tag){
    $scope.images = ImageSearch.get({tagname: tag});
  }
}]);

app.controller('graphcontroller', ['$stateParams', '$scope', function($stateParams,$scope){
  $scope.name = 'World';
  $scope.id = $stateParams.areaId;
}]);

app.controller('viewmapeditemscontroller', ['$scope','$stateParams','AllItems', function($scope,$stateParams,AllItems){
  $scope.skillid =$stateParams.skillId;
  $scope.Allitems = AllItems.query();
}]);


app.controller('areadeleteModalInstanceCtrl', ['$rootScope','$uibModalInstance','$scope','$stateParams','$window','Organizations','Organization', function($rootScope,$uibModalInstance,$scope,$stateParams,$window,Organizations,Organization){

  $scope.org = $rootScope.Org;

  $scope.area = $rootScope.Area;
  $scope.name = 'World';
  $scope.id = $stateParams.areaId;

 $scope.deletearea =function(){
   $scope.orgs = Organizations.query();
   $scope.orgs.splice($scope.orgs.indexOf($scope.org), 1);
   $uibModalInstance.close();
   Organization.delete({org_Id: $scope.org.id});   /*location.reload();*/
   /*location.href ="#app/allareas";*/
   /*$scope.apply();*/
 }

 $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);