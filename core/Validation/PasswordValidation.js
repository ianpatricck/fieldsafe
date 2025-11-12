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

export default PasswordValidation;
