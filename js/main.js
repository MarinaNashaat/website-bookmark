var tableRow = document.getElementById("tableRow");

var siteName = document.getElementById("siteName");

var siteUrl = document.getElementById("siteUrl");

var siteContainer;
if (localStorage.getItem("siteList") != null) {
    siteContainer = JSON.parse(localStorage.getItem("siteList"))
    displayBookmark();
}
else {
    siteContainer = [];
}

function addBookmark() {
    if (siteNameValidation() && siteUrlValidation() && searchSiteUrl()) {

        var url;
        if (siteUrl.value.match(/^https?:\/\//)) {
            url = siteUrl.value;
        }
        else {
            url = 'https://' + siteUrl.value
        }
        var site = {
            websiteName: siteName.value,
            websiteUrl: url
        }
        siteContainer.push(site);
        localStorage.setItem("siteList", JSON.stringify(siteContainer));
        displayBookmark();
        clearForm();
    }
}

function displayBookmark() {
    var temp = ``;

    for (var i = 0; i < siteContainer.length; i++) {

        temp += `  <div class="col-md-12">
        <div class="d-flex table-column p-4 my-4 ">
            <h2 class="w-25 me-5">${siteContainer[i].websiteName}</h2>
            <div class="btn-group mx-5">
                <a href="${siteContainer[i].websiteUrl}" target="_blank" class="btn btn-primary me-3" id="visitLink">visit</a>
                <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>

            </div>
        </div>

    </div>`


    }
    tableRow.innerHTML = temp;
}


function deleteBookmark(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem("siteList", JSON.stringify(siteContainer));
    displayBookmark()
}
function clearForm() {
    siteName.value = ""
    siteUrl.value = ""
}
function siteNameValidation() {
    var regexForName = /^[A-Z][a-z]{1,8}/
    if (regexForName.test(siteName.value)) {
        document.getElementById("siteNameAlert").style.display = "none";
        return true;
    }
    else if( siteName.value==""){
        document.getElementById("siteNameAlert").style.display = "block";
        document.getElementById("siteNameAlert").innerHTML="Site name is required!";

        return false; 
    }
    else {
        document.getElementById("siteNameAlert").style.display = "block";
        document.getElementById("siteNameAlert").innerHTML="site name should start with capital letters";
        return false;
    }
}
function siteUrlValidation() {
    var regexForUrl = /^(http[s]?:\/\/)?[w]{3}.[a-z]{2,}.[a-z]{3}$/

    if (regexForUrl.test(siteUrl.value)) {
        document.getElementById("siteUrlAlert").style.display = "none";
        return true;
    }
    else if( siteUrl.value==""){
        document.getElementById("siteUrlAlert").style.display = "block";
        document.getElementById("siteUrlAlert").innerHTML=" Site url is required!";

        return false; 
    }
    else {
        document.getElementById("siteUrlAlert").style.display = "block";
        document.getElementById("siteUrlAlert").innerHTML="url should be www.example.com or https://www.example.com";

        return false;
    }
}

function searchSiteUrl() {

    if (siteContainer == []) {
        return true;
    }
    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].websiteUrl.includes(siteUrl.value)) {
            document.getElementById("siteUrlAlert").style.display = "block";
            document.getElementById("siteUrlAlert").innerHTML = "site url already exists";
            return false;
        }

    }

    document.getElementById("siteUrlAlert").style.display = "none";
    return true;


}
