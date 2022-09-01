/**
 * Converts date from UTC to local time.
 * Commonly used to convert server data, as the server stores and returns all dates in UTC time.
 */
export const dateToUTC = (date) => _dateToTZ(date, true);

/**
 * Converts date from local time to UTC.
 * * NOTE: not needed as server automatically converts from local time to UTC
 */
export const dateToLocalTime = (date) => _dateToTZ(date, false);

const _dateToTZ = (date, isToUTC) => {
  let localeDate = new Date(date);
  localeDate.setMinutes(
    localeDate.getMinutes() +
      localeDate.getTimezoneOffset() * (isToUTC ? 1 : -1),
  );
  return localeDate;
};

export default {
  dateToUTC,
  dateToLocalTime,
};
