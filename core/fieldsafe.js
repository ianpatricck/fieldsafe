/*
 * FieldSafe Main Script
 * @author: Ian Patrick
 *
 */

class Sanitization {
  // ...
}

class Validation {

  SPECIAL_CHARS_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  CEP_REGEX = /^\d{5}\-\d{3}$/;

  /**
   * Returns true if email format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  email(email) {
    return email.match(this.EMAIL_REGEX) !== null ? true : false;
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
        const regex = this.SPECIAL_CHARS_REGEX;
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

        const special_chars = this.SPECIAL_CHARS_REGEX;
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

        const special_chars = this.SPECIAL_CHARS_REGEX;
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
    return this.CPF_REGEX.test(cpf);
  }

  /**
   * Returns true if CNPJ format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  cnpj(cnpj) {
    return this.CNPJ_REGEX.test(cnpj);
  }

  /**
   * Returns true if CEP format is valid
   *
   * @param {string}
   * @return {boolean}
   *
   */

  cep(cep) {
    return this.CEP_REGEX.test(cep);
  }

}

