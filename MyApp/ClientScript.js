var clientApp = angular.module('clientApp', ['ui.bootstrap']);

clientApp.controller('ClientController', function ($scope, $http, $uibModal, $timeout) {
    $scope.clients = [];
    $scope.searchedClients = [];
    $scope.selectedClient = null;

    
    $scope.SearchGrid = function () {
        $scope.clients = $scope.clients.filter(function (client) {

            return client.Name.toLowerCase().includes($scope.searchText.toLowerCase());


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

    $scope.getClientTypeText = function (type) {
        return parseInt(type) === 0 ? 'Individual' : 'Organization';
    };

    $scope.openModal = function (client) {
        if (client) {
            $scope.modalClient = angular.copy(client);
            $scope.modalTitle = 'Edit client Name';
        } else {
            $scope.modalClient = {};
            $scope.modalClient.ID = $scope.clients.length + 1;
            $scope.modalTitle = 'Add client ';
        }

        var modalInstance = $uibModal.open({
            templateUrl: 'Clientmodal.html',
            controller: 'ClientModalController',
            scope: $scope,
            resolve: {
                nameFilter: function () {
                    return $scope.nameFilter;
                },
                typeFilter: function () {
                    return $scope.typeFilter;
                }
            }
        });




        modalInstance.result.then(function () {

            if (client) {

                client.Name = $scope.modalClient.Name;
                $scope.UpdateClient(client);
            } else {

                var newClient = {
                    ID: $scope.modalClient.ID,
                    Name: $scope.modalClient.Name,
                    Type: $scope.modalClient.Type,
                    Birthdate: $scope.modalClient.Birthdate
                };
                $scope.AddClient(newClient);
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
    $scope.GetAllClients = function () {
        $http({
            method: 'GET',
            url: '/api/clients/GetClient'
        }).then(function successCallback(response) {
            $scope.clients = response.data;
            $scope.searchedClients = response.data;
        }, function errorCallback(response) {
            console.error('Error fetching clients:', response.statusText);
        });



    };

    $scope.AddClient = function (newClient) {
        $http({
            method: 'POST',
            url: '/api/clients/AddClient',
            data: newClient
        }).then(function successCallback(response) {
            console.log('Client added successfully.');
            $scope.clients.push(response.data);
            showSuccessNotification();
        }, function errorCallback(response) {
            console.error('Error adding client:', response.statusText);
        });
    };

    $scope.UpdateClient = function (client) {
        $http({
            method: 'PUT',
            url: `/api/clients/UpdateClient`,
            data: client
        }).then(function successCallback(response) {
            console.log('Client updated successfully.');
        }, function errorCallback(response) {
            console.error('Error updating client:', response.statusText);
        });
    };

    $scope.initializeCounts = function () {
        $scope.individualCount = 0;
        $scope.organizationCount = 0;
        $scope.totalCount = 0;
        // Load client data and update counts
        $scope.GetAllClients();
    };

    $scope.GetAllClients = function () {
        $http({
            method: 'GET',
            url: '/api/clients/GetClient'
        }).then(function successCallback(response) {
            $scope.clients = response.data;
            $scope.searchedClients = response.data;

            // Compute the client counts for each type
            $scope.individualCount = $scope.clients.filter(function (client) {
                return client.Type === '0';
            }).length;

            $scope.organizationCount = $scope.clients.filter(function (client) {
                return client.Type === '1';
            }).length;

            $scope.totalCount = $scope.clients.length;
        }, function errorCallback(response) {
            console.error('Error fetching clients:', response.statusText);
        });
    };
    $scope.GetAllClients();

    $scope.openPhoneReservationModal = function (client) {
        $scope.selectedClient = client;

        // Fetch phone numbers and open the reservation modal here
        $http({
            method: 'GET',
            url: '/api/phone/GetPhone'
        }).then(function successCallback(response) {
            $scope.availablePhoneNumbers = response.data;
            var phoneReservationModalInstance = $uibModal.open({
                templateUrl: 'PhoneReservationModal.html',
                controller: 'PhoneReservationModalController',
                scope: $scope
            });

            phoneReservationModalInstance.result.then(function (selectedPhoneNumber) {
                console.log('Phone number reserved:', selectedPhoneNumber);
            }, function () {
                // Modal dismissed
            });
        }, function errorCallback(response) {
            console.error('Error fetching phone numbers:', response.statusText);
        });
    };

    
    $scope.openUnreserveConfirmationModal = function (client) {
        $scope.selectedClient = client;

        var unreserveConfirmationModalInstance = $uibModal.open({
            templateUrl: 'UnreserveConfirmationModal.html',
            controller: 'PhoneReservationModalController',
            scope: $scope
        });

        unreserveConfirmationModalInstance.result.then(function () {
            // Unreserve the phone number
            $scope.unreservePhone();
        }, function () {
            // Modal dismissed
        });
    };

    $scope.unreservePhone = function () {
        if ($scope.selectedClient) {
            var phoneUnreservation = {
                ID: $scope.selectedClient.ID,
                Client: $scope.selectedClient.Name,
                PhoneNumber: null,
                BED: null,
                EED: null
            };

            $http({
                method: 'PUT', // Use PUT for updating
                url: '/api/phoneReserve/UpdatePhoneReserve', // Adjust the API endpoint
                data: phoneUnreservation
            }).then(function successCallback(response) {
                console.log('Phone number unreserved.');
                
            }, function errorCallback(response) {
                console.error('Error unreserving phone number:', response.statusText);
            });
        }

    };

});

clientApp.controller('ClientModalController', function ($scope, $uibModalInstance, nameFilter, typeFilter) {
    $scope.nameFilter = nameFilter;
    $scope.typeFilter = typeFilter;

    $scope.saveClient = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});






clientApp.controller('PhoneReservationModalController', function ($scope, $http, $uibModalInstance) {
    $scope.reservePhone = function () {
        if ($scope.selectedPhoneNumber) {
            var phoneReservation = {
                ID: $scope.selectedClient.ID,
                Client: $scope.selectedClient.Name,
                PhoneNumber: $scope.selectedPhoneNumber.Number,
                BED: $scope.selectedPhoneNumber.BeginningEffectiveDate,
                EED: $scope.selectedPhoneNumber.ExpirationDate || null 
            };

            $http({
                method: 'POST',
                url: '/api/phoneReserve/AddReserve',
                data: phoneReservation
            }).then(function successCallback(response) {
                console.log('Phone number reserved:', $scope.selectedPhoneNumber);
                $uibModalInstance.close($scope.selectedPhoneNumber);
            }, function errorCallback(response) {
                console.error('Error reserving phone number:', response.statusText);
            });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});
