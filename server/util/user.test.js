const expect = require('expect');

const { Users } = require('./user');

describe('Users' , () => {

    beforeEach( () => {
        users = new Users();
        users.users = [{
            id : '1',
            name : 'robin',
            room : 'node js'
        } , {
            id : '2',
            name : 'prince',
            room : 'react js'
        } , {
            id : '3',
            name : 'golu',
            room : 'node js'
        }];
    });

    it('should add new User' , () => {
        let users = new Users();
        let user = {
            id : '123',
            name : 'robin',
            room : 'developers'
        }
        let resUser = users.addUser(user.id , user.name , user.room );

        expect(users.users).toEqual([user]);
    });

    it('should remove user ' , () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    // it('should not exist user' , () => {
    //     let userId = '32';
    //     let user = users.removeUser(userId);

    //     expect(user).toNotExist();
    // });

    it('should get user' , () => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should return names for node js' , () => {
        let userList = users.getUserList('node js');

        expect(userList).toEqual(['robin' , 'golu']);
    });

});


