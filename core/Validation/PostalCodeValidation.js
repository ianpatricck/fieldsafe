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

export default PostalCodeValidation;
