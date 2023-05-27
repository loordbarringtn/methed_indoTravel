const getData = async () => {
  const result = await fetch("/data/date.json");
  const data = await result.json();
  return data;
};

const updateDateOptions = async (element, parameter) => {
  const data = await getData();
  const defaultOption = element.options[0];

  while (element.options.length > 1) {
    element.remove(1);
  }

  element.appendChild(defaultOption);

  data.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item[parameter];
    optionElement.text = item[parameter];
    optionElement.className = "tour__option";
    element.add(optionElement);
  });
};

const updatePeopleOptions = async (selectedDate, element) => {
  const data = await getData();

  while (element.options.length > 1) {
    element.remove(1);
  }

  const arrayWeNeed = data.filter((item) => item.date === selectedDate);
  const minPeople = arrayWeNeed[0]["min-people"];
  const maxPeople = arrayWeNeed[0]["max-people"];

  for (let i = minPeople; i <= maxPeople; i++) {
    const optionElement = document.createElement("option");
    optionElement.value = i;
    optionElement.text = i;
    optionElement.className = "tour__option";
    element.add(optionElement);
  }
};

export { updateDateOptions, updatePeopleOptions, getData };
