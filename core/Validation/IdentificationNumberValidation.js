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

export default IdentificationNumberValidation;
