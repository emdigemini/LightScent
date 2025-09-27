const userAccount = JSON.parse(localStorage.getItem('userAccount')) || [];


const createAccForm = document.getElementById('create-acc-form');
const pwField = document.getElementById('password');
const cpwField = document.getElementById('confirm-password');
const pwErrorMsg = document.getElementById('pw-error-message');
const cpwErrorMsg = document.getElementById('error-message');

function validateForms(){
  let error = false;
  let success = false;
  pwField.addEventListener('input', () => {
    if(pwField.value === ''){
      pwField.classList.remove('error');
      pwField.classList.remove('success');
      pwErrorMsg.style.display = 'none';
      error = false;
      return;
    }
    if(pwField.value.length < 8) {
      pwField.classList.add('error');
      pwField.classList.remove('success');
      pwErrorMsg.textContent = 'Password must be at least 8 characters long.';
      pwErrorMsg.style.display = 'flex';
      error = true;
    } else if(/^[a-zA-Z]+$/.test(pwField.value) || /^[0-9]+$/.test(pwField.value)) {
      pwField.classList.add('error');
      pwField.classList.remove('success');
      pwErrorMsg.textContent = 'Weak password. Use a mix of letters and numbers.';
      pwErrorMsg.style.display = 'flex';
      error = true;
    } else{
      pwField.classList.remove('error');
      pwField.classList.add('success');
      pwErrorMsg.style.display = 'none';
      error = false;
    }
  })

  cpwField.addEventListener('input', () => {
    if(cpwField.value === ''){
      cpwField.classList.remove('error');
      cpwField.classList.remove('success');
      cpwErrorMsg.style.display = 'none';
      pwField.classList.remove('success');
      pwField.classList.remove('error');
      error = false;
      return;
    }
    if(cpwField.value.length > 4 && cpwField.value !== pwField.value){
      pwField.classList.remove('success');
      cpwField.classList.remove('success');
      cpwField.classList.add('error');
      cpwErrorMsg.style.display = 'flex'
      pwField.classList.add('error');
    }else if(cpwField.value === pwField.value && pwField.value !== '' && !error){
      cpwField.classList.remove('error');
      pwField.classList.add('success');
      cpwField.classList.add('success');
      cpwErrorMsg.style.display = 'none'
      error = false;
      success = true;
      signUpForm();
    }
  })
}

function signUpForm(){
  createAccForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(error) return;
      const formData = new FormData(createAccForm);

      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      userAccount.push({
        firstName, lastName, email,
        phone, password
      })
      saveToStorage();
  });
}
console.log(userAccount);

function saveToStorage(){
  localStorage.getItem('userAccount', JSON.stringify(userAccount));
}

validateForms();