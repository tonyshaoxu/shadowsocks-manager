const app = require('../index').app;

app.controller('HomeController', ['$scope', '$mdMedia', '$mdSidenav', '$state', '$http',
  ($scope, $mdMedia, $mdSidenav, $state, $http) => {
    console.log('Home');
    $http.get('/api/login').then(success => {
      if(success.data.status === 'normal') {
        $state.go('user.index');
      } else if (success.data.status === 'admin') {
        $state.go('admin.index');
      }
    });
    $scope.innerSideNav = true;
    $scope.menuButton = function() {
      if ($mdMedia('gt-sm')) {
        $scope.innerSideNav = !$scope.innerSideNav;
      } else {
        $mdSidenav('left').toggle();
      }
    };
    $scope.menus = [{
      name: '首页',
      icon: 'home',
      click: 'home.index'
    }, {
      name: '登录',
      icon: 'cloud',
      click: 'home.login'
    }, {
      name: '注册帐号',
      icon: 'face',
      click: 'home.signup'
    }, {
      name: '续费码',
      icon: 'shop',
      click: 'admin.renew'
    }, {
      name: '流量统计',
      icon: 'timeline',
      click: 'admin.flow.server'
    }, {
      name: '系统设置',
      icon: 'settings',
      click: 'admin.options'
    }];
    $scope.menuClick = (index) => {
      $mdSidenav('left').close();
      $state.go($scope.menus[index].click);
    };
  }
]).controller('IndexController', ['$scope',
  ($scope) => {
    console.log('Index');
  }
]).controller('LoginController', ['$scope', '$http', '$state',
  ($scope, $http, $state) => {
    console.log('Login');
    $scope.user = {};
    $scope.login = () => {
      $http.post('/api/login', {
        email: $scope.user.email,
        password: $scope.user.password,
      }).then(success => {
        if(success.data.type === 'normal') {
          $state.go('user.index');
        } else if(success.data.type === 'admin') {
          $state.go('admin.index');
        } else {

        }
      }).catch(console.log);
    };
  }
]);
