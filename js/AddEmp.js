window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {

    const headerHtml = "<tr><th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData._profilePic}">
                </td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHtml(empPayrollData._department)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img id="1" onclick="remove(this)" alt="delete" src="/assests/icons/delete-black-18dp.svg">
                    <img id="1" alt="edit" onclick="update(this)" src="/assests/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '/assests/profile-images/Ellipse -3.png'
        },
        {
            _name: 'Aishwariya Arora',
            _gender: 'Female',
            _department: [
                'Sales'
            ],
            _salary: '300000',
            _startDate: '1 jan 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '/assests/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}