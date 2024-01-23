import { Flavor } from "./Flavor";
import { Counter } from "./Counter";
import { HelloButton } from "./HelloButton";
import { FlavorForm } from './FlavorForm';
import "./App.css";

export const App = () => {
    return (
        <div>
            <Counter />
            <HelloButton />
            <FlavorForm />
            {/* <ul>
                <Flavor name="Vanilla" />
                <Flavor name="Chocolate" />
                <Flavor name="Strawberry" />
            </ul> */}
        </div>
    );
};
