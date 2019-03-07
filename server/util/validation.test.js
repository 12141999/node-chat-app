const expect = require('expect');

const { isRealString } = require('./validation');

describe('string validation' , () => {
    it('should be false if a number is there' , () => {
        let res = isRealString(64);
        expect(res).toBe(false);
    });

    it('should be false for if empty string is there' , () => {
        let res = isRealString('  ');
        expect(res).toBe(false);
    });

    it('should be true if it it string' , () => {
        let res = isRealString('robin ');
        expect(res).toBe(true);
    });

});