
// 1
document.addEventListener("DOMContentLoaded", () => {
    const bookmarkInput = document.getElementById("bookmarkInput");
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    const bookmarkList = document.getElementById("bookmarkList");
    const addBookMarkBtn = document.getElementById("addBookmarkBtn");

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    function renderBookmarks() {
        bookmarkList.innerHTML = "";
        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete"  data-index="${index}">Delete</button>
            `;
            bookmarkList.appendChild(li);
        })
    }
    addBookMarkBtn.addEventListener('click', () => {
        const url = bookmarkInput.value.trim();
        if (url) {
            bookmarks.push({url});  
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            bookmarkInput.value = '';
            renderBookmarks()
        }
    })
    bookmarkList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('delete')) {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            renderBookmarks();
        }
        if (event.target.classList.contains('edit')) {
            const newUrl = prompt('Введіть новий URL', bookmarks[index].url);
            if (newUrl) {
                bookmarks[index].url = newUrl;
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                renderBookmarks();
            }
        }
    })
    renderBookmarks();
});
// 1 end

// 2 

addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById("username"); 
    const passwordInput = document.getElementById("password");
    const saveBtn = document.getElementById("saveBtn");
    const userVerification = document.querySelector(".user-verification__status");

    let dataInfo = JSON.parse(localStorage.getItem("dataInfo")) || [];

    function formClean() {
        userNameInput.value = "";
        passwordInput.value = "";
    }

    function verification(name, password, callback) {
        let status = false;
        dataInfo.forEach(user => {
            if (user.name === name && user.password === password) {
                status = true;
            }
        });
        callback(status);
    };
    function registration(name, password) {
        let userObj = {
            name: name,
            password: password,
        }
        dataInfo.push(userObj);
        localStorage.setItem('dataInfo', JSON.stringify(dataInfo));
        formClean();
    }
    saveBtn.addEventListener("click", () => {
        let userName = userNameInput.value.trim();
        let userPassword = passwordInput.value.trim();
        if (!userName || !userPassword) {
            alert("Bitte geben Sie Ihren Benutzernamen und Ihr Passwort ein!"); 
            return;
        }
        verification(userName, userPassword, (isUserExist) => {
            if (isUserExist) {
                formClean();
                userVerification.textContent = "повторний вхід";
                alert("Вітаємо вдома!")
            } else {
                registration(userName, userPassword);
                userVerification.textContent = "перший вхід";
                alert("Вітаємо в команді!")
            }
        });
    });
});

// 2 end 