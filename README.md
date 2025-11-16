# FieldSafe
## 🔒 Security and reliability of the data in your form.

- A general-purpose library when it comes to data validation.
- This package allows you to easily validate a wide range of existing data formats.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjM4NmJhNjgyN2UwODZmNGYxMzg5MjMzNmVmZDZhMjJmMGFiZmExOCZjdD1n/BCynwkFZDX85SsXSuR/giphy.gif">

## Install

__NPM__
```bash
$ npm install fieldsafe
```
```js
import { email } from "fieldsafe";

const isEmail = email("marco@fieldsafe.com");
console.log(isEmail); // true
```

or:

__CDN__
```html
<script src="https://unpkg.com/fieldsafe@1.0.3/index.js"></script>
```
```html
<script type="module">
const { email } = FieldSafe;

const isEmail = email("marco@fieldsafe.com");
console.log(isEmail); // true
</script>
```

When attempting to validate data using the API's internal methods, it's important to keep in mind that not all functions are located within the validation classes, such as ```email```. The function for validating the email format is not located in any validation class, only in a utilities file.

## Validation

- Credit card
- Identification number
- Password
- Phone
- Postal code
- Email

### 💳 Credit card

Support is provided for validating different types of credit cards, they are all included in the ```CreditCardValidation``` class.

```js
import { CreditCardValidation } from "fieldsafe";

const isValid = CreditCardValidation.mastercard("5432123456789012");
console.log(isValid); // true
```

Available methods:

- ```CreditCardValidation.mastercard```
- ```CreditCardValidation.visa```
- ```CreditCardValidation.american_express```
- ```CreditCardValidation.elo```
- ```CreditCardValidation.hiper_card```

### 📱 Phone

Mobile phone number validation is defined in the ```PhoneNumberValidation``` class and uses each country's name to verify the format.

```js
import { PhoneNumberValidation } from "fieldsafe";

const isBrazilianPhone = PhoneNumberValidation.brazil("+55 (12) 91234-5678");
console.log(isBrazilianPhone); // true
```

Available methods:

- ```PhoneNumberValidation.brazil```
- ```PhoneNumberValidation.usa```

### 🪪 Identification number

The identification number can be selected by the ```IdentificationNumberValidation``` class, with the method names being the data types to be validated.

```js
import { IdentificationNumberValidation } from "fieldsafe";

const isValid = IdentificationNumberValidation.cpf("213.232.345-10");
console.log(isValid); // true
```

Available methods:

- ```IdentificationNumberValidation.cpf```
- ```IdentificationNumberValidation.cnpj```

### 📫 Postal code

The postal code is found in the ```PostalCodeValidation``` class and may contain validation options for various countries.

```js
import { PostalCodeValidation } from "fieldsafe";

const isZipcode = PostalCodeValidation.zipcode("90210");
console.log(isZipcode); // true
```

Available methods:

- ```PostalCodeValidation.cep```
- ```PostalCodeValidation.zipcode```
- ```PostalCodeValidation.postal_code_canada```

### 🔑 Password

The password will be validated according to the ```PasswordValidation``` class. This contains useful methods for password manipulation.

```js
import { PasswordValidation } from "fieldsafe";

const validator = new PasswordValidation("Mystrongpass21@&");
validator
  .min(8, "Password must contain at least 8 characters")
  .mustContainDigits(1, "Password must contain at least 1 number")
  .mustContainSpecialChars(1, "Password must contain at least 1 special character")
  .mustContainUppercase(1, "Password must contain at least 1 uppercase");

console.log(validator.check()); // true
```

Available methods:

- ```addPassword()```
  - It insert the password content
  - This method can receive the clean password: ```addPassword("mypass")```
- ```min()```
  - Minimum number of characters required
  - It receives the minimum quantity and an error message as parameters.
- ```max()```
  - Maximum number of characters required
  - It receives the maximum quantity and an error message as parameters.
- ```mustContainDigits()```
  - It defines that password must contain at least one digit
  - It receives the digit quantity and an error message as parameters.
- ```mustContainSpecialChars()```
  - It requires at least one special character on password.
  - It receives the quantity and an error message as parameters.
- ```mustContainUppercase()```
  - It requires at least one uppercase character on password.
  - It receives the uppercase quantity and an error message as parameters.
- ```mustContainLowercase()```
  - Requires at least one lowercase character on password.
  - It receives the lowercase quantity and an error message as parameters.
- ```check()```
  - Check if the password is valid.

### 🎭 Masks

You can customize the fields with masks and make the user experience more intuitive.

```fs-mask``` property allow adjust the right value format inside input. Each "#" represents a number.
```html
<input type="text" name="cpf" placeholder="cpf" id="cpf" fs-mask="###.###.###-##" />
```

You can use the Mask class to initialize the input auto-formatting.

```js
import { Mask } from "fieldsafe";

new Mask(
  document.getElementById("cpf")
);
```
