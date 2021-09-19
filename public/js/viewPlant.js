const viewPlantHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/plant/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      // document.location.replace('/api/categories');
    } else {
      alert('Failed to delete project');
    }
  }
};

/* document
  .querySelector('#selected-plant')
  .addEventListener('click', viewPlantHandler);
 */
