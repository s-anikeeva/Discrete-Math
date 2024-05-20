
function convert(){
    const fromSystem = document.querySelector('input[name="fromSystem"]:checked').value;
    const toSystem = document.querySelector('input[name="toSystem"]:checked').value;
    const numberInput = document.getElementById('numberInput').value;
    const resultElement = document.getElementById('result');

    if (!fromSystem || !toSystem || !numberInput) {
        resultElement.textContent = 'Пожалуйста, выберите системы счисления и введите число.';
        return;
    }

    var numberFromSystem = convertFromSystem(fromSystem);
    var result = convertToSystem(toSystem, numberFromSystem);

    resultElement.textContent = `Результат: ${result}`;
}

function convertToSystem(toSystem, numberFromSystem){
    let result;
    var number = numberFromSystem;    
    const resultElement = document.getElementById('result');

    switch (toSystem) {
        case 'decimal':
            result = number.toString(10);
            break;
        case 'binary':
            result = number.toString(2);
            break;
        case 'octal':
            result = number.toString(8);
            break;
        case 'hexaDecimal':
            result = number.toString(16).toUpperCase();
            break;
        default:
            resultElement.textContent = 'Неверная целевая система счисления';
            return;
    }

    return result;
}

function convertFromSystem(fromSystem){
    const resultElement = document.getElementById('result');
    const numberInput = document.getElementById('numberInput').value;
    let number;
    try {
        switch (fromSystem) {
            case 'decimal':
                number = customParseInt(numberInput, 10);
                break;
            case 'binary':
                number = customParseInt(numberInput, 2);
                break;
            case 'octal':
                number = customParseInt(numberInput, 8);
                break;
            case 'hexaDecimal':
                number = customParseInt(numberInput, 16);
                break;
            default:
                throw new Error('Неверная система счисления');
        }
    } catch (e) {
        resultElement.textContent = 'Ошибка при разборе числа: ' + e.message;
        return;
    }

    return number;
}

function customParseInt(str, base) {
    if (typeof str !== 'string') {
        throw new TypeError('Первый аргумент должен быть строкой');
    }
    if (typeof base !== 'number' || base < 2 || base > 36) {
        throw new RangeError('Второй аргмент должен быть целым числом между 2 и 36');
    }

    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = 0;
    let isNegative = false;
    let startIndex = 0;

    // Обработка положительного или отрицательного числа
    if (str[0] === '-') {
        isNegative = true;
        startIndex = 1;
    } else if (str[0] === '+') {
        startIndex = 1;
    }

    // Обработка каждого символа
    for (let i = startIndex; i < str.length; i++) {
        const char = str[i].toUpperCase();
        const digitValue = digits.indexOf(char);
        if (digitValue === -1 || digitValue >= base) {
            return NaN; // Неверный символ нумерной системы счисления
        }
        result = result * base + digitValue;
    }

    return isNegative ? -result : result;
}