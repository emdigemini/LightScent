export function toggleCreateAccount(createAccBox, closeBtn){
  createAccBox.classList.add('active');
  closeBtn.addEventListener('click', () => {
    createAccBox.classList.add('remove');
    createAccBox.addEventListener('animationend', () => {
      createAccBox.classList.remove('active');
      createAccBox.classList.remove('remove');
    }, { once: true });
  });
}

export function toggleSignin(signinBox, closeSignin){
  signinBox.classList.add('active');
  closeSignin.addEventListener('click', () => {
    signinBox.classList.add('remove');
    signinBox.addEventListener('animationend', () => {
      signinBox.classList.remove('active');
      signinBox.classList.remove('remove');
    }, {once: true});
  })
}
