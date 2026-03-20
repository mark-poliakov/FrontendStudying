function dragndropMousedown(event)
{
    currentDraggedElement = event.target;
    draggedElements.push(currentDraggedElement);

    currentDraggedElement.style.zIndex = maxZIndex = maxZIndex + 1;

    currentDraggedElement.style.position = "absolute";
    document.body.appendChild(currentDraggedElement);

    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    moveDragndropableAtCursor(event.pageX, event.pageY);

    dragndropableElements.forEach(element => {
            element.style.pointerEvents = "none";
    });
    containers.forEach(element => {
        element.classList.add("highlighted");
    });
}
function dragndropMousemove(event)
{
    if (currentDraggedElement == null || !isCursorWithinBoundaries(event))
        return;
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    moveDragndropableAtCursor(event.pageX, event.pageY);
}
function dragndropMouseup(event)
{
    if (currentDraggedElement == null)
        return;
    currentDraggedElement.style.display = "none";
    let element = document.elementFromPoint(event.clientX, event.clientY);
    if (element && element.classList.contains("dragndropContainer"))
    {
        element.classList.add("placedInSuccessfully");
        setTimeout(function(){
            element.classList.remove("placedInSuccessfully");
        }, 0);
        element.appendChild(currentDraggedElement);
        currentDraggedElement.style.position = "static";
    }
    currentDraggedElement.style.display = "block";

    currentDraggedElement = null;

    dragndropableElements.forEach(element => {
        element.style.pointerEvents = "auto";
    });
    containers.forEach(element => {
        element.classList.remove("highlighted");
    });
}
function dragndropMouseover(event)
{
    document.body.style.cursor = "pointer";
}
function dragndropMouseout(event)
{
    if (currentDraggedElement == null)
        document.body.style.cursor = "auto";
}
function dragndropScroll()
{
    if (currentDraggedElement == null)
        return;
    moveDragndropableAtCursor(mousePosition.x, mousePosition.y + window.pageYOffset);
}
function isCursorWithinBoundaries(event)
{
    positionContainer = document.body.getBoundingClientRect();
    return event.clientX > positionContainer.left && event.clientX < positionContainer.right 
        && event.clientY > positionContainer.top && event.clientY < positionContainer.bottom;
}
function moveDragndropableAtCursor(pageX, pageY)
{
    if (currentDraggedElement == null)
        return;
    currentDraggedElement.style.left = pageX - currentDraggedElement.offsetWidth / 2 + "px";
    currentDraggedElement.style.top = pageY - currentDraggedElement.offsetHeight / 2 + "px";
}
let containers = document.querySelectorAll(".dragndropContainer");
let currentDraggedElement = null;
let currentContainerOver = null;
let draggedElements = [];
let maxZIndex = 10;
let mousePosition = {
    x: 0,
    y: 0
};

/* Adding event listeners */
window.addEventListener("scroll", dragndropScroll);
let dragndropableElements = [];
containers.forEach(element => {
    let elementChildren = element.querySelectorAll(".dragndropable");
    elementChildren.forEach(dragndropable => 
    {
        dragndropableElements.push(dragndropable);
        dragndropable.initialContainer = element;
        let positionAbsolute = element.getBoundingClientRect();
        dragndropable.style.top = positionAbsolute.top + window.pageYOffset + 5 + "px";
        dragndropable.style.top = positionAbsolute.left + 5 + "px";
    });
}); 
document.addEventListener("mousemove", dragndropMousemove);
document.addEventListener("mouseup", dragndropMouseup);
dragndropableElements.forEach(element => {
    element.addEventListener("mousedown", dragndropMousedown);
    element.ondragstart = function() {
        return false;
    }
    element.addEventListener("mouseover", dragndropMouseover);
    element.addEventListener("mouseout", dragndropMouseout);
});

let button = document.getElementById("resetButton");
button.addEventListener("click", function()
{
    draggedElements.forEach(element => {
        element.initialContainer.appendChild(element);
        element.style.position = "static";
    });
    currentDraggedElement = null;
});
button.addEventListener("focus", function(event)
{
    let relatedTarget = event.relatedTarget;
    if (relatedTarget != null)
    {
        relatedTarget.classList.add("focusLost");
        setTimeout(function(){
            relatedTarget.classList.remove("focusLost");
        }, 500);
    }
});

/* Disabling dragging images in page */
document.querySelectorAll('img').forEach(element => {
   element.ondragstart = function() { return false; }; 
});