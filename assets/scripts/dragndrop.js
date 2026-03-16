function dragndropMousedown(event)
{
    currentDraggedElement = event.target;

    currentDraggedElement.style.zIndex = maxZIndex = maxZIndex + 1;
    document.body.style.cursor = "grab";

    positionCursor.x = event.clientX;
    positionCursor.y = event.clientY;
}
function dragndropMousemove(event)
{
    if (currentDraggedElement == null || !isCursorWithinBoundaries(event))
        return;
    currentDraggedElement.positionX -= positionCursor.x - event.clientX;
    currentDraggedElement.positionY -= positionCursor.y - event.clientY;
    positionCursor.x = event.clientX;
    positionCursor.y = event.clientY;
    /* Applying new coordinates no the element */
    currentDraggedElement.style.left = currentDraggedElement.positionX + "px";
    currentDraggedElement.style.top = currentDraggedElement.positionY + "px";
}
function dragndropMouseup(event)
{
    if (document.elementFromPoint(event.clientX, event.clientY) === currentDraggedElement)
        document.body.style.cursor = "pointer";
    else
        document.body.style.cursor = "auto";

    currentDraggedElement = null;
}
function dragndropMouseover(event)
{
    document.body.style.cursor = "pointer";
}
function dragndropMouseout(event)
{
    document.body.style.cursor = "auto";
}
function setInitialPositionLocked(element)
{
    container = document.querySelector(".dragndropContainer");
    container.appendChild(element);

    element.style.left = '';
    element.style.top = '';
    let position = element.getBoundingClientRect(),
        positionContainer = container.getBoundingClientRect();
    element.positionX = position.left - positionContainer.left;
    element.positionY = position.top - positionContainer.top;
}
function isCursorWithinBoundaries(event)
{
    positionContainer = container.getBoundingClientRect();
    return event.clientX > positionContainer.left && event.clientX < positionContainer.right 
        && event.clientY > positionContainer.top && event.clientY < positionContainer.bottom;
}

let positionCursor = {
    x: 0,
    y: 0
};
let container = document.querySelector(".dragndropContainer");
let currentDraggedElement = null;
let maxZIndex = 10;

/* Adding event listeners */
let dragndropableElements = document.querySelectorAll(".dragndropable");
document.addEventListener("mousemove", dragndropMousemove);
document.addEventListener("mouseup", dragndropMouseup);
dragndropableElements.forEach(element => {
    element.addEventListener("mousedown", dragndropMousedown);
    element.ondragstart = function() {
        return false;
    }

    element.addEventListener("mouseover", dragndropMouseover);
    element.addEventListener("mouseout", dragndropMouseout);

    setInitialPositionLocked(element);
});

document.getElementById("resetButton").addEventListener("click", function()
{
    document.getElementById("lockingButton").dataset.locked = "true";
    document.getElementById("lockingButton").textContent = "Locked";

    container = document.querySelector(".dragndropContainer");
    dragndropableElements.forEach(element => {
        container.appendChild(element);
        setInitialPositionLocked(element);
    });
    currentDraggedElement = null;
});
document.getElementById("lockingButton").addEventListener("click", switchLoking);
function switchLoking(event)
{
    if (event.target.dataset.locked == "true")
    {
        unlockElements();
    }
    else
    {
        lockElements();
    }
}
function unlockElements()
{
    let lockingButton = document.getElementById("lockingButton");
    if (lockingButton.dataset.locked != "false")
    {
        container = document.body;
        dragndropableElements.forEach(element => {
            let position = element.getBoundingClientRect();
            container.appendChild(element);
            element.positionX = position.left + window.pageXOffset;
            element.positionY = position.top + window.pageYOffset;
            element.style.left = element.positionX + "px";
            element.style.top = element.positionY + "px";
        });
        lockingButton.dataset.locked = "false";
        lockingButton.textContent = "Unlocked";
    }
}
function lockElements()
{
    let lockingButton = document.getElementById("lockingButton");
    if (lockingButton.dataset.locked != "true")
        {
        container = document.querySelector(".dragndropContainer");
        dragndropableElements.forEach(element => {
            container.appendChild(element);
            setInitialPositionLocked(element);
        });
        lockingButton.dataset.locked = "true";
        lockingButton.textContent = "Locked";
    }
}

/* event.relatedTarget */
document.querySelector("h2").addEventListener("mouseover", function(event)
{
    let previousElement = event.relatedTarget;
    previousElement.setAttribute("style", "background-color: rgba(255, 255, 255, 0.5");
    setTimeout(function()
    {
        previousElement.removeAttribute("style");
    }, 500);
})