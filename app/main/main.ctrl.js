(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userServices', '$state', 'md5', '$timeout',
            function($scope, $rootScope, $location, $window, userServices, $state, md5, $timeout) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8000";
                $rootScope.response = [];
                $scope.socket = [];
                $scope.inputHealth = {};
                $scope.input = [];
                $scope.inputPatient = {};
                $scope.inputGuiXe = {};
                $scope.inputNhanVien = {};
                $scope.sach = "themsach";
                $scope.bv = "themba";
                $scope.showX_panel = function() {
                    $timeout(function() {
                        $scope.x_panel = $('#x_panel').width();
                    });
                }
                $scope.chonsach = function(string) {
                    $scope.sach = string;
                }
                $scope.chonbv = function(string) {
                    $scope.bv = string;
                }
                $scope.chonguixe = function(string) {
                    $scope.guixe = string;
                }
                $scope.chonnhanvien = function(string) {
                    $scope.nhanvien = string;
                }
                // console.log = function(){};
                // var d = new Date();
                // console.log(d.getDay());
                $scope.count = 0;
                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    console.log($scope.name);
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        if ($scope.name.length == 3) {
                            angular.forEach($scope.name, function(data) {
                                $scope.socket.stomp.subscribe("/user/" + data.name + "/**", function(message) {
                                    var response = JSON.parse(message.body);
                                    console.log(response);
                                    if (data.name == 'checkinGuiXe') {
                                        var time = new Date(response.checkIn);
                                        var arr = time.toString().split(" ");
                                        response.checkIn = arr[4];

                                        if (response.checkout != null) {
                                            var time = new Date(response.checkout);
                                            var arr = time.toString().split(" ");
                                            response.checkout = arr[4];
                                        }
                                        $scope.checkinGuiXe = response;
                                    } else if (data.name == 'guixe') {
                                        $scope.selectStudent(response);
                                    }
                                    $rootScope.$apply();
                                });
                            })
                        } else {
                            $scope.socket.stomp.subscribe("/user/" + $scope.name + "/**", function(message) {
                                var response = JSON.parse(message.body);
                                // response.time = new Date().getTime();
                                // response.index = $scope.count;
                                // $scope.count++;
                                // $rootScope.response.push(response);
                                // console.log($rootScope.response);
                                if ($scope.name == "patient") {
                                    $scope.selectPatient(response);
                                    console.log(response.patientId);
                                    $scope.getAllHealthRecordsOfPatient(response.patientId);
                                } else if ($scope.name == "student") {
                                    $scope.selectStudent(response);
                                    $scope.getAllBookStudentOfStudent(response.id);
                                    console.log(response);
                                } else if ($scope.name == 'guixe') {}
                                $rootScope.$apply();
                            });
                        }

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
                        $location.path('/student');
                    } else if ($rootScope.role == 'client-patient') {
                        $scope.name = 'patient';
                        $scope.initSockets();
                        $location.path('/patient');
                    } else if ($rootScope.role == 'guixe') {
                        $scope.name = [{
                                name: 'checkinGuiXe'
                            },
                            {
                                name: 'guixe/checkoutGuiXe'
                            },
                            {
                                name: 'guixe'
                            }
                        ]
                        $scope.initSockets();
                        $location.path('/guixe');
                        console.log($scope.name);
                    } else if ($rootScope.role == "nhanvien") {
                        // $scope.name = "student";
                        $scope.name = 'nhanvien';
                        $scope.initSockets();
                        $location.path('/nhanvien');
                    }
                    $scope.show = $rootScope.role;
                } else {

                    $rootScope.loggedIn = false;
                    $location.path('/login');
                }

                $scope.mucTienGuiXe = function() {
                    userServices.mucTienGuiXe()
                        .then(function(response) {
                            $scope.tienGuiXe = response.data.password;
                            console.log(response.data);
                        }, function(error) {
                            console.log(error)
                        })
                }

                $scope.input = {};
                $scope.thayDoiMucTienGuiXe = function() {
                    if ($scope.input.mucTienMoi != "" || $scope.input.mucTienMoi != undefined) {
                        userServices.thayDoiMucTienGuiXe($scope.input.mucTienMoi)
                            .then(function() {
                                $scope.tienGuiXe = $scope.input.mucTienMoi;
                                $scope.input.mucTienMoi = "";
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.napTien = function() {
                    // $scope.selectStudent(response);
                    if ($scope.inputGuiXe.cash != null && $scope.student != undefined) {
                        if ($scope.student.student.cash == null) {
                            $scope.student.student.cash = 0;
                        }
                        $scope.inputGuiXe.cash = parseInt($scope.inputGuiXe.cash) + parseInt($scope.student.student.cash)
                        $scope.req = {
                            id: $scope.student.student.id,
                            cash: $scope.inputGuiXe.cash
                        }
                        console.log($scope.req);
                        userServices.napTien($scope.req)
                            .then(function() {
                                $scope.alertSuccess("Thêm tiền thành công!", '');
                                $scope.student.student.cash = $scope.inputGuiXe.cash;
                                $scope.inputGuiXe.cash = 0;
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }
                // $scope.checkinGuiXe = function(){

                // }
                // $scope.checkoutGuiXe = function(){

                // }
                $scope.getAllGuiXe = function() {
                    userServices.getAllGuiXe()
                        .then(function(response) {
                            $scope.allGuiXe = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.listTraSach = [];

                $scope.addTraSach = function(data) {
                    var index = $scope.listTraSach.findIndex(x => x.id === data.id);
                    if (index != -1) {
                        $scope.listTraSach.splice(index, 1);
                    } else {

                        $scope.listTraSach.push({
                            id: data.id
                        });
                    }
                }

                $scope.traSach = function() {
                    console.log($scope.listTraSach);
                    userServices.traSach($scope.listTraSach)
                        .then(function() {
                            angular.forEach($scope.listTraSach, function(data) {
                                $('#status_' + data.id).text("Đã trả");
                                $('#checkbox_' + data.id).trigger("click");
                                $('#checkbox_' + data.id).hide();
                                console.log(data.id);
                            })
                            $scope.listTraSach = [];
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.convert = function(data) {
                    if ($scope.patient.patient.tieuSuBenh != undefined) {
                        $scope.patient.patient.tieuSuBenh = $scope.patient.patient.tieuSuBenh.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                }

                $scope.getAllHealthRecordsOfPatient = function(id) {
                    userServices.getAllHealthRecordsOfPatient(id)
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allHealthRecordsOfPatient = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllBookStudentOfStudent = function(id) {
                    userServices.getAllBookStudentOfStudent(id)
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allBookStudentOfStudent = response.data;
                        }, function(error) {
                            console.log(error);
                        })
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
                    $scope.student = undefined;
                    $scope.patient = undefined;
                }

                $scope.selectPatient = function(data) {
                    $scope.patient = data;
                    $scope.inputHealth.patientId = data.patientId;
                }

                $scope.addAttr = function(attr, className) {
                    $('.' + className).attr(attr, attr);
                }

                $scope.removeAttr = function(attr, className) {
                    $('.' + className).removeAttr(attr);
                }

                $scope.hide = false;

                $scope.editPatient = function() {
                    $scope.request = {
                        address: $scope.patient.patient.address,
                        patientId: $scope.patient.patient.id,
                        dateOfBirth: $scope.patient.patient.dateOfBirth,
                        phone: $scope.patient.patient.phone,
                        tieuSuBenh: $scope.patient.patient.tieuSuBenh.replace(/(?:\r\n|\r|\n)/g, '<br />')
                    }
                    userServices.editPatient($scope.request)
                        .then(function(response) {
                            $scope.alertSuccess("Chỉnh sửa thành công!", '');
                            // $scope.addAttr('readonly', 'patient');
                            // $('#huy').trigger('click');
                            $scope.hide = false;
                            // $scope.patient.patient = undefined;
                            $scope.patient.patient = response.data;
                            $scope.convert();
                            var index = $scope.allPatient.findIndex(x => x.id === $scope.request.patientId);
                            if (index != -1) {
                                $scope.allPatient[index] = response.data;
                            } else {
                                $scope.getAllPatient();
                            }
                        }, function(error) {
                            console.log(error);
                        })
                    // $scope.$apply();
                }

                $scope.createHealthRecords = function() {
                    // $scope.inputHealth.patientId = $scope.patient.id;
                    if ($scope.inputHealth.content != undefined && $scope.inputHealth.patientId != undefined && $scope.inputHealth.ppDieuTri != undefined && $scope.inputHealth.lyDoKham != undefined) {
                        $scope.inputHealth.content = $scope.inputHealth.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.ppDieuTri = $scope.inputHealth.ppDieuTri.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.lyDoKham = $scope.inputHealth.lyDoKham.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.chiSoCoBan = $scope.inputHealth.chiSoCoBan.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.inputHealth.notice = $scope.inputHealth.notice.replace(/(?:\r\n|\r|\n)/g, '<br />');
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
                                // var index = $scope.response.findIndex(x => x.index === $scope.patient.index);
                                // if (index != -1) {
                                //     $scope.response.splice(index, 1);

                                // }
                                $scope.alertSuccess("Thêm thành công!", "");
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
                        $scope.inputPatient.tieuSuBenh = $scope.inputPatient.tieuSuBenh.replace(/(?:\r\n|\r|\n)/g, '<br />');
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
                    console.log($scope.req)
                    userServices.borrowBook($scope.req)
                        .then(function(response) {
                            // console.log(response.data);
                            // $scope.alertSuccess("Thêm thành công!", '');
                            // var index = $scope.response.findIndex(x => x.index === $scope.student.index);
                            // if (index != -1) {
                            //     $scope.response.splice(index, 1);

                            // }
                            $scope.allBookStudent.push(response.data);
                            $scope.allBookStudentOfStudent.push(response.data);
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

                $scope.deleteNhanVien = function() {
                    userServices.deleteNhanVien($scope.confirmDeleteId)
                        .then(function() {
                            $scope.alertSuccess("Xóa nhân viên " + $scope.confirmDeleteName + " thành công!", '');
                            var index = $scope.allNhanVien.findIndex(x => x.id === $scope.confirmDeleteId);
                            if (index != -1) {
                                $scope.allNhanVien.splice(index, 1);
                            }
                            $("#close_modal_delete_nhanvien").trigger("click");
                        })
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

                $scope.sort = function(sortType) {
                    // $scope.filter = "-" + sortType;
                    $scope.reverse = ($scope.filter === sortType) ? !$scope.reverse : false;
                    $scope.filter = sortType;
                }
                $scope.sortInModal = function(sortType) {
                    // $scope.filter = "-" + sortType;
                    $scope.reverseInModal = ($scope.filterInModal === sortType) ? !$scope.reverseInModal : false;
                    $scope.filterInModal = sortType;
                }

                $scope.changeShowType = function(type) {
                    if (type == 'month') {
                        angular.forEach($scope.allNhanVien, function(nhanvien) {
                            nhanvien.status = 0;
                            userServices.getAllCheckInOfNhanVien(nhanvien.id)
                                .then(function(response) {
                                    // console.log(response.data);
                                    nhanvien.checkin = response.data;
                                    angular.forEach(response.data, function(data) {
                                        if (data.status == 'Muộn') {
                                            nhanvien.status++;
                                            // alert(1)
                                        }
                                    })
                                })
                        })
                    }
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

                $scope.showCheckin = function(nhanvien) {
                    console.log(nhanvien);
                    $scope.nhanvien_details = nhanvien;
                }

                $scope.input = {};
                $scope.getCheckInTheoNgay = function() {
                    date = $scope.input.chonNgay.getDate();
                    userServices.getCheckInTheoNgay(date)
                        .then(function(response) {
                            $scope.checkInTheoNgay = response.data;
                            console.log(response.data);
                            angular.forEach($scope.checkInTheoNgay, function(data) {

                            })
                        })
                }

                $scope.getAllNhanVien = function() {
                    userServices.getAllNhanVien()
                        .then(function(response) {
                            $scope.allNhanVien = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.addNhanVien = function() {
                    console.log($scope.inputNhanVien);
                    if ($scope.inputNhanVien.fullName != undefined || $scope.inputNhanVien.fullName != "" || $scope.inputNhanVien.studentCode != undefined || $scope.inputNhanVien.studentCode != "") {
                        userServices.addNhanVien($scope.inputNhanVien)
                            .then(function(response) {
                                response.data.status = 0;
                                $scope.allNhanVien.push(response.data);
                                $scope.inputNhanVien = {};
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "dangerStudent");
                            })
                    }
                }

                $scope.inputStudent = {};
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