import { checkHamsterPairs, getHamster } from "./database.js"
import { hamsterDBArray } from "./startup.js"
import { parentPort, workerData } from 'worker_threads';

// thank you stack overflow
// what would i ever do without you
// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function getVotingPair() {
  let twoRandomElements = getRandom(hamsterDBArray[0], 2)
  let result = checkHamsterPairs(twoRandomElements[0], twoRandomElements[1])
  
  if (!result) {
    let i = 0
    while (i < 3) {
      twoRandomElements = getRandom(hamsterDBArray[0], 2)
      result = checkHamsterPairs(twoRandomElements[0], twoRandomElements[1])
      if (result) {
        break
      }
      i++
    }
  }

  return [twoRandomElements[0], getHamster(twoRandomElements[0]), twoRandomElements[1], getHamster(twoRandomElements[1])]
}

function closeVoting() {
  parentPort.postMessage("voting closed")
}

//let result = getVotingPair()
//parentPort.postMessage(result)

let mode = 0
let delay = 1000

let timer = setTimeout(function voting() {
  if (mode == 0) {
    mode = 1
    delay = 1000 * 60 * 60
    let result = getVotingPair()
    parentPort.postMessage(result)
  } else if (mode == 1) {
    mode = 2
    delay = 5 * 60 * 1000
    closeVoting()
  } else if (mode == 2) {
    mode = 0
    delay = 1000
  }
  let timer = setTimeout(voting, delay)
}, delay)
