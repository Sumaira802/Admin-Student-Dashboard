document.addEventListener("DOMContentLoaded", function () {

    // Function to hide all sections
    function hideAll() {
        document.querySelectorAll(
            ".notifications, .signOut, .dashboard, .profile, .result, .Fees, .slip, .setting"
        ).forEach(
            el => el.style.display = "none"
        );
    }

    // Function to reset background color of all menu items
    function hideColor() {
        document.querySelectorAll(
            "#Notifications, #SignOut, #Dashboard, #Profile, #Result, #Fee, #Slip, #Setting"
        ).forEach(el => {
            el.style.backgroundColor = "";
        });
    }

    // Notifications menu item click event
    document.getElementById("Notifications").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".notifications").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Dashboard menu item click event
    document.getElementById("Dashboard").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".dashboard").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Profile menu item click event
    document.getElementById("Profile").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".profile").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Result menu item click event
    document.getElementById("Result").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".result").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Fee menu item click event
    document.getElementById("Fee").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".Fees").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Slip menu item click event
    document.getElementById("Slip").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".slip").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Setting menu item click event
    document.getElementById("Setting").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".setting").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

    // Sign Out menu item click event
    document.getElementById("SignOut").onclick = function () {
        hideAll();
        hideColor();
        document.querySelector(".signOut").style.display = "block";
        this.style.backgroundColor = "lightblue";
    };

});