/*const locationHandler = async (event) => {
   if (event.target.hasAttribute('data-location')) {
    const locationId = document
      .getElementById('link-btn')
      .getAttribute('data-location');

    const plantId = document
      .getElementById('heading')
      .getAttribute('data-plant');

    console.log('****** data-plant', plantId);
    /*   const locationId = event.target.getAttribute('data-location');
    const plantId = event.target.getAttribute('data-plant'); */

/* const patchURL = '/api/plant/update/' + plantId;
    const response = await fetch(patchURL, {
      method: 'PATCH',
      body: JSON.stringify({ location_id: locationId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete project');
    }
  }
}; */

const locationHandler = async (event) => {
  $correspondingbutton = $($(this).parent().children()[1]);
  const buttonId = $correspondingbutton.attr('data-location');
  // if (event.target.hasAttribute('data-location')) {
  const locationId = document
    .getElementById('link-btn')
    .getAttribute('data-location');

  const plantId = document.getElementById('heading').getAttribute('data-plant');

  console.log('****** data-plant', plantId);
  /*   const locationId = event.target.getAttribute('data-location');
    const plantId = event.target.getAttribute('data-plant'); */
  const patchURL = '/api/plant/update/' + plantId;
  const response = await fetch(patchURL, {
    method: 'PATCH',
    body: JSON.stringify({ location_id: locationId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete project');
  }
  // }
};

document
  .getElementById('link-btn')
  .addEventListener('click', locationHandler());
