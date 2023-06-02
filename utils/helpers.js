module.exports = {
    format_date: (date) => {
      //console.log(date);
      return date.toLocaleDateString();
    },

    capitalize: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  };