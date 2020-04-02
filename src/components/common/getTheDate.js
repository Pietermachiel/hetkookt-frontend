export function getthedate(thedate) {
  const event = new Date(thedate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const today = event.toLocaleDateString("nl-NL", options);

  return today;
}
