import { open } from 'lmdb'
import 'dotenv/config'

const key = process.env.PIXABAY_API_KEY

let arrayOfHitsToUse = []

async function fetchImages(key, page) {
  const url = `https://pixabay.com/api/?key=${key}&per_page=10&page=${page}&q=hamster`

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

let response = await fetchImages(key, 1)

let totalHits = response.totalHits

totalHits -= 10

let pageNumber = 1

while (totalHits >= 10) {
  totalHits -= 10
  pageNumber++
}

if (totalHits < 10 && totalHits != 0) {
  pageNumber++
}

response = response.hits

for (let i = 1; i < pageNumber; i++) {
  let responseTemp = await fetchImages(key, i)
  responseTemp = responseTemp.hits
  response = response.concat(responseTemp);
}

for (let i = 0; i < Object.keys(response).length; i++) {
  if (response[i].tags.includes("toilet")) {
  } else {
    arrayOfHitsToUse.push(i)
  }
}

export const mapOfHamsters = new Map()

for (let i = 0; i < arrayOfHitsToUse.length; i++) {
  mapOfHamsters.set(i, response[i].previewURL)
}

let hamsterPairs = open({
	path: 'hamsterPairs',
  dupSort: true,
	compression: true,
});

let hamsterVotes = open({
	path: 'hamsterVotes',
	compression: true,
});

export async function addVotesforHamster(key, value) {
  await hamsterVotes.put(key, value)
}

export function getAllHamsterVotes() {
  let allKeyAndValues = []
  for (let { key, value } of hamsterVotes.getRange()) {
    allKeyAndValues.push(key, value)
  }
  return allKeyAndValues
}

export function getAllHamsterPairs() {
  let allKeyAndValues = []
  for (let { key, value } of hamsterPairs.getRange()) {
    allKeyAndValues.push(key, value)
  }
  return allKeyAndValues
}

export async function checkHamsterPairs(key1, key2) {
  let key1Value = hamsterPairs.get(key1)
  let key2Value = hamsterPairs.get(key2)

  for (let value of hamsterPairs.getValues(key1)) {
    if (key2 == value) {
      return false
    }
  }

  for (let value of hamsterPairs.getValues(key2)) {
    if (key1 == value) {
      return false
    }
  }

  await hamsterPairs.put(key1, key2)
  return true
}
