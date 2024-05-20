document.getElementById('factorialForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const number = parseInt(document.getElementById('number').value);
    const resultElement = document.getElementById('result');

    if (isNaN(number) || number < 0) {
        resultElement.textContent = 'Введите положительное целое число.';
        return;
    }

    const factorial = calculateFactorial(number);
    resultElement.textContent = `Факториал ${number} равен ${factorial}.`;
});



function calculateFactorial(n) {
    if (n === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}