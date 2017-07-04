/**
 * 生成随机字符串
 * @length Integer 随机字符串的长度
 * @number Boolean[Optional] 是否为纯数字
 */
exports.createRandom = function(length, number) {

  var str = '';
  var strTable = number ? '1234567890' : '1234567890abcdefghijklmnopqrstuvwxyz';
  var len = strTable.length;

  for (var i = 0; i < length; i++) {
    var random = parseInt(Math.random() * len);
    str += strTable.charAt(random);
  }
  console.log(str);
  return str;
}

/**
 * 对对象的属性以ASCII进行排序，并拼接为form格式
 * @args Object 需要对属性排序的对象
 * @excludes Array[String] 需要过滤的属性
 */
exports.sortKeysAndConcat = function(args, excludes) {

  excludes = excludes == undefined ? [] : excludes;

  var keys = Object.keys(args);
  keys = keys.sort();

  var result = '';
  keys.forEach(function(key) {
    if (excludes.indexOf(key) == -1) {
      result += '&' + key + '=' + args[key];
    }
  });

  result = result.substr(1);

  return result;
}
