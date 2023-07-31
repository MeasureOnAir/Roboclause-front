import axios from 'axios';

const API_URL = 'http://44.217.211.113:8000/chat/ask';

// const MOCK_DATA = [
//   "The penalty for the contractor for delay in delivery is an extension of time for completion, subject to Sub-Clause 20.1 [Contractor's Claims].",
//   [
//     {
//       "Clause": 17.4,
//       "Clause_Name": "Consequences of Employer's Risks"
//     },
//     {
//       "Clause": 16.1,
//       "Clause_Name": "Contractor’s Entitlement to Suspend Work"
//     },
//     {
//       "Clause": 10.3,
//       "Clause_Name": "Interference with Tests on Completion"
//     },
//     {
//       "Clause": 7.4,
//       "Clause_Name": "Testing"
//     }
//   ]
// ]

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: false,
      minute: 'numeric'
    });
}

// function timeout(delay) {
//   return new Promise(res => setTimeout(res, delay));
// }

export async function postPrompt(prompt) {

  // await timeout(2000)
  // return MOCK_DATA
  try {
    const response = await axios.post(`${API_URL}?prompt=${prompt}`);
    const data = response.data
    if (!data) {
      return {
        type: 'bot',
        text: "Sorry I Cannot Answer that Question",
        sources: [],
        time: getCurrentTime()
      };
    }
    if (data[0] === "I don't Know") {
      return {
        type: 'bot',
        text: "Sorry I Cannot Answer that Question",
        sources: [],
        time: getCurrentTime()
      };
    }
    return {
      type: 'bot',
      text: data[0],
      sources: data[1],
      time: getCurrentTime()
    }
  } catch (error) {
    console.error(error);
  }
}
