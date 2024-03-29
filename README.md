# @ FieldSafe
## Security and persistence of your app data

Library to assist in the development of security for form fields, with validation by RegEx, Sanitization and Mask in inputs.

```html
<script src="https://unpkg.com/fieldsafe@1.0.2/core/scripts/fieldsafe.min.js"></script>
```

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjM4NmJhNjgyN2UwODZmNGYxMzg5MjMzNmVmZDZhMjJmMGFiZmExOCZjdD1n/BCynwkFZDX85SsXSuR/giphy.gif">

__Initialization__

```js
const validator = new Validation();
const isEmail = validator.email('guest@test.com');

console.log(isEmail) // true
```

Other concepts and examples will be discussed in this project's Wiki.
