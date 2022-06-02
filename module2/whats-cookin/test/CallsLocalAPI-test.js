// import {expect} from "chai";
// import fetch from "node-fetch";
// import CallsLocalAPI from "../src/CallsLocalAPI";
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('getAllUsers', () => {
/*  it('should get 41 users', function () {
    CallsLocalAPI.getAllUsers().then(response => {
      expect(response.length).to.equal(41);
    });
  })*/

  it.skip('should get 41 users', function () {
    fetch('http://localhost:3001/api/v1/users', { method: 'GET' }).then(response => response.json())
      .then(data => {
        expect(data.length).to.equal(41);
      });
  });
});
