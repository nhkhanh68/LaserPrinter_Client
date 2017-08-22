(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userServices', '$state', 'md5', '$timeout',
            function($scope, $rootScope, $location, $window, userServices, $state, md5, $timeout) {
                $rootScope.serverAdd = "http://112.137.130.47:8180";
                $rootScope.clientAdd = "http://112.137.130.47:8000";
                $rootScope.response = [];
                $scope.socket = [];
                $scope.inputHealth = {};
                // $scope.inputPatient = {
                //     name: '1',
                //     patientCode: '1',
                //     address: '1',
                //     date: '1'
                // };
                $scope.count = 0;
                console.log(1);
                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        $scope.socket.stomp.subscribe("/user/" + $scope.name + "/**", function(message) {
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
                    $rootScope.role = sessionStorage["role"];
                    if ($rootScope.role == 'client-student') {
                        $scope.name = 'student';
                        $scope.initSockets();
                    } else if ($rootScope.role == 'client-patient') {
                        $scope.name = 'patient';
                        $scope.initSockets();
                    } else {
                        // $scope.name = "student";
                        console.log($scope.show)
                    }
                    $scope.show = $rootScope.role;

                } else {

                    $rootScope.loggedIn = false;
                    $location.path('/login');
                }

                $scope.deleteHealth = function(id) {
                    $('#close_modal_delete_health').trigger('click');
                    userServices.deleteHealth(id)
                        .then(function() {
                            var index = $scope.allHealthRecords.findIndex(x => x.id === id)
                            if (index != -1) {
                                $scope.allHealthRecords.splice(index, 1);
                            }
                        })
                }

                $scope.deletePatient = function(id) {
                    $('#close_modal_delete_patient').trigger('click');
                    userServices.deletePatient(id)
                        .then(function() {
                            var index = $scope.allPatient.findIndex(x => x.id === id)
                            if (index != -1) {
                                $scope.allPatient.splice(index, 1);
                            }
                        })
                }

                $scope.clearAll = function() {
                    $scope.response = [];
                }

                $scope.selectPatient = function(data) {
                    $scope.patient = data;
                    $scope.inputHealth.patientId = data.patientId;
                }

                $scope.createHealthRecords = function() {
                    // $scope.inputHealth.patientId = $scope.patient.id;
                    if ($scope.inputHealth.content != undefined && $scope.inputHealth.patientId != undefined && $scope.inputHealth.ppDieuTri != undefined && $scope.inputHealth.lyDoKham != undefined) {
                        $scope.inputHealth.content = $scope.inputHealth.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.ppDieuTri = $scope.inputHealth.ppDieuTri.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.lyDoKham = $scope.inputHealth.lyDoKham.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        var date = new Date();
                        var curr_date = date.getDate();
                        var curr_month = date.getMonth() + 1; //Months are zero based
                        var curr_year = date.getFullYear();
                        $scope.inputHealth.date = curr_date + "-" + curr_month + "-" + curr_year;
                        console.log($scope.inputHealth.ngayKhamLai);
                        if ($scope.inputHealth.ngayKhamLai != undefined || $scope.inputHealth.ngayKhamLai != null) {
                            var date = $scope.inputHealth.ngayKhamLai;
                            var curr_date = date.getDate();
                            var curr_month = date.getMonth() + 1; //Months are zero based
                            var curr_year = date.getFullYear();
                            $scope.inputHealth.ngayKhamLai = curr_date + "-" + curr_month + "-" + curr_year;
                        }
                        console.log($scope.inputHealth);
                        userServices.createHealthRecords($scope.inputHealth)
                            .then(function(response) {
                                $scope.allHealthRecords.push(response.data);
                                var index = $scope.response.findIndex(x => x.index === $scope.patient.index);
                                if (index != -1) {
                                    $scope.response.splice(index, 1);

                                }
                                $scope.inputHealth = {};
                                $scope.patient = undefined;
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.getAllHealthRecords = function() {
                    userServices.getAllHealthRecords()
                        .then(function(response) {
                            $scope.allHealthRecords = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.addPatient = function() {
                    console.log($scope.inputPatient);
                    if ($scope.inputPatient.name != undefined && $scope.inputPatient.patientCode != undefined && $scope.inputPatient.dateOfBirth != undefined && $scope.inputPatient.address != undefined) {
                        // var date = $scope.inputPatient.date
                        // var curr_date = date.getDate();
                        // var curr_month = date.getMonth() + 1; //Months are zero based
                        // var curr_year = date.getFullYear();
                        // $scope.inputPatient.dateOfBirth = curr_date + "-" + curr_month + "-" + curr_year;
                        // console.log($scope.inputPatient.dateOfBirth);
                        userServices.createPatient($scope.inputPatient)
                            .then(function(response) {
                                $scope.allPatient.push(response.data);
                                $scope.inputPatient = {};
                            }, function(error) {
                                // $scope.alertDanger(e)
                                console.log(error);
                            })
                    }
                }

                $scope.getAllPatient = function() {
                    userServices.getAllPatient()
                        .then(function(response) {
                            $scope.allPatient = response.data;
                            $scope.inputPatient = {};
                        }, function(error) {
                            console.log(error);
                        })
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
                            sessionStorage.setItem("role", response.data.role);
                            $window.location.href = $rootScope.clientAdd;
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                            // if (error.data.message("Wrong password") != -1) {

                            // } else if (error.data.message("Worng username") != -1) {
                            //     $scope.alertDanger("Worng username!", "");
                            // } else {
                            //     $scope.alertDanger("Error", "");
                            // }
                        })
                    // sessionStorage.setItem("User-Data", "hoangkhanh");
                    // $window.location.href = $rootScope.clientAdd;
                }

                $scope.logout = function() {
                    sessionStorage.clear();
                    $window.location.href = $rootScope.clientAdd;
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