import { useState } from 'react';
import { FlavorList } from './FlavorList';

export const FlavorForm = () => {
  const [flavors, setFlavors] = useState([]);

    return (
        <div>
        <form onSubmit={evt => {
            evt.preventDefault();
          const flavorInput = evt.target.flavor;
          const newFlavor = flavorInput.value;
          //setFlavor(flavorInput.value);
            setFlavors({
              ...flavors,
              [newFlavor]: newFlavor in flavors ? flavors[newFlavor] + 1 : 1
            });
            flavorInput.value = "";
        }}>
          <label htmlFor="flavor">Flavor</label>
          <input id="flavor" type="text" />  
          <button type="submit">Show Flavor</button>
        </form>
        <FlavorList flavors={flavors} />
      </div>
  );
};