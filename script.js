// Check if data already exists in localStorage
let studentDetails = JSON.parse(localStorage.getItem('students')) || [];

// Function to add student details
function addStudentDetails() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const course = document.getElementById('studentCourse').value;
    const duration = document.getElementById('courseDuration').value;
    const fee = document.getElementById('courseFee').value;
    const address = document.getElementById('studentAddress').value;
    const feeStatus = document.getElementById('studentFee').value;
    const photo = document.getElementById('studentPhoto').files[0] ? URL.createObjectURL(document.getElementById('studentPhoto').files[0]) : 'No photo uploaded';

    if (!name || !email || !phone || !address || !duration || !fee) {
        alert('Please fill all the details');
        return;
    }

    const student = {
        id: new Date().getTime(), // Unique ID for each student
        name,
        email,
        phone,
        course,
        duration,
        fee,
        address,
        feeStatus,
        photo,
        monthlyFee: {} // Object to store fee payments by month
    };

    studentDetails.push(student);
    localStorage.setItem('students', JSON.stringify(studentDetails));
    displayStudents();
    resetForm();
}

// Function to display student details
function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    studentDetails.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <h4>${student.name} - ${student.course}</h4>
            <img src="${student.photo}" alt="Student Photo">
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Phone:</strong> ${student.phone}</p>
            <p><strong>Course Duration:</strong> ${student.duration}</p>
            <p><strong>Course Fee:</strong> ?${student.fee}</p>
            <p><strong>Address:</strong> ${student.address}</p>
            <p><strong>Fee Status:</strong> ${student.feeStatus}</p>
            <div class="student-actions">
                <button class="edit" onclick="editStudent(${student.id})">Edit</button>
                <button onclick="removeStudent(${student.id})">Remove</button>
            </div>
        `;
        studentList.appendChild(studentItem);
    });
}

// Function to reset the form
function resetForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentPhone').value = '';
    document.getElementById('studentCourse').value = 'Basic Computer';
    document.getElementById('courseDuration').value = '';
    document.getElementById('courseFee').value = '';
    document.getElementById('studentAddress').value = '';
    document.getElementById('studentFee').value = 'Paid';
    document.getElementById('studentPhoto').value = '';
}

// Function to remove student
function removeStudent(studentId) {
    studentDetails = studentDetails.filter(student => student.id !== studentId);
    localStorage.setItem('students', JSON.stringify(studentDetails));
    displayStudents();
}

// Function to edit student details
function editStudent(studentId) {
    const student = studentDetails.find(student => student.id === studentId);
    if (student) {
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentCourse').value = student.course;
        document.getElementById('courseDuration').value = student.duration;
        document.getElementById('courseFee').value = student.fee;
        document.getElementById('studentAddress').value = student.address;
        document.getElementById('studentFee').value = student.feeStatus;
        document.getElementById('studentPhoto').value = student.photo;

        // Remove the student from the list and update
        removeStudent(studentId);
    }
}

// Initial display of student details
displayStudents();
