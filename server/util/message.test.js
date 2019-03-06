const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage' , () => {
    it('should be right' , () => {
        let from = "robin";
        let text = "welcome my chat app";
        let message = generateMessage(from , text);

       // expect(message.createdAt).toBeA('number');
        expect(message).toMatchObject({ from , text });
    });
});