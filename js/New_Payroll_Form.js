let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateDate();
    validatename();
    SalaryScrollBar();
    checkForUpdate();

});
function SalaryScrollBar() {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
}
function validatename() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
}

function validateDate() {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');

    day.addEventListener('input', checkdate)
    month.addEventListener('input', checkdate)
    year.addEventListener('input', checkdate)

}

function checkdate() {
    const dateError = document.querySelector('.date-error');
    try {
        let date = day.value + "" + month.value + "" + year.value;
        checkStartDate(date);
        dateError.textContent = "";
    }
    catch (e) {
        dateError.textContent = e;
    }
}
checkStartDate = (date) => {
    let curruntDate = new Date();
    let startDate = new Date(date);
    if (startDate > curruntDate)
        throw "Start Date iS future Date";
    const diff = Math.abs(curruntDate.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
        throw "Start Date is beyond 30 Days";
}

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
        alert("added sucessfully");
    } catch (e) {
        return;
    }
}
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    // alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayroll();
    employeePayrollData.id = createNewEmpId();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    // alert(date);
    employeePayrollData.startDate = date;
    //  alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj.department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date =employeePayrollObj._startDate.split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
          if(value.includes(item.value)){
            item.checked = true;
          } 
        }else if(item.value === value)
        item.checked = true;
    });
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]'); unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('.salary-output','400000') 
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue); allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id); element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;  
}

const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

const createNewEmpId = () => {
    let empId = localStorage.getItem('EmpId');
    empId = !empId ? 1 : (parseInt(empId) + 1);
    localStorage.setItem('EmpId', empId);
    return empId;
}
