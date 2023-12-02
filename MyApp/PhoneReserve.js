var phoneReserveApp = angular.module('phoneReserveApp', ['ui.bootstrap']);

phoneReserveApp.controller('PhoneReservationController', function ($scope, $http, $uibModal) {
    $scope.reservations = [];
    $scope.searchedReservations = [];
    $scope.clients = [];
    $scope.selectedClient = null;
    $scope.searchText = '';

    $scope.SearchGrid = function () {
        $scope.reservations = $scope.searchedReservations.filter(function (reservation) {
            return reservation.PhoneNumber.includes($scope.searchText);
        });
    };

    $scope.GetPhoneReserve = function () {
        $http({
            method: 'GET',
            url: '/api/phoneReserve/GetPhoneReserve'
        }).then(function successCallback(response) {
            $scope.reservations = response.data;
            $scope.searchedReservations = response.data;
        }, function errorCallback(response) {
            console.error('Error fetching number reservations:', response.statusText);
        });
    };

    $scope.GetClients = function () {
        $http({
            method: 'GET',
            url: '/api/clients/GetClient'
        }).then(function successCallback(response) {
            $scope.clients = response.data;
        }, function errorCallback(response) {
            console.error('Error fetching clients:', response.statusText);
        });
    };

    $scope.GetPhoneReserve();
    $scope.GetClients();
});
