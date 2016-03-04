// This is changing from something that reads a local json file and runs a constructor
// Over a bunch of things into something that just queries a db. crazy.

angular.module('app')
	.factory('dayFactory', dayFactory)
	.factory('networkFactory', ['$http', networkFactory])
	dayFactory.$inject = ['$http']


function dayFactory (http) {
	var dayData = {}
	dayData.search = function (networkName, day) {
		return http.get('/api/day/search/' + networkName +'/' + day.valueOf())
	}
	dayData.all = function () {
		return http.get('/api/days')
	}
	dayData.id = function (id) {
		return http.get('/api/id/' + id)
	}
	dayData.delete = function (id) {
		return http.delete('/api/id/' + id)
	}
	dayData.update = function (id) {
		return http.put('/api/id/' + id)
	}
	dayData.create = function (day) {
		return http.put('/api/days', day)
	}
	return dayData
}

function networkFactory (http) {
	var networkData = {}
	networkData.all = function () {
		return http.get('/api/networks')
	}
	networkData.create = function (network) {
		return http.put('/api/networks', network)
	}
	networkData.id = function (id) {
		return http.get('/api/network/' + id)
	}
	networkData.update = function (network) {
		return http.post('/api/network/' + network._id)
	}
	networkData.delete = function (id) {
		return http.delete('/api/network' + id)
	}

	function ActiveNetworks (arr) {
		this.networks = arr;
		this.remove = function(callsign) { this.networks.splice( this.networks.indexOf(callsign) , 1)};
		this.add = function(callsign) {this.networks.push(callsign)};
		this.isActive = (function(network) {return this.networks.indexOf(network.callsign) !== -1 }).bind(this);
		this.isInactive = (function(network) {return !this.isActive(network)} ).bind(this)
	}
	networkData.activeNetworks = new ActiveNetworks(['bbc1', 'bbc2']);

	return networkData
}

// in the db 1456272000000
// from the factory 1456297200000 -- head by 7 hrs
