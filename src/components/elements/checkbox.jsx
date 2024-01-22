 const Checkbox = (props)=>{
    return(
    <div className="d-flex">
<div class="checkbox-wrapper-12">
<div class="cbx">
  <input id="cbx-12" checked={props.value==1?true:false} onChange={()=>{props.value==1?props.onChange(0):props.onChange(1)}} value={props.value?props.value:''} type="checkbox"/>
  <label for="cbx-12"></label>
  <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
    <path d="M2 8.36364L6.23077 12L13 2"></path>
  </svg>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo-12">
      <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
      <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
      <feblend in="SourceGraphic" in2="goo-12"></feblend>
    </filter>
  </defs>
</svg>
</div>
<span className="ms-2">{props.title}</span>
</div>
    )
}

export default Checkbox
