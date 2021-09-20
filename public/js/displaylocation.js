const updLocationHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#Location-name').value.trim();

  if (name) {
    const id = event.target.getAttribute('data-Location');
    const updateURL = '/api/locations/update/' + id;
    const response = await fetch(updateURL, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/api/locations');
    } else {
      alert('Failed to create Location');
    }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const Location_id = event.target.getAttribute('data-catid');
      alert("plant id is in js file" + id);
    const fetchUrl = '/api/plant/delete/' + id;
    alert('Fetch URL for Delete' + fetchUrl);
    const response = await fetch(fetchUrl, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/locations/{{Location_id}}');
    } else {
      alert('Failed to delete project');
    }
  }
};

var buttons = document.querySelectorAll('#plant-del-btn').length;
for (var i = 0; i < buttons ; i++) {
    document.querySelectorAll('#plant-del-btn')[i].addEventListener("click", delButtonHandler);
}

/*
document
  .querySelector('#plant-del-btn')
  .addEventListener('click', delButtonHandler);
  */
/*
document
  .querySelector('#add-Location')
  .addEventListener('click', addButtonHandler);
*/

document
  .querySelector('#upd-Location-btn')
  .addEventListener('click', updLocationHandler); 
