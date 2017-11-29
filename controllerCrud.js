var myapp = angular.module('myapp', []);

          myapp.controller('carroController', function($scope, $http) {

          	_refreshPageData();
          	$scope.scope = [];
                $scope.form = {
                    id : -1,
                    nome : "",
                    descricao : "",
                    tipo : ""
                };

				$scope.editarCarro = function(carro) {
					$scope.form.id = carro.id;
				    $scope.form.nome = carro.nome;
				    $scope.form.descricao = carro.desc;
				    $scope.form.tipo = carro.tipo;
				};

			$scope.excluirCarro = function(carro) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/Carros/carros/' + carro.id
                    }).then(_success, _error);
                };

			
                //HTTP metodos para add/editar carros
                $scope.submitCarro = function() {
                	var xsrf = null;
                	if ($scope.form.id != -1) {
                		xsrf = $.param({'id': $scope.form.id,'nome': $scope.form.nome,'descricao':$scope.form.descricao,'tipo':$scope.form.tipo});
                	}else{
						xsrf = $.param({'nome': $scope.form.nome,'descricao':$scope.form.descricao,'tipo':$scope.form.tipo});
                	}
         		
                    var method = "";
                    var url = "";
                    if ($scope.form.id == -1) {
                        // POST operation
                        method = "POST";
                        url = 'http://localhost:8080/Carros/carros/';
                    } else {
                        // PUT operation
                        method = "POST";
                        url = 'http://localhost:8080/Carros/carros/' + $scope.form.id;
                    }
         		
                    $http({
                        method : method,
                        url : url,
                        data : xsrf,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).then( _success
                    , _error );

                    $scope.form.id = -1;
                };


function _refreshPageData() {
                   $scope.carros = [];
			$http({
			    method: 'get', 
			    url: 'http://localhost:8080/Carros/carros/'
			}).then(function (response) {
			    console.log(response.data.carros, 'res');
			    $scope.carros = response.data.carros;
			},function (error){
			    console.log(error, 'can not get data.');
			});
                }
                function _success(response) {
                    _refreshPageData();
                    _clearForm();
                }
         
                function _error(response) {
                    console.log(response);
                }
         
                //Clear the form
                function _clearForm() {
                    $scope.form.nome = "";
                    $scope.form.descricao = "";
                    $scope.form.tipo = "";
                    $scope.form.id = -1;
                };
          });