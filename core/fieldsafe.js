/*
 * FieldSafe Main Script
 * @author: Ian Patrick
 *
 */

class Mask {

  constructor() {
    this.formStatus = [];
  }

  fmatch(input, match, options) { 

    if (!input)
      throw new Error('input param is not defined');

    if (!match)
      throw new Error('match param is not defined');

    let { success, failure, response } = options;

    if (!success || !failure || !response)
      throw new Error('success, failure or response fields are undefined');

    try {

      input.addEventListener('keyup', (event) => {
        
        if (input.value.trim() !== "") {
          if (typeof match === 'string') {
            if (REGEX[match].test(input.value)) {

              let newStatus = {
                name: input.name,
                success: true,
                message: failure
              };

              this.formStatus = this.formStatus.filter(status => status.name !== newStatus.name) 
              this.formStatus.push(newStatus);

              if (typeof response === 'string')
                document.querySelector(response).innerText = success;

            } else {

              let newStatus = {
                name: input.name,
                success: false,
                message: failure
              };

              this.formStatus = this.formStatus.filter(status => status.name !== newStatus.name) 
              this.formStatus.push(newStatus);

              if (typeof response === 'string')
                document.querySelector(response).innerText = failure;

            }
          }
        } else {
          document.querySelector(response).innerText = '';
        }

      });

      return this;

    } catch (err) {
      throw new Error(`input param is not valid: ${typeof input}`);
    }
  }

  validate(fn = null) {
    if (fn)
      fn(this.formStatus);
    else
      return this.formStatus;
  }
}

const REGEX = {
  SPECIAL_CHARS:  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  EMAIL:          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  CPF:            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ:           /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
  ZIPCODE_BR:     /^\d{5}\-\d{3}$/,
  ZIPCODE_AR:     /^\d{4}$/,
  ZIPCODE_US:     /^\d{5}(?:[-\s]\d{4})?$/,
  ZIPCODE_CA:     /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/,
};

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

class Validation {

  /**
   * Returns true if email format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  email(email) {
    return email.match(REGEX.EMAIL) !== null ? true : false;
  }

  /**
   * Returns true if password follows the setted options
   *
   * @param {string}
   * @param {object}
   * @return {object}
   *
   */

  password(pass, options) {

    if (options && typeof options === 'object') {

      if (Object.keys(options).length === 0) { 
        throw new Error('options object is empty');
      }

      const ALLOWED_KEYS = [
        'numbers',
        'special_chars',
        'lowercase_quantity',
        'uppercase_quantity',
        'min',
        'max'
      ];

      for (let key of Object.keys(options)) {
        if (!ALLOWED_KEYS.includes(key))
          throw new Error(`key ${key} is not allowed`);
      }

      const { 
        numbers, 
        special_chars,
        lowercase_quantity,
        uppercase_quantity,
        min,
        max
      } = options;

      if (numbers && numbers === true) {
        if (!pass.match(/[0-9]/g))
          return {
            success: false,
            status: 1,
            message: 'Password must contain at least one number'
          };
      }

      if (special_chars && special_chars === true) {
        const regex = REGEX.SPECIAL_CHARS;
        if (!regex.test(pass))
          return {
            success: false,
            status: 2,
            message: 'Password must contain at least one special character'
          };
      }

      if (lowercase_quantity && !isNaN(lowercase_quantity)) {

        if (typeof lowercase_quantity === 'boolean')
          throw new Error('lowercase_quantity must be a number');

        const special_chars = REGEX.SPECIAL_CHARS;
        let occurrences = pass.split('').map(letter => { 
          return letter == letter.toLowerCase() && isNaN(letter) && !special_chars.test(letter) ? letter : ''
        }).join('');

        if (occurrences.length < lowercase_quantity)
          return {
            success: false,
            status: 3,
            message: `The password must contain at least ${Number(lowercase_quantity)} lowercase letter`
          };
      }

      if (uppercase_quantity && !isNaN(uppercase_quantity)) {

        if (typeof uppercase_quantity === 'boolean')
          throw new Error('uppercase_quantity must be a number');

        const special_chars = REGEX.SPECIAL_CHARS;
        let occurrences = pass.split('').map(letter => { 
          return letter == letter.toUpperCase() && isNaN(letter) && !special_chars.test(letter) ? letter : '' 
        }).join('');

        if (occurrences.length < uppercase_quantity)
          return {
            success: false,
            status: 4,
            message: `The password must contain at least ${Number(uppercase_quantity)} uppercase letter`
          }
      }

      if (min && !isNaN(min)) {
        if (pass.length < min)
          return {
            success: false,
            status: 5,
            message: `Password must be at least ${min} characters long`
          };
      }

      if (max && !isNaN(max)) {
        if (pass.length > max)
          return {
            success: false,
            status: 6,
            message: `The password must have a maximum of ${max} characters`
          };
      }

    } else {
      throw new Error('options object must exist');
    }

    return true;

  }  

  /**
   * Returns true if CPF format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  cpf(cpf) {
    return REGEX.CPF.test(cpf);
  }

  /**
   * Returns true if CNPJ format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  cnpj(cnpj) {
    return REGEX.CNPJ.test(cnpj);
  }

  /**
   * Returns true if Zip Code formats are valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  zipcode_br(code) {
    return REGEX.ZIPCODE_BR.test(code); 
  }

  zipcode_ar(code) {
    return REGEX.ZIPCODE_AR.test(code); 
  }

  zipcode_us(code) {
    return REGEX.ZIPCODE_US.test(code); 
  }

  zipcode_ca(code) {
    return REGEX.ZIPCODE_CA.test(code); 
  }

}

