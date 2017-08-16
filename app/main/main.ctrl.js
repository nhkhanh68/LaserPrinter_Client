(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userServices', '$state', 'md5', '$timeout',
            function($scope, $rootScope, $location, $window, userServices, $state, md5, $timeout) {
                $rootScope.serverAdd = "http://112.137.130.47:8180";
                $rootScope.clientAdd = "http://112.137.130.47:8000";
                $rootScope.response = [];
                $scope.socket = [];
                $scope.count = 0;
                $scope.show = true;
                console.log(1);
                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        $scope.socket.stomp.subscribe("/user/khanh/**", function(message) {
                            var response = JSON.parse(message.body);
                            response.time = new Date().getTime();
                            response.index = $scope.count;
                            $scope.count++;
                            $rootScope.response.push(response);
                            console.log($rootScope.response);
                            $rootScope.$apply();
                        });
                    });
                    $scope.socket.client.onclose = $scope.reconnect;
                };
                if (sessionStorage['User-Data']) {
                    $rootScope.loggedIn = true;
                    $rootScope.userName = sessionStorage["userName"];
                    $rootScope.id = sessionStorage["id"];
                    $scope.initSockets();
                } else {

                    $rootScope.loggedIn = false;
                    $location.path('/login');
                }

                $scope.borrowBook = function() {
                    $scope.req = {};
                    $scope.req.studentId = $scope.student.id;
                    $scope.req.bookId = $scope.input.bookId;
                    $scope.req.expiryDate = $scope.input.expiryDate;
                    userServices.borrowBook($scope.req)
                        .then(function(response) {
                            console.log(response.data);
                            $scope.alertSuccess("Thêm thành công!", '');
                            var index = $scope.response.findIndex(x => x.index === $scope.student.index);
                            if (index != -1) {
                                $scope.response.splice(index, 1);

                            }
                            $scope.allBookStudent.push(response.data);
                            // $scope.$apply();
                            $scope.input.bookId = undefined;
                            $scope.input.expiryDate = undefined;
                            $scope.student = undefined;
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, '');
                        })
                }

                $scope.confirmDelete = function(id, name) {
                    $scope.confirmDeleteName = name;
                    $scope.confirmDeleteId = id;
                }

                $scope.deleteStudent = function(id) {
                    $('#close_modal_delete_student').trigger('click');
                    userServices.deleteStudent(id)
                        .then(function() {
                            var index = $scope.allStudent.findIndex(x => x.id === id)
                            if (index != -1) {
                                $scope.allStudent.splice(index, 1);
                            }
                        }, function() {
                            $scope.alertDanger("Không xóa được", "dangerStudent");
                        })
                }

                $scope.deleteBook = function(id) {
                    $('#close_modal_delete_book').trigger('click');
                    userServices.deleteBook(id)
                        .then(function() {
                            var index = $scope.allBook.findIndex(x => x.id === id)
                            if (index != -1) {
                                $scope.allBook.splice(index, 1);
                            }
                        }, function() {
                            $scope.alertDanger("Không xóa được", "dangerBook");
                        })
                }

                $scope.deleteBookStudent = function(id) {
                    $('#close_modal_delete_book_student').trigger('click');
                    userServices.deleteBookStudent(id)
                        .then(function() {
                            var index = $scope.allBookStudent.findIndex(x => x.id === id)
                            if (index != -1) {
                                $scope.allBookStudent.splice(index, 1);
                            }
                        }, function() {
                            $scope.alertDanger("Không xóa được", "dangerBS");
                        })
                }

                $scope.addBook = function() {
                    if ($scope.inputBook.bookName != undefined || $scope.inputBook.bookName != "") {
                        userServices.addBook($scope.inputBook)
                            .then(function(response) {
                                $scope.allBook.push(response.data);
                                $scope.inputBook = {};
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.addStudent = function() {
                    if ($scope.inputStudent.fullName != undefined || $scope.inputStudent.fullName != "" || $scope.inputStudent.studentCode != undefined || $scope.inputStudent.studentCode != "") {
                        userServices.addStudent($scope.inputStudent)
                            .then(function(response) {
                                $scope.allStudent.push(response.data);
                                $scope.inputStudent = {};
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "dangerStudent");
                            })
                    }
                }

                $scope.getAllStudent = function() {
                    userServices.getAllStudent()
                        .then(function(response) {
                            $scope.allStudent = response.data;
                            console.log(response.data);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllBookStudent = function() {
                    userServices.getAllBookStudent()
                        .then(function(response) {
                            $scope.allBookStudent = response.data;
                            console.log(response.data);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.selectStudent = function(student) {
                    $scope.student = student;
                }

                $scope.getAllBook = function() {
                    userServices.getAllBook()
                        .then(function(response) {
                            $scope.allBook = response.data;
                            console.log(response.data);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.login = function() {
                    $scope.request = {
                        userName: $scope.input.username,
                        password: md5.createHash($scope.input.password || '')
                    }
                    userServices.login($scope.request)
                        .then(function(response) {
                            sessionStorage.setItem("User-Data", response.data.token);
                            sessionStorage.setItem("id", response.data.id);
                            sessionStorage.setItem("userName", response.data.userName);
                            $window.location.href = $rootScope.clientAdd;
                        }, function(error) {
                            console.log(error);
                            if (error.data.indexOf("Wrong password") != -1) {
                                $scope.alertDanger("Wrong password!", "");
                            } else if (error.data.indexOf("Worng username") != -1) {
                                $scope.alertDanger("Worng username!", "");
                            } else {
                                $scope.alertDanger("Error", "");
                            }
                        })
                    // sessionStorage.setItem("User-Data", "hoangkhanh");
                    // $window.location.href = $rootScope.clientAdd;
                }

                $scope.logout = function() {
                    sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd;
                    // userServices.logout()
                    //     .then(function() {
                    //         sessionStorage.clear();
                    //         $window.location.href = $rootScope.clientAdd;
                    //     })
                }

                $scope.alertDanger = function(error, danger) {
                    $scope.errorMessage = error;
                    if (danger == 'danger') {
                        $scope.danger_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.danger_edit = false;
                            });
                        }, 6000);
                    } else if (danger == 'dangerStudent') {
                        $scope.dangerStudent = true;
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.danger = false;
                                $scope.errorMessage = "";
                            });
                        }, 5000);
                    } else {
                        $scope.danger = true;
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.danger = false;
                                $scope.errorMessage = "";
                            });
                        }, 5000);
                    }
                }

                $scope.alertSuccess = function(string, success) {
                    $scope.successMessage = string;
                    if (success == 'successdelete_edit') {
                        $scope.successdelete_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.successdelete_edit = false;
                            });
                        }, 10000);
                    } else {
                        $scope.success = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 5000);
                    }

                }

            }
        ])
}());