function changeColor() {
  const heading = document.querySelector('h1');
  if (heading) {
    heading.style.color = 'red';
  }
}

function resetColor() {
  const heading = document.querySelector('h1');
  if (heading) {
    heading.style.color = '';
  }
}

function changeParagraphColor() {
  const para = document.getElementById('dark-paragraph');
  if (para) {
    para.style.color = 'green';
  }
}

function resetParagraphColor() {
  const para = document.getElementById('dark-paragraph');
  if (para) {
    para.style.color = '';
  }
}

function toggleParagraphColor() {
  const para = document.getElementById('dark-paragraph');
  if (para) {
    para.style.color = (para.style.color === 'red') ? '' : 'red';
  }
}
