> 配合ajax请求接口依赖问题 (有顺序的请求 比如第二个接口需要第一个接口返回数据 第三个接口需要第二个接口返回数据)

## axiosGenerator
---
### 快速使用：
1. 安装：
```npm install axios-extend```

2. 测试:
```javascript
// 安装好本地package.json包

var {axiosGenerator} = require('axios-extend');

// axios配置 可以node本地server.js
var test = new axiosGenerator({
  baseURL: 'http://127.0.0.1:5555'
});

// 请求的接口顺序 依次请求
／**
*   @param Object request 请求接口参数 参照axios配置
*   @param Function change 下一个接口依赖上一个接口的处理函数 依赖上一个接口返回数据
*   @param Function cb 正常请求回掉函数
*/
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

// 自动按urls顺序请求接口
var test1 = test.generatorAuto(urls);
test1.next()

// 手动按urls顺序请求接口
var test2 = test.generatorOperation(urls);
var first = test2.next();
var scond = test2.next(first);
var third = test2.next(scond);

```
