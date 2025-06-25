function main() {
  displayRamens();
  addSubmitListener();
}

// Fetch and display all ramen images
export function displayRamens() {

  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
      ramens.forEach(ramen => renderRamenImage(ramen));
    });
}

// Render one ramen image in the #ramen-menu div
function renderRamenImage(ramen) {
  const menu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  // Listen for click on this image
  img.addEventListener('click', () => handleClick(ramen));
  menu.appendChild(img);
}

// When an image is clicked, update the ramen detail section
export function handleClick(ramen) {
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const name = document.querySelector('#ramen-detail .name');
  const restaurant = document.querySelector('#ramen-detail .restaurant');
  const rating = document.getElementById('rating-display');
  const comment = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
}

// Handle form submission to add a new ramen image to the menu
export function addSubmitListener() {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form['new-comment'].value
    };

    renderRamenImage(newRamen);
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', main);