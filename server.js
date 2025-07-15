import express from 'express'
import 'dotenv/config'
const app = express()
const port = process.env.PORT
import * from './database.js'

app.use(express.static('public'));

let isThereAVotingPair = false

// thank you stack overflow i don't know what i would ever do without you
// https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout
let getTimeout = (() => { // IIFE
    let _setTimeout = setTimeout, // Reference to the original setTimeout
        map = {}; // Map of all timeouts with their end times

    setTimeout = (callback, delay) => { // Modify setTimeout
        let id = _setTimeout(callback, delay); // Run the original, and store the id
        map[id] = Date.now() + delay; // Store the end time
        return id; // Return the id
    };

    return (id) => { // The actual getTimeout function
        // If there was no timeout with that id, return NaN, otherwise, return the time left clamped to 0
        return map[id] ? Math.max(map[id] - Date.now(), 0) : NaN;
    }
})();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
