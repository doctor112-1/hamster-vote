import 'dotenv/config'
import fs from 'node:fs';
import { Readable } from "stream";
import { addHamster, getAllHamsters } from "./database.js"

const key = process.env.PIXABAY_API_KEY

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

export async function startUp() {
  let arrayOfHitsToUse = []

  const mapOfHamsters = new Map()

  if (fs.existsSync('images')) {
    return true
  } else {
    fs.mkdirSync('images');
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
      if (response[i].tags.includes("toilet paper")) {
      } else {
      arrayOfHitsToUse.push(i)
      }
    }

    for (let i = 0; i < arrayOfHitsToUse.length; i++) {
      mapOfHamsters.set(i, response[i])
    }

    for (let [key, value] of mapOfHamsters) {
      let url = value.previewURL
      const resp = await fetch(url)
      if (resp.ok && resp.body) {
        let filename = "hamster" + key + "." + url.split(".").pop()
        console.log(`Downloading and saving image to images/${filename}`)
        let writer = await fs.createWriteStream(`images/${filename}`)
        Readable.fromWeb(resp.body).pipe(writer)
        await addHamster(filename, value.pageURL)
      } else {
        console.log("Failed to get image skipping")
      }
    }
  }
}

await startUp()

export const hamsterDBArray = getAllHamsters()
