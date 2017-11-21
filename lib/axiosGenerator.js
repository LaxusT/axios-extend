/**
* 	解决ajax接口依赖数据问题(有顺序，比如第二接口依赖第一个接口的数据，第三个接口依赖第二个接口的数据)
*   http请求使用的是axios
*   @param config  axios.create(axios)
*/

const axios = require('axios');

function axiosGenerator(config){
	this.config = config || null;
	this.axiosHttp = null;
	this.init();
}

axiosGenerator.prototype = {
	init(){
		this.axiosHttp = this.config ? axios.create(this.config) : axios;
	},

	generatorAuto(generatorUrls){
  	let _that = this, interator = null;
  	return interator = (function* (){
  		let data;
	    for (let i in generatorUrls) {
	    	if(generatorUrls[i]['change']){
          generatorUrls[i]['request'] = generatorUrls[i]['change'](data, generatorUrls[i]['request'])
	    	}
	      data = yield _that.reqGeneratorAuto(generatorUrls[i]['request'], generatorUrls[i]['cb'], interator);
	    }
  	})(interator)
	},

	generatorOperation(generatorUrls){
  	let _that = this, interator = null;
  	return interator = (function* (){
  		let data;
	    for (let i in generatorUrls) {
	      data = yield _that.reqGeneratorOperation(generatorUrls[i]['request'], data, generatorUrls[i]['cb'], generatorUrls[i]['change']);
	    }
  	})()
	},

	reqGeneratorAuto(requestConfig, cb, interator) {
		console.log(requestConfig)
    var p = new Promise((resolve, reject) => {
	    this.axiosHttp(requestConfig).then((res) => {
	    	resolve(res);
	    }).catch((err) => {
	    	reject(err);
	    })
    });

    p.then((res) => {
    	cb(res)
      interator.next(res);
    }).catch((err) => {
      // console.log(err)
    });
	},

	reqGeneratorOperation(requestConfig, data, cb, change){
		if(data){
    	return new Promise((resolve, reject) => {
        data.value.then((res) => {
          if(change){
            requestConfig = change(res, requestConfig)
          }
          console.log(requestConfig)
          this.axiosHttp(requestConfig).then((res)=>{
            resolve(res);
            cb(res);
          }).catch((err) => {
          	reject(err)
          })
        }).catch((err) => {
        	console.log(err)
        })
      });
    }
    return new Promise((resolve, reject) => {
      this.axiosHttp(requestConfig).then((res)=>{
        resolve(res);
        cb(res);
      }).catch((err) => {
        reject(err)
      })
    });
	}
}

module.exports = axiosGenerator;
