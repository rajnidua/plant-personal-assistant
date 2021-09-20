const plantFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#plant-name').value.trim();
  const botanical_name = document
    .querySelector('#plant-botanical-name')
    .value.trim();
  const sun_exposure = document
    .querySelector('#plant-sun-exposure')
    .value.trim();
  const mature_size = document.querySelector('#plant-mature-size').value.trim();

  const soil_type = document.querySelector('#plant-soil-type').value.trim();

  const date_planted = document
    .querySelector('#plant-date-planted')
    .value.trim();

  const watering_freq_num = document.querySelector('#plant-watering-num').value;

  const last_watering_date_unformatted = document
    .querySelector('#plant-last-watering-date')
    .value.trim();

  console.log('******** Planned Date', date_planted);

  const category_id = document
    .getElementById('add-submit')
    .getAttribute('data-category');
  console.log('***1111 categoryid', category_id);

  // selected location
  const location_id = document.getElementById('location-selection').value;

  const watering_frequency_interval_enum = document.getElementById(
    'selection-frequency'
  ).value;

  switch (watering_frequency_interval_enum) {
    case '0':
      var watering_frequency_interval_ForMoment = 'Days';
      var watering_freq_interval = 'Days';
      break;
    case '1':
      var watering_frequency_interval_ForMoment = 'Weeks';
      var watering_freq_interval = 'Weeks';
      break;
    case '2':
      var watering_frequency_interval_ForMoment = 'Months';
      var watering_freq_interval = 'Months';
      break;
    case '3':
      var watering_frequency_interval_ForMoment = 'Hours';
      var watering_freq_interval = 'Hours';
      break;
    default:
      var watering_frequency_interval_ForMoment = 'Months';
      var watering_freq_interval = 'Months';
  }

  const last_watering_date = moment(last_watering_date_unformatted);
  const next_watering_date = moment(last_watering_date).add(
    watering_freq_num,
    watering_frequency_interval_ForMoment
  );

  if (name) {
    // Send a POST request to the API endpoint
    const postUrl = '/api/plant/addplant';
    const postPayLoad = JSON.stringify({
      name,
      botanical_name,
      sun_exposure,
      mature_size,
      soil_type,
      category_id,
      location_id,
      date_planted,
      last_watering_date,
      watering_freq_num,
      watering_freq_interval,
      next_watering_date,
    });

    const plantData = await postData(postUrl, postPayLoad);
    const plantId = plantData.id;
    console.log('***** plantid', plantId);
    if (plantId) {
      console.log('%%%%%%' + plantData);
      alert('Plant added successfully');
      const url = '/api/categories/' + category_id + '/plants';
      document.location.replace(url);
    } else {
      alert('Failed to create plant record');
    }
  }
};

async function postData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const catId = event.target.getAttribute('data-catid');

    const response = await fetch(`/api/plant/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/api/categories/${catId}`);
    } else {
      alert('Failed to delete project');
    }
  }
};





document
  .querySelector('.plant-form')
  .addEventListener('submit', plantFormHandler);
  
var plantDelButtons = document.querySelectorAll('#plant-del-btn').length;
for (var i = 0; i < plantDelButtons ; i++) {
    document.querySelectorAll('#plant-del-btn')[i].addEventListener("click", delButtonHandler);
}



  