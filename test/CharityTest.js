const Charity = artifacts.require("SupplyChain");
const ERC = artifacts.require("SimpleERC20Token");
const assertRevert = require("../utils/AssertRevert").assertRevert;
//const utils = require("./utils.js");
//const truffleAssert = require('truffle-assertions');

require('@openzeppelin/test-helpers/configure')({
    provider: 'http://localhost:8585',
});

const { time } = require('@openzeppelin/test-helpers');

contract("SimpleERC20Token", async accounts => {
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];
    let thirdAccount = accounts[2];
    let erc;

    beforeEach(async function () {
        erc = await ERC.deployed();
        await erc.approve(thirdAccount, 99, { from: firstAccount });
    });

    it("test sets an owner", async () => {
         
        assert.equal(await erc.owner.call(), firstAccount);
    });

    it('all values should be set on constructor call', async () => {
         
		const totalSupply = await erc.totalSupply();
		assert.equal((1000000 * ((10)** 18)), totalSupply.valueOf(), "correct total supply should be set")
		const balance = await erc.balanceOf.call(firstAccount);
		assert.equal((1000000 * ((10)** 18)), balance.valueOf(), "balance should be equal to total supply")
    });
    
    //const to = accounts[4]
	const amount = 100;

	it('test transfers request amount from Owner', async () => {
         
  		await erc.transfer(secondAccount, amount, { from: firstAccount })

  		const senderBalance = await erc.balanceOf(firstAccount);
  		assert.isTrue(senderBalance> 0);

  		const recipientBalance = await erc.balanceOf(secondAccount);
  		assert.equal(recipientBalance, amount);
    });
    
    // it('test transfers request amount from Sender', async () => {
         
  	// 	await erc.transferFrom(firstAccount, thirdAccount, 10);

  	// 	const senderBalance = await erc.balanceOf(firstAccount);
  	// 	assert.isTrue(senderBalance> 0);

  	// 	const recipientBalance = await erc.balanceOf(thirdAccount);
  	// 	assert.equal(recipientBalance, 10);
	// });
    
    // it('approves the requested amount', async () => {
    //      
    //     await erc.approve(secondAccount, amount, { from: firstAccount });

    //     const allowance = await erc.allowance.call(firstAccount, secondAccount);
    //     assert.equal(allowance, amount);
    // });

    // it('approves the requested amount and replaces the previous one',async () => {
    //      
    //     await erc.approve(secondAccount, 1, { from: firstAccount });
    //     await erc.approve(secondAccount, amount, { from: firstAccount });

    //     const allowance = await erc.allowance.call(firstAccount, secondAccount);
    //     assert.equal(allowance, amount);
    // });
    
	// it('test reverts - transfer amount changes', async () => {
    //      
    //     const revertAmount = 101;
    //     // await assertRevert(erc.transfer(secondAccount, revertAmount, { from: firstAccount }));
    //     try{
    //         //await erc.transfer(secondAccount, revertAmount, { from: firstAccount });
    //         await assertRevert(erc.transfer(secondAccount, revertAmount, { from: firstAccount }));
    //         assert.fail();
    //     } catch (err) {
    //         assert.ok(/revert/.test(err.message));
    //     }
	// });
	
	// it('test reverts - invalid address', async () => {
    //      
    //     const toContract = '0x0000000000000000000000000000000000000000';
    //     //await assertRevert(erc.transfer(toContract, 1, { from: firstAccount }));
    //     try{
    //         //await erc.transfer(toContract, 1, { from: firstAccount });
    //         await assertRevert(erc.transfer(toContract, 1, { from: firstAccount }));
    //         assert.fail();
    //     } catch (err) {
    //         assert.ok(/revert/.test(err.message));
    //     }
 	// });

});

contract("SupplyChain", async accounts => {

    let firstAccount = accounts[0];
    let secondAccount = accounts[1];
    let thirdAccount = accounts[2];
    const charityName = web3.utils.fromAscii('test');
    const supplier = web3.utils.fromAscii('test2');
    let endTime;

    const RequestType = {
        FOOD: 0,
        CLOTHING: 1,
        FURNITURE: 2,
        EDUCATION: 3,
        TRANSPORT: 4,
        MEDICAL: 5,
        FUNDING: 6
    };

    it("test sets an owner", async () => {
        let charity = await Charity.deployed();
        assert.equal(await charity.owner.call(), firstAccount);
    });

    it("test accepts new charity requests", async () => {
        let charity = await Charity.deployed();

        //const charityName = web3.utils.fromAscii('test');
        const request = web3.utils.fromAscii('"need test"');
        const primaryContact = web3.utils.fromAscii('test@email.com');
       
        await charity.addCharity(charityName, secondAccount, request, 100, primaryContact, true, RequestType.CLOTHING);
        assert.equal(await charity.isCharity(charityName), true);
        assert.equal(await charity.isAddress(secondAccount), true);
    });

    it("test accepts new suppliers", async () => {
        let charity = await Charity.deployed();
        const primaryContact = web3.utils.fromAscii('test@email.com');
       
        await charity.addSupplier(supplier, thirdAccount, 100, primaryContact, RequestType.CLOTHING);
        assert.equal(await charity.isSupplier(supplier), true);
        assert.equal(await charity.isAddress(thirdAccount), true);
        assert.equal(await charity.categoryMatch(charityName), RequestType.CLOTHING);
    });

    it("test get charity info", async () => {
        let charity = await Charity.deployed();
        await charity.getCharityInfo(charityName);
        assert.equal(await charity.isCharity(charityName), true);
    });

    it("test supplier selection", async () => {
        let charity = await Charity.deployed();

        await charity.selectCharity(charityName, supplier, thirdAccount);
        
        //await time.advanceBlock();
        //let endTime = (await time.latest()) + time.duration.seconds(120);
        //assert.equal(endTime, ((await time.latest()) + time.duration.seconds(120)), "Equal");
    });

    it("test delivery completion with token reward", async () => {
        let charity = await Charity.deployed();
        // 
        
        await charity.deliverRequest(charityName, supplier, thirdAccount);

        //await time.advanceBlock();
        //let currentTime = (await time.latest());
        //assert.isTrue(endTime>currentTime);

        //assert.equal(await charity.transfer(thirdAccount, 2), true);
    });
});