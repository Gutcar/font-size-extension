console.log("Inicio")
document.getElementById('apply').addEventListener('click', () => {

  console.log('Acuchado')
  const multiplier = document.getElementById('multiplier').value

  if (!multiplier || isNaN(multiplier)) {
    alert('Por favor ingresa un valor numérico válido')
    return
  }

  

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: adjustFontSizes,
      args: [parseFloat(multiplier) / 100],
    })
  })
})

function adjustFontSizes(multiplier) {
  // Almacenar tamaños originales
  const elements = document.querySelectorAll('*')

  elements.forEach((element) => {
    const originalSize =
      element.dataset.originalSize || getComputedStyle(element).fontSize

    element.dataset.originalSize = originalSize

    const sizeValue = parseFloat(originalSize)
    const newSize = sizeValue * multiplier

    element.style.fontSize = `${newSize}px`
  })
}
