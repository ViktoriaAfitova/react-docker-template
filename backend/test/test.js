const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const { app } = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('HTTP Server', () => {
  let server;
  const testPort = 3002;

  before((done) => {
    server = http.createServer(app);
    server.listen(testPort, done);
  });

  after((done) => {
    server.close(done);
  });

  it('should return Server running', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Server running');
        done();
      });
  });
});