// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CarRental {

    event NewCar(string make, string model, string licensePlate, string year);

    struct Car {
        string make;
        string model;
        string licensePlate;
        string year;
    }


    Car[] public cars;


    mapping (uint => address) public carToOwner;
    mapping (uint => bool) public isCarAvailable;


    modifier checkAvailability(uint _id) {
        require(isCarAvailable[_id] == true, "Car is already rented.");
        _;
    }

    function registerCar(string memory _make, string memory _model, string memory _licensePlate, string memory _year) public {
        cars.push(Car(_make, _model, _licensePlate, _year));
        uint _id = cars.length - 1;
        carToOwner[_id] = msg.sender;
        isCarAvailable[_id] = true;
        emit NewCar(_make, _model, _licensePlate, _year);
    }

    function getTotalCars() public view returns(uint) {
        return cars.length;
    }

    function getCarOwner(uint _id) public view returns(address) {
        return carToOwner[_id]; 
    }

    function getCarInfo(uint _id) public view returns (string[4] memory) {
        return [cars[_id].make, cars[_id].model, cars[_id].licensePlate, cars[_id].year];
    }

    function rentCar(uint _id) public checkAvailability(_id) {
        isCarAvailable[_id] = false;
    }

    function returnCar(uint _id) public {
        isCarAvailable[_id] = true;
    }
    
}