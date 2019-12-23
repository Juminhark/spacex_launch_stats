# spacex_launch_stats
GraphQL With React &amp; Apollo

query{
  person(id: 1){
    name
  }
}
다음과 같이 요청하면 

import { people, getById } from './db'

const resolvers = {
    Query: {
        people: () => people,
        person: () => getById()
    }
}


딱히 개선될 것 같지는 않다. 존 그루버가 신경안쓰고 있다고...

● 순서없는 목록(글머리 기호)
* 빨강
  * 녹색
    * 파랑

+ 빨강
  + 녹색
    + 파랑

- 빨강
  - 녹색
    - 파랑
