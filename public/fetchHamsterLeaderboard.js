

let response = await fetch("hamsterVotes")
response = await response.text()
const element = document.getElementById("hamsterLeaderboard")
console.log(response)

if (response == "[]") {
  const result = document.createElement("p")
  const node = document.createTextNode("No hamsters have been voted yet")
  result.appendChild(node)
  element.appendChild(result)
} else {
  const table = document.createElement("table")
  const tableHead = document.createElement("thead")
  const tableBody = document.createElement("tbody")
  const hamstersTableRow = document.createElement("tr")
  const hamsterTableRowHamsters = document.createElement("th")
  const hamsterTableRowHamstersText = document.createTextNode("Hamster")
  const hamstersTableRowVotes = document.createElement("th")
  const hamstersTableRowVotesText = document.createTextNode("Votes")
  hamstersTableRowVotes.appendChild(hamstersTableRowVotesText)
  hamsterTableRowHamsters.appendChild(hamsterTableRowHamstersText)
  hamstersTableRow.appendChild(hamsterTableRowHamsters)
  hamstersTableRow.appendChild(hamstersTableRowVotes)
  tableHead.appendChild(hamstersTableRow)
  table.appendChild(tableHead)
  response = response.slice(1, response.length)
  response = response.slice(0, -1)
  response = response.split(",")
  console.log(response)

  for (let i = 0; i < response.length; i++) {
    const tableRowHamsterData = document.createElement("tr")
    const tableRowHamsterDataName = document.createElement("td")
    const tableRowHamsterDataNameText = document.createTextNode(response[i].slice(1, response[i].length).slice(0, -1))
    const tableRowHamsterDataVote = document.createElement("td")
    const tableRowHamsterDataVoteText = document.createTextNode(response[i + 1])
    tableRowHamsterDataVote.appendChild(tableRowHamsterDataVoteText)
    tableRowHamsterDataName.appendChild(tableRowHamsterDataNameText)
    tableRowHamsterData.appendChild(tableRowHamsterDataName)
    tableRowHamsterData.appendChild(tableRowHamsterDataVote)
    tableBody.appendChild(tableRowHamsterData)
    i++
  }
  table.appendChild(tableBody)
  element.appendChild(table)
}
