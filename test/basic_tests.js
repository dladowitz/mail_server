var assert  = require("assert");
var C       = require("../models/cash.js")

// describe('Array', function(){
//   describe('#indexOf', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

describe('Cash Register', function(){
  describe('Module C', function(){
    it('should have a getChange Method', function(){
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.getChange, 'function');
    })

    // it('should return the correct change', function(){
    //   assert.deepEqual(C.getChange(210,300), [50,20,20]);
    //   assert.deepEqual(C.getChange(486,1000), [500, 10, 2, 2]);
    // })
  })
});
