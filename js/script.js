window.addEventListener("load", () => {
  const tips = document.querySelector(".tip-percentage");
  const buttons = Array.from(tips.children);
  const billAmount = document.getElementById("bill-amount");
  const customTips = document.getElementById("custom-tips");
  const numberOfPeople = document.getElementById("people");
  const resetButton = document.getElementById("reset-btn");
  const tipAmount = document.getElementById("tip-amount");
  const totalAmount = document.getElementById("total-amount");
  const warning = document.getElementById("warning");

  buttons.pop();

  let bill = 0;
  let tip = 0;
  let people = 0;
  let btn_selected;

  buttons.map((button) => {
    button.addEventListener("click", (el) => {
      tip = el.target.value / 100;
      el.target.classList.add("selected");
      if (btn_selected) btn_selected.classList.remove("selected");
      btn_selected = el.target;
      calculation();
    });
  });

  const calculation = () => {
    bill = billAmount.value || 0;
    tip = customTips.value / 100 || tip || 0;
    people = numberOfPeople.value || 1;

    if (bill > 0) {
      resetButton.disabled = false;

      const tipPerPerson = (bill * tip) / people;
      tipAmount.innerHTML = `${tipPerPerson}`;

      const totalPerPerson = bill / people + tipPerPerson;
      totalAmount.innerHTML = `${totalPerPerson}`;
    } else {
      resetButton.disabled = true;
    }
  };

  numberOfPeople.addEventListener("input", () => {
    if (numberOfPeople.value === 0) {
      warning.classList.remove("hidden");
      numberOfPeople.classList.add("warning-outline");
    } else {
      calculation();
    }
  });

  customTips.addEventListener("input", () => {
    tip = customTips.value / 100;
    buttons.forEach((el) => {
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    });
    calculation();
  });

  resetButton.addEventListener("click", () => {
    resetButton.disabled = true;
    buttons.forEach((el) => {
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    });

    billAmount.value = "";
    customTips.value = "";
    numberOfPeople.value = "";
    tipAmount.innerHTML = "0.00";
    totalAmount.innerHTML = "0.00";
  });
});
