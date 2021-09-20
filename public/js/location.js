const newLocationHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#location-name').value.trim();

  if (name) {
    const response = await fetch(`/api/locations/addlocation`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/api/locations');
    } else {
      alert('Failed to create category');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/locations/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/locations');
    } else {
      alert('Failed to delete project');
    }
  }
};


var locDelButtons = document.querySelectorAll('#locdelete-btn').length;
for (var i = 0; i < locDelButtons ; i++) {
    document.querySelectorAll('#locdelete-btn')[i].addEventListener("click", delButtonHandler);
}
document
  .querySelector('#add-location-btn')
  .addEventListener('click', newLocationHandler); 
