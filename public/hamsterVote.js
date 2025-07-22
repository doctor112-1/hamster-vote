const eventSource = new EventSource("votingPair")
const hamsterVote = document.getElementById("hamsterVote") 
let oldData = "sladnad";

// thank you geeksforgeeks, i don't know what i would ever do without you or stackoverflow
function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

eventSource.onmessage = (event) => {
  let data = event.data
  data = data.split(",")
  console.log(data)
  if (oldData.length != data.length) {
    hamsterVote.innerHTML = ""
    if (data[0] == "voting closed") {
      console.log(data)
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


      document.cookie = "voted = false; expires=Thu, 5 March 2030 12:00:00 UTC; path=/";
      oldData = data
    } else {
      if (getCookie("voted") == "false" || getCookie("voted") == null) {
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
        let hamsterCellOneDivButtonDiv = document.createElement("div")
        let hamsterCellOneDivImageDivImage = document.createElement("img")
        hamsterCellOneDivImageDivImage.src = "images/" + data[0]
        hamsterCellOneDivImageDivImage.style.height = "150px"
        hamsterCellOneDivImageDivImage.style.width = "150px"
        hamsterCellOneDivImageDiv.appendChild(hamsterCellOneDivImageDivImage)
        hamsterCellOneDivButtonDiv.classList.add("imgHamsterButton")
        let hamsterCellOneDivButtonDivButton = document.createElement("button")
        hamsterCellOneDivButtonDivButton.textContent = "Vote for this hamster"
        hamsterCellOneDivButtonDivButton.setAttribute("id", "hamsterCellOneDivButtonDivButton")
        hamsterCellOneDivButtonDiv.appendChild(hamsterCellOneDivButtonDivButton)
        hamsterCellOneDiv.appendChild(hamsterCellOneDivImageDiv)
        hamsterCellOneDiv.appendChild(hamsterCellOneDivButtonDiv)


        let hamsterCellTwoDiv = document.createElement("div")
        hamsterCellTwo.appendChild(hamsterCellTwoDiv)
        let hamsterCellTwoDivImageDiv = document.createElement("div")
        let hamsterCellTwoDivButtonDiv = document.createElement("div")
        let hamsterCellTwoDivImageDivImage = document.createElement("img")
        hamsterCellTwoDivImageDivImage.src = "images/" + data[2]
        hamsterCellTwoDivImageDivImage.style.height = "150px"
        hamsterCellTwoDivImageDivImage.style.width = "150px"
        hamsterCellTwoDivImageDiv.appendChild(hamsterCellTwoDivImageDivImage)
        hamsterCellTwoDivButtonDiv.classList.add("imgHamsterButton")
        let hamsterCellTwoDivButtonDivButton = document.createElement("button")
        hamsterCellTwoDivButtonDivButton.textContent = "Vote for this hamster"
        hamsterCellTwoDivButtonDivButton.setAttribute("id", "hamsterCellTwoDivButtonDivButton")
        hamsterCellTwoDivButtonDiv.appendChild(hamsterCellTwoDivButtonDivButton)
        hamsterCellTwoDiv.appendChild(hamsterCellTwoDivImageDiv)
        hamsterCellTwoDiv.appendChild(hamsterCellTwoDivButtonDiv)

        hamsterVote.appendChild(hamsterTable)

        let buttonOne = document.getElementById("hamsterCellOneDivButtonDivButton")
        let buttonTwo = document.getElementById("hamsterCellTwoDivButtonDivButton")

        buttonOne.addEventListener("click", async () => {
          await fetch('/vote', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "vote": "1"
            })
          })
        
          hamsterVote.innerHTML = ""
          document.cookie = "voted = true; expires=Thu, 5 March 2030 12:00:00 UTC; path=/";
          const result = document.createElement("h1")
          const node = document.createTextNode("You have voted")
          result.appendChild(node)
          hamsterVote.appendChild(result)
        }, false)

        buttonTwo.addEventListener("click", async () => {
          await fetch('/vote', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "vote": "2"
            })
          })
          hamsterVote.innerHTML = ""
          document.cookie = "voted = true; expires=Thu, 5 March 2030 12:00:00 UTC; path=/";
          const result = document.createElement("h1")
          const node = document.createTextNode("You have voted")
          result.appendChild(node)
          hamsterVote.appendChild(result)
        }, false)
      } else {
        const result = document.createElement("h1")
        const node = document.createTextNode("You have voted")
        result.appendChild(node)
        hamsterVote.appendChild(result)
      }



      oldData = data
    }
  }
}
