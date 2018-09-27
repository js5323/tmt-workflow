var fs = require('fs');
var path = require('path');
var util = require('gulp-util');
var proxy = require('http-proxy-middleware');
var config = require('rc')('tmtworkflow', {
  projectName: process.cwd().split(path.sep).pop()
});
var stat=fs.stat;

var tmt_util = {
  log: function (task_name) {
    util.log.apply(util, arguments);
  },
  task_log: function (task_name) {
    this.log(util.colors.magenta(task_name), util.colors.green.bold('√'));
  },
  loadPlugin: function (name, cb) {
    name = name + 'After';

    if (config['plugins'] && config['plugins'][name] && config['plugins'][name].length) {
      var plugins = config['plugins'][name];

      plugins.forEach(function (plugin) {

        tmt_util.task_log('Run Plugins: ' + plugin);

        if (plugin.indexOf('.js') === -1) {
          plugin += '.js';
        }

        var filepath = path.resolve(__dirname, '../plugins', plugin);
        if (fs.existsSync(filepath)) {
          require(filepath)(config);
          (typeof cb === 'function') && cb();
        } else {
          console.log('The ' + filepath + ' is not found!');
          (typeof cb === 'function') && cb();
        }
      });
    }
  },
  colors: util.colors,
  dirExist: function (dirPath) {
    try {
      var stat = fs.statSync(dirPath);
      if (stat.isDirectory()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw new Error(err);
      }
    }
  },
  fileExist: function (filePath) {
    try {
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw new Error(err);
      }
    }
  },
  middleware: function (config) {
    var middleware = [];

    if (config.proxy) {
      if (typeof config.proxy === 'object') {
        Object.keys(config.proxy).forEach(function (k) {
          var option;
          if (typeof config.proxy[k] === 'string') {
            option = {
              target: config.proxy[k]
            };
          } else if (typeof config.proxy[k] === 'object') {
            option = config.proxy[k];
          }
          option && middleware.push(proxy(k, option))
        });
      }
    }
    return middleware;
  },

  /**
   * 测试某个路径下文件是否存在
   * @param src
   * @param dst
   * @param callback
   */
  exists: function (src,dst,callback) {
    fs.exists(dst,function(exists){
      if(exists){//不存在
        callback(src,dst);
      }else{//存在
        fs.mkdir(dst,function(){//创建目录
          callback(src,dst)
        })
      }
    })
  },

  /**
   * 复制文件
   * @param src
   * @param dst
   */
  copy: function (src,dst) {
    //读取目录
    fs.readdir(src,function(err,paths){
      if(err){
        console.log('error...')
        console.log(err)
        // throw err;
        return;
      }
      paths.forEach(function(path){
        var _src=src+'/'+path;
        var _dst=dst+'/'+path;
        var readable;
        var writable;
        stat(_src,function(err,st){
          if(err){
            throw err;
          }

          if(st.isFile()){
            readable=fs.createReadStream(_src);//创建读取流
            writable=fs.createWriteStream(_dst);//创建写入流
            readable.pipe(writable);
          }else if(st.isDirectory()){
            tmt_util.exists(_src,_dst,tmt_util.copy);
          }
        });
      });
    });
  }

};

module.exports = tmt_util;
