import React from 'react';
import './toggle-switch.scss'



function ToggleSwitch({setFilter} : {
  setFilter: () => void;
}) {
  return (
    <div className="s-toggle-switch">
      <input className="input" id="toggle" type="checkbox" onChange={setFilter}/>

      <label className="label" htmlFor="toggle">
        <div className="left">
          All tweets
        </div>

        <div className="switch">
          <span className="slider round" />
        </div>

        <div className="right">
          Liked tweets
        </div>
      </label>
    </div>
  );
}

export default ToggleSwitch;

