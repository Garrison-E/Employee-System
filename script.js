// Shared employee list (saved in localStorage for persistence)
const employees = JSON.parse(localStorage.getItem("employees")) || [];

// For Employee Manager Page
const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");

if (employeeForm) {
    employeeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const code = document.getElementById("code").value.trim();

        // Validate inputs
        if (!name || code.length !== 4 || isNaN(code)) {
            alert("Please enter a valid name and a 4-digit code.");
            return;
        }

        // Check if the code is already in use
        const codeExists = employees.some(employee => employee.code === code);
        if (codeExists) {
            alert("This code is already in use. Please choose another.");
            return;
        }

        // Add employee to the list
        employees.push({ name, code });
        localStorage.setItem("employees", JSON.stringify(employees)); // Save to localStorage
        updateEmployeeTable();

        // Clear the form
        employeeForm.reset();
    });

    function updateEmployeeTable() {
        employeeTableBody.innerHTML = "";

        employees.forEach((employee, index) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = employee.name;

            const codeCell = document.createElement("td");
            codeCell.textContent = employee.code;

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
                employees.splice(index, 1); // Remove the employee from the list
                localStorage.setItem("employees", JSON.stringify(employees)); // Update localStorage
                updateEmployeeTable();
            });
            actionCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(codeCell);
            row.appendChild(actionCell);

            employeeTableBody.appendChild(row);
        });
    }

    // Initial table update
    updateEmployeeTable();
}

// For Sign-In Page
const signInForm = document.getElementById("signInForm");
const signInMessage = document.getElementById("signInMessage");

if (signInForm) {
    signInForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const code = document.getElementById("signInCode").value.trim();
        const employee = employees.find(employee => employee.code === code);

        if (employee) {
            signInMessage.textContent = `Welcome, ${employee.name}! You have successfully signed in.`;
            signInMessage.style.color = "green";
        } else {
            signInMessage.textContent = "Invalid code. Please try again.";
            signInMessage.style.color = "red";
        }

        signInForm.reset();
    });
}
