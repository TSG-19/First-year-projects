const keys = document.querySelectorAll(".key");
const chacha = document.querySelector("#display");
const OPS = ["+", "-", "*", "/"];
let justEvaluated = false;
let opClicked = false;

function round(n, d = 10) {
    return Number(Math.round(n + "e" + d) + "e-" + d);
}

keys.forEach(btn => {
    btn.addEventListener("click", () => {
        const v = btn.dataset.key;

        if (OPS.includes(v)) {
            if (!opClicked) {
                opClicked = true;
            } else {
                return;
            }
        }

        if (justEvaluated) {
            if (!OPS.includes(v)) {
                if (v === ".") {
                    justEvaluated = false;
                } else {
                    chacha.value = "";
                    justEvaluated = false;
                }
            }
            if (OPS.includes(v)) {
                justEvaluated = false;
            }
        }

        if (!justEvaluated) {
            if (opClicked) {
                if (!OPS.includes(v)) {
                    opClicked = false;
                }
            }
            if (!opClicked) {
                if (OPS.includes(v)) {
                    opClicked = true;
                }
            }
        }

        if (v === "=") {
            justEvaluated = true;
            try {
                const result = eval(chacha.value);
                chacha.value = round(result).toString();
            } catch (error) {
                chacha.value = "ERROR";
            }
            if (parseFloat(chacha.value) === Infinity || parseFloat(chacha.value) === -Infinity || isNaN(parseFloat(chacha.value))) {
                chacha.value = "ERROR";
            }
            return;
        }

        if (v === "C") {
            chacha.value = "";
            return;
        }

        chacha.value += v;
    });
});