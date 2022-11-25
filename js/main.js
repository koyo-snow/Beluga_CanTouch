let loadimg = () => {
  return new Promise((resolve, reject) => {
    let msg = "Hello";
    displayBackground();
    window.onload = () => {
      resolve(msg);
    }
  })
}

loadimg().then((msg) => {
  console.log(msg + " main.js is Success.");
}).catch((e) => {
  console.log(" main.js is Failed.");
  console.error(e);
})

// ---------------------------

function displayBackground() {
  document.getElementById('background').style.display = 'block';
}