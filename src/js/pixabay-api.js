import axios from 'axios';

const API_KEY = '55642648-716ae2e3c36078de20c00cb22';
const BASE_URL = 'https://pixabay.com/api/';

// Функція для отримання зображень за запитом

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка при запиті до Pixabay:', error);
    throw error;
  }
}