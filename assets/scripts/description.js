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
        element.setAttribute("style", "transition: color linear 0.2s;");
        setTimeout(function()
        {
            element.removeAttribute("style");
            element.isClicked = false;
        }, 200);
    }, 500);
}

function logEvent(event)
{
    console.log(event);
    console.log(event.currentTarget);
    console.log("---------");
}

class Menu
{
    constructor(element)
    {
        this._logging = false; // default loggin option
        this._element = element;
        element.onclick = this.onClick.bind(this);
    }
    turnLoggingOn(event)
    {
        if (!this._logging)
        {
            changeDecor(event.target, "lightgreen");
            list.addEventListener("click", logEvent);
            this._logging = true;
        }
    }
    turnLoggingOff(event)
    {
        if (this._logging)
        {
            changeDecor(event.target, "red");
            list.removeEventListener("click", logEvent);
            this._logging = false;
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