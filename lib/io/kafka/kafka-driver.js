/*
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

var _ = require('underscore');
var assert = require('assert');



/**
 * microbial axon.js driver
 * uses axon req/rep sockets to send and recieve messages over the bus
 */
module.exports = function(options) {
  assert(options && options.bus && options.bus.topics);

  var _options = options;
  var _producer;
  var _consumer;



  /**
   * place a request onto kafka
   */
  var request = function(req) {
    _producer.send(req, 'request');
  };



  /**
   * place a response onto kafka
   */
  var respond = function(req, res) {
    _producer.send(res, 'response');
  };



  /**
   * create subscriptions to named channels
   */
  var construct = function() {
    assert(options.bus.name === 'kafka');
    _consumer = require('./consumer')(_options);
    _producer = require('./producer')(_options);
  };



  /**
   * tear down all subscriptions
   */
  var tearDown = function() {
  };


  construct();
  return {
    request: request,
    respond: respond,
    tearDown: tearDown
  };
};

