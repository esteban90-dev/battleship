const Display = function() {
  const startButton = document.querySelector('#start');

  function handleStart(handler) {
    startButton.addEventListener('click', handler);
  }

  return { handleStart }
}

export default Display;