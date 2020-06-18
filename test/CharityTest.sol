pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "../contracts/Charity.sol";
import "truffle/DeployedAddresses.sol";

contract CharityTest {
    SupplyChain charity;

    function beforeEach() public {
        charity = new SupplyChain();
    }

    function testSettingOwnerAnOwnerDuringCreations() public {
        Assert.equal(
            charity.owner(),
            address(this),
            "The owner is different from the deployer"
        );
    }

    string public charityName = "test1";
    string public supplierName = "test2";
    address public supplierAddress = address(0x333);

    function testAddCharity() public {
        charity.addCharity(
            charityName,
            address(0x555),
            "need test",
            100,
            "test@email.com",
            true,
            SupplyChain.Category.Food
        );
        Assert.equal(
            charity.isCharity(charityName),
            true,
            "The Charity has already submitted a request"
        );
        Assert.equal(
            charity.isAddress(address(0x555)),
            true,
            "Cannot hold duplicate addresses"
        );
    }

    function testAddSupplier() public {
        charity.addSupplier(
            supplierName,
            supplierAddress,
            100,
            "test@email.com",
            SupplyChain.Category.Food
        );
        Assert.equal(
            charity.isSupplier(supplierName),
            true,
            "The Supplier has already submitted a request for work"
        );
        Assert.equal(
            charity.isAddress(supplierAddress),
            true,
            "Cannot hold duplicate addresses"
        );
        // Assert.equal(                             // **** Deals with Enum value
        //     charity.categoryMatch(charityName),
        //     SupplyChain.Category.Food,
        //     "Categories must match for proper assignment"
        // );
    }

    // function testSelectCharity() public {        // **** Truffle Testing ran out of Gas
    //     charity.selectCharity(
    //         charityName,
    //         supplierName,
    //         supplierAddress
    //     );
    // }
}
