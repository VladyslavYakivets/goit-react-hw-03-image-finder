const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34934425-6e5c65b56c955751294d078da';
export const getSearchImage = (text, page) => {
  return fetch(
    `${BASE_URL}?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
};
