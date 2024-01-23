import { Flavor } from './Flavor';

export const FlavorList = (props) => {
  return (
    <ul>
        {Object.keys(props.flavors).map(flavor => (
        <Flavor key={flavor} name={flavor} count={props.flavors[flavor]} />
      ))}
    </ul>
  );
} 