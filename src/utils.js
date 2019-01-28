/**
 * @return {string}
 */
function DateObjectToTimeString(dateObject) {
  if (typeof dateObject !== "object") {
    return dateObject;
  }
  let hour = dateObject.getHours();
  let minutes = dateObject.getMinutes();
  hour = hour > 9 ? hour.toString() : "0" + hour.toString();
  minutes = minutes > 9 ? minutes.toString() : "0" + minutes.toString();
  return hour + ":" + minutes;
}
function TimeStringToDateObject(timeString) {
  return new Date("0001-01-01T" + timeString);
}
/**
 * @return {string}
 */
function ObjectToString(json) {
  if (typeof (json) === "object") {
    return JSON.stringify(json);
  }
  else throw new Error("json is not Object");
}
function StringToObject(str) {
  if (typeof (str) === "string") {
    return JSON.parse(str);
  }
  else throw new Error("str is not String");
}

export {
  DateObjectToTimeString,
  TimeStringToDateObject,
  ObjectToString,
  StringToObject
}
