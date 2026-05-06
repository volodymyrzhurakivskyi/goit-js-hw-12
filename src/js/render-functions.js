// 1️⃣ ІМПОРТУЄМО SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// 2️⃣ ОТРИМУЄМО ЕЛЕМЕНТИ З HTML
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.querySelector('.load-more');

// 3️⃣ СТВОРЮЄМО ЕКЗЕМПЛЯР SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

// ============================================
export function createGallery(images) {
  const markup = images
    .map(
      (image) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="image-info">
          <div class="info-item"><span class="info-label">Likes</span><span class="info-value">${image.likes}</span></div>
          <div class="info-item"><span class="info-label">Views</span><span class="info-value">${image.views}</span></div>
          <div class="info-item"><span class="info-label">Comments</span><span class="info-value">${image.comments}</span></div>
          <div class="info-item"><span class="info-label">Downloads</span><span class="info-value">${image.downloads}</span></div>
        </div>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Залишаємо кожну функцію ТІЛЬКИ ОДИН РАЗ
export function clearGallery() { 
  gallery.innerHTML = ''; 
}

export function showLoader() { 
  loader.classList.remove('hidden'); 
}

export function hideLoader() { 
  loader.classList.add('hidden'); 
}

export function showLoadMoreButton() { 
  loadMoreBtn.classList.remove('hidden'); 
}

export function hideLoadMoreButton() { 
  loadMoreBtn.classList.add('hidden'); 
}