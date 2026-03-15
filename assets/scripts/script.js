let addedSongsCount = 0
const inputs = document.querySelectorAll(".input");

document.getElementById("AddSongButton").addEventListener("click", function() 
{
    for (let i = 0; i < inputs.length; i++)
    {
        if (inputs[i].value == "")
        {
            displayWarningMessage("You must fill all the inputs!");
            return;
        }
    }
    // if all inputs are filled with data
    let artist = document.createElement("td");
    artist.textContent = document.getElementById("artist").value;
    let title = document.createElement("td");
    title.textContent = document.getElementById("title").value;
    let album = document.createElement("td");
    album.textContent = document.getElementById("album").value;
    let link = document.createElement("td");
    link.innerHTML = "<a href=\"" + document.getElementById("link").value + "\", target=\"_blank\">Link</a>";

    let newRow = document.createElement("tr");
    newRow.prepend(artist, title, album, link);
    
    document.querySelector(".musicTable").appendChild(newRow);
    addedSongsCount++;
});

document.getElementById("RemoveSongButton").addEventListener("click", function()
{
    if (addedSongsCount <= 0)
    {
        displayWarningMessage("There's no added rows left!");
        return;
    }
    if (document.getElementById("strictDeletionCheckbox").checked)
    {

        alert("You are trying to remove table row!");
        if (!confirm("Are you sure?"))
            return;
        if (prompt("Type \"DELETE\" below to proceed.") != "DELETE")
        {
            alert("You did not write DELETE, so deletion is denied.");
            return;
        }
    }
    document.querySelector(".container").setAttribute("style", "background-color: rgba(235, 175, 175, 0.8);");
    setTimeout(function()
    {
        document.querySelector(".container").removeAttribute("style");
    }, 5000);
    document.querySelector(".musicTable").lastChild.remove();
    addedSongsCount--;
});

function displayWarningMessage(message)
{
    let aside = document.querySelector(".aside-right");

    let warningMessage = document.createElement("p");
    warningMessage.innerText = message;
    warningMessage.classList.add("warningMessage");

    aside.appendChild(warningMessage);
            
    setTimeout(function()
    {
        warningMessage.setAttribute("style", "color: red;");
    }, 0);
    setTimeout(function() 
    {
        warningMessage.setAttribute("style", "color: white");
        setTimeout(function() 
        {
            aside.removeChild(warningMessage);
        }, 200);
    }, 3000);
    return;
}

document.getElementById("showAboutButton").addEventListener("click", function() 
{
    if (document.getElementById("strictDeletionCheckbox").checked)
        showAbout("Sammy", "Elbana", "Guitarist of band called Lost Society - favourite guitarist");
    else
        showAbout("Mark", "Poliakov");
});

function showAbout(name, surname, position = "Admin")
{
    alert(`Name: ${name} ${surname}\nPosition: ${position}`);
}

document.getElementById("compareStringsButton").addEventListener("click", function()
{
    let firstString = "Lost Society";
    let secondString = "Annisokay";
    let resultString = firstString > secondString ? firstString : secondString;
    alert(`Comparing two strings: ${firstString} and ${secondString}.\nThe longer string: ${resultString}`)
});