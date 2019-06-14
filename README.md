### 会话

由于 `HTTP` 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话 `Session`

### 客户端(浏览器)与服务器实现会话流程

#### 一、 session cookie 机制

- 客户端：向服务器发起登录请求
- 服务器：接收请求，生成 session 和 session-id（session-id 与 session 一一对应），可用 [express-session][expressjs_session] 处理
- 服务器：响应数据，响应头带有 `set-cookie` 字段，对应值为 session-id
- 客户端：接收响应，检测响应头带有 `set-cookie` 字段，自动将其对应值（session-id）写入 `cookie` 中（在客户端允许的情况下）
- 客户端：之后客户端每次发起请求都会自动携带 `cookie` 请求头字段，和其对应值 `session-id`
- 服务器：每次接收到请求，会检查请求头 `cookie` 字段，并找到对应 `session` 对象，（在 `express` 框架中，`session` 为 `req.session` 对象）
- 服务器：拿到对应 `session` 对象，就可以查询该用户的信息啦，做完响应操作后，再返回给客户端即可

#### 二、 JWT（token）机制
- 客户端：向服务器发起登录请求
- 服务器：根据 `payload` (用户名和其它用户信息) 生成 `token`，可用 [jsonwebtoken][jsonwebtoken] 库处理，并将 `token` 返回给客户端
- 客户端：接收 `token`，并本地存储，以后每次请求时，在请求头中加 `authorization: token` 即可
- 服务器：检测请求头是否有 `authorization` 并验证它的有效性，解析 `token`，获取`payload` 即可拿到用户相关信息，做完响应操作后，再返回给客户端即可


<!-- 链接 -->
[expressjs_session]: https://github.com/expressjs/session
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
