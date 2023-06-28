const axios = require('axios');
require('dotenv').config();

async function getChatGPTResponse(prompt) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };
  
    const data = {
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': prompt
        }
      ]
    };
  
    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error.response.data);
      return 'An error occurred while fetching the response.';
    }
  }
  

async function startChat() {
  console.log('Welcome to the ChatGPT CLI app!');

  while (true) {
    const prompt = await getUserInput('\nYour input:');
    if (prompt === 'exit') {
      console.log('Exiting the ChatGPT CLI app.');
      break;
    }

    const response = await getChatGPTResponse(prompt);
    console.log(`\n${response}`);
  }
}

function getUserInput(prompt) {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`${prompt} `, (input) => {
      readline.close();
      resolve(input);
    });
  });
}

startChat();
