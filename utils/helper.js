const ExpressHandlebars = require('express-handlebars/lib/express-handlebars');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};

/* module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    //return date.toLocaleDateString();
    var m = date;
    var dateString =
      m.getUTCFullYear() +
      '/' +
      ('0' + (m.getUTCMonth() + 1)).slice(-2) +
      '/' +
      ('0' + m.getUTCDate()).slice(-2) +
      ' ' +
      ('0' + m.getUTCHours()).slice(-2) +
      ':' +
      ('0' + m.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + m.getUTCSeconds()).slice(-2);

    return dateString;
  },
}; */
