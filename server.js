import express from 'express'
const app = express()
const port = 3000

let isThereAVotingPair = false

app.use(express.static('public'))

// REMOVE THIS!!!!!! NOT GOOD!!!! DON'T HAVE KEYS IN YOUR CODE!!!!!!!!!
const key = ""

async function fetchImages() {
  const url = `https://pixabay.com/api/?key=${key}&q=hamster`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error(error.message)
  }
}

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


app.get('/getVotingPair', async (req, res) => {
  if (!isThereAVotingPair) {
    isThereAVotingPair = true
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

