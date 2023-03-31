/*
 * FieldSafe Main Script
 * @author: Ian Patrick
 *
 */

class Mask {

  constructor(formElement = null) {

    this.formStatus = [];

    if (formElement) {

      if (typeof formElement !== 'object')
        throw new Error('form element on constructor is not a object')

      this.#parseMasksToForm(formElement);
    }

  }

  #parseMasksToForm(form) {
    for (let input of form) {
      if (input.getAttribute('fs-mask'))
        this.#adjustMaskToInput(
          input,
          input.getAttribute('fs-mask')
        ); 
    }
  }

  #adjustMaskToInput(input, mask) {

    input.maxLength = mask.length;
    input.addEventListener('keyup', (e) => {

      if (input.value.trim() !== "" && e.code !== "Backspace") {

        let maskSplit    = mask.split('');
        let inputSplit   = input.value.split('');

        inputSplit = inputSplit.filter(element => {
          if (!maskSplit.includes(element) && element.trim() !== "") {
            return element;
          }
        });

        let textMasked = [];

        maskSplit.forEach(elemMask => {

          if (elemMask !== "#") {
            textMasked.push(elemMask);
          } else {

            const findFirst = inputSplit.find(element => element)

            inputSplit.shift();
            textMasked.push(findFirst);
          }

        });

        input.value = textMasked.join('');
      }

    });  

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
  SPECIAL_CHARS:    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  EMAIL:            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  CPF:              /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ:             /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,

  ZIPCODE_BR:       /^\d{5}\-\d{3}$/,
  ZIPCODE_AR:       /^\d{4}$/,
  ZIPCODE_US:       /^\d{5}(?:[-\s]\d{4})?$/,
  ZIPCODE_CA:       /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/,

  PHONE_BR:         /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/,
  PHONE_US:         /^(\([1-9][0-9][0-9]\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
  PHONE_CA:         /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  PHONE_AR:         /(?<=\s|:)\(?(?:(0?[1-3]\d{1,2})\)?(?:\s|-)?)?((?:\d[\d-]{5}|15[\s\d-]{7})\d+)/,

  MasterCard:       /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
  Visa:             /^4[0-9]{15}$/,
  AmericanExpress:  /^3[47][0-9]{13}$/,
  ELO:              /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
  HiperCard:        /^606282|^3841(?:[0|4|6]{1})0/,

  IPV4:             /^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,
  IPV6:             /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/ 
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
    return REGEX.EMAIL.test(email);
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
   * Returns true if zip code formats are valid
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

  /**
   * Returns true if phone number formats are valid
   *
   */

  phone_br(number) {
    return REGEX.PHONE_BR.test(number); 
  }

  phone_us(number) {
    return REGEX.PHONE_US.test(number); 
  }

  phone_ca(number) {
    return REGEX.PHONE_CA.test(number); 
  }

  phone_ar(number) {
    return REGEX.PHONE_AR.test(number); 
  }

  /**
   * Returns true if phone credit cards are valid
   *
   */

  mastercard(number) {
    return REGEX.MasterCard.test(number); 
  }

  visa(number) {
    return REGEX.Visa.test(number); 
  }

  american_express(number) {
    return REGEX.AmericanExpress.test(number); 
  }

  elo(number) {
    return REGEX.ELO.test(number); 
  }

  hiper_card(number) {
    return REGEX.HiperCard.test(number); 
  }

  /**
   * Returns true if ipv4 format is valid
   *
   * @param {number}
   * @return {boolean}
   *
   */

  ipv4(number) {
    return REGEX.IPV4.test(number); 
  }

  /**
   * Returns true if ipv6 format is valid
   *
   * @param {number}
   * @return {boolean}
   *
   */

  ipv6(number) {
    return REGEX.IPV6.test(number); 
  }

}

