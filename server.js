import express from 'express'
import 'dotenv/config'
import { addVotesForHamster, getAllHamsterVotes, getAllHamsterPairs, checkHamsterPairs, addHamster, getAllHamsters, getHamster } from './database.js'
import { hamsterDBArray } from './startup.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const app = express()
const port = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static('public'));
app.use("/images", express.static(__dirname + "/images"))

app.use(express.json())

const worker = new Worker('./updateVotingPair.js');

let votingPair;

let isVotingOpen = true

let voteOne = 0
let voteTwo = 0

worker.on('message', async (result) => {
  console.log(result)
  isVotingOpen = true
  if (result == "voting closed") {
    isVotingOpen = false
    if (voteOne < voteTwo) {
      await addVotesForHamster(votingPair[2])
      let oldVotingPair = votingPair
      votingPair = result
      votingPair = votingPair + ",2" + "," + oldVotingPair[2]
    } else if (voteTwo < voteOne) {
      await addVotesForHamster(votingPair[0])
      let oldVotingPair = votingPair
      votingPair = result
      votingPair = votingPair + ",1" + "," + oldVotingPair[0]
    } else {
      votingPair = result
      votingPair = votingPair + ",0"
    }
  } else {
    votingPair = result
  }
})

app.get('/votingPair', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  let interval = setInterval(() => {
    res.write(`data: ${votingPair}\n\n`)
  }, 2000);
  
  res.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})

app.get('/hamsterVotes', (req, res) => {
  res.send(getAllHamsterVotes())
})

app.post('/vote', async (req, res) => {
  if (isVotingOpen) {
    console.log(req.body)
    if (req.body.vote == "1") {
      voteOne++
      res.send("voted successfully")
    } else if (req.body.vote == "2") {
      voteTwo++
      res.send("voted successfully")
    } else {
      res.send("not valid")
    }
  } else {
    res.send("voting not open")
  }
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
