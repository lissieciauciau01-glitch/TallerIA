(function(){
  const num1El = document.getElementById('num1');
  const num2El = document.getElementById('num2');
  const resEl = document.getElementById('resValue');
  const ops = document.querySelectorAll('[data-op]');
  const clearBtn = document.getElementById('clear');

  function parseInputs(){
    const a = parseFloat(num1El.value);
    const b = parseFloat(num2El.value);
    return {a,b};
  }

  function showResult(text, isError){
    resEl.textContent = text;
    if(isError){
      resEl.style.color = '#c62828';
    } else {
      resEl.style.color = '';
    }
  }

  function handle(op){
    const {a,b} = parseInputs();
    if(Number.isNaN(a) || Number.isNaN(b)){
      showResult('Introduce ambos números válidos', true);
      return;
    }

    let r;
    switch(op){
      case 'add': r = a + b; break;
      case 'sub': r = a - b; break;
      case 'mul': r = a * b; break;
      case 'div':
        if(b === 0){ showResult('Error: división por 0', true); return; }
        r = a / b; break;
      default: return;
    }

    // Mostrar con hasta 10 decimales, quitando ceros finales
    const formatted = parseFloat(r.toFixed(10)).toString();
    showResult(formatted, false);
  }

  ops.forEach(btn => {
    btn.addEventListener('click', () => handle(btn.dataset.op));
  });

  clearBtn.addEventListener('click', () => {
    num1El.value = '';
    num2El.value = '';
    showResult('—', false);
    resEl.style.color = '';
  });

  // Enter en segundo input hace suma por defecto
  num2El.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') handle('add');
  });

})();