const plantFormHandler = async (event) => {
    event.preventDefault();
  
    const id = document.getElementById('add-submit').getAttribute('data-plant');
    console.log('***1111 plantid', id);
  
    const category_id = document
      .getElementById('add-submit')
      .getAttribute('data-category');
    console.log('***1111 categoryid', category_id);
  
    // alert('PLant id is ' + id);
    console.log('&&&&&& id ' + id);
  
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
  
   const check_date_planted = document
      .querySelector('#plant-date-planted')
      .value.trim();
  


    if (check_date_planted) {
      var date_planted = check_date_planted;

      alert('check date planted'+ check_date_planted);
    } else {
      var date_planted = document
        .getElementById('plant-date-planted')
        .getAttribute('data-date-planted');
    }

    console.log('******** Dateplanted', date_planted);
   alert('Date planted  is ' + date_planted);
    // selected location
     const check_location_id = document.getElementById('location-selection').value;
  
    if (check_location_id) {
      var location_id = check_location_id;
    } else {
      var location_id = document
        .getElementById('location-selection')
        .getAttribute('data-location');
    }
  
   const check_watering_freq_num = document.querySelector('#plant-watering-num').value;
  if (check_watering_freq_num) {
      var watering_freq_num = check_watering_freq_num;
    } else {
      var watering_freq_num = document
        .getElementById('plant-watering-num')
        .getAttribute('data-watering-num');
    }



    console.log('******** Planned Date', date_planted);
     const check_watering_freq_interval = document.getElementById(
      'selection-watering-frequency'
    ).value;
  
    if (check_watering_freq_interval) {
      var watering_freq_interval = check_watering_freq_interval;
    } else {
      var watering_freq_interval = document
        .getElementById('selection-watering-frequency')
        .getAttribute('data-water-frequency');
    }
  
    const check_last_watering_date_unformatted = document
  .querySelector('#plant-last-watering-date')
      .value.trim();
      
  
    if (check_last_watering_date_unformatted) {
      var last_watering_date = check_last_watering_date_unformatted;
      //var last_watering_date_moment = moment(last_watering_date);
     
      /*
      var next_watering_date = moment(last_watering_date).add(
        watering_freq_num,
        watering_freq_interval
      );
*/
    } else {
      var last_watering_date = document
        .getElementById('plant-last-watering-date')
        .getAttribute('data-date-last-watered');
        
        /*
        var next_watering_date = moment(last_watering_date).add(
        watering_freq_num,
        watering_freq_interval
      );
*/
    } 
    var last_watering_date_temp_unformatted = last_watering_date;
    var last_watering_date_temp_formatted = moment(last_watering_date_temp_unformatted);


  switch (watering_freq_interval) {
    case '0':
      var watering_frequency_interval_ForMoment = 'Days';
    //  var watering_freq_interval = 'Days';
      break;
    case '1':
      var watering_frequency_interval_ForMoment = 'Weeks';
    //  var watering_freq_interval = 'Weeks';
      break;
    case '2':
      var watering_frequency_interval_ForMoment = 'Months';
    //  var watering_freq_interval = 'Months';
      break;
    case '3':
      var watering_frequency_interval_ForMoment = 'Hours';
     // var watering_freq_interval = 'Hours';
      break;
    default:
      var watering_frequency_interval_ForMoment = 'Months';
     // var watering_freq_interval = 'Months';
  }


   var next_watering_date = moment(last_watering_date_temp_formatted).add(
        watering_freq_num,
        watering_frequency_interval_ForMoment 
      );
    const fetchURL = '/api/plant/update/' + id;
    const responseURL = '/api/categories/' + category_id + '/plants';
    if (name) {
      const response = await fetch(fetchURL, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
           botanical_name,
          sun_exposure,
          mature_size,
          soil_type,
          date_planted,
          location_id,
          watering_freq_num,
          watering_freq_interval,
          last_watering_date,
          next_watering_date,
           
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(responseURL);
      } else {
         alert('Error in update ' + response);
        console.log('Something went wrong. Try updating blog post later');
      }
    }
  };
  
  document
    .querySelector('.plant-form')
    .addEventListener('submit', plantFormHandler);