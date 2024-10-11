let members = [];

function addMember() {
    const memberName = document.getElementById('memberName').value;
    const memberEmail = document.getElementById('memberEmail').value;
    const memberAge = document.getElementById('memberAge').value;

    if (memberName === '' || memberEmail === '' || memberAge === '') {
        alert('Please fill in all fields!');
        return;
    }

    const newMember = {
        name: memberName,
        email: memberEmail,
        age: memberAge
    };

    members.push(newMember);
    renderMemberList();
    clearInputs();
}

function renderMemberList() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = ''; 

    members.forEach((member, index) => {
        memberList.innerHTML += `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.age}</td>
                <td><button onclick="editMember(${index})">Edit</button></td>
                <td><button class="delete" onclick="deleteMember(${index})">Delete</button></td>
            </tr>
        `;
    });
}

function deleteMember(index) {
    members.splice(index, 1);
    renderMemberList();
}

function editMember(index) {
    const member = members[index];
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberAge').value = member.age;

    deleteMember(index);
}

function searchMember() {
    const searchTerm = document.getElementById('searchMember').value.toLowerCase();
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm) || 
        member.email.toLowerCase().includes(searchTerm)
    );

    const memberList = document.getElementById('memberList');
    memberList.innerHTML = ''; 

    filteredMembers.forEach((member, index) => {
        memberList.innerHTML += `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.age}</td>
                <td><button onclick="editMember(${index})">Edit</button></td>
                <td><button class="delete" onclick="deleteMember(${index})">Delete</button></td>
            </tr>
        `;
    });
}

function clearInputs() {
    document.getElementById('memberName').value = '';
    document.getElementById('memberEmail').value = '';
    document.getElementById('memberAge').value = '';
}


const instructors = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" }
];

let courses = [];
let currentCourseIndex = null;

function populateInstructors() {
    const instructorSelect = document.getElementById('instructor');
    instructors.forEach(instructor => {
        const option = document.createElement('option');
        option.value = instructor.id;
        option.textContent = instructor.name;
        instructorSelect.appendChild(option);
    });
}

function handleCourseSubmit(event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const courseName = document.getElementById('courseName').value;
    const courseDescription = document.getElementById('courseDescription').value;
    const instructorId = document.getElementById('instructor').value;

    const createdAt = currentCourseIndex !== null ? courses[currentCourseIndex].createdAt : new Date().toISOString();
    const updatedAt = new Date().toISOString();

    if (!courseName || !instructorId) {
        alert("Course Name and Instructor are required!");
        return;
    }

    if (currentCourseIndex === null) {
        const newCourse = {
            id: courses.length + 1,
            name: courseName,
            description: courseDescription,
            instructor: instructorId,
            createdAt: createdAt,
            updatedAt: updatedAt
        };
        courses.push(newCourse);
    } else {
        courses[currentCourseIndex].name = courseName;
        courses[currentCourseIndex].description = courseDescription;
        courses[currentCourseIndex].instructor = instructorId;
        courses[currentCourseIndex].updatedAt = updatedAt;
    }

    renderCourseList();
    clearForm();
}

