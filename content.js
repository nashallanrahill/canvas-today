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

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}    

function getTimestart(timerangestr){
  var timestart = timerangestr.split("-")[0];
  if (!timestart.includes(" ") & timestart.includes("M")) {
    len = timestart.length
    timestart = timestart.substring(0,len-2) + " " + timestart.substring(len-2,len)
  }
  return timestart
}

function iterateDate(table) {
// Test code
  // TODO: separate some of this into helper functions
  currdate = new Date();
  match = null;
  $(table).find('tr').each(function(i){
    if (i != 0) {
      var date = $(this).find('td:first').text().trim();
      var timerangestr = $(this).find('td:nth-child(2)').html()
      if (timerangestr != null) {
        timerangestr = timerangestr.split("<br>")[0]
        timestart = getTimestart(timerangestr)
        timend = timerangestr.split("-")[1];
        datetime = new Date(date+" "+timend);
        if (datetime instanceof Date && !isNaN(datetime) && currdate < datetime) {
          console.log("Found date")
          match = this;
          return false; // Stop iterating
        }
      }
    }
  })
  return match;
}   



// MAIN
const url = new URL('', window.location.href);
// console.log(url.pathname);
// TODO: change this to work for any canvas page?
if (!!document.getElementById("schedule")) {
  console.log("Running canvas today")
  var table = $('#schedule table');
  matchingElement = iterateDate(table)
  console.log(match)


  // // 1. Get current datetime
  // dateCheck = new Date();
  // datestr = formatDate(dateCheck)

  // // Look for nearest (or next) datetime in page content
  // // TODO: should maxDaysToAdd be changed?
  // daysAdded = 0
  // maxDaysToAdd = 7
  // console.log("Searching for: " + datestr)
  // dateFound = textInElement(schedule, datestr);
  // while (!dateFound && daysAdded <= maxDaysToAdd) {
  //     dateCheck = dateCheck.addDays(1)
  //     datestr = formatDate(dateCheck)
  //     daysAdded++
  //     //console.log("Searching for: " + datestr)
  //     dateFound = textInElement(schedule, datestr);
  // }


  // // Convert to jumping link & execute
  // if (dateFound) {
  //     // prevURL = window.location.href;
  //     // console.log(prevURL)
  //     // newURL = prevURL + "#content:~:text=" + encodeURIComponent(datestr);
  //     // window.location.replace(newURL);
  //   //setTimeout(()=> {
  //   //$(document).ready(function() {
  //   docReady(function() {
  //       // DOM is loaded and ready for manipulation here
  //     console.log('DOM ready')
  //     console.log("Scrolling")
  //     var xpath = "//td[contains(text(), '" + datestr + "')]";
  //     console.log(xpath)
  //     var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  //     console.log(matchingElement)
  //     // matchingElement.scrollIntoView({behavior: 'smooth', block: 'center'});
  //     // matchingElement.focus({preventScroll: true});
  //     //matchingElement.scrollIntoView()
    $([document.documentElement, document.body]).animate({
        scrollTop: $(matchingElement).offset().top
    }, 500);

      // matchingElement.parentElement.style['background'] = '#FFDD3C'
      matchingElement.style['background'] = '#FFDD3C'
    //});
  //}, 2000)
    // });
  // }
}