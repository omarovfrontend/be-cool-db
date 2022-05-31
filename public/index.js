// Добаваление продукта
const { addPost } = document.forms;
const btn = document.querySelector('.card');

function insertPost(result) {
  return `
    <div class="products">
      <p class="title-product title-product-${result.newProduct.id}">Название Продукта: ${result.newProduct.name}</p>
      <p class="category-product category-product-${result.newProduct.id}">Категория Продукта: ${result.categoryAdd.name}</p>
      <img class="img-post img-post-${result.newProduct.id}" src=${result.newProduct.img} alt="photo">

      <div data-dataId="${result.newProduct.id}" class="product-inner">
        <button data-type="delete" id="delete" class="products_delete-btn">Удалить</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Изменить
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div data-id="${result.newProduct.id}" class="modal-body">
                <form name="editPost" class="editPost">
                  <div class="addPost_card">
                    <label for="name" class="form-label">Название Продукта:</label>
                    <input class="input" required="required" type="text" name="productName" placeholder="name..." />
                  </div>
                  <div class="addPost_card">
                    <label for="name" class="form-label">Категория Продукта:</label>
                    <input class="input" required="required" type="text" name="categoryName" placeholder="name..." />
                  </div>
                  <div class="addPost_card">
                    <label for="name" class="form-label">Ссылка на картинку:</label>
                    <input class="input" required="required" type="text" name="img" placeholder="вставьте ссылку..." />
                  </div>
                  <div data-id="${result.newProduct.id}" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="submit" id="edit" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

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

  if (response.ok) {
    const result = await response.json();
    console.log(result);

    btn.insertAdjacentHTML('beforeend', insertPost(result));

    productName.value = '';
    categoryName.value = '';
    img.value = '';
  }
});

// Удаление продукта
btn.addEventListener('click', async (event) => {
  event.preventDefault();

  // const button = event.target.dataset.type;

  if (event.target.id === 'delete') {
    const targetDiv = event.target.closest('.products');
    const id = event.target.closest('div').dataset.dataid;
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      targetDiv.remove();
    }
  // ручка для изменения поста
  } else if (event.target.id === 'edit') {
    const { editPost } = document.forms;
    const editId = event.target.parentNode.dataset.id;
    const editPosts = Object.fromEntries(new FormData(editPost));

    const res = await fetch(`/edit/${editId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editPosts),
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      document.querySelector(`.title-product-${editId}`).innerText = `Название Продукта: ${editPosts.productName}`;
      document.querySelector(`.category-product-${editId}`).innerText = `Категория Продукта: ${editPosts.categoryName}`;
      document.querySelector(`.img-post-${editId}`).src = editPosts.img;
    }
  }
});
