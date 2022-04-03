const Basic = artifacts.require("./Basic.sol");

contract("Basic", (accounts) => {
    let basic;

    before(async () => {
        basic = await Basic.deployed();
    })

    describe("deployment", async () => {
        it("deployed successfully", async () => {
            const address = await basic.address;
            const x = await basic.x();
            assert.equal(x, 0);
        })
    })
})