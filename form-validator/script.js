class RegisterForm {
  constructor(el) {
    this.el = el;
    this.usernameEl = this.el.querySelector('#username');
    this.emailEl = this.el.querySelector('#email');
    this.passwordEl = this.el.querySelector('#password');
    this.password2El = this.el.querySelector('#password2');

    this.el.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(e) {
    e.preventDefault();

    const submitInfo = {
      username: {
        value: this.usernameEl.value,
        error: false,
      },
      email: {
        value: this.emailEl.value,
        error: false,
      },
      password: {
        value: this.passwordEl.value,
        error: false,
      },
      password2: {
        value: this.password2El.value,
        error: false,
      },
    };

    this.checkEmpty(submitInfo);
    this.checkLength(submitInfo);
    this.checkPasswordMatch(submitInfo);
    this.checkEmailFormat(submitInfo);

    this.checkInputSuccess(submitInfo);

    for (const key in submitInfo) {
      if (submitInfo[key].error) {
        return;
      }
    }

    console.log({
      username: this.usernameEl.value,
      email: this.emailEl.value,
      password: this.passwordEl.value,
      password2: this.password2El.value,
    });
  }

  checkEmpty(submit) {
    for (const key in submit) {
      if (submit.hasOwnProperty(key)) {
        if (submit[key].value.length === 0) {
          const msg = `${key} is required`;
          this.updateErrorView(msg, key);
          submit[key].error = true;
        }
      }
    }
  }

  checkLength(submit) {
    const inputMinLengthInfo = {
      username: 3,
      password: 6,
    };
    for (const key in submit) {
      if (
        submit.hasOwnProperty(key) &&
        inputMinLengthInfo.hasOwnProperty(key)
      ) {
        if (
          submit[key].value.length > 0 &&
          submit[key].value.length < inputMinLengthInfo[key]
        ) {
          const msg = `${key} must be at least ${inputMinLengthInfo[key]} characters`;
          this.updateErrorView(msg, key);
          submit[key].error = true;
        }
      }
    }
  }

  checkEmailFormat(submit) {
    if (submit.email.value.length > 0 && !validateEmail(submit.email.value)) {
      const msg = 'Email is not valid';
      this.updateErrorView(msg, 'email');
      submit.email.error = true;
    }
  }

  checkPasswordMatch(submit) {
    if (
      submit.password2.value.length > 0 &&
      submit.password.value !== submit.password2.value
    ) {
      const msg = 'password do not match';
      this.updateErrorView(msg, 'password2');
      submit.password2.error = true;
    }
  }

  checkInputSuccess(submit) {
    for (const key in submit) {
      if (submit.hasOwnProperty(key)) {
        if (!submit[key].error) {
          this.updateSuccessView(key);
        }
      }
    }
  }

  updateErrorView(msg, inputId) {
    const formControlEl = this[`${inputId}El`].parentElement;
    const errorEl = formControlEl.querySelector('small');
    errorEl.innerText = msg;
    formControlEl.classList.remove('success');
    formControlEl.classList.add('error');
  }

  updateSuccessView(inputId) {
    const formControlEl = this[`${inputId}El`].parentElement;
    const errorEl = formControlEl.querySelector('small');
    errorEl.innerText = '';
    formControlEl.classList.remove('error');
    formControlEl.classList.add('success');
  }
}

const form = document.getElementById('form');

new RegisterForm(form);

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
}
