const eventSource = new EventSource("votingPair")
const hamsterVote = document.getElementById("currentPair")
let oldData = "sladnad";

let response = await fetch("getVotes")
response = await response.text()
response = response.split(" ")

eventSource.onmessage = (event) => {
  let data = event.data
  data = data.split(",")
  if (oldData.length != data.length) {
    hamsterVote.innerHTML = ""
    if (data[0] == "voting closed") {
      if (data[1] == "0") {
        const result = document.createElement("p")
        const node = document.createTextNode("Tie")
        result.appendChild(node)
        hamsterVote.appendChild(result)
      } else if (data[1] == "1") {
        const result = document.createElement("p")
        const node = document.createTextNode(data[2] + " won")
        result.appendChild(node)
        hamsterVote.appendChild(result)
      } else if (data[1] == "2") {
        const result = document.createElement("p")
        const node = document.createTextNode(data[2] + " won")
        result.appendChild(node)
        hamsterVote.appendChild(result)
      }


      oldData = data
    } else {
      let hamsterTable = document.createElement("table")
      let hamsterTableRow = document.createElement("tr")
      hamsterTable.appendChild(hamsterTableRow)
      let hamsterCellOne = document.createElement("td")
      let hamsterCellTwo = document.createElement("td")
      hamsterTableRow.appendChild(hamsterCellOne)
      hamsterTableRow.appendChild(hamsterCellTwo)
      let hamsterCellOneDiv = document.createElement("div")
      hamsterCellOne.appendChild(hamsterCellOneDiv)
      let hamsterCellOneDivImageDiv = document.createElement("div")
      let hamsterCellOneDivTextDiv = document.createElement("div")
      let hamsterCellOneDivImageDivImage = document.createElement("img")
      hamsterCellOneDivImageDivImage.src = "images/" + data[0]
      hamsterCellOneDivImageDivImage.style.height = "150px"
      hamsterCellOneDivImageDivImage.style.width = "150px"
      hamsterCellOneDivImageDiv.appendChild(hamsterCellOneDivImageDivImage)
      hamsterCellOneDivTextDiv.classList.add("imgHamsterButton")
      let hamsterCellOneDivTextDivText = document.createElement("p")
      let hamsterCellOneDivButtonDivTextNode = document.createTextNode(`This hamster has ${response[0]} votes`)
      hamsterCellOneDivTextDivText.appendChild(hamsterCellOneDivButtonDivTextNode)
      hamsterCellOneDivTextDiv.appendChild(hamsterCellOneDivTextDivText)
      hamsterCellOneDiv.appendChild(hamsterCellOneDivImageDiv)
      hamsterCellOneDiv.appendChild(hamsterCellOneDivTextDiv)


      let hamsterCellTwoDiv = document.createElement("div")
      hamsterCellTwo.appendChild(hamsterCellTwoDiv)
      let hamsterCellTwoDivImageDiv = document.createElement("div")
      let hamsterCellTwoDivTextDiv = document.createElement("div")
      let hamsterCellTwoDivImageDivImage = document.createElement("img")
      hamsterCellTwoDivImageDivImage.src = "images/" + data[2]
      hamsterCellTwoDivImageDivImage.style.height = "150px"
      hamsterCellTwoDivImageDivImage.style.width = "150px"
      hamsterCellTwoDivImageDiv.appendChild(hamsterCellTwoDivImageDivImage)
      hamsterCellTwoDivTextDiv.classList.add("imgHamsterButton")
      let hamsterCellTwoDivTextDivText = document.createElement("p")
      let hamsterCellTwoDivTextDivTextNode = document.createTextNode(`This hamster has ${response[1]} votes`)
      hamsterCellTwoDivTextDivText.appendChild(hamsterCellTwoDivTextDivTextNode)
      hamsterCellTwoDivTextDiv.appendChild(hamsterCellTwoDivTextDivText)
      hamsterCellTwoDiv.appendChild(hamsterCellTwoDivImageDiv)
      hamsterCellTwoDiv.appendChild(hamsterCellTwoDivTextDiv)

      hamsterVote.appendChild(hamsterTable)
    }



    oldData = data
  }
}
