(function() {
    'use strict';

    angular.module('services')
        .factory('userServices', userServices);

    userServices.$inject = ['$log', '$http', '$q', '$rootScope'];

    function userServices($log, $http, $q, $rootScope) {
        return {
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
            deleteBookStudent: deleteBookStudent,
            getAllPatient: getAllPatient,
            createPatient: createPatient,
            getAllHealthRecords: getAllHealthRecords,
            createHealthRecords: createHealthRecords,
            deletePatient: deletePatient,
            deleteHealth: deleteHealth,
            getAllBookStudentOfStudent: getAllBookStudentOfStudent,
            getAllHealthRecordsOfPatient: getAllHealthRecordsOfPatient,
            traSach: traSach,
            napTien: napTien,
            getAllGuiXe: getAllGuiXe,
            mucTienGuiXe: mucTienGuiXe,
            thayDoiMucTienGuiXe: thayDoiMucTienGuiXe,
            addNhanVien: addNhanVien,
            getAllNhanVien: getAllNhanVien,
            getCheckInTheoNgay: getCheckInTheoNgay,
            getAllCheckInOfNhanVien: getAllCheckInOfNhanVien,
            deleteNhanVien: deleteNhanVien,
            editPatient: editPatient
        };

        function editPatient(data) {
            return $http({
                url: $rootScope.serverAdd + '/patient/edit',
                method: 'POST',
                data: data
            })
        }
        function deleteNhanVien(id) {
            return $http({
                url: $rootScope.serverAdd + '/deleteNhanVien/' + id,
                method: 'DELETE'
            })
        }

        function getAllCheckInOfNhanVien(id) {
            return $http({
                url: $rootScope.serverAdd + '/checkIn/nhanvien/' + id,
                method: 'GET'
            })
        }

        function getCheckInTheoNgay(ngay) {
            return $http({
                url: $rootScope.serverAdd + '/checkIn/nhanvien/ngay/' + ngay,
                method: 'GET'
            })
        }

        function getAllNhanVien() {
            return $http({
                url: $rootScope.serverAdd + '/nhanvien',
                method: 'GET'
            })
        }

        function addNhanVien(data) {
            return $http({
                url: $rootScope.serverAdd + '/nhanvien/add',
                method: 'POST',
                data: data
            })
        }

        function mucTienGuiXe() {
            return $http({
                url: $rootScope.serverAdd + '/muctienguixe',
                method: 'GET'
            })
        }

        function thayDoiMucTienGuiXe(data) {
            return $http({
                url: $rootScope.serverAdd + '/thayDoiMucTienGuiXe/' + data,
                method: 'POST',
                data: data
            })
        }

        function getAllGuiXe() {
            return $http({
                url: $rootScope.serverAdd + '/guiXe',
                method: 'GET'
            })
        }

        function napTien(data) {
            return $http({
                url: $rootScope.serverAdd + '/tienXe/them',
                method: 'POST',
                data: data
            })
        }

        function traSach(data) {
            return $http({
                url: $rootScope.serverAdd + '/traSach',
                method: 'POST',
                data: data
            })
        }

        function getAllHealthRecordsOfPatient(patientId) {
            return $http({
                url: $rootScope.serverAdd + '/healthRecords/' + patientId,
                method: 'GET'
            })
        }

        function getAllBookStudentOfStudent(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/bookStudent/' + studentId,
                method: 'GET'
            })
        }

        function deleteHealth(id) {
            return $http({
                url: $rootScope.serverAdd + '/healthrecords/' + id + '/delete',
                method: 'DELETE'
            })
        }

        function deletePatient(id) {
            return $http({
                url: $rootScope.serverAdd + '/patient/' + id + '/delete',
                method: 'DELETE'
            })
        }

        function createHealthRecords(data) {
            return $http({
                url: $rootScope.serverAdd + '/healthRecords/create',
                method: 'POST',
                data: data
            })
        }

        function getAllHealthRecords() {
            return $http({
                url: $rootScope.serverAdd + '/healthRecords',
                method: 'GET'
            })
        }

        function getAllPatient() {
            return $http({
                url: $rootScope.serverAdd + '/patient',
                method: 'GET'
            })
        }

        function createPatient(data) {
            return $http({
                url: $rootScope.serverAdd + '/patient/create',
                method: 'POST',
                data: data
            })
        }

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