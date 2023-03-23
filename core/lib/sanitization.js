const REGEX = require('./regex');

class Sanitization {

  /**
   * Add backslash when contains quote, backslash, apostrophe.
   *
   * |"|'|\|`|
   *
   * @param {string}
   * @return {string}
   *
   */

  add_slashes(text) {    
    return text.split('').map(char => {
      if (/'|"|\\|`|´$/.test(char))
        char = '\\' + char;
      return char;
    }).join('');
  }

  /**
   * Add backslash when contains special chars
   *
   * @param {string}
   * @return {string}
   *
   */

  escape_special_chars(string) {
    return string.split('').map(char => {
      if (REGEX.SPECIAL_CHARS.test(char))
        char = '\\' + char;
      return char;
    }).join('');
  } 

  /**
   * Remove all numeric characters
   *
   * @param {string}
   * @return {string}
   *
   */

  remove_numeric(text) {
    return text.split('').map(char => {
      if (Number(char) || char == 0)
        char = '';
      return char;
    }).join(''); 
  }

  /**
   * Remove all special chars
   *
   * @param {sring}
   * @return {string}
   *
   */

  remove_special_chars(text) {
    return text.split('').map(char => {
      if (REGEX.SPECIAL_CHARS.test(char))
        char = '';
      return char;
    }).join('');
  } 
}

module.exports = Sanitization;
