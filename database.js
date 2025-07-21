import { open } from 'lmdb'

let hamsterDB = open({
	path: 'hamsterDB',
	compression: true,
});

let hamsterPairs = open({
	path: 'hamsterPairs',
  dupSort: true,
	compression: true,
});

let hamsterVotes = open({
	path: 'hamsterVotes',
	compression: true,
});

export async function addVotesForHamster(key) {
  let vote = hamsterVotes.get(key)
  if (isNaN(vote)) {
    await hamsterVotes.put(key, 1)
  } else {
    vote++
    await hamsterVotes.put(key, vote)
  }
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

export async function addHamster(key, value) {
  await hamsterDB.put(key, value)
}

export function getAllHamsters() {
  let allKeys = []
  let allValues = []
  for (let { key, value } of hamsterDB.getRange()) {
    allKeys.push(key)
    allValues.push(value)
  }
  return [allKeys, allValues]
}

export function getHamster(key) {
  return hamsterDB.get(key)
}
