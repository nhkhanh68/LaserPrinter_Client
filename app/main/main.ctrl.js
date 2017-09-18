(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userServices', '$state', 'md5', '$timeout',
            function($scope, $rootScope, $location, $window, userServices, $state, md5, $timeout) {
                $rootScope.serverAdd = "http://112.137.130.47:8180";
                $rootScope.clientAdd = "http://112.137.130.47:8000";
                $rootScope.response = [];
                $scope.socket = [];
                $scope.inputHealth = {};
                $scope.input = [];
                $scope.inputPatient = {};
                $scope.inputGuiXe = {};
                $scope.inputNhanVien = {};
                $scope.allLogTienStudent = [];
                $scope.sach = "themsach";
                // $scope.bv = "themba";
                $scope.reverse = true;
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
                    if(string == 'themba'){
                        $rootScope.modalPatient = undefined;
                        // $timeout(function() {
                        //     $scope.$apply();
                        // });
                        
                    }
                }
                $scope.chonguixe = function(string) {
                    $scope.guixe = string;
                }
                $scope.chonnhanvien = function(string) {
                    $scope.nhanvien = string;
                }
                $scope.phieuKham = true;
                $scope.benhsu = true;
                $scope.canlamsang = true;
                $scope.chuandoan = true;
                $scope.thamkhamlamsang = true;
                $scope.collapse = function(className, v) {
                    if (v == true) {
                        if (className == 'phieuKham') {
                            if (!$('.benhsu').is(':visible')) {
                                $timeout(function() {
                                    $('#benhsu').trigger('click');
                                });
                            }
                            if (!$('.canlamsang').is(':visible')) {
                                $timeout(function() {
                                    $('#canlamsang').trigger('click');
                                });
                            }
                            if (!$('.chuandoan').is(':visible')) {
                                $timeout(function() {
                                    $('#chuandoan').trigger('click');
                                });
                            }
                            if (!$('.thamkhamlamsang').is(':visible')) {
                                $timeout(function() {
                                    $('#thamkhamlamsang').trigger('click');
                                });
                            }
                        } else if (className == 'themThongTin') {
                            if (!$('.tinhtranglucsinh').is(':visible')) {
                                $timeout(function() {
                                    $('#tinhtranglucsinh').trigger('click');
                                });
                            }
                            if (!$('.tiensubenhtat').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensubenhtat').trigger('click');
                                });
                            }
                            if (!$('.khuyettat').is(':visible')) {
                                $timeout(function() {
                                    $('#khuyettat').trigger('click');
                                });
                            }
                            if (!$('.tiensuphauthuat').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensuphauthuat').trigger('click');
                                });
                            }
                            if (!$('.tiensugiadinh').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensugiadinh').trigger('click');
                                });
                            }
                            if (!$('.suckhoesinhsan').is(':visible')) {
                                $timeout(function() {
                                    $('#suckhoesinhsan').trigger('click');
                                });
                            }
                            if (!$('.cacbenhkhac').is(':visible')) {
                                $timeout(function() {
                                    $('#cacbenhkhac').trigger('click');
                                });
                            }
                        } else if (className == 'thongTinModal') {
                            if (!$('.tinhtranglucsinhModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tinhtranglucsinhModal').trigger('click');
                                });
                            }
                            if (!$('.tiensubenhtatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensubenhtatModal').trigger('click');
                                });
                            }
                            if (!$('.khuyettatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#khuyettatModal').trigger('click');
                                });
                            }
                            if (!$('.tiensuphauthuatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensuphauthuatModal').trigger('click');
                                });
                            }
                            if (!$('.tiensugiadinhModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensugiadinhModal').trigger('click');
                                });
                            }
                            if (!$('.suckhoesinhsanModal').is(':visible')) {
                                $timeout(function() {
                                    $('#suckhoesinhsanModal').trigger('click');
                                });
                            }
                            if (!$('.cacbenhkhacModal').is(':visible')) {
                                $timeout(function() {
                                    $('#cacbenhkhacModal').trigger('click');
                                });
                            }
                        }
                    } else {
                        if (className == 'phieuKham') {
                            // console.log($scope.benhsu);
                            if ($('.benhsu').is(':visible')) {
                                $timeout(function() {
                                    $('#benhsu').trigger('click');
                                });
                                // $scope.benhsu = false;
                                // console.log($scope.benhsu)
                            }
                            if ($('.canlamsang').is(':visible')) {
                                $timeout(function() {
                                    $('#canlamsang').trigger('click');
                                });
                                // $('#canlamsang').trigger('click')
                            }
                            if ($('.chuandoan').is(':visible')) {
                                $timeout(function() {
                                    $('#chuandoan').trigger('click');
                                });
                                // $('#chuandoan').trigger('click')
                            }
                            if ($('.thamkhamlamsang').is(':visible')) {
                                $timeout(function() {
                                    $('#thamkhamlamsang').trigger('click');
                                });
                            }
                        } else if (className == 'themThongTin') {
                            if ($('.tinhtranglucsinh').is(':visible')) {
                                $timeout(function() {
                                    $('#tinhtranglucsinh').trigger('click');
                                });
                            }
                            if ($('.tiensubenhtat').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensubenhtat').trigger('click');
                                });
                            }
                            if ($('.khuyettat').is(':visible')) {
                                $timeout(function() {
                                    $('#khuyettat').trigger('click');
                                });
                            }
                            if ($('.tiensuphauthuat').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensuphauthuat').trigger('click');
                                });
                            }
                            if ($('.tiensugiadinh').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensugiadinh').trigger('click');
                                });
                            }
                            if ($('.suckhoesinhsan').is(':visible')) {
                                $timeout(function() {
                                    $('#suckhoesinhsan').trigger('click');
                                });
                            }
                            if ($('.cacbenhkhac').is(':visible')) {
                                $timeout(function() {
                                    $('#cacbenhkhac').trigger('click');
                                });
                            }
                        } else if (className == 'thongTinModal') {
                            if ($('.tinhtranglucsinhModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tinhtranglucsinhModal').trigger('click');
                                });
                            }
                            if ($('.tiensubenhtatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensubenhtatModal').trigger('click');
                                });
                            }
                            if ($('.khuyettatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#khuyettatModal').trigger('click');
                                });
                            }
                            if ($('.tiensuphauthuatModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensuphauthuatModal').trigger('click');
                                });
                            }
                            if ($('.tiensugiadinhModal').is(':visible')) {
                                $timeout(function() {
                                    $('#tiensugiadinhModal').trigger('click');
                                });
                            }
                            if ($('.suckhoesinhsanModal').is(':visible')) {
                                $timeout(function() {
                                    $('#suckhoesinhsanModal').trigger('click');
                                });
                            }
                            if ($('.cacbenhkhacModal').is(':visible')) {
                                $timeout(function() {
                                    $('#cacbenhkhacModal').trigger('click');
                                });
                            }
                        }
                    }
                }
                // console.log = function(){};
                // var d = new Date();
                // console.log(d.getDay());
                $scope.count = 0;
                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    // console.log($scope.name);
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        if ($scope.name.length == 3) {
                            angular.forEach($scope.name, function(data) {
                                $scope.socket.stomp.subscribe("/user/" + data.name + "/**", function(message) {
                                    var response = JSON.parse(message.body);
                                    // console.log(response);
                                    if (data.name == 'checkinGuiXe') {
                                        if (response.status == 'Thành công') {
                                            var arr = response;
                                            arr.status = 'Thẻ';
                                            $scope.allGuiXe.push(arr);
                                        } else if (response.status == 'Không đủ tiền!') {
                                            var arr = response;
                                            arr.status = 'Tiền mặt';
                                            $scope.allGuiXe.push(arr);
                                        }
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
                                        userServices.getLogTienStudent(response.id)
                                            .then(function(response) {
                                                $scope.allLogTienStudent = response.data;
                                            }, function(error) {
                                                // console.log(error);
                                            })
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
                                    if (!$('#thong_tin').is(':visible')) {
                                        $timeout(function() {
                                            $('#h3_thong_tin_benh_nhan').trigger('click');
                                        });
                                    }
                                    // $('#h3_thong_tin_benh_nhan').trigger('click');
                                    // console.log(response.patientId);
                                    $scope.getAllHealthRecordsOfPatient(response.patientId);
                                } else if ($scope.name == "student") {
                                    $scope.selectStudent(response);
                                    $scope.getAllBookStudentOfStudent(response.id);
                                    // console.log(response);
                                } else if ($scope.name == 'nhanvien') {
                                    // console.log(response);
                                }
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
                        // $scope.title = "Quản lý thư viên";
                        // if (current.hasOwnProperty('$$route')) {}
                        $scope.initSockets();
                        $location.path('/student');
                    } else if ($rootScope.role == 'client-patient') {
                        $scope.name = 'patient';
                        $rootScope.title = "Quản lý khám bệnh";
                        // $scope.title = "Quản lý khám bệnh";
                        // if (current.hasOwnProperty('$$route')) {}
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
                        // $scope.title = "Quản lý gửi xe";
                        $scope.initSockets();
                        $location.path('/guixe');
                        // console.log($scope.name);
                    } else if ($rootScope.role == "nhanvien") {
                        // $scope.name = "student";
                        $scope.name = 'nhanvien';
                        // $scope.title = "Quản lý nhân viên";
                        // if (current.hasOwnProperty('$$route')) {}
                        $scope.initSockets();
                        $location.path('/nhanvien');
                    }
                    $scope.show = $rootScope.role;
                } else {

                    $rootScope.loggedIn = false;
                    $rootScope.title = 'Đăng nhập';
                    $location.path('/login');
                }


                $scope.mucTienGuiXe = function() {
                    userServices.mucTienGuiXe()
                        .then(function(response) {
                            $scope.tienGuiXe = response.data.password;
                            // console.log(response.data);
                        }, function(error) {
                            // console.log(error)
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
                                // console.log(error);
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
                        // console.log($scope.req);
                        userServices.napTien($scope.req)
                            .then(function() {
                                $scope.alertSuccess("Thêm tiền thành công!", '');
                                $scope.student.student.cash = $scope.inputGuiXe.cash;
                                $scope.inputGuiXe.cash = 0;
                                userServices.getLogTienStudent($scope.req.id)
                                    .then(function(response) {
                                        $scope.allLogTienStudent = response.data;
                                    }, function(error) {
                                        // console.log(error);
                                    })
                            }, function(error) {
                                // console.log(error);
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
                            // console.log(response)
                            $scope.allGuiXe = response.data;
                        }, function(error) {
                            // console.log(error);
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
                    // console.log($scope.listTraSach);
                    userServices.traSach($scope.listTraSach)
                        .then(function() {
                            angular.forEach($scope.listTraSach, function(data) {
                                $('#status_' + data.id).text("Đã trả");
                                $('#checkbox_' + data.id).trigger("click");
                                $('#checkbox_' + data.id).hide();
                                // console.log(data.id);
                            })
                            $scope.listTraSach = [];
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.convert = function(data) {
                    if ($scope.patient.patient.tieuSuBenh != undefined) {
                        $scope.patient.patient.tieuSuBenh = $scope.patient.patient.tieuSuBenh.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                }


                $scope.selectHealthRecord = function(data) {
                    $scope.inputHealthModal = data;
                    // console.log(data.ngayKhamLai)
                    var ar = data.ngayKhamLai.split('-');
                    if (ar[1] < 10) {
                        ar[1] = '0' + ar[1];
                    }
                    data.ngayKhamLai = ar[2] + '-' + ar[1] + '-' + ar[0];
                    // console.log(data.ngayKhamLai)
                    if ($scope.inputHealthModal.ppDieuTri != undefined) {
                        $scope.inputHealthModal.ppDieuTri = $scope.inputHealthModal.ppDieuTri.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.lyDoKham != undefined) {
                        $scope.inputHealthModal.lyDoKham = $scope.inputHealthModal.lyDoKham.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.benhSu != undefined) {
                        $scope.inputHealthModal.benhSu = $scope.inputHealthModal.benhSu.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.chuanDoanKetLuan != undefined) {
                        $scope.inputHealthModal.chuanDoanKetLuan = $scope.inputHealthModal.chuanDoanKetLuan.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tenThuoc1 != undefined) {
                        $scope.inputHealthModal.tenThuoc1 = $scope.inputHealthModal.tenThuoc1.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.soLuong1 != undefined) {
                        $scope.inputHealthModal.soLuong1 = $scope.inputHealthModal.soLuong1.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.lieuDung1 != undefined) {
                        $scope.inputHealthModal.lieuDung1 = $scope.inputHealthModal.lieuDung1.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tenThuoc2 != undefined) {
                        $scope.inputHealthModal.tenThuoc2 = $scope.inputHealthModal.tenThuoc2.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.soLuong2 != undefined) {
                        $scope.inputHealthModal.soLuong2 = $scope.inputHealthModal.soLuong2.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.lieuDung2 != undefined) {
                        $scope.inputHealthModal.lieuDung2 = $scope.inputHealthModal.lieuDung2.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tenThuoc3 != undefined) {
                        $scope.inputHealthModal.tenThuoc3 = $scope.inputHealthModal.tenThuoc3.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.soLuong3 != undefined) {
                        $scope.inputHealthModal.soLuong3 = $scope.inputHealthModal.soLuong3.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.lieuDung3 != undefined) {
                        $scope.inputHealthModal.lieuDung3 = $scope.inputHealthModal.lieuDung3.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tuVan != undefined) {
                        $scope.inputHealthModal.tuVan = $scope.inputHealthModal.tuVan.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.da != undefined) {
                        $scope.inputHealthModal.da = $scope.inputHealthModal.da.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.niemMac != undefined) {
                        $scope.inputHealthModal.niemMac = $scope.inputHealthModal.niemMac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.lamSangKhac != undefined) {
                        $scope.inputHealthModal.lamSangKhac = $scope.inputHealthModal.lamSangKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.timMach != undefined) {
                        $scope.inputHealthModal.timMach = $scope.inputHealthModal.timMach.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tietNien != undefined) {
                        $scope.inputHealthModal.tietNien = $scope.inputHealthModal.tietNien.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.tieuHoa != undefined) {
                        $scope.inputHealthModal.tieuHoa = $scope.inputHealthModal.tieuHoa.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.hohap != undefined) {
                        $scope.inputHealthModal.hohap = $scope.inputHealthModal.hohap.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.taiMuiHong != undefined) {
                        $scope.inputHealthModal.taiMuiHong = $scope.inputHealthModal.taiMuiHong.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.rangHamMat != undefined) {
                        $scope.inputHealthModal.rangHamMat = $scope.inputHealthModal.rangHamMat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.mat != undefined) {
                        $scope.inputHealthModal.mat = $scope.inputHealthModal.mat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.coXuongKhop != undefined) {
                        $scope.inputHealthModal.coXuongKhop = $scope.inputHealthModal.coXuongKhop.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.dinhDuong != undefined) {
                        $scope.inputHealthModal.dinhDuong = $scope.inputHealthModal.dinhDuong.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.noiTiet != undefined) {
                        $scope.inputHealthModal.noiTiet = $scope.inputHealthModal.noiTiet.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.coQuanThanhKinh != undefined) {
                        $scope.inputHealthModal.coQuanThanhKinh = $scope.inputHealthModal.coQuanThanhKinh.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($scope.inputHealthModal.coQuanKhac != undefined) {
                        $scope.inputHealthModal.coQuanKhac = $scope.inputHealthModal.coQuanKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    // console.log($scope.inputHealth);
                    // if ($scope.inputHealth.lyDoKham != undefined) {
                    //     $scope.inputHealth.lyDoKham = $scope.inputHealth.lyDoKham.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.diUngThuoc != undefined) {
                    //     $scope.inputHealth.diUngThuoc = $scope.inputHealth.diUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.diUngHoaChat != undefined) {
                    //     $scope.inputHealth.diUngHoaChat = $scope.inputHealth.diUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.diUngThucPham != undefined) {
                    //     $scope.inputHealth.diUngThucPham = $rootScope.modalPatient.diUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.diUngKhac != undefined) {
                    //     $scope.inputHealth.diUngKhac = $scope.inputHealth.diUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tieuSuBenh != undefined) {
                    //     $scope.inputHealth.tieuSuBenh = $scope.inputHealth.tieuSuBenh.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.khuyetTatKhac != undefined) {
                    //     $scope.inputHealth.khuyetTatKhac = $scope.inputHealth.khuyetTatKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tieuSuPhauThuat != undefined) {
                    //     $scope.inputHealth.tieuSuPhauThuat = $scope.inputHealth.tieuSuPhauThuat.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsgdDiUngThuoc != undefined) {
                    //     $scope.inputHealth.tsgdDiUngThuoc = $scope.inputHealth.tsgdDiUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsgdDiUngHoaChat != undefined) {
                    //     $scope.inputHealth.tsgdDiUngHoaChat = $scope.inputHealth.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsgdDiUngHoaChat != undefined) {
                    //     $scope.inputHealth.tsgdDiUngHoaChat = $scope.inputHealth.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsgdDiUngThucPham != undefined) {
                    //     $scope.inputHealth.tsgdDiUngThucPham = $scope.inputHealth.tsgdDiUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsgdDiUngKhac != undefined) {
                    //     $scope.inputHealth.tsgdDiUngKhac = $scope.inputHealth.tsgdDiUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.tsspBenhKhac != undefined) {
                    //     $scope.inputHealth.tsspBenhKhac = $scope.inputHealth.tsspBenhKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                    // if ($scope.inputHealth.ppDieuTri != undefined) {
                    //     $scope.inputHealth.ppDieuTri = $scope.inputHealth.ppDieuTri.replace(/<br\s*[\/]?>/g, '\r\n');
                    // }
                }

                $scope.getAllHealthRecordsOfPatient = function(id) {
                    userServices.getAllHealthRecordsOfPatient(id)
                        .then(function(response) {
                            // console.log(response.data);
                            $scope.allHealthRecordsOfPatient = response.data;
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.getAllBookStudentOfStudent = function(id) {
                    userServices.getAllBookStudentOfStudent(id)
                        .then(function(response) {
                            // console.log(response.data);
                            $scope.allBookStudentOfStudent = response.data;
                        }, function(error) {
                            // console.log(error);
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
                    $rootScope.modalPatient = data.patient;
                    // console.log($rootScope.modalPatient);
                    if ($rootScope.modalPatient.diUngThuoc != undefined) {
                        $rootScope.modalPatient.diUngThuoc = $rootScope.modalPatient.diUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngHoaChat != undefined) {
                        $rootScope.modalPatient.diUngHoaChat = $rootScope.modalPatient.diUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngThucPham != undefined) {
                        $rootScope.modalPatient.diUngThucPham = $rootScope.modalPatient.diUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngKhac != undefined) {
                        $rootScope.modalPatient.diUngKhac = $rootScope.modalPatient.diUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tieuSuBenh != undefined) {
                        $rootScope.modalPatient.tieuSuBenh = $rootScope.modalPatient.tieuSuBenh.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.khuyetTatKhac != undefined) {
                        $rootScope.modalPatient.khuyetTatKhac = $rootScope.modalPatient.khuyetTatKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tieuSuPhauThuat != undefined) {
                        $rootScope.modalPatient.tieuSuPhauThuat = $rootScope.modalPatient.tieuSuPhauThuat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngThuoc != undefined) {
                        $rootScope.modalPatient.tsgdDiUngThuoc = $rootScope.modalPatient.tsgdDiUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngHoaChat != undefined) {
                        $rootScope.modalPatient.tsgdDiUngHoaChat = $rootScope.modalPatient.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngHoaChat != undefined) {
                        $rootScope.modalPatient.tsgdDiUngHoaChat = $rootScope.modalPatient.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngThucPham != undefined) {
                        $rootScope.modalPatient.tsgdDiUngThucPham = $rootScope.modalPatient.tsgdDiUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngKhac != undefined) {
                        $rootScope.modalPatient.tsgdDiUngKhac = $rootScope.modalPatient.tsgdDiUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsspBenhKhac != undefined) {
                        $rootScope.modalPatient.tsspBenhKhac = $rootScope.modalPatient.tsspBenhKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    userServices.getAllHealthRecordsOfPatient(data.patient.id)
                        .then(function(response) {
                            // console.log(response.data);
                            $scope.allHealthRecordsOfPatient = response.data;
                        }, function(error) {
                            // console.log(error);
                        })

                    $timeout(function() {
                        $rootScope.$apply();
                    });
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
                            // console.log(error);
                        })
                    // $scope.$apply();
                }

                $scope.createHealthRecords = function() {
                    // $scope.inputHealth.patientId = $scope.patient.id;
                    if ($scope.inputHealth.lyDoKham != undefined) {
                        if ($scope.inputHealth.lyDoKham != undefined) {
                            $scope.inputHealth.lyDoKham = $scope.inputHealth.lyDoKham.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.benhSu != undefined) {
                            $scope.inputHealth.benhSu = $scope.inputHealth.benhSu.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.chuanDoanKetLuan != undefined) {
                            $scope.inputHealth.chuanDoanKetLuan = $scope.inputHealth.chuanDoanKetLuan.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tenThuoc1 != undefined) {
                            $scope.inputHealth.tenThuoc1 = $scope.inputHealth.tenThuoc1.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.soLuong1 != undefined) {
                            $scope.inputHealth.soLuong1 = $scope.inputHealth.soLuong1.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.lieuDung1 != undefined) {
                            $scope.inputHealth.lieuDung1 = $scope.inputHealth.lieuDung1.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tenThuoc2 != undefined) {
                            $scope.inputHealth.tenThuoc2 = $scope.inputHealth.tenThuoc2.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.soLuong2 != undefined) {
                            $scope.inputHealth.soLuong2 = $scope.inputHealth.soLuong2.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.lieuDung2 != undefined) {
                            $scope.inputHealth.lieuDung2 = $scope.inputHealth.lieuDung2.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tenThuoc3 != undefined) {
                            $scope.inputHealth.tenThuoc3 = $scope.inputHealth.tenThuoc3.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.soLuong3 != undefined) {
                            $scope.inputHealth.soLuong3 = $scope.inputHealth.soLuong3.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.lieuDung3 != undefined) {
                            $scope.inputHealth.lieuDung3 = $scope.inputHealth.lieuDung3.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tuVan != undefined) {
                            $scope.inputHealth.tuVan = $scope.inputHealth.tuVan.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.da != undefined) {
                            $scope.inputHealth.da = $scope.inputHealth.da.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.niemMac != undefined) {
                            $scope.inputHealth.niemMac = $scope.inputHealth.niemMac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.lamSangKhac != undefined) {
                            $scope.inputHealth.lamSangKhac = $scope.inputHealth.lamSangKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.timMach != undefined) {
                            $scope.inputHealth.timMach = $scope.inputHealth.timMach.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tietNien != undefined) {
                            $scope.inputHealth.tietNien = $scope.inputHealth.tietNien.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.tieuHoa != undefined) {
                            $scope.inputHealth.tieuHoa = $scope.inputHealth.tieuHoa.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.hohap != undefined) {
                            $scope.inputHealth.hohap = $scope.inputHealth.hohap.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.taiMuiHong != undefined) {
                            $scope.inputHealth.taiMuiHong = $scope.inputHealth.taiMuiHong.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.rangHamMat != undefined) {
                            $scope.inputHealth.rangHamMat = $scope.inputHealth.rangHamMat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.mat != undefined) {
                            $scope.inputHealth.mat = $scope.inputHealth.mat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.coXuongKhop != undefined) {
                            $scope.inputHealth.coXuongKhop = $scope.inputHealth.coXuongKhop.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.dinhDuong != undefined) {
                            $scope.inputHealth.dinhDuong = $scope.inputHealth.dinhDuong.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.noiTiet != undefined) {
                            $scope.inputHealth.noiTiet = $scope.inputHealth.noiTiet.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.coQuanThanhKinh != undefined) {
                            $scope.inputHealth.coQuanThanhKinh = $scope.inputHealth.coQuanThanhKinh.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputHealth.coQuanKhac != undefined) {
                            $scope.inputHealth.coQuanKhac = $scope.inputHealth.coQuanKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }


                        var date = new Date();
                        var curr_date = date.getDate();
                        var curr_month = date.getMonth() + 1; //Months are zero based
                        var curr_year = date.getFullYear();
                        $scope.inputHealth.date = curr_date + "-" + curr_month + "-" + curr_year;
                        // console.log($scope.inputHealth.ngayKhamLai);
                        if ($scope.inputHealth.ngayKhamLai != undefined || $scope.inputHealth.ngayKhamLai != null) {
                            var date = $scope.inputHealth.ngayKhamLai;
                            var curr_date = date.getDate();
                            var curr_month = date.getMonth() + 1; //Months are zero based
                            var curr_year = date.getFullYear();
                            $scope.inputHealth.ngayKhamLai = curr_date + "-" + curr_month + "-" + curr_year;
                        }
                        // console.log($scope.inputHealth);
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
                                // console.log(error);
                            })
                    }
                }

                $scope.getAllHealthRecords = function() {
                    userServices.getAllHealthRecords()
                        .then(function(response) {
                            $scope.allHealthRecords = response.data;
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.selectPatientModal = function(patient) {
                    $rootScope.modalPatient = patient;
                    // console.log($rootScope.modalPatient);
                    if ($rootScope.modalPatient.diUngThuoc != undefined) {
                        $rootScope.modalPatient.diUngThuoc = $rootScope.modalPatient.diUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngHoaChat != undefined) {
                        $rootScope.modalPatient.diUngHoaChat = $rootScope.modalPatient.diUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngThucPham != undefined) {
                        $rootScope.modalPatient.diUngThucPham = $rootScope.modalPatient.diUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.diUngKhac != undefined) {
                        $rootScope.modalPatient.diUngKhac = $rootScope.modalPatient.diUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tieuSuBenh != undefined) {
                        $rootScope.modalPatient.tieuSuBenh = $rootScope.modalPatient.tieuSuBenh.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.khuyetTatKhac != undefined) {
                        $rootScope.modalPatient.khuyetTatKhac = $rootScope.modalPatient.khuyetTatKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tieuSuPhauThuat != undefined) {
                        $rootScope.modalPatient.tieuSuPhauThuat = $rootScope.modalPatient.tieuSuPhauThuat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngThuoc != undefined) {
                        $rootScope.modalPatient.tsgdDiUngThuoc = $rootScope.modalPatient.tsgdDiUngThuoc.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngHoaChat != undefined) {
                        $rootScope.modalPatient.tsgdDiUngHoaChat = $rootScope.modalPatient.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngHoaChat != undefined) {
                        $rootScope.modalPatient.tsgdDiUngHoaChat = $rootScope.modalPatient.tsgdDiUngHoaChat.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngThucPham != undefined) {
                        $rootScope.modalPatient.tsgdDiUngThucPham = $rootScope.modalPatient.tsgdDiUngThucPham.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsgdDiUngKhac != undefined) {
                        $rootScope.modalPatient.tsgdDiUngKhac = $rootScope.modalPatient.tsgdDiUngKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.tsspBenhKhac != undefined) {
                        $rootScope.modalPatient.tsspBenhKhac = $rootScope.modalPatient.tsspBenhKhac.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    if ($rootScope.modalPatient.ppDieuTri != undefined) {
                        $rootScope.modalPatient.ppDieuTri = $rootScope.modalPatient.ppDieuTri.replace(/<br\s*[\/]?>/g, '\r\n');
                    }
                    userServices.getAllHealthRecordsOfPatient(patient.id)
                        .then(function(response) {
                            // console.log(response.data);
                            $scope.allHealthRecordsOfPatient = response.data;
                        }, function(error) {
                            // console.log(error);
                        })

                    $timeout(function() {
                        $rootScope.$apply();
                    });
                }

                $scope.addPatient = function() {
                    // console.log($scope.inputPatient);
                    if ($scope.inputPatient.name != undefined && $scope.inputPatient.patientCode != undefined && $scope.inputPatient.dateOfBirth != undefined && $scope.inputPatient.address != undefined) {
                        if ($scope.inputPatient.diUngThuoc != undefined) {
                            $scope.inputPatient.diUngThuoc = $scope.inputPatient.diUngThuoc.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.diUngHoaChat != undefined) {
                            $scope.inputPatient.diUngHoaChat = $scope.inputPatient.diUngHoaChat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.diUngThucPham != undefined) {
                            $scope.inputPatient.diUngThucPham = $scope.inputPatient.diUngThucPham.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.diUngKhac != undefined) {
                            $scope.inputPatient.diUngKhac = $scope.inputPatient.diUngKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tieuSuBenh != undefined) {
                            $scope.inputPatient.tieuSuBenh = $scope.inputPatient.tieuSuBenh.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.khuyetTatKhac != undefined) {
                            $scope.inputPatient.khuyetTatKhac = $scope.inputPatient.khuyetTatKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tieuSuPhauThuat != undefined) {
                            $scope.inputPatient.tieuSuPhauThuat = $scope.inputPatient.tieuSuPhauThuat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsgdDiUngThuoc != undefined) {
                            $scope.inputPatient.tsgdDiUngThuoc = $scope.inputPatient.tsgdDiUngThuoc.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsgdDiUngHoaChat != undefined) {
                            $scope.inputPatient.tsgdDiUngHoaChat = $scope.inputPatient.tsgdDiUngHoaChat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsgdDiUngHoaChat != undefined) {
                            $scope.inputPatient.tsgdDiUngHoaChat = $scope.inputPatient.tsgdDiUngHoaChat.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsgdDiUngThucPham != undefined) {
                            $scope.inputPatient.tsgdDiUngThucPham = $scope.inputPatient.tsgdDiUngThucPham.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsgdDiUngKhac != undefined) {
                            $scope.inputPatient.tsgdDiUngKhac = $scope.inputPatient.tsgdDiUngKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.tsspBenhKhac != undefined) {
                            $scope.inputPatient.tsspBenhKhac = $scope.inputPatient.tsspBenhKhac.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        if ($scope.inputPatient.ppDieuTri != undefined) {
                            $scope.inputPatient.ppDieuTri = $scope.inputPatient.ppDieuTri.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }
                        // console.log($scope.inputPatient)
                        userServices.createPatient($scope.inputPatient)
                            .then(function(response) {
                                $scope.alertSuccess("Thêm bệnh nhân thành công!", '');
                                $scope.allPatient.push(response.data);
                                $scope.inputPatient = {};
                            }, function(error) {
                                // $scope.alertDanger(e)
                                // console.log(error);
                            })
                    }
                }

                $scope.getAllPatient = function() {
                    userServices.getAllPatient()
                        .then(function(response) {
                            $scope.allPatient = response.data;
                            $scope.inputPatient = {};
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.borrowBook = function() {
                    $scope.req = {};
                    $scope.req.studentId = $scope.student.id;
                    $scope.req.bookId = $scope.input.bookId;
                    $scope.req.expiryDate = $scope.input.expiryDate;
                    // console.log($scope.req)
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
                            // console.log(error);
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
                                // console.log(error);
                            })
                    }
                }

                $scope.showCheckin = function(nhanvien) {
                    // console.log(nhanvien);
                    $scope.nhanvien_details = nhanvien;
                }

                $scope.input = {};
                $scope.getCheckInTheoNgay = function() {
                    date = $scope.input.chonNgay.getDate();
                    userServices.getCheckInTheoNgay(date)
                        .then(function(response) {
                            $scope.checkInTheoNgay = response.data;
                            // console.log(response.data);
                            angular.forEach($scope.checkInTheoNgay, function(data) {

                            })
                        })
                }

                $scope.getAllNhanVien = function() {
                    userServices.getAllNhanVien()
                        .then(function(response) {
                            $scope.allNhanVien = response.data;
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.addNhanVien = function() {
                    // console.log($scope.inputNhanVien);
                    if ($scope.inputNhanVien.fullName != undefined || $scope.inputNhanVien.fullName != "" || $scope.inputNhanVien.studentCode != undefined || $scope.inputNhanVien.studentCode != "") {
                        userServices.addNhanVien($scope.inputNhanVien)
                            .then(function(response) {
                                response.data.status = 0;
                                $scope.allNhanVien.push(response.data);
                                $scope.inputNhanVien = {};
                            }, function(error) {
                                // console.log(error);
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
                                // console.log(error);
                                $scope.alertDanger(error.data.message, "dangerStudent");
                            })
                    }
                }

                $scope.getAllStudent = function() {
                    userServices.getAllStudent()
                        .then(function(response) {
                            $scope.allStudent = response.data;
                            // console.log(response.data);
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.getAllBookStudent = function() {
                    userServices.getAllBookStudent()
                        .then(function(response) {
                            $scope.allBookStudent = response.data;
                            // console.log(response.data);
                        }, function(error) {
                            // console.log(error);
                        })
                }

                $scope.selectStudent = function(student) {
                    $scope.student = student;
                }

                $scope.getAllBook = function() {
                    userServices.getAllBook()
                        .then(function(response) {
                            $scope.allBook = response.data;
                            // console.log(response.data);
                        }, function(error) {
                            // console.log(error);
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
                            // console.log(error);
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