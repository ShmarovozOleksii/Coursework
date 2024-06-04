document.addEventListener('DOMContentLoaded', () => {
    displayData();
});

function submitForm() {
    const tag = document.getElementById('tag').value;
    const salary = document.getElementById('salary').value;
    const employer = document.getElementById('employer').value;
    const description = document.getElementById('description').value;
    const contactNumber = document.getElementById('contact_number').value;
    const loggedInUser = localStorage.getItem('loggedInUser');
    const editIndex = document.getElementById('editIndex').value;

    const jobInfo = {
        tag: tag,
        salary: salary,
        employer: employer,
        description: description,
        contactNumber: contactNumber,
        createdBy: loggedInUser
    };

    let jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];

    if (editIndex === "") {
        jobInfoList.push(jobInfo);
    } else {
        jobInfoList[editIndex] = jobInfo;
        document.getElementById('editIndex').value = "";
    }

    localStorage.setItem('jobInfoList', JSON.stringify(jobInfoList));
    displayData();
    clearForm();
}

function displayData() {
    const displayInfo = document.getElementById('displayInfo');
    displayInfo.innerHTML = '';

    const loggedInUser = localStorage.getItem('loggedInUser');
    let jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];

    jobInfoList = jobInfoList.filter(job => job.createdBy === loggedInUser);

    jobInfoList.forEach((job, index) => {
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job-box');
        jobDiv.innerHTML = `
            <h3>Offer #${index + 1}</h3>
            <p><strong>Tag:</strong> ${job.tag}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Employer:</strong> ${job.employer}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Contact Number:</strong> ${job.contactNumber}</p>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-job');
        removeButton.onclick = () => removeJob(index);
        jobDiv.appendChild(removeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-job');
        editButton.onclick = () => editJob(index);
        jobDiv.appendChild(editButton);

        displayInfo.appendChild(jobDiv);
    });
}

function editJob(index) {
    let jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    jobInfoList = jobInfoList.filter(job => job.createdBy === loggedInUser);

    const job = jobInfoList[index];

    document.getElementById('tag').value = job.tag;
    document.getElementById('salary').value = job.salary;
    document.getElementById('employer').value = job.employer;
    document.getElementById('description').value = job.description;
    document.getElementById('contact_number').value = job.contactNumber;
    document.getElementById('editIndex').value = index;
}

function removeJob(index) {
    let jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    jobInfoList = jobInfoList.filter(job => job.createdBy === loggedInUser);

    jobInfoList.splice(index, 1);

    const allJobs = JSON.parse(localStorage.getItem('jobInfoList')) || [];
    const updatedAllJobs = allJobs.filter(job => job.createdBy !== loggedInUser).concat(jobInfoList);

    localStorage.setItem('jobInfoList', JSON.stringify(updatedAllJobs));
    displayData();
}

function clearForm() {
    document.getElementById('jobForm').reset();
    document.getElementById('editIndex').value = "";
}