 (function () {
    'use strict';

    angular.module('services')
        .factory('userServices',userServices);

    userServices.$inject = ['$log', '$http', '$q', '$rootScope'];

    function userServices($log, $http, $q,$rootScope) {
        return{
            login: login,
            logout: logout,
            getAllBook: getAllBook,
            borrowBook: borrowBook,
            getAllBookStudent: getAllBookStudent,
            getAllStudent: getAllStudent,
            addBook: addBook,
            addStudent: addStudent,
            deleteStudent: deleteStudent,
            deleteBook: deleteBook,
            deleteBookStudent: deleteBookStudent
        };

        function deleteBookStudent(id) {
            return $http({
                url: $rootScope.serverAdd + '/bookStudent/' + id + '/delete',
                method: 'DELETE'
            })
        }

        function deleteStudent(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/delete',
                method: 'DELETE'
            })
        }
        function deleteBook(bookId) {
            return $http({
                url: $rootScope.serverAdd + '/book/' + bookId + '/delete',
                method: 'DELETE'
            })
        }

        function addStudent(data) {
            return $http({
                url: $rootScope.serverAdd + '/student/create',
                method: 'POST',
                data: data
            })
        }

        function addBook(data) {
            return $http({
                url: $rootScope.serverAdd + '/book/create',
                method: 'POST',
                data: data
            })
        }

        function getAllStudent() {
            return $http({
                url: $rootScope.serverAdd + '/student',
                method: 'GET'
            })
        }

        function getAllBookStudent() {
            return $http({
                url: $rootScope.serverAdd + '/bookStudent',
                method: 'GET'
            })
        }

        function borrowBook(data) {
            return $http({
                url: $rootScope.serverAdd + '/borrowBook',
                method: 'POST',
                data: data
            })
        }

        function login(data) {
            return $http({
                url: $rootScope.serverAdd + '/login',
                method: 'POST',
                data: data
            })
        }

        function logout() {
            return $http({
                url: $rootScope.serverAdd + '/logout',
                method: 'GET'
            })
        }
        
        function getAllBook() {
            return $http({
                url: $rootScope.serverAdd + '/book',
                method: 'GET'
            })
        }
    }
}());