function renderCourseList() {
    const courseList = document.getElementById('courseList').getElementsByTagName('tbody')[0];
    courseList.innerHTML = '';

    courses.forEach((course, index) => {
        const row = courseList.insertRow();
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${instructors.find(instr => instr.id == course.instructor)?.name || "Unknown"}</td>
            <td>${course.createdAt}</td>
            <td>${course.updatedAt}</td>
            <td>
                <button onclick="editCourse(${index})">Edit</button>
                <button class="delete" onclick="confirmDelete(${index})">Delete</button>
            </td>
        `;
    });
}

function editCourse(index) {
    const course = courses[index];
    document.getElementById('courseId').value = course.id;
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseDescription').value = course.description;
    document.getElementById('instructor').value = course.instructor;
    document.getElementById('createdAt').innerText = course.createdAt;
    document.getElementById('updatedAt').innerText = course.updatedAt;

    currentCourseIndex = index;
}

function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this course?")) {
        courses.splice(index, 1);
        renderCourseList();
        clearForm();
    }
}

function clearForm() {
    document.getElementById('courseForm').reset();
    document.getElementById('createdAt').innerText = '--';
    document.getElementById('updatedAt').innerText = '--';
    currentCourseIndex = null;
}

function searchCourse() {
    const searchTerm = document.getElementById('searchCourse').value.toLowerCase();
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm) ||
        instructors.find(instr => instr.id == course.instructor)?.name.toLowerCase().includes(searchTerm)
    );

    const courseList = document.getElementById('courseList').getElementsByTagName('tbody')[0];
    courseList.innerHTML = '';

    filteredCourses.forEach((course, index) => {
        const row = courseList.insertRow();
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${instructors.find(instr => instr.id == course.instructor)?.name || "Unknown"}</td>
            <td>${course.createdAt}</td>
            <td>${course.updatedAt}</td>
            <td>
                <button onclick="editCourse(${index})">Edit</button>
                <button class="delete" onclick="confirmDelete(${index})">Delete</button>
            </td>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateInstructors();
});


const exercises = [
    { title: "Exercise 1", description: "Description of Exercise 1", language: "C", difficulty: "Easy", completed: false },
    { title: "Exercise 2", description: "Description of Exercise 2", language: "Python", difficulty: "Medium", completed: true },
    { title: "Exercise 3", description: "Description of Exercise 3", language: "Java", difficulty: "Hard", completed: false },
];

let currentUser = null;

function authenticate(event) {
    event.preventDefault();
    currentUser = document.getElementById('username').value;
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    renderExercises();
}

function renderExercises() {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';

    exercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.innerHTML = `
            <h3>${exercise.title} (${exercise.language})</h3>
            <p>${exercise.description}</p>
            <button onclick="selectExercise(${index})">Select Exercise</button>
        `;
        exerciseList.appendChild(exerciseItem);
    });
}

function filterExercises() {
    const languageFilter = document.getElementById('language-filter').value;
    const filteredExercises = exercises.filter(exercise => {
        return languageFilter === '' || exercise.language === languageFilter;
    });
    renderFilteredExercises(filteredExercises);
}

function renderFilteredExercises(filteredExercises) {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';

    filteredExercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.innerHTML = `
            <h3>${exercise.title} (${exercise.language})</h3>
            <p>${exercise.description}</p>
            <button onclick="selectExercise(${index})">Select Exercise</button>
        `;
        exerciseList.appendChild(exerciseItem);
    });
}

function searchExercises() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const searchedExercises = exercises.filter(exercise => {
        return exercise.title.toLowerCase().includes(searchTerm) || 
               exercise.description.toLowerCase().includes(searchTerm);
    });
    renderFilteredExercises(searchedExercises);
}

function selectExercise(index) {
    const selectedExercise = exercises[index];
    document.getElementById('exercise-title').textContent = selectedExercise.title;
    document.getElementById('exercise-description').textContent = selectedExercise.description;
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('exercise-details').style.display = 'block';
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('language-selector').value;
    const codeEditor = document.getElementById('code');
    switch (selectedLanguage) {
        case 'C':
            codeEditor.value = '// C code template';
            break;
        case 'Python':
            codeEditor.value = '# Python code template';
            break;
        case 'Java':
            codeEditor.value = '// Java code template';
            break;
    }
}

function runCode() {
    const output = document.getElementById('output');
    output.innerHTML = '<p>Running code...</p>';
}

function clearCode() {
    document.getElementById('code').value = '';
}

function submitCode() {
    const output = document.getElementById('output');
    output.innerHTML = '<p>Code submitted successfully!</p>';
}

function backToDashboard() {
    document.getElementById('exercise-details').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}
