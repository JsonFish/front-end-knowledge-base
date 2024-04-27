<a name="DehTm"></a>
### 文件读取
<a name="UEZFU"></a>
#### 同步读取
```javascript
fs.readFile(path[,options],callback)
```

- **path**:必填项，填写我们要``读取的文件路径
- **options**:可选项，表示以什么样的编码格式来读取文本,默认**utf-8**
- **callback**:必填项，文件读取完成之后，通过此回调函数拿到读取结果
- 回调函数需有俩个形参：(**err**,**data**)分别表示读取失败和读取成功）
<a name="mdEaD"></a>
#### 异步读取
```javascript
fs.readFileSync(path[, options])
const result = fs.readFileSync('./content', 'utf8');
```

- 没有回调函数
- 返回结果为读取的文件
<a name="AdfRk"></a>
### 写入
```javascript
fs.writeFile(file, data[, options], callback)
```

- **file**：必填项，需要填写文件存放路径
- **data**:必填项，填写我们要写入的内容
- **options**:可选项，表示以什么样的编码格式来上传文本（默认为**utf8**）
- **callback**:必填项，文件上传完成之后，通过此回调函数拿到上传结果
- 回调函数需有一个形参：(**err**)表示失败，上传成功**err**值为**null**，上传失败**err**值为一个错误对象
