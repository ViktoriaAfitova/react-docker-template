const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const { app } = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('HTTP Server', () => {
  let server;
  let port = 3001; // Start with port 3001

  before((done) => {
    server = http.createServer(app);
    
    const attemptListen = (attemptsLeft) => {
      if (attemptsLeft <= 0) {
        done(new Error('Failed to find an open port'));
        return;
      }

      server.listen(port, (err) => {
        if (err && err.code === 'EADDRINUSE') {
          // The port is already in use, increase the port and wake it up again
          port++;
          attemptListen(attemptsLeft - 1);
        } else if (err) {
          done(err);
        } else {
          console.log(`Server running at http://localhost:${port}/`);
          done();
        }
      });
    };

    attemptListen(10); // Trying 10 different ports
  });

  after((done) => {
    if (server && server.listening) {
      server.close(done);
    } else {
      done();
    }
  });

  it('should return "Server running"', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Server running');
        done();
      });
  });
});