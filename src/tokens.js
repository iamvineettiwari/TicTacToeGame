
export const gen_X = (i) => {
    return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">

<g id="Layer_3">
	<line class="path2" id="${i}-left" fill="none" stroke="#000000" stroke-width="10" stroke-miterlimit="10" x1="8.5" y1="41.5" x2="41.5" y2="8.5"/>
	<line class="path3" id="${i}-right" fill="none" stroke="#000000" stroke-width="10" stroke-miterlimit="10" x1="41.5" y1="41.5" x2="8.5" y2="8.5"/>
</g>
</svg>`;
}

export const gen_O = (i) => {
    return `<svg width="40" height="40">
    <circle class="bg" 
            cx="20" cy="20" r="15"
            fill="none"
            stroke="#F5F6FB"   
            stroke-width="10"
            stroke-dasharray="800"
     />
    <circle id="my-circle-${i}" class="fill" 
            cx="20" cy="20" r="15"
            fill="none"
            stroke="#000000"   
            stroke-width="10"
            stroke-dasharray="600"
     />
    
    <animate 
      xlink:href="#my-circle-${i}"
      attributeName="stroke-dashoffset"
      from="600"
      to="0" 
      dur="3s"
      repeatCount="1"
      />
</svg>`;
}
