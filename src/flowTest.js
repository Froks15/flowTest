// @flow strict

import type {User} from './userType';

function printUser(user: User) {
    console.log(user.name)
}

let user = {
    name: 'Vasya',
    age: '20'
}
printUser(user)