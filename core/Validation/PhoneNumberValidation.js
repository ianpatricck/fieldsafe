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

export default PhoneNumberValidation;
