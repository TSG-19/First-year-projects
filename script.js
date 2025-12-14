const stroke = document.querySelectorAll(".key");
const chacha = document.querySelector("#display");
const operations = ["x", "+", "/", "-"];
let op_numbers = [];
let op_operations = [];
let current_number = "";
let justEvaluated = false;

function round(n, decimals = 10) {
    return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
}

function clearCalculator() {
    op_numbers = [];
    op_operations = [];
    current_number = "";
    chacha.value = "";
}

function evaluateExpression() {
    if (current_number === "") return;
    
    op_numbers.push(parseFloat(current_number));

    // Priority: x and /
    for (let i = 0; i < op_operations.length; i++) {
        if (op_operations[i] === "x" || op_operations[i] === "/") {
            const result = op_operations[i] === "x" 
                ? op_numbers[i] * op_numbers[i + 1]
                : op_numbers[i] / op_numbers[i + 1];
            op_numbers.splice(i, 2, round(result));
            op_operations.splice(i, 1);
            i--;
        }
    }

    // Then: + and -
    for (let i = 0; i < op_operations.length; i++) {
        const result = op_operations[i] === "+"
            ? op_numbers[i] + op_numbers[i + 1]
            : op_numbers[i] - op_numbers[i + 1];
        op_numbers.splice(i, 2, round(result));
        op_operations.splice(i, 1);
        i--;
    }

    chacha.value = op_numbers[0];
    current_number = "";
}

stroke.forEach(element => {
    element.addEventListener("click", () => {
        const value = element.dataset.key;

        if (value === "C") {
            clearCalculator();
            return;
        }

        if (justEvaluated && !operations.includes(value) && value !== "=") {
            clearCalculator();
        } else if (justEvaluated && operations.includes(value)) {
            op_numbers = [parseFloat(chacha.value)];
            justEvaluated = false;
        }

        if (!operations.includes(value) && value !== "=") {
            if (value === "." && current_number.includes(".")) return;
            current_number += value;
            chacha.value += value;
        } else if (operations.includes(value)) {
            if (current_number) {
                op_numbers.push(parseFloat(current_number));
                op_operations.push(value);
                current_number = "";
                chacha.value += value;
            }
        } else if (value === "=") {
            justEvaluated = true;
            evaluateExpression();
        }
    });
});