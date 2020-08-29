const courseList = document.getElementById("course-list");

function addCourse (name, description) {
    courseList.innerHTML += `
    <div class="course-item">
        <img class="course-banner" src="https://files.mike.works/courses/24/course_banner_24_fbshare.png?v=63679649196">
    
        <div class="course-container">
            <span class="course-name">${name}</span>
            <p class="course-desc">${description}</p>
    
            <button class="btn">Boton</button>
        </div>
    </div>
    `
}

async function fetchForCourses () {
    const request = await GET("/api/courses");
    let data = JSON.parse(request);

    if (data.success) { 
        let courses = data.courses;
        for (let course of courses) {
            addCourse(course.displayname, course.description);
        }
   } else {
       alert(data.error);
    }
}

async function submitLogin () {
    const email = getValue("email");
    const password = getValue("password");

    const request = await POST("/api/login", {
        email, password
    })

    const data = JSON.parse(request);
    if (data.success) {
        alert("Logeo exitoso! bienvenido de vuelta " + data.user.username)
    } else {
        alert(data.error);
    }

    console.log(request);
}

function getValue (id) {
    const elem = document.getElementById(id + "-input");
    return (elem == null ? null : elem.value);
}

async function submitRegister () {
    const email = getValue("email");
    const password = getValue("password");
    const firstName = getValue("firstname");
    const lastName = getValue("lastname");
    const username = getValue("username");

    const request = await POST("/api/register", {
        email, password, firstName, lastName, username
    })

    const data = JSON.parse(request);
    if (data.success) {
        alert("Registro exitoso!  bienvenido " + username)
    } else {
        alert(data.error);
    }
    
    console.log(request);
}

function POST (url, data) {
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.status)
                }
            }
        } 

        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(data));
    });   
}

function GET (url) {
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText)
                } else {
                    reject(this.status);
                }
            }
        }
    
        http.open("GET", url);
        http.send();
    });
}

window.addEventListener("load", () => {
    if (courseList != null)
        fetchForCourses();
})