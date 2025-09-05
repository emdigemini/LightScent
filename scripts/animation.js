
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
