// app.js
var devApp = angular.module('devApp', ['ui.bootstrap']);

devApp.controller('DeviceController', function ($scope, $http, $uibModal,$timeout) {
    $scope.devices = [];
    $scope.searchedDevices = [];

    $scope.SearchGrid = function () {
        $scope.devices = $scope.devices.filter(function (device) {

            return device.Name.toLowerCase().includes($scope.searchText.toLowerCase());


        });
    };
    $scope.showSuccessMessage = false;
    $scope.showErrorMessage = false;
    // Function to show the success message and hide it after 3 seconds
    function showSuccessNotification() {
        $scope.showSuccessMessage = true;
        $timeout(function () {
            $scope.showSuccessMessage = false;
        }, 3000); // 3 seconds
    }

    function showErrorNotification() {
        $scope.showErrorMessage = true;
        $timeout(function () {
            $scope.showErrorMessage = false;
        }, 3000); // 3 seconds
    }




    $scope.openModal = function (device) {
        if (device) {
            $scope.modalDevice = angular.copy(device);
            $scope.modalTitle = 'Edit Device Name';
        } else {
            $scope.modalDevice = {};
            $scope.modalDevice.ID = $scope.devices.length + 1; 
            $scope.modalTitle = 'Add Device ';
        }

        var modalInstance = $uibModal.open({
            templateUrl: 'modal.html',
            controller: 'ModalController',
            scope: $scope
        });

        modalInstance.result.then(function () {
            
            if (device) {
                // Update device
                device.Name = $scope.modalDevice.name;
                $scope.UpdateDevice(device);
            } else {
                // Add new device
                var newDevice = {
                    ID: $scope.modalDevice.ID,
                    Name: $scope.modalDevice.name
                };
                $scope.AddDevice(newDevice);
            }
            // Reset the search filter
            $scope.searchText = '';
            // Reapply the search filter
            $scope.SearchGrid();
        }, function () {
            // Modal dismissed
        });
    };
    // HTTP Request Functions
    $scope.GetAllDevices = function () {
        $http({
            method: 'GET',
            url: '/api/devices/GetDevice' 
        }).then(function successCallback(response) {
            $scope.devices = response.data;
            $scope.searchedDevices = response.data; 
        }, function errorCallback(response) {
            console.error('Error fetching devices:', response.statusText);
        });

    };
    $scope.AddDevice = function (newDevice) {
        $http({
            method: 'POST',
            url: '/api/devices/AddDevice', 
            data: newDevice
        }).then(function successCallback(response) {
            console.log('Device added successfully.');
            $scope.devices.push(response.data);
            showSuccessNotification();
        }, function errorCallback(response) {
            console.error('Error adding device:', response.statusText);
            showErrorNotification(); 
        });
    };

    $scope.UpdateDevice = function (device) {
        $http({
            method: 'PUT',
            url: `/api/devices/UpdateDevice`, 
            data: device
        }).then(function successCallback(response) {
            console.log('Device updated successfully.');
        }, function errorCallback(response) {
            console.error('Error updating device:', response.statusText);
        });
    };

    
    $scope.GetAllDevices();
});

devApp.controller('ModalController', function ($scope, $uibModalInstance) {
    $scope.saveDevice = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});