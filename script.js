document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    commandInput.focus();
    commandInput.select(); 
    document.addEventListener('keydown', function(event) { // Cambié 'keypress' por 'keydown'
        if (event.key === 'Home') {
            commandInput.focus();
            commandInput.select(); 
        }
    });
});

// Detectar cuando se presiona Enter en el campo de número de cuenta en inicio.html
document.getElementById('accountInput')?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const accountNumber = event.target.value;
        if (accountNumber) {
            localStorage.setItem('accountNumber', accountNumber); // Guardamos el número de cuenta
            window.location.href = 'ariq.html'; // Redirige a ARIQ
        } else {
            console.log('Por favor, ingrese un número de cuenta');
        }
    }
});

// Verificar si el comando "ARIQ", "ARSD", "ARPH", "X", "ARTD" o "INIC" se ha ingresado en el input de comando
document.getElementById('commandInput')?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const command = event.target.value.toUpperCase();
        switch (command) {
            case 'ARIQ':
                window.location.href = 'ariq.html'; // Redirige a ARIQ
                break;
            case 'ARSD':
                window.location.href = 'arsd.html'; // Redirige a ARSD
                break;
            case 'X':
                window.location.href = 'arsd2.html'; // Redirige a ARSD2 si se ingresa X
                break;
            case 'ARTD':
                window.location.href = 'artd.html'; // Redirige a ARTD
                break;
            case 'ARPH':
                window.location.href = 'arph.html'; // Redirige a ARPH
                break;
            case 'INIC':
                window.location.href = 'index.html'; // Redirige a inicio
                break;
            default:
                console.log("Comando no reconocido");
                break;
        }
    }
});

// Comprobar si no hay focus en el campo de comando y al dar Enter redirige a ARIQ2 en ARIQ
document.addEventListener('keypress', function(event) {
    const commandInput = document.getElementById('commandInput');
    const accountInput = document.getElementById('accountInput');
    const isAriqPage = document.body.classList.contains('ariq'); // Verificamos si estamos en ARIQ

    // Si estamos en ARIQ y no hay foco en el campo de comando, redirigimos a ARIQ2
    if (event.key === 'Enter' && document.activeElement !== commandInput && document.activeElement !== accountInput && isAriqPage) {
        window.location.href = 'ariq2.html'; // Redirige a ARIQ2
    }
});

// Mostrar el número de cuenta almacenado en localStorage en ARIQ y ARPH
const accountNumber = localStorage.getItem('accountNumber');
if (accountNumber) {
    const cardNumberInput = document.getElementById('cardNumberInput');
    if (cardNumberInput) {
        cardNumberInput.value = accountNumber; // Muestra el número de cuenta en el input
    }
}

// ARPH: Mostrar los últimos 6 pagos realizados
if (document.body.classList.contains('arph')) {
    const paymentList = [
        { "date": "09/09/2024", "amount": "950$" },
        { "date": "08/09/2024", "amount": "1,120$" },
        { "date": "07/09/2024", "amount": "1,000$" },
        { "date": "06/09/2024", "amount": "1,150$" },
        { "date": "05/09/2024", "amount": "900$" },
        { "date": "04/09/2024", "amount": "1,050$" }
    ];

    const paymentListElement = document.getElementById('paymentList');
    paymentList.forEach(payment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${payment.date} - ${payment.amount}`;
        paymentListElement.appendChild(listItem);
    });
}

// ARSD3: Mostrar la fecha de corte, número de cuenta y movimientos de cuenta
if (document.body.classList.contains('arsd3')) {
    // Mostrar el número de cuenta
    const cardNumberInput = document.getElementById('cardNumberInput');
    if (cardNumberInput) {
        cardNumberInput.value = accountNumber; // Muestra el número de cuenta en el input
    }

    // Mostrar la fecha de corte almacenada
    const cutoffDate = localStorage.getItem('cutoffDate');
    if (cutoffDate) {
        const cutoffDateElement = document.getElementById('cutoffDate');
        if (cutoffDateElement) {
            cutoffDateElement.textContent = cutoffDate;
        }
    }

    // Movimientos de cuenta
    const transactions = [
        { "date": "12/10/2024", "reference": "REF12345", "amount": "$350.00", "transactionCode": "ACPT", "concept": "Compra en tienda X" },
        { "date": "13/10/2024", "reference": "REF12346", "amount": "$320.00", "transactionCode": "C850", "concept": "Compra en línea Y" },
        { "date": "14/10/2024", "reference": "REF12347", "amount": "$250.00", "transactionCode": "ACPT", "concept": "Compra en supermercado" },
        { "date": "15/10/2024", "reference": "REF12348", "amount": "$80.00", "transactionCode": "C850", "concept": "Compra en restaurante Z" },
        { "date": "16/10/2024", "reference": "REF12349", "amount": "$0.50", "transactionCode": "ACPT", "concept": "Compra en tienda W" }
    ];

    const transactionsTable = document.getElementById('transactionsTable');
    transactions.forEach(transaction => {
        const row = transactionsTable.insertRow();
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.reference}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.transactionCode}</td>
            <td>${transaction.concept}</td>
        `;
    });
}

// Redirigir a ARSD2 si se presiona Enter y no hay foco en el campo de comando, pero hay algún input con valor
document.addEventListener('keypress', function(event) {
    const commandInput = document.getElementById('commandInput');
    const input1 = document.getElementById('latestStatementInput');
    const input2 = document.getElementById('previousStatementInput');
    const input3 = document.getElementById('previous2StatementInput');

    // Si no está en el campo de comando y algún input tiene valor, redirige a ARSD2
    if (event.key === 'Enter' && document.activeElement !== commandInput &&
        ((input1 && input1.value !== "") || (input2 && input2.value !== "") || (input3 && input3.value !== ""))) {
        window.location.href = 'arsd2.html'; // Redirige a ARSD2
    }
});


// Detectar cuando se presiona Enter sin foco en el campo de comando en ARSD2
document.addEventListener('keypress', function(event) {
    const commandInput = document.getElementById('commandInput');
    const isArsd2Page = document.body.classList.contains('arsd2'); // Verificamos si estamos en ARSD2

    // Si estamos en ARSD2, no hay foco en el campo de comando y se presiona Enter
    if (event.key === 'Enter' && document.activeElement !== commandInput && isArsd2Page) {
        window.location.href = 'arsd3.html'; // Redirige a ARSD3
    }
});
