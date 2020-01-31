# spacex_launch_stats

GraphQL With React
https://www.youtube.com/watch?v=SEMTj8w04Z8&t=4s


>npm init

entry point : (index.js) server.js

> npm i graphql express-graphql express axios    : dependencies

> npm i -D nodemon    : devDependencies

<pre><code>
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  }
--> npm이 작동하면 scripts 안의 start, server을 시작한다.
--> start는 node server.js파일을 읽어 code를 작동
--> server는 nodemon이 server.js의 변화를 감지하여 server를 다시시작.
</code></pre>

> npm run server

> npx create-react-app client

> npm i concurrently --> 동시에 여러 app을 작동.

<pre><code>
 "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
</code></pre>

> npm run dev     --> client 와 server app 작동.


----------------client

> npm install apollo-boost @apollo/react-hooks graphql

extension추가 : ES7 React/Redux/GraphQL/React-Native snippets
React Components

<pre><code>
rce -- 이것으로 아래 자동 생성--

import React, { Component } from 'react'

export class FileName extends Component {
  render() {
    return <div>$2</div>
  }
}
export default $1
</code></pre>


