import axios from 'axios';

const API_URL = 'https://roboclause-1-d6245946.deta.app/chat/ask';

export async function postData(prompt) {
  try {
    const response = await axios.post(`${API_URL}?prompt=${prompt}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
