const expect = require("expect");

describe("fake_test.js", () => {
	describe("fakeTestGroup", () => {
		it("Should not throw an error", done => {
			let truthy = true;
			expect(truthy).toBeTruthy()
			done();
		});
	});
});