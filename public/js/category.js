const newCategoryHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#category-name').value.trim();

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
 
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/categories/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/categories');
    } else {
      alert('Failed to delete project');
    }
  }
};


document
  .querySelector('#add-Category-btn')
  .addEventListener('click', newCategoryHandler); 

document
  .querySelector('#catdelete-btn')
  .addEventListener('click', delButtonHandler);
