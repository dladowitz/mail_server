var request = require('superagent');
var expect  = require('expect.js');

before(function(){
  console.log("I run once before the entire suite")
});

describe('Suite One', function(){
  beforeEach(function(){
    console.log("I run before each expectation")
  });

  it('does some things', function(){
    request.post('localhost:3000').end(function(res){
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      expect(rest.body).to.contain('world');
      done();
    })
  });

  it('does some funny things', function(){

  })
});

describe('Suite Two', function(){
  it('does some other things', function(){

  });
});
