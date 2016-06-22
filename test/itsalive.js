

// // describe('simple adding', function (){

// //   it('should add two and two', function() {
// //     expect(2+2).to.equal(4);
// //   });

// // });

// // describe('async stuff', function() {

// //     it('confirms setTimeout\'s timer accuracy', function (done) {
// //       var start = new Date();
// //       setTimeout(function () {
// //         var duration = new Date() - start;
// //         expect(duration).to.be.closeTo(1000, 50);
// //         done();
// //       }, 1000);
// //     });

// // });



// describe('it should run?', function (){

//   it('will invoke a function once per element', function () {
//   var arr = ['x','y','z'];
//   function logNth (val, idx) {
//     console.log('Logging elem #'+idx+':', val);
//   }
//   logNth = chai.spy(logNth);
//   arr.forEach(logNth);
//   expect(logNth).to.have.been.called.exactly(arr.length);
// });


// });


var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require ('supertest');
var models = require('../models')

Page = models.Page;
User = models.User;

chai.use(spies);

//check if page model has title, urltitle, content, status and date
//does validation - allow null - work for title, urltitle and content
//is date taking the current date
//does title to urltitle function work
//do the getterMethords work
//does the hook work
//does it have an author id

describe('Page Model', function () {
  var page;
  beforeEach (function () {
      page = {
        title:"Test Page",
        content: "something",
        tags : ['tag1', 'tag2', 'tag3']
      };
  });
  describe('Virtuals', function () {
    describe('Routes', function () {
      it('returns url_name prepended by /wiki/', function () {
        Page.create(page).then(function (result){
        expect(result.route).to.equal('/wiki/Test_Page');
        // done();
        });
      });
    });
    // describe('Rendered Content', function () {
    //   it('converts the markdown formatted content into html')
    // });
  });
  describe('Class Methods', function () {
    beforeEach(function (done) {
      Page.create({
        title: 'foo',
        content: 'bar',
        tags: ['foo', 'bar']
      })
      .then(function () {
        done();
      })
      .catch(done);
    });

    xit('successfully gets the right pages by tag', function (done) {
      Page.findByTag('tag1')
      .then(function(result){
        expect(result).to.have.lengthOf(13);
        done();
      });
    });

    afterEach(function(done) {
      Page.delete();
    });
  });
});

describe('similar tags', function() {
  var page1 = Page.create({
    title: "base page",
    content: "we will test this page's functions",
    tags: ['test' , 'trial']
  });
  var page2 = Page.create({
    title : "one shared tag",
    content: "this page has a shared tag with page 1",
    tags : ['trial', 'notSharing']
  });

  var page3 = Page.create({
    title : "no shared tags",
    content: "this page should never be called",
    tags : ['something', 'irrelevant']
  });

    it('successfully finds similar pages with same tags', function (done) {
      Promise.all([page1,page2,page3]).then(function (pages){
        return pages[0].findSimilar();
      }).then(function(result){
          expect(result).to.have.lengthOf(1);
          expect(result[0]).to.equal(page2);
          expect(result).to.not.include(page1);
          expect(result).to.not.include(page3);
        });
          done();
      });



});

  describe('Validations', function (done) {
    var page;
    beforeEach(function () {
      page = Page.build(); //HOW IS THIS A CONSTRUCTOR???
    });

    it('errors without title', function (done) {
      page.validate().then(function (err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal('title');
        done();
      });
    });
  });

