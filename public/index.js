const btn = document.querySelector('.card');

btn.addEventListener('click', async (event) => {
  const button = event.target.dataset.type;
  const targetDiv = event.target.closest('.products');

  if (button === 'delete') {
    event.preventDefault();
    // console.log(e.target);
    const id = event.target.closest('div').dataset.dataid;
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      targetDiv.remove();
    }
  }
});
