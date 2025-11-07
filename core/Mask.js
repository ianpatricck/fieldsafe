class Mask {
  constructor(formElement = null) {
    this.formStatus = [];

    if (formElement) {
      if (typeof formElement !== "object")
        throw new Error("form element on constructor is not a object");

      this.#parseMasksToForm(formElement);
    }
  }

  #parseMasksToForm(form) {
    for (let input of form) {
      if (input.getAttribute("fs-mask"))
        this.#adjustMaskToInput(input, input.getAttribute("fs-mask"));
    }
  }

  #adjustMaskToInput(input, mask) {
    input.maxLength = mask.length;
    input.addEventListener("keyup", (e) => {
      if (input.value.trim() !== "" && e.code !== "Backspace") {
        let maskSplit = mask.split("");
        let inputSplit = input.value.split("");

        inputSplit = inputSplit.filter((element) => {
          if (!maskSplit.includes(element) && element.trim() !== "") {
            return element;
          }
        });

        let textMasked = [];

        maskSplit.forEach((elemMask) => {
          if (elemMask !== "#") {
            textMasked.push(elemMask);
          } else {
            const findFirst = inputSplit.find((element) => element);

            inputSplit.shift();
            textMasked.push(findFirst);
          }
        });

        input.value = textMasked.join("");
      }
    });
  }

  fmatch(input, match, options) {
    if (!input) throw new Error("input param is not defined");

    if (!match) throw new Error("match param is not defined");

    let { success, failure, response } = options;

    if (!success || !failure || !response)
      throw new Error("success, failure or response fields are undefined");

    try {
      input.addEventListener("keyup", (event) => {
        if (input.value.trim() !== "") {
          if (typeof match === "string") {
            if (REGEX[match].test(input.value)) {
              let newStatus = {
                name: input.name,
                success: true,
                message: failure,
              };

              this.formStatus = this.formStatus.filter(
                (status) => status.name !== newStatus.name,
              );
              this.formStatus.push(newStatus);

              if (typeof response === "string")
                document.querySelector(response).innerText = success;
            } else {
              let newStatus = {
                name: input.name,
                success: false,
                message: failure,
              };

              this.formStatus = this.formStatus.filter(
                (status) => status.name !== newStatus.name,
              );
              this.formStatus.push(newStatus);

              if (typeof response === "string")
                document.querySelector(response).innerText = failure;
            }
          }
        } else {
          document.querySelector(response).innerText = "";
        }
      });

      return this;
    } catch (err) {
      throw new Error(`input param is not valid: ${typeof input}`);
    }
  }

  validate(fn = null) {
    if (fn) fn(this.formStatus);
    else return this.formStatus;
  }
}

export default Mask;
