function searchEmployee() {
    var cpfInput = document.getElementById("cpf");
    var cpf = cpfInput.value;
fetch("arch.json")
        .then(response => response.json())
        .then(data => {
            var employeeData = findEmployeeByCPF(data, cpf);
            displayEmployeeData(employeeData);
        })
        .catch(error => {
            console.error("Error fetching JSON file:", error);
        });
}

function findEmployeeByCPF(data, cpf) {
    var employees = data.employees;

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].cpf === cpf) {
            return employees[i];
        }
    }

    return null;
}

function displayEmployeeData(employeeData) {
    var salary = employeeData.salary;
    var hourlyRate = salary / 176;  
    
    var selectedOption = document.getElementById("extraHours").value;
    
    var overtimePay = 0;
    
    
    if (selectedOption === "100") {
        var numberInput = document.getElementById("number");
        var overtime = numberInput.value;
        overtimePay = overtime * hourlyRate * 2;
    } else {
        var numberInput2 = document.getElementById("number"); 
        var overtime2 = numberInput2.value;
        overtimePay = overtime2 * (hourlyRate * 1.5);
    }


    var employeeDataDiv = document.getElementById("employeeData");
    if (employeeData) {
        employeeDataDiv.innerHTML = `
            <p><strong>Nome:</strong> ${employeeData.name}</p>
            <p><strong>Horas regulares:</strong> ${employeeData.r_hrs}</p>
            <p><strong>Salário:</strong> R$${employeeData.salary}</p>
            <p><strong>Valor por hora:</strong> R$${hourlyRate.toFixed(2)}</p>
            <p><strong>Valor horário extra:</strong> R$${overtimePay.toFixed(2)}</p>

            `;
    } else {
        employeeDataDiv.innerHTML = "<p>O funcionário não foi encontrado.</p>";
    }
}
                                                                 
function validateInput(input) {
    // remove non-numeric characters
    input.value = input.value.replace(/\D/g, '');
    //format the value with separators
    input.value = input.value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

