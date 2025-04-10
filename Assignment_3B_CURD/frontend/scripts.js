const apiUrl = 'http://localhost:5000/api/users';

function showForm(formId) {
    document.querySelectorAll('.form-container').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
    document.getElementById('response').style.display = 'none';
}

function displayResponse(data) {
    const responseDiv = document.getElementById('response');
    responseDiv.style.display = 'block';

    if (Array.isArray(data)) {
        // If the data is an array, format it as a list of users
        responseDiv.innerHTML = data.map(user => `
            <div class="user-card">
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>ID:</strong> ${user._id}</p>
            </div>
        `).join('');
    } else {
        // Otherwise, display the data as JSON
        responseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}

function createUser() {
    const userData = {
        username: document.getElementById('createUsername').value,
        password: document.getElementById('createPassword').value,
        email: document.getElementById('createEmail').value
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User created:', data);
        displayResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse({ error: 'Failed to create user' });
    });
}

function getAllUsers() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('All users:', data);
        displayResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse({ error: 'Failed to fetch users' });
    });
}

function getUserById() {
    const userId = document.getElementById('getUserId').value;
    fetch(`${apiUrl}/${userId}`)
    .then(response => response.json())
    .then(data => {
        console.log('User:', data);
        displayResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse({ error: 'Failed to fetch user' });
    });
}

function updateUserById() {
    const userId = document.getElementById('updateUserId').value;
    const updatedData = {
        username: document.getElementById('updateUsername').value,
        password: document.getElementById('updatePassword').value,
        email: document.getElementById('updateEmail').value
    };

    fetch(`${apiUrl}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User updated:', data);
        displayResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse({ error: 'Failed to update user' });
    });
}

function deleteUserById() {
    const userId = document.getElementById('deleteUserId').value;
    fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('User deleted:', data);
        displayResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse({ error: 'Failed to delete user' });
    });
}