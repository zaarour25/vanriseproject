var phoneApp = angular.module('phoneApp', ['ui.bootstrap']);

phoneApp.controller('PhoneController', function ($scope, $http, $uibModal, $timeout) {
    $scope.phones = [];
    $scope.searchedPhones = [];
    $scope.devices = [];
    $scope.SearchGrid = function () {
        $scope.phones = $scope.searchedPhones.filter(function (phone) {
            return phone.PhoneNumber.includes($scope.searchText);
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



    $scope.openModal = function (phone) {
        if (phone) {
            $scope.modalPhone = angular.copy(phone);
            $scope.modalPhone.Device = phone.Device; // Ensure Device is set properly
            $scope.modalTitle = 'Edit phone Number';
        } else {
            $scope.modalPhone = {};
            $scope.modalPhone.ID = $scope.phones.length + 1;
            $scope.modalTitle = 'Add phone number ';
        }

        var modalInstance = $uibModal.open({
            templateUrl: 'Phonemodal.html',
            controller: 'PhoneModalController',
            scope: $scope,
            resolve: {
                numberFilter: function () {
                    return $scope.numberFilter;
                },
                typeFilter: function () {
                    return $scope.typeFilter;
                }
            }
        });


        $scope.getPhoneNumberCount = function (device) {
            var count = 0;
            $scope.phones.forEach(function (phone) {
                if (phone.Device === device.Name) {
                    count++;
                }
            });
            return count;
        };

        modalInstance.result.then(function () {

            if (phone) {

                phone.Number = $scope.modalPhone.Number;
                $scope.UpdatePhone(phone);
            } else {

                var newPhone = {
                    ID: $scope.modalPhone.ID,
                    Number: $scope.modalPhone.Number,
                    Device: $scope.modalPhone.Device
                };
                $scope.AddPhone(newPhone);
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
            url: '/api/devices/GetDevice' // Update the URL based on your API endpoint
        }).then(function successCallback(response) {
            $scope.devices = response.data;
            $scope.searchedDevices = response.data; // Apply the initial search filter
        }, function errorCallback(response) {
            console.error('Error fetching devices:', response.statusText);
        });



    };





    $scope.GetAllPhones = function () {
        $http({
            method: 'GET',
            url: '/api/phone/GetPhone'
        }).then(function successCallback(response) {
            $scope.phones = response.data;
            $scope.searchedPhones = response.data;
        }, function errorCallback(response) {
            console.error('Error fetching phones:', response.statusText);
        });



    };

    $scope.AddPhone = function (newPhone) {
        $http({
            method: 'POST',
            url: '/api/phone/AddPhone',
            data: newPhone
        }).then(function successCallback(response) {
            console.log('Phone number added successfully.');
            $scope.phones.push(response.data);
            showSuccessNotification();
        }, function errorCallback(response) {
            console.error('Error adding phone number:', response.statusText);
        });
    };

    $scope.UpdatePhone = function (phone) {
        $http({
            method: 'PUT',
            url: `/api/phone/UpdatePhone`,
            data: phone
        }).then(function successCallback(response) {
            console.log('Phone number updated successfully.');
        }, function errorCallback(response) {
            console.error('Error updating phone number:', response.statusText);
        });
    };


    $scope.GetAllPhones();
    $scope.GetAllDevices();

});

phoneApp.controller('PhoneModalController', function ($scope, $uibModalInstance, numberFilter, typeFilter) {
    $scope.numberFilter = numberFilter;
    $scope.typeFilter = typeFilter;

    $scope.savePhone = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}); 