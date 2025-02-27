document.addEventListener("DOMContentLoaded", () => {
    // Get references to the elements
    const screen = document.querySelector("#screen");
    const buttons = document.querySelectorAll(".btn");
    let screenContent = "";

    const calculate = (expression) => {
        try {
            return Function(`'use strict'; return (${expression})`)();
        } catch {
            return "Error";
        }
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;

            if (value === "clear") {
                screenContent = "";
                screen.value = screenContent;
                return;
            }

            if (value === "equal") {
                screenContent = calculate(screenContent).toString();
                screen.value = screenContent;
                return;
            }

            screenContent += value;
            screen.value = screenContent;
        });
    });
    document.addEventListener("keydown", (event) => {
        const validKeys = "0123456789+-*/.()";
        const key = event.key;

        if (key === "Escape") {
            screenContent = "";
            screen.value = screenContent;
            return;
        }
        if (key === "Enter" || key === "=") {
            screenContent = calculate(screenContent).toString();
            screen.value = screenContent;
            return;
        }
        if (validKeys.includes(key)) {
            screenContent += key;
            screen.value = screenContent;
        }
    });
});