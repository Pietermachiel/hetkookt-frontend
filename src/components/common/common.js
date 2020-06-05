export function slugify(text) {
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\.+/g, "")
      .replace(/’+/g, "-")
      // .replace(/é+/g, "e")
      .replace(/'+/g, "-")
  );
}

// const unique = thearray.filter(uniq)
export function uniq(value, index, self) {
  return self.indexOf(value) === index;
}

export function vandaag(e) {
  const event = new Date();

  var theday = new Date(event);
  theday.setDate(event.getDate() + e);

  const options = {
    weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric"
  };

  const vandaag = theday.toLocaleDateString("nl-NL", options);
  return vandaag; // vandaag(0) = woensdag
}

export function dedatum(e) {
  const event = new Date();

  var theday = new Date(event);
  theday.setDate(event.getDate() + e);

  const options = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    day: "numeric",
  };

  const dedatum = theday.toLocaleDateString("nl-NL", options);
  return dedatum;
}

export function dedag(e) {
  const event = new Date();

  var theday = new Date(event);
  theday.setDate(event.getDate() + e);

  const options = {
    // weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dedag = theday.toLocaleDateString("nl-NL", options);
  return dedag; // dedag(0) = 22 april
}

export function hetjaar(e) {
  const event = new Date();

  var theday = new Date(event);
  theday.setDate(event.getDate() + e);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const hetjaar = theday.toLocaleDateString("nl-NL", options);
  return hetjaar; // hetjaar(0) = woensdag 22 april 2020
}

export const kalender = [
  { index: dedatum(0), year: hetjaar(0), day: vandaag(0), dedag: dedag(0) },
  { index: dedatum(1), year: hetjaar(1), day: vandaag(1), dedag: dedag(1) },
  { index: dedatum(2), year: hetjaar(2), day: vandaag(2), dedag: dedag(2) },
  { index: dedatum(3), year: hetjaar(3), day: vandaag(3), dedag: dedag(3) },
  { index: dedatum(4), year: hetjaar(4), day: vandaag(4), dedag: dedag(4) },
  { index: dedatum(5), year: hetjaar(5), day: vandaag(5), dedag: dedag(5) },
  { index: dedatum(6), year: hetjaar(6), day: vandaag(6), dedag: dedag(6) },
  { index: dedatum(7), year: hetjaar(7), day: vandaag(7), dedag: dedag(7) },
];

export function theweek() {
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  var today = new Date();
  var weekNumber = today.getWeek();

  return weekNumber; // Returns the week number as an integer
}
