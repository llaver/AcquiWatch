"use strict";
var todaysDate = new Date();
var yesterdaysDate = new Date( Date.now() - 24*60*60*1000 );
acquisitionApp.controller('acquiController', ['$scope','$http','acquiFactory', function($scope, $http, acquiFactory) {
    acquiFactory.get()
        .success(function(data) {
            angular.forEach(data, function(value, key) {
                data[key].date = new Date(data[key].date);
                if(data[key].date.toString().includes(todaysDate.toDateString())) {
                    data[key].date = "Today";
                } else if(new Date(data[key].date.valueOf()).toDateString().includes(yesterdaysDate.toDateString())) {
                    data[key].date = "Yesterday";
                } else if(data[key].value === -1) {
                    data[key].value = "undisclosed";
                    //angular.element(document.querySelector('#value')).css( "color", "#FF2100");
                }
            })
            $scope.acquis = data;
        });

    angular.element(document).ready(function(){
        $('.loading').remove(); // Just an example dont modify the dom outside of a directive in a real app! 
    });

    $scope.fieldFilter = [];    
    $scope.updateField = function(filt) {
        var index = $scope.fieldFilter.indexOf(filt);
        $scope.quantity = originalQuantity;
        numRuns = 0;
        if(index === -1) {
            $scope.fieldFilter.push(filt);
        } else {
            $scope.fieldFilter.splice(index, 1);
        }
    }

    $scope.countryFilter = [];
    $scope.updateCountry = function(filt) {
        var index = $scope.countryFilter.indexOf(filt);
        $scope.quantity = originalQuantity;
        numRuns = 0;
        if(index === -1) {
            $scope.countryFilter.push(filt);
        } else {
            $scope.countryFilter.splice(index, 1);
        }
    }

    $scope.order = 'date';
    $scope.reverse = true;
    var current = $scope.order;
    $scope.updateOrder = function(order) {
        $scope.quantity = originalQuantity;
        $scope.hideUndisclosed = false;
        numRuns = 0;
        if(current === order) {
            $scope.reverse = !$scope.reverse;
        } else if($scope.reverse) {
            $scope.reverse = false;
            $scope.order = order;
            current = order;
        } else {
            $scope.order = order;
            current = order;
        }
        if(order === 'value') {
            $scope.hideUndisclosed = true;
        }
    }

    $scope.hideUndisclosed = false;
    $scope.showUndisclosed = function() {
        $scope.hideUndisclosed = !$scope.hideUndisclosed;
    }
    $scope.undisclosedFilter = function(acqui) {
        return $scope.hideUndisclosed?!(acqui.value === "undisclosed"):true;
    }

    $scope.search = {};
    $scope.resetFilters = function() {
        $scope.fieldFilter = []; 
        $scope.countryFilter = [];
        $scope.order = 'date';
        current = $scope.order;
        $scope.reverse = true;
        $scope.shownButtons = '';
        $scope.showNav = false;
        $scope.showButtonArray = [false, false, false, false];
        $scope.quantity = originalQuantity;
        $scope.search = {};
        numRuns = 0;
        for (var i = 0; i < $scope.activeButtonArray.length; i++) { $scope.activeButtonArray[i] = false; }
    }

    var cardsPerLine = Math.floor(window.innerWidth / 370);
    $scope.adFrequency = [6, 20, 32, 44];
    switch (cardsPerLine) {
        case 1:
            $scope.quantity = 11;
            $scope.adFrequency = [4, 16, 32, 48];
            break;
        case 2:
            $scope.quantity = 12;
            $scope.adFrequency = [4, 16, 32, 48];
            break;
        case 3:
            $scope.quantity = 13;
            $scope.adFrequency = [4, 16, 32, 48];
            break;
        case 4:
            $scope.quantity = 14;
            $scope.adFrequency = [4, 16, 32, 48];
            break;
        case 5:
            $scope.quantity = 13;
            $scope.adFrequency = [6, 20, 32, 44];
            break;
        case 6:
            $scope.quantity = 16;
            $scope.adFrequency = [8, 24, 38, 56];
            break;
        case 7:
            $scope.quantity = 19;
            $scope.adFrequency = [10, 28, 42, 64];
            break;
        case 8:
            $scope.quantity = 22;
            $scope.adFrequency = [11, 32, 61, 77];
            break;
        case 9:
            $scope.quantity = 25;
            $scope.adFrequency = [13, 36, 67, 90];
            break;    
        default:
            $scope.quantity = 28;
            $scope.adFrequency = [13, 36, 67, 90];
    }

    var originalQuantity = $scope.quantity;
    var numRuns = 0;
    $scope.updateQuantity = function() {
        $scope.quantity += originalQuantity;
        if(numRuns < 3) {
            //$scope.adFrequency += 1;
            $scope.quantity += 1;
            numRuns += 1;
        } else {
            $scope.quantity += 2;
        }
    }

    $scope.shownButtons = '';
    $scope.showNav = false;
    $scope.showButtonArray = [false, false, false, false];
    $scope.updateShownButtons = function(toShow) {
        if(toShow === $scope.shownButtons) {
            $scope.shownButtons = '';
            $scope.showNav = false;
            $scope.showButtonArray = [false, false, false, false];
        } else if(toShow === 'Name') {
            $scope.shownButtons = toShow;
            $scope.showNav = true;
            $scope.showButtonArray = [true, false, false, false];
        } else if(toShow === 'Country') {
            $scope.shownButtons = toShow;
            $scope.showNav = true;
            $scope.showButtonArray = [false, true, false, false];
        } else if(toShow === 'Field') {
            $scope.shownButtons = toShow;
            $scope.showNav = true;
            $scope.showButtonArray = [false, false, true, false];
        } else if(toShow === 'Search') {
            $scope.shownButtons = toShow;
            $scope.showNav = true;
            $scope.showButtonArray = [false, false, false, true];
        }
    }

    $scope.setSize = function(length) {
        if(length >= 12 && length < 20) {
            return { 'font-size': "25px" }
        } else if(length >= 20 && length < 26) {
            return { 'font-size': "20px" }
        } else if(length >= 26) {
            return { 'font-size': "15px" }
        }
    }

    $scope.setValueSize = function(value) {
        if(value > 999 && value < 1000000) {
            return "30px";
        }
        return "36px";
    }

    $scope.getName = function(name, formattedName) {
        if(name === $scope.order && $scope.reverse) {
            return formattedName + ' \u25BC';
        } else if(name === $scope.order && !$scope.reverse) {
            return formattedName + ' \u25B2';
        } else if(name === 'name' && ($scope.order === 'seller.name' || $scope.order === 'buyer.name')) { 
            if($scope.reverse) {
                return formattedName + ' \u25BC';
            } else {
                return formattedName + ' \u25B2';
            }
        } else {
            return formattedName;
        }
    }

    $scope.database = false;
    $scope.website = false;
    $scope.general = false;
    $scope.suggestion = false;
    $scope.updateError = function(button) {
        if(button === 'database') {
            $scope.database = !$scope.database;
            $scope.website = false;
            $scope.general = false;
            $scope.suggestion = false;
        }
        if(button === 'website') {
            $scope.database = false;
            $scope.website = !$scope.website;
            $scope.general = false;
            $scope.suggestion = false;
        }
        if(button === 'general') {
            $scope.database = false;
            $scope.website = false;
            $scope.suggestion = false;
            $scope.general = !$scope.general;
        }
        if(button === 'suggestion') {
            $scope.database = false;
            $scope.website = false;
            $scope.general = false;
            $scope.suggestion = !$scope.suggestion;
        }
    }

    var arrayContainsTrue = function(arr, start, end) {
        for(var i = start; i <= end; i++) {
            if(arr[i] == true) {
                return true;
            }
        }
        return false;
    }

    /* Array for active buttons
    0: Company Name 1: Country 2: Industry 3: Search 4: Company Name - Seller Name 5: Company Name - Buyer Name 6: Country - USA 7: Country - China 8: Country - Israel 
    9: Country - Russia 10: Country - India 11: Country - Japan 12: Industry - Tech 13: Industry - Consumer 14: Industry - Pharma 15: Industry - Financial 16: Industry - Biotech 17: Industry - Industrial 
    18: Date 19: Valuation 20: Industry - Business
    */
    $scope.activeButtonArray = new Array(21);
    for (var i = 0; i < $scope.activeButtonArray.length; i++) { $scope.activeButtonArray[i] = false; }
    //pos = position in array
    $scope.updateActiveButtons = function(pos) {
        if(pos != 0 || pos != 1 || pos != 2 || pos != 3 || pos != 4 || pos != 5) {
            $scope.activeButtonArray[pos] = !$scope.activeButtonArray[pos];
        } else if(pos == 3 && !$scope.activeButtonArray[pos]) {
            $scope.activeButtonArray[pos] = true;
        } else if(pos == 3 && $scope.activeButtonArray[pos]) {
            $scope.activeButtonArray[pos] = false;
        }
        if(pos == 18 || pos == 19) {
            $scope.activeButtonArray[0] = false;
            if(!arrayContainsTrue($scope.activeButtonArray, 6, 11)) {
                $scope.activeButtonArray[1] = false;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 12, 17) && !$scope.activeButtonArray[20]) {
                $scope.activeButtonArray[2] = false;
            }
        }
        if(pos == 0) {
            $scope.activeButtonArray[0] = true;
            if(arrayContainsTrue($scope.activeButtonArray, 4, 5)) {
                $scope.activeButtonArray[0] = true;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 6, 11)) {
                $scope.activeButtonArray[1] = false;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 12, 17) && !$scope.activeButtonArray[20]) {
                $scope.activeButtonArray[2] = false;
            }
            if($scope.search.text == undefined || $scope.search.text == '') {
                $scope.activeButtonArray[3] = false;
            }
        }
        if(pos == 1) {
            if(!arrayContainsTrue($scope.activeButtonArray, 4, 5)) {
                $scope.activeButtonArray[0] = false;
            }
            if(arrayContainsTrue($scope.activeButtonArray, 6, 11)) {
                $scope.activeButtonArray[1] = true;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 12, 17) && !$scope.activeButtonArray[20]) {
                $scope.activeButtonArray[2] = false;
            }
            if($scope.search.text == undefined || $scope.search.text == '') {
                $scope.activeButtonArray[3] = false;
            }
        }
        if(pos == 2) {
            if(!arrayContainsTrue($scope.activeButtonArray, 4, 5)) {
                $scope.activeButtonArray[0] = false;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 6, 11)) {
                $scope.activeButtonArray[1] = false;
            }
            if(arrayContainsTrue($scope.activeButtonArray, 12, 17) || $scope.activeButtonArray[20]) {
                $scope.activeButtonArray[2] = true;
            }
            if($scope.search.text == undefined || $scope.search.text == '') {
                $scope.activeButtonArray[3] = false;
            }
        }
        if(pos == 3) {
            if(!arrayContainsTrue($scope.activeButtonArray, 4, 5)) {
                $scope.activeButtonArray[0] = false;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 6, 11)) {
                $scope.activeButtonArray[1] = false;
            }
            if(!arrayContainsTrue($scope.activeButtonArray, 12, 17) && !$scope.activeButtonArray[20]) {
                $scope.activeButtonArray[2] = false;
            }
        }
        if(pos == 4) {
            $scope.activeButtonArray[4] = true;
            $scope.activeButtonArray[5] = false;
        }
        if(pos == 5) {
            $scope.activeButtonArray[4] = false;
            $scope.activeButtonArray[5] = true;
        }
    }
}]);












