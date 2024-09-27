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
