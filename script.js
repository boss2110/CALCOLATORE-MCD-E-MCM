function calcolaMCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function calcolaMCDMultipli(numeri) {
    return numeri.reduce((mcd, num) => calcolaMCD(mcd, num));
}

function calcolaMCM(a, b) {
    return Math.abs(a * b) / calcolaMCD(a, b);
}

function calcolaMCMMultipli(numeri) {
    return numeri.reduce((mcm, num) => calcolaMCM(mcm, num));
}

function mostraErrore(messaggio) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = messaggio;
    errorDiv.classList.add('show');
    document.getElementById('results').classList.remove('show');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 3000);
}

function clearAll() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('num3').value = '';
    document.getElementById('num4').value = '';
    
    document.getElementById('results').classList.remove('show');
    document.getElementById('error').classList.remove('show');
    
    document.getElementById('mcd').textContent = '-';
    document.getElementById('mcm').textContent = '-';
    
    document.getElementById('num1').focus();
}

function calculate() {
    const inputs = [
        document.getElementById('num1'),
        document.getElementById('num2'),
        document.getElementById('num3'),
        document.getElementById('num4')
    ];

    const numeri = [];
    
    for (let input of inputs) {
        const value = input.value.trim();
        
        if (value) {
            const num = parseInt(value);
            
            if (isNaN(num)) {
                mostraErrore('⚠️ Inserisci solo numeri validi');
                return;
            }
            
            if (num <= 0) {
                mostraErrore('⚠️ I numeri devono essere maggiori di zero');
                return;
            }
            
            if (!Number.isInteger(num)) {
                mostraErrore('⚠️ Inserisci solo numeri interi');
                return;
            }
            
            numeri.push(num);
        }
    }

    if (numeri.length < 2) {
        mostraErrore('⚠️ Inserisci almeno 2 numeri');
        return;
    }

    const mcd = calcolaMCDMultipli(numeri);
    const mcm = calcolaMCMMultipli(numeri);

    document.getElementById('mcd').textContent = mcd;
    document.getElementById('mcm').textContent = mcm;
    document.getElementById('results').classList.add('show');
    document.getElementById('error').classList.remove('show');
}

const allInputs = ['num1', 'num2', 'num3', 'num4'];
allInputs.forEach(id => {
    document.getElementById(id).addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});
