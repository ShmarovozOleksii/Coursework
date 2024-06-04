document.addEventListener('DOMContentLoaded', () => {
    displayData();
});

function displayData(jobInfoList = null) {
    const displayInfo = document.getElementById('displayInfo');
    displayInfo.innerHTML = '';

    if (!jobInfoList) {
        jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];
    }

    jobInfoList.forEach((job, index) => {
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job-box');
        jobDiv.innerHTML = `
            <h3>Position #${index + 1}</h3>
            <p><strong>Tag:</strong> ${job.tag}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Employer:</strong> ${job.employer}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Contact Number:</strong> ${job.contactNumber}</p>
        `;
        displayInfo.appendChild(jobDiv);
    });
}

function searchJobs() {
    const tagInput = document.getElementById('tagInput').value.toLowerCase();
    const salaryInput = parseInt(document.getElementById('salaryInput').value, 10);
    const jobInfoList = JSON.parse(localStorage.getItem('jobInfoList')) || [];

    const filteredJobs = jobInfoList.filter(job => {
        const matchesTag = job.tag.toLowerCase().includes(tagInput);
        const matchesSalary = !isNaN(salaryInput) ? job.salary >= salaryInput : true;
        return matchesTag && matchesSalary;
    });

    displayData(filteredJobs);
}