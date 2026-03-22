//-> Format the date of the post created in
//-> if time is less than a week ago, show in format(3 hours ago)

export default function dateConverter(datePosted) {
  //-> finding the difference and then convert to seconds
  const timeDifference = Math.round((Date.now() - datePosted) / 1000);

  if (timeDifference < 60) {
    //conveting to seconds
    return Math.round(timeDifference) + " Seconds ago";
  }

  if (timeDifference > 60 && timeDifference < 3600) {
    //conveting to minutes
    return Math.round(timeDifference / 60) + " Minutes ago";
  }

  //converting to hours
  if (timeDifference > 3600 && timeDifference < 86400) {
    return Math.round(timeDifference / 3600) + " Hours ago";
  }

  //converting to days
  if (timeDifference > 86400 && timeDifference < 604800) {
    return Math.round(timeDifference / 86400) + " Days ago";
  }

  //converting to weeks
  if (timeDifference > 604800 && timeDifference < 2419200) {
    return Math.round(timeDifference / 604800) + " Weeks ago";
  }

  //returning the date posted if time difference is greater than a month
  if (timeDifference >= 2419200) {
    return new Date(datePosted).toLocaleString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }
}

// 1659960884562 ---posted
// console.log(Date.now());

// 1660663376869
