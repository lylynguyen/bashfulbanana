module.exports = {
  getDate: function(dateString) {
    var dateArray = dateString.split('-');
    var day = dateArray[2].split('T')[0]
    return {
      year: dateArray[0],
      month: dateArray[1],
      day: day
    }
  },
  getDateTime: function(dateTimeString) {
    return 'hi';
  }
}
