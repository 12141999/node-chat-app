const expect = require('expect');

const { generateMessage  , generateLocationMessage } = require('./message');

describe('generateMessage' , () => {
    it('should be right' , () => {
        let from = "robin";
        let text = "welcome my chat app";
        let message = generateMessage(from , text);

       // expect(message.createdAt).toBeA('number');
        expect(message).toMatchObject({ from , text });
    });
});

describe('generateLocationMessage' , () => {
    it('should be correct function' , () => {
        let from = 'robin';
        let latitude = 27.33;
        let longitude = 85.55;
        let location = generateLocationMessage('robin' , latitude , longitude);
        let url = "https://www.google.com/maps?q=27.33,85.55";

        expect(location).toMatchObject({ from , url });

    });
});