document.addEventListener("DOMContentLoaded", function () {

    // ================= DATA =================
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let instructors = JSON.parse(localStorage.getItem("instructors")) || [];

    let editIndex = -1;

    // Hide all sections
    function hideAll() {
        document.querySelectorAll(
            ".students, .courses, .instructors, .reports, .settings, .logout, .StudentForm, .CourseForm, .instructorForm"
        ).forEach(el => el.style.display = "none");
    }

    // Reset background color of all menu items
    function hideColor() {
        document.querySelectorAll(
            "#Students, #Courses, #Instructors, #Reports, #Settings, #Logout"
        ).forEach(el => el.style.backgroundColor = "");
    }

    // ================= MENU CLICKS =================

    // Students button click
    document.getElementById("Students").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".students").style.display = "block";
        this.style.backgroundColor = "lightblue";
        showStudents();
    };

    // Courses button click
    document.getElementById("Courses").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".courses").style.display = "block";
        this.style.backgroundColor = "lightblue";
        showCourses();
    };

    // Instructors button click
    document.getElementById("Instructors").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".instructors").style.display = "block";
        this.style.backgroundColor = "lightblue";
        showInstructors();
    };

    document.getElementById("Reports").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".reports").style.display = "block";
        this.style.backgroundColor = "lightblue";
        showReports();
    };

    document.getElementById("Settings").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".settings").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    document.getElementById("Logout").onclick = function () {
        hideAll(); hideColor();
        document.querySelector(".logout").style.display = "block";
    };

    // Add Buttons
    document.querySelector(".add-student-btn").onclick = () => {
        editIndex = -1; // Reset for new entry
        hideAll();
        document.querySelector(".StudentForm").style.display = "block";
    };

    document.querySelector(".add-course-btn").onclick = () => {
        editIndex = -1; // Reset for new entry
        hideAll();
        document.querySelector(".CourseForm").style.display = "block";
    };

    document.querySelector(".add-instructor-btn").onclick = () => {
        editIndex = -1; // Reset for new entry
        hideAll();
        document.querySelector(".instructorForm").style.display = "block";
    };

    // 1. Function jo Students Section ko open karti hai aur table refresh karti hai
function openStudentsSection() {
    hideAll(); // Tamam sections chupao
    hideColor(); // Sidebar colors reset karo
    
    const studentSection = document.querySelector(".students");
    const studentMenu = document.getElementById("Students");
    
    if(studentSection) studentSection.style.display = "block";
    if(studentMenu) studentMenu.style.backgroundColor = "lightblue";
    
    showStudents(); // Table mein data bharo
    updateCounts(); // Stats card update karo
}

