function caesarCipher(text, shift, mode) {
  return text.split('').map(char => {
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';
    if (!isUpper && !isLower) return char;
    const base = isUpper ? 65 : 97;
    let offset = char.charCodeAt(0) - base;
    if (mode === 'encrypt') {
      offset = (offset + shift) % 26;
    } else {
      offset = (offset - shift + 26) % 26;
    }
    return String.fromCharCode(base + offset);
  }).join('');
}

function updateCounts() {
  const inputText = document.getElementById('inputText').value;
  const inputCount = inputText.length;
  document.getElementById('inputCount').textContent = `${inputCount} character${inputCount === 1 ? '' : 's'}`;
}

function processText() {
  const mode = document.getElementById('mode').value;
  const shift = parseInt(document.getElementById('shift').value);
  const text = document.getElementById('inputText').value;

  if (isNaN(shift) || shift < 1 || shift > 25) {
    alert("Please enter a valid shift (1-25).");
    return;
  }

  const result = caesarCipher(text, shift, mode);
  document.getElementById('result').value = result;

  const resultCount = result.length;
  document.getElementById('resultCount').textContent = `${resultCount} character${resultCount === 1 ? '' : 's'}`;

  const copyBtn = document.getElementById('copyBtn');
  copyBtn.disabled = result.length === 0;
  copyBtn.textContent = 'Copy Result';
  copyBtn.classList.remove('copied');
}

async function copyToClipboard() {
  const resultText = document.getElementById('result').value;
  const copyBtn = document.getElementById('copyBtn');

  if (!resultText) return;

  try {
    await navigator.clipboard.writeText(resultText);
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy Result';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = resultText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy Result';
      copyBtn.classList.remove('copied');
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateCounts();
});
