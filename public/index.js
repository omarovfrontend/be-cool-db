const btn = document.querySelector('.card');

btn.addEventListener('click', async (e) => {
  const button = e.target.dataset.type;
  const targetDiv = e.target.closest('.products');
  console.log(targetDiv);
  console.log(button === 'delete');

  if (button === 'delete') {
    e.preventDefault();
    console.log(e.target);
    const id = e.target.closest('div').dataset.dataid;
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      targetDiv.remove();
    }
  }
});

// const postCard = e.target.closest('[data-id]');
// const { id } = postCard.dataset;
// console.log(postCard);
// console.log(id);
// const res = await fetch(`/delete/${id}`, { method: 'delete' });
// if (res.ok) {
//   postCard.remove();
//   window.location = '/';
// }
