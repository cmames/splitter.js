// just create a div with a class name splitH or splitV
// in that div add :
// - your first div
// - an empty div with a class name separator
// - your second div
//
// import this script in your HTML (at the end of body)
// and let the magic happen

    function dragElement(element) {
      const previous = element.previousElementSibling;
      const next = element.nextElementSibling;
      let md,cursor;
      let infop,infon; 
      let horizontal=(element.parentNode.className === "splitH");
      let vertical=(element.parentNode.className === "splitV");

      element.style.backgroundColor= '#A0A0A0';
      element.style.width="100%";
      element.style.height="100%";
      element.style.mozUserSelect="none";
      element.style.msUserSelect="none";
      element.style.userSelect="none";
      element.style.backgroundRepeat="no-repeat";
      element.style.backgroundPosition="center";
      element.parentNode.style.margin="0px";
      element.parentNode.style.padding="0px";
      element.parentNode.style.display="flex";
      element.parentNode.style.width="100%";
      element.parentNode.style.height="100%";
      previous.style.position="relative";
      next.style.position="relative";


      if (horizontal)
      {
        cursor = 'col-resize';
        previous.style.minWidth="50px";
        next.style.minWidth="50px";
        previous.style.minHeight="50px";
        next.style.minHeight="50px";
        element.style.minHeight="50px";
        element.style.width="5px";
        element.style.backgroundImage="url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='5' height='40'><path d='M2 0 V40' fill='none' stroke='black'/></svg>\")";
        element.parentNode.style.flexDirection="row";
      }
      if (vertical)
      {
        cursor = 'row-resize';
        previous.style.minHeight="50px";
        next.style.minHeight="50px";
        previous.style.minWidth="50px";
        next.style.minWidth="50px";
        element.style.minWidth="50px";
        element.style.height="5px";
        element.style.backgroundImage="url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='5'><path d='M0 2 H40' fill='node' stroke='black'/></svg>\")";
        element.parentNode.style.flexDirection="column";
      }
      element.style.cursor=cursor;

      window.addEventListener("resize", () => {
        next.style.width=window.innerWidth-previous.offsetWidth-element.offsetWidth+"px";
        next.style.height=window.innerHeight-previous.offsetHeight-element.offsetHeight+"px";
      });

      element.addEventListener("mousedown", (e) => {
        md = {
          clientX: e.clientX,
          clientY: e.clientY,
          offsetLeft: element.offsetLeft,
          offsetTop: element.offsetTop,
          firstWidth: previous.offsetWidth,
          secondWidth: next.offsetWidth,
          firstHeight: previous.offsetHeight,
          secondHeight: next.offsetHeight
        };
        infop=document.createElement("span");
        infon=document.createElement("span");
        infop.style.position="absolute";
        infon.style.position="absolute";
        infop.style.padding="5px";
        infon.style.padding="5px";
        infop.textContent=previous.offsetWidth+"x"+previous.offsetHeight;
        infon.textContent=next.offsetWidth+"x"+next.offsetHeight;
        if (horizontal) 
        {
          infop.style.left="auto";
          infop.style.right="0";
          infon.style.left="0";
          infop.style.top="0";
          infon.style.top="0";
        }
        if (vertical) 
        {
          infop.style.left="auto";
          infop.style.right="0";
          infop.style.top="auto";
          infop.style.bottom="0";
          infon.style.left="auto";
          infon.style.right="0";
          infon.style.top="0";
        }
        infop.style.backgroundColor="rgba(0,0,0,0.5)";
        infop.style.color="white";
        infon.style.backgroundColor="rgba(0,0,0,0.5)";
        infon.style.color="white";
        previous.appendChild(infop);
        next.appendChild(infon);
        document.body.style.cursor=cursor;
        document.addEventListener('mousemove', resizeBegin);
        document.addEventListener('mouseup', resizeEnd);
      });

      function resizeEnd() {
        document.body.style.cursor="default";
        document.removeEventListener('mousemove', resizeBegin);
        document.removeEventListener('mouseup', resizeEnd);
        previous.removeChild(infop);
        next.removeChild(infon);
      }

      function resizeBegin(e) {
        var delta = {
          x: e.clientX - md.clientX,
          y: e.clientY - md.clientY
        };

        if (horizontal)
        {
          element.style.left = md.offsetLeft + delta.x + "px";
          previous.style.width = (md.firstWidth + delta.x) + "px";
          next.style.width = window.innerWidth-element.offsetWidth-previous.offsetWidth+"px";//(md.secondWidth - delta.x) + "px";          
        }
        if (vertical)
        {
          element.style.top = md.offsetTop + delta.y + "px";
          previous.style.height = (md.firstHeight + delta.y) + "px";
          next.style.height = window.innerHeight-element.offsetHeight-previous.offsetHeight+"px";//(md.secondWidth - delta.x) + "px";          
        }
        infop.textContent=previous.offsetWidth+"x"+previous.offsetHeight;
        infon.textContent=next.offsetWidth+"x"+next.offsetHeight;
      }
    }

    document.querySelectorAll(".separator").forEach(item => {dragElement(item)});
