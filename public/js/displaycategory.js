const addButtonHandler = async (event) => {
  event.preventDefault();

  const categoryId = event.target.getAttribute('data-category');

  if (name) {
    const response = await fetch(`/api/categories/addcategory`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/api/categories');
    } else {
      alert('Failed to create category');
    }
  }
};

document
  .querySelector('#add-plant')
  .addEventListener('click', addButtonHandler);
