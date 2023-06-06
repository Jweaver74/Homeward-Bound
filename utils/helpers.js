module.exports = {
    format_date: (date) => {
      //console.log(date);
      return date.toLocaleDateString();
    },

    capitalize: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    select: (selected, options) => {
      return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    }
  };