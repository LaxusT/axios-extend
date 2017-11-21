var {axiosGenerator} = require("./index");
var test = new axiosGenerator({
	baseURL: 'http://127.0.0.1:5555'
});

var urls = [
  {
    request: {
    	url: '/test/0',
    	method:'get'
    },
    change: null,
    cb(data){
    	console.log('this is cb data:  ' + data.data)
    }
  },
  {
    request: {
    	url: '/test',
    	method:'get'
    },
    change(data, config){
        data = data.data;
        config.url += `/${data}`
        return config;
    },
    cb(data){
    	console.log('this is cb data:  ' + data.data)
    }
  },
  {
    request: {
    	url: '/test',
    	method:'get'
    },
    change(data, config){
        data = data.data;
        config.url += `/${data}`
        return config;
    },
    cb(data){
    	console.log('this is cb data:  ' + data.data)
    }
  }
];


var test1 = test.generatorAuto(urls);
test1.next()

var test2 = test.generatorOperation(urls);
var first = test2.next();
var scond = test2.next(first);
var third = test2.next(scond);
