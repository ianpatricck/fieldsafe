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

export default Mask;
