import { open } from 'lmdb'

let hamsterDB = open({
  path: 'hamsterDB',
  compression: true,
})
