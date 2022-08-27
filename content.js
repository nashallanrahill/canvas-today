// HELPERS
function textInElement(element, text) {
  found = element.textContent.includes(text)
  return found;
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(date) {
  const month = date.toLocaleString('default', { month: 'short' });
  var datestr = month + " " + date.getDate() + ", " + date.getFullYear()
  return datestr
}

// MAIN
const url = new URL('', window.location.href);
// console.log(url.pathname);
// TODO: change this to work for any canvas page?
if (url.hostname == "canvas.dartmouth.edu" && !!document.getElementById("schedule")) {
  schedule = document.getElementById("schedule");

  // 1. Get current datetime
  dateCheck = new Date();
  datestr = formatDate(dateCheck)

  // Look for nearest (or next) datetime in page content
  // TODO: should maxDaysToAdd be changed?
  daysAdded = 0
  maxDaysToAdd = 7
  //console.log("Searching for: " + datestr)
  dateFound = textInElement(schedule, datestr);
  while (!dateFound && daysAdded <= maxDaysToAdd) {
      dateCheck = dateCheck.addDays(1)
      datestr = formatDate(dateCheck)
      daysAdded++
      //console.log("Searching for: " + datestr)
      dateFound = textInElement(schedule, datestr);
  }

  // Convert to jumping link & execute
  if (dateFound) {
      prevURL = window.location.href;
      newURL = prevURL + "#content:~:text=" + encodeURIComponent(datestr);
      window.location.replace(newURL);
  }
}