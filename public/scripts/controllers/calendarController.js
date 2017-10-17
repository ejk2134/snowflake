googleAuthApp.controller('CalendarController', function ($http) {
  console.log('loaded CC');
  var _this = this;
  _this.data = '';

  $http.post('/private/calendar')
    .then(function (response) {
      if (response.data.err) {
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.data = response.data.message;
      }
    });
});
