var async1 = require('async');

function test() {
    async1.series([
        function(callback) {
            callback(null, 'function1');
        },
        function(callback) {
            callback(null, 'function2');
        },
        function(callback) {
            callback(null, 'function3');
        }
    ],
    function(err,results){
        console.log(err);
        console.log(results);
    });
}

test();
