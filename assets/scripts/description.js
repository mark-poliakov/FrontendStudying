const transitionTimeSeconds = 0.5;
let decorNotes = document.querySelector(".header__notesDecoration");
decorNotes.onclick = function(event)
{
    changeDecor(event.target, "rgb(248, 146, 255);");
}

let list = document.querySelector(".definition__list");
list.addEventListener("click", function(event)
{
    changeDecor(event.target, "rgb(146, 213, 255);");
});

function changeDecor(element, color)
{
    if (element.isClicked)
        return;

    element.isClicked = true;
    element.setAttribute("style", `color: ${color}`);
    setTimeout(function()
    {
        element.setAttribute("style", `transition: color linear ${transitionTimeSeconds}s;`);
        setTimeout(function()
        {
            element.removeAttribute("style");
            element.isClicked = false;
        }, transitionTimeSeconds * 1000);
    }, 100);
}

function descriptionEvent(event) // callback function
{
    displayDescription(event.target.dataset.description);
}

class Menu
{
    constructor(element)
    {
        this._descripting = false; // default description option
        this._element = element;
        element.onclick = this.onClick.bind(this);
    }
    turnDescriptingOn(event)
    {
        if (!this._descripting)
        {
            changeDecor(event.target, "lightgreen");
            list.addEventListener("click", descriptionEvent);
            this._descripting = true;
        }
    }
    turnDescriptingOff(event)
    {
        if (this._descripting)
        {
            changeDecor(event.target, "red");
            list.removeEventListener("click", descriptionEvent);
            this._descripting = false;
        }
    }
    onClick(event)
    {
        let action = event.target.dataset.action;
        if (action)
        {
            this[action](event);
        }
    }
    handleEvent(event)
    {
        if (event.target == this._element)
        {
            this._element.setAttribute("style", "background-color: rgb(200, 255, 198);");
        }
        else
        {
            this._element.removeAttribute("style");
        }
    }
}
let menu = new Menu(document.querySelector(".aside__menu"));
document.addEventListener("click", menu);

document.addEventListener("mouseout", function(event)
{
    if (event.target && event.target.dataset.mouseout != undefined)
    {
        changeDecor(event.target, "yellow");
    }
});

function displayDescription(messageText)
{
    if (messageText == null || messageText == "")
        return;

    let aside = document.querySelector(".aside-right");

    let message = document.createElement("p");
    message.innerText = messageText;
    message.classList.add("message");

    aside.appendChild(message);
            
    setTimeout(function()
    {
        message.setAttribute("style", "color: black;");
    }, 0);
    setTimeout(function() 
    {
        message.setAttribute("style", "color: white");
        setTimeout(function() 
        {
            aside.removeChild(message);
        }, 200);
    }, 4000);
    return;
}