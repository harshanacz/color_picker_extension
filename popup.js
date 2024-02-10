document.getElementById('colorPicker').addEventListener('input', function() {
  let color = this.value;
  document.getElementById('colorBox').style.backgroundColor = color;
  document.getElementById('hexValue').textContent = color;
  let rgb = getRgbColor(color);
  document.getElementById('rgbValue').textContent = rgb;
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setColor,
    args: [color]
  });
}, false);

document.getElementById('copyRgb').addEventListener('click', function() {
  copyToClipboard(document.getElementById('rgbValue').textContent);
}, false);

document.getElementById('copyHex').addEventListener('click', function() {
  copyToClipboard(document.getElementById('hexValue').textContent);
}, false);

function setColor(color) {
  document.body.style.backgroundColor = color;
}

function getRgbColor(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Copied to clipboard');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}