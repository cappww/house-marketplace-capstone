// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
const Verifier = artifacts.require('Verifier');
const proof = require('../../zokrates/code/square/proof.json');

contract('TestSquareVerifier', accounts => {
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    beforeEach(async() => {
        this.contract = await Verifier.new({from: accountOne});
    });

    it('Test verification with correct proof', async() => {
        let a = proof.proof.a;
        let b = proof.proof.b;
        let c = proof.proof.c;
        let input = proof.inputs;

        let result = await this.contract.verifyTx.call(a, b, c, input);
        assert.equal(result, true, "This result is supposed to be true but is false");
    });

    it('Test verification with incorrect proof', async () => {
        let a = proof.proof.a;
        let b = proof.proof.b;
        let c = proof.proof.c;
        let input = [3, 0];
        let result = await this.contract.verifyTx.call(a, b, c, input);
        assert.equal(result, false, "This result is supposed to be false but is true");
    });
});