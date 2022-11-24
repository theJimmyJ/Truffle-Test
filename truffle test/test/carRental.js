const CarRental = artifacts.require('CarRental');

const carInfo = ['exMake', "exModel", "exPlate", "2022"];

contract('CarRental', (accounts) => {

    let [alice, bob] = accounts;

    it("should be able to register a car", async () => {
        const contractInstance = await CarRental.new();
        const result = await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: alice});
        assert.equal(result.receipt.status, true);
    })

    it("should be able to know the number of cars", async () => {
        const contractInstance = await CarRental.new();
        await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: alice});
        await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: bob});
        const result = await contractInstance.getTotalCars();
        assert.equal(result, 2);
    })

    it("should be able to get car information", async () => {
        const contractInstance = await CarRental.new();
        await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: alice});
        const result = await contractInstance.getCarInfo(0);
        assert.equal(result[0], carInfo[0]);
        assert.equal(result[1], carInfo[1]);
        assert.equal(result[2], carInfo[2]);
        assert.equal(result[3], carInfo[3]);

    })

    it("should be able to rent a car", async () => {
        const contractInstance = await CarRental.new();
        await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: alice});
        await contractInstance.rentCar(0, {from: bob});
        const result = await contractInstance.isCarAvailable(0);
        assert.equal(result, false);
    })

    it("should be able to return a car", async () => {
        const contractInstance = await CarRental.new();
        await contractInstance.registerCar(carInfo[0], carInfo[1], carInfo[2], carInfo[3], {from: alice});
        await contractInstance.rentCar(0, {from: bob});
        await contractInstance.returnCar(0);
        const result = await contractInstance.isCarAvailable(0);
        assert.equal(result, true);
    })

    


});