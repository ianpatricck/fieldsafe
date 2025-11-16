class IdentificationNumberValidation {
  /**
   * Brazilian identification number
   * Returns 'true' if CPF (Cadastro de Pessoas Físicas) format is valid.
   *
   * Example: 000.000.000-00
   *
   * @param {string} cpf
   * @return {boolean}
   */
  static cpf(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }

  /**
   * Returns 'true' if CNPJ (Cadastro Nacional da Pessoa Jurídica) format is valid.
   *
   * Example: 00.623.904/0001-73
   *
   * @param {string} cnpj
   * @return {boolean}
   *
   */
  static cnpj(cnpj) {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(cnpj);
  }
}

class PhoneNumberValidation {
  /**
   * Returns true if the brazilian phone number format is valid.
   *
   * Examples:
   * [+] +55 (12) 91234-5678
   * [+] (11) 91234-5678.
   *
   * @param {string} brazilPhoneNumber
   * @return {boolean}
   */
  static brazil(brazilPhoneNumber) {
    const phoneNumberDefaultRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    const phoneNumberCompleteRegex = /^\+55\s?\(\d{2}\)\s9\d{4}-\d{4}$/;

    const cases = [
      phoneNumberDefaultRegex.test(brazilPhoneNumber),
      phoneNumberCompleteRegex.test(brazilPhoneNumber),
    ];

    return cases.includes(true);
  }

  /**
   * Returns true if the USA phone number format is valid.
   * Following NANP (North American Numbering Plan) rules.
   *
   * Examples:
   * [+] +1 (212) 555-7890
   * [+] 1 646 321 9876
   *
   * @param {string} unitedStatesPhoneNumber
   * @return {boolean}
   */
  static usa(unitedStatesPhoneNumber) {
    return /^(?:\+1\s?|1\s?)?\(?[2-9]\d{2}\)?[\s.-]?[2-9]\d{2}[\s.-]?\d{4}$/.test(
      unitedStatesPhoneNumber,
    );
  }
}

class CreditCardValidation {
  /**
   * It returns 'true' if it's a valid MasterCard credit card format.
   *
   * @param {string} mastercardCreditCard
   * @return {boolean}
   */
  static mastercard(mastercardCreditCard) {
    const mastercardRegex =
      /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/;
    return mastercardRegex.test(mastercardCreditCard);
  }

  /**
   * It returns 'true' if it's a valid Visa credit card format.
   *
   * @param {string} visaCreditCard
   * @return {boolean}
   */
  static visa(visaCreditCard) {
    return /^4[0-9]{15}$/.test(visaCreditCard);
  }

  /**
   * It returns 'true' if it's a valid American Expresss credit card format.
   *
   * @param {string} americanExpressCreditCard
   * @return {boolean}
   */
  static american_express(americanExpressCreditCard) {
    return /^3[47][0-9]{13}$/.test(americanExpressCreditCard);
  }

  /**
   * It returns 'true' if it's a valid ELO credit card format.
   *
   * @param {string} eloCreditCard
   * @return {boolean}
   */
  static elo(eloCreditCard) {
    const eloRegex =
      /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/;
    return eloRegex.test(eloCreditCard);
  }

  /**
   * It returns 'true' if it's a valid HiperCard credit card format.
   *
   * @param {string} hiperCardCreditCard
   * @return {boolean}
   */
  static hiper_card(hiperCardCreditCard) {
    return /^606282|^3841(?:[0|4|6]{1})0/.test(hiperCardCreditCard);
  }
}

class PostalCodeValidation {
  /**
   * Returns 'true' if the brazilian postal code (CEP) format is valid.
   *
   * Valid format: 00000-000
   *
   * @param {string} cep
   * @return {boolean}
   */
  static cep(cep) {
    return /^\d{5}\-\d{3}$/.test(cep);
  }

  /**
   * Returns 'true' if the zipcode format is valid.
   *
   * Example: "90210"
   *
   * @param {string} zipcode
   * @return {boolean}
   */
  static zipcode(zipcode) {
    return /^\d{5}(?:[-\s]\d{4})?$/.test(zipcode);
  }

  /**
   * Returns 'true' if the canada postal code format is valid.
   *
   * Example: "M5V 3L9"
   *
   * @param {string} postalcode
   * @return {boolean}
   */
  static postal_code_canada(postalcode) {
    return /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/.test(postalcode);
  }
}

class PasswordValidation {
  /**
   * constructor can set a password.
   *
   * @param {string|null} password
   */
  constructor(password = null) {
    this.password = password ? password : null;
    this.errs = { errs: false, messages: [] };
  }

  /**
   * add password content
   *
   * @param {string} password
   * @returns {this}
   */
  addPassword(password) {
    this.password = password;
    return this;
  }

  /**
   * add a mininum password size.
   * @param {number} value
   * @param {string|null} errMessage
   * @returns {this}
   */
  min(value, errMessage = null) {
    if (this.password.length < value) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * add a miximum password size.
   * @param {number} value
   * @param {string|null} errMessage
   * @returns {this}
   */
  max(value, errMessage = null) {
    if (this.password.length > value) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * Requires at least one numeric character on password
   *
   * @param {number} howMany
   * @param {string|null} errMessage
   * @returns {this}
   */
  mustContainDigits(howMany = 1, errMessage = null) {
    const containsNumericRegex = new RegExp(`[0-9]{${howMany}}`);
    if (!containsNumericRegex.test(this.password)) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * Requires at least one special character on password.
   *
   * @param {number} howMany
   * @param {string|null} errMessage
   * @returns {this}
   */
  mustContainSpecialChars(howMany = 1, errMessage = null) {
    const specialCharsRegex = new RegExp(
      `([^a-zA-Z0-9]{${howMany}}|[^a-zA-Z0-9].{${howMany}})`,
    );
    if (!specialCharsRegex.test(this.password)) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * Requires at least one uppercase character on password.
   *
   * @param {number} howMany
   * @param {string|null} errMessage
   * @returns {this}
   */
  mustContainUppercase(howMany = 1, errMessage = null) {
    const checkUppercaseRegex = new RegExp(`[A-Z]{${howMany}}`);
    if (!checkUppercaseRegex.test(this.password)) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * Requires at least one lowercase character on password.
   *
   * @param {number} howMany
   * @param {string|null} errMessage
   * @returns {this}
   */
  mustContainLowercase(howMany = 1, errMessage = null) {
    const checkUppercaseRegex = new RegExp(`[a-z]{${howMany}}`);
    if (!checkUppercaseRegex.test(this.password)) {
      this.errs.errs = true;
      errMessage ? this.errs.messages.push(errMessage) : null;
    }

    return this;
  }

  /**
   * Check if the password is valid.
   * @return {boolean}
   */
  check() {
    return this.errs.errs ? this.errs : true;
  }
}

class Mask {
  /**
   * Mask constructor to validate and replace input masks.
   *
   * @param {array} inputList
   *
   */
  constructor(inputList) {
    inputList.forEach((input) => {
      const inputMask = input.getAttribute("fs-mask");

      input.addEventListener("input", (event) => {
        event.target.value = this.#accepted(event.target.value);

        const value = event.target.value;
        let maskedValue = this.#replaceValues(value, inputMask);

        if (maskedValue.length == inputMask.length) {
          event.target.value = maskedValue;
        }

        maskedValue = value.length == 0 ? "" : maskedValue;
      });
    });
  }

  /**
   * Filter only numbers
   *
   * @param {string} targetValue
   * @return {string}
   */
  #accepted(targetValue) {
    return targetValue.replace(/[^0-9]/g, "");
  }

  /**
   * Transform every single '#' in the mask to a number value.
   *
   * @param {string} value
   * @param {string} inputMask
   * @return {string}
   *
   */
  #replaceValues(value, inputMask) {
    let valueCounter = 0;
    let maskedValue = inputMask.replace(/(#|A)/g, function () {
      let valueArr = value.split("");
      return valueArr[valueCounter++] || "";
    });

    return maskedValue;
  }
}

/**
 * Returns 'true' if email format is valid.
 * This validation is following RFC 5322 standards.
 *
 * @param {string} email
 * @return {boolean}
 *
 */
function email(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export { CreditCardValidation, IdentificationNumberValidation, Mask, PasswordValidation, PhoneNumberValidation, PostalCodeValidation, email };
