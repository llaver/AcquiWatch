acquisitionApp.controller('emailController', function ($scope, $http) {
	$scope.submitEmail = function () {

		var subject = "Report an error - "
		var company = $scope.company;
		var typeOfError = $scope.typeOfError;
		var descOfError = $scope.descOfError;
		var descOfSuggestion = $scope.descOfSuggestion;
		var email = $scope.email;
		var file = $scope.file;

		if($scope.database){var subject = subject + "Database Error"}
		if($scope.website){var subject = subject + "Website Error"}
		if($scope.general){var subject = subject + "General Error"}
		if($scope.suggestion){var subject = subject + "Suggestion"}

		var body = "Company Name: " +  company + "/n Type of Error: " + typeOfError + "/n Description of Error: " + descOfError + "/n Description of Suggestion: " + descOfSuggestion
					+ "/n Email: " + email;

	document.getElementById("message").textContent = "";

	var request = $http({
	    method: "post",
	    url: "/libs/process.php",
	    data: {
	        subject: subject,
	        body: body,
	        file: file
	    },
	    headers: { 'Content-Type': 'undefined' }
	});

	/* Check whether the HTTP Request is successful or not. */
	request.success(function (data) {
	    //document.getElementById("message").textContent = "You have login successfully with email "+data;
	    console.log("SUCCESS BITCHES!")
	});
	}

});