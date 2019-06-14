## 会话

由于 `HTTP` 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）

**cookie 与 session 的区别**
- cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
- 通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
- session 更安全，cookie 可以直接在浏览器查看甚至编辑

## 客户端(浏览器)与服务器实现会话流程
- 浏览器向服务器请求特定 `url`
- 服务器接收请求，生成 session 和 session id