// 2. Navbar Buttons ki functionality
    const navLinks = document.querySelectorAll(".nav-links a");
    if(navLinks.length >= 2) {
        // Pehla button: Total Students
        navLinks[0].onclick = function(e) {
            e.preventDefault();
            openStudentsSection();
        };

        // Doosra button: Active Students
        navLinks[1].onclick = function(e) {
            e.preventDefault();
            openStudentsSection();
            // Chunkay aapke paas abhi sirf active students hi hain, isliye alert de dein
            alert("Displaying List of All Active Students"); 
        };
    }

    // 3. Sidebar "Students" link ki functionality[cite: 8]
    document.getElementById("Students").onclick = openStudentsSection;

    // 4. Counts update karne ka function[cite: 8]
    function updateCounts() {
        const totalDisplay = document.getElementById("totalStudents");
        if(totalDisplay) {
            // 'students' array ki length show karega
            totalDisplay.innerText = "Total Students: " + students.length; 
        }
    }

    // ID generator
    function getNextId(arr) {
        return arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
    }

    // ================= STUDENTS LOGIC =================

    function showStudents() {
        let table = document.getElementById("studentTableBody");
        table.innerHTML = "";
        students.forEach((s, index) => {
            table.innerHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.phone}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>Active</td>
                    <td style="display:flex; gap:8px; justify-content:center;">
                        <button onclick="editStudent(${index})" style="background:blue;color:white;padding:5px 10px;border:none;border-radius:5px;">Edit</button>
                        <button onclick="deleteStudent(${index})" style="background:red;color:white;padding:5px 10px;border:none;border-radius:5px;">Delete</button>
                    </td>
                </tr>`;
        });
    }

    document.getElementById("submitStudent").onclick = function () {
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let course = document.getElementById("courses").value;

        if (!name || !phone || !email) { alert("Fill all fields"); return; }

        if (editIndex === -1) {
            students.push({ id: getNextId(students), name, phone, email, course });
        } else {
            students[editIndex] = { id: students[editIndex].id, name, phone, email, course };
            editIndex = -1;
        }

        localStorage.setItem("students", JSON.stringify(students));
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        
        hideAll();
        document.querySelector(".students").style.display = "block";
        showStudents();
        updateCounts();
    };

    window.editStudent = function (index) {
        let s = students[index];
        document.getElementById("name").value = s.name;
        document.getElementById("phone").value = s.phone;
        document.getElementById("email").value = s.email;
        document.getElementById("courses").value = s.course;
        editIndex = index;
        hideAll();
        document.querySelector(".StudentForm").style.display = "block";
    };

    window.deleteStudent = function (index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        showStudents();
        updateCounts();
    };

    // ================= COURSES LOGIC =================

    function showCourses() {
        let table = document.getElementById("CourseTableBody");
        table.innerHTML = "";
        courses.forEach((c, index) => {
            table.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.coursename}</td>
                    <td>${c.instructor}</td>
                    <td style="display:flex; gap:8px; justify-content:center;">
                        <button onclick="editCourse(${index})" style="background:blue;color:white;padding:5px 10px;border:none;border-radius:5px;">Edit</button>
                        <button onclick="deleteCourse(${index})" style="background:red;color:white;padding:5px 10px;border:none;border-radius:5px;">Delete</button>
                    </td>
                </tr>`;
        });
    }

    document.getElementById("submitCourse").onclick = function () {
        let coursename = document.getElementById("coursename").value;
        let instructor = document.getElementById("courseInstructor").value;

        if (!coursename || !instructor) { alert("Fill all fields"); return; }

        if (editIndex === -1) {
            courses.push({ id: getNextId(courses), coursename, instructor });
        } else {
            courses[editIndex] = { id: courses[editIndex].id, coursename, instructor };
            editIndex = -1;
        }

        localStorage.setItem("courses", JSON.stringify(courses));
        document.getElementById("coursename").value = "";
        document.getElementById("courseInstructor").value = "";

        hideAll();
        document.querySelector(".courses").style.display = "block";
        showCourses();
        updateCounts();
    };

    window.editCourse = function (index) {
        let c = courses[index];
        document.getElementById("coursename").value = c.coursename;
        document.getElementById("courseInstructor").value = c.instructor;
        editIndex = index;
        hideAll();
        document.querySelector(".CourseForm").style.display = "block";
    };

    window.deleteCourse = function (index) {
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        showCourses();
        updateCounts();
    };

    // ================= INSTRUCTORS LOGIC =================

    function showInstructors() {
        let table = document.getElementById("InstructorTableBody");
        table.innerHTML = "";
        instructors.forEach((i, index) => {
            table.innerHTML += `
                <tr>
                    <td>${i.id}</td>
                    <td>${i.name}</td>
                    <td>${i.email}</td>
                    <td>${i.course}</td>
                    <td style="display:flex; gap:8px; justify-content:center;">
                        <button onclick="editInstructor(${index})" style="background:blue;color:white;padding:5px 10px;border:none;border-radius:5px;">Edit</button>
                        <button onclick="deleteInstructor(${index})" style="background:red;color:white;padding:5px 10px;border:none;border-radius:5px;">Delete</button>
                    </td>
                </tr>`;
        });
    }

    document.getElementById("submitInstructor").onclick = function () {
        let name = document.getElementById("instructorName").value;
        let email = document.getElementById("instructorEmail").value;
        let course = document.getElementById("instructorCourse").value;

        if (!name || !email) { alert("Fill all fields"); return; }

        if (editIndex === -1) {
            instructors.push({ id: getNextId(instructors), name, email, course });
        } else {
            instructors[editIndex] = { id: instructors[editIndex].id, name, email, course };
            editIndex = -1;
        }

        localStorage.setItem("instructors", JSON.stringify(instructors));
        document.getElementById("instructorName").value = "";
        document.getElementById("instructorEmail").value = "";
        document.getElementById("instructorCourse").value = "";

        hideAll();
        document.querySelector(".instructors").style.display = "block";
        showInstructors();
        updateCounts();
    };

    window.editInstructor = function (index) {
        let i = instructors[index];
        document.getElementById("instructorName").value = i.name;
        document.getElementById("instructorEmail").value = i.email;
        document.getElementById("instructorCourse").value = i.course;
        editIndex = index;
        hideAll();
        document.querySelector(".instructorForm").style.display = "block";
    };

    window.deleteInstructor = function (index) {
        instructors.splice(index, 1);
        localStorage.setItem("instructors", JSON.stringify(instructors));
        showInstructors();
        updateCounts();
    };

    // ================= REPORTS & COUNTS =================

    function showReports() {
        let reportBox = document.querySelector(".reports");
        reportBox.innerHTML = `
            <hr>
            <h2>Total Students: ${students.length}</h2>
            <h2>Total Courses: ${courses.length}</h2>
            <h2>Total Instructors: ${instructors.length}</h2>
        `;
    }

    function updateCounts() {
        if(document.getElementById("totalStudents"))
            document.getElementById("totalStudents").innerText = "Total Students: " + students.length;
        if(document.getElementById("totalCourses"))
            document.getElementById("totalCourses").innerText = "Total Courses: " + courses.length;
        if(document.getElementById("totalInstructors"))
            document.getElementById("totalInstructors").innerText = "Total Instructors: " + instructors.length;
    }

    function showReports() {
        let reportBox = document.querySelector(".reports");
        if(!reportBox) return;
        reportBox.innerHTML = `
            <h2>System Summary Report</h2>
            <hr style="margin: 20px 0;">
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div style="background:#e3f2fd; padding:20px; border-radius:8px; text-align:center; border:1px solid #bbdefb;">
                    <h3>Total Students</h3>
                    <p style="font-size:32px; color:#1976d2;">${students.length}</p>
                </div>
                <div style="background:#f1f8e9; padding:20px; border-radius:8px; text-align:center; border:1px solid #dcedc8;">
                    <h3>Total Courses</h3>
                    <p style="font-size:32px; color:#388e3c;">${courses.length}</p>
                </div>
                <div style="background:#fff3e0; padding:20px; border-radius:8px; text-align:center; border:1px solid #ffe0b2;">
                    <h3>Instructors</h3>
                    <p style="font-size:32px; color:#f57c00;">${instructors.length}</p>
                </div>
            </div>`;
    }

    

    // Initial load
    showStudents();
    updateCounts();
});