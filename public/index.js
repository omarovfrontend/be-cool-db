// Добаваление продукта - через fetch
const { addPost } = document.forms;
const btn = document.querySelector('.card');

addPost.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { productName, categoryName, img } = addPost;

  const response = await fetch('/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName: productName.value,
      categoryName: categoryName.value,
      img: img.value,
    }),
  });

  const res = await response.json();
  console.log(res);

  if (response.ok) {
    console.log(res);
    btn.insertAdjacentHTML('beforeend', `
      <div class="products">
        <img style="width: 250px;" src=${img.value} alt="photo">
        <p>${productName.value} - ${categoryName.value} - ${res.name} </p>
        <div data-dataid="${res.category}" class="product-inner">
          <button data-type="delete" id="delete" class="products_delete-btn">Удалить</button>
        </div>
    </div>
    `);
    productName.value = '';
    categoryName.value = '';
    img.value = '';
  }
});

// Удаление продукта - через fetch
btn.addEventListener('click', async (event) => {
  const button = event.target.dataset.type;
  const targetDiv = event.target.closest('.products');

  if (button === 'delete') {
    event.preventDefault();
    const id = event.target.closest('div').dataset.dataid;
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      targetDiv.remove();
    }
  }
});
