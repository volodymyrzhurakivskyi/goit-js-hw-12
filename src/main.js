// 1️⃣ ІМПОРТУЄМО ВСЕ, ЩО ПОТРІБНО
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';


// 2️⃣ ОТРИМУЄМО ЕЛЕМЕНТИ З HTML
let currentPage = 1;
let currentQuery = '';
const loadMoreBtn = document.querySelector('.load-more');

const form = document.querySelector('.form');


// ============================================
// 📋 ОБРОБНИК ПОДАЧІ ФОРМИ
// ============================================
form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  // ОТРИМУЄМО ЗНАЧЕННЯ З INPUT
  const query = event.currentTarget.elements["search-text"].value.trim();

  
  if (!query) return;

  // Скидаємо все для нового пошуку
  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    
    if (data.hits.length === 0) {
      iziToast.error({ message: 'Нічого не знайдено!' });
      return;
    }

    createGallery(data.hits);
    
    // ПЕРЕВІРКА КІЛЬКОСТІ РЕЗУЛЬТАТІВ
    if (data.totalHits > 15) {
      showLoadMoreButton();
    } else {
      // Якщо результатів 15 або менше — кнопки не буде,
      // але ми показуємо сповіщення про кінець (вимога ментора)
      hideLoadMoreButton();
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        transitionIn: 'fadeInUp'
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Помилка сервера!' });
  } finally {
    hideLoader();
  }
});

// ОБРОБКА КЛІКУ НА LOAD MORE
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    // Плавний скрол
   const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({ 
        top: cardHeight * 2, 
        behavior: 'smooth' 
      });
    }

    // Перевірка на кінець колекції
    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
setTimeout(() => {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
    transitionIn: 'fadeInUp',
    setTimeout: 5000
  });
}, 500);
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Помилка!' });
  } finally {
    hideLoader();
  }
});