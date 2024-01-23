# Step 3: React
In step 3, we finally got back to building web apps. In this step, we're going to introduce you to just enough [React](https://react.dev/) to be dangerous. By the end of this step, you should understand how to:
- create a new React project from scratch using Parcel
- define and use static components
- make components interactive using `useState`

## Part I: Initial Set Up
Before jumping into React, we need to create a new NPM project that has the minimum requirements. To that end,
we're going to create a project named "froyo-orders-react" that combines everything we've learned up until this point.

## Task 10
Create a new NPM project named "froyo-orders-react":

```shell
mkdir froyo-orders-react
cd froyo-orders-react
npm init -y
```

Add Parcel to your dependencies:
```shell
npm install --save-dev parcel
```

Don't forget to update your `package.json` file so that it includes a `"source"` property and a new `"start"` script:

```diff
{
  "name": "froyo-orders-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "source": "src/index.html",
  "scripts": {
+    "start": "parcel",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.10.3"
  }
}
```

Create a `src` directory:
```shell
mkdir src
```

Then add the file `src/index.html` with the following in it:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Froyo Orders</title>
    <script type="module" src="index.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Add the file `src/index.js` with the following contents:
```javascript
document.body.innerHTML = "<h1>Hello, World!</h1>";
```

If everything is set up correctly, you should be able to run `npm run start` as before and visit the displayed URL (usually http://localhost:1234) in a browser and see "Hello, World!"

## Part II: Hello, React!
Up until now,  you've learned two ways to add content to a web page:
1. Writing HTML directly
2. Using `document.createElement` and friends to dynamically create that content

React gives us a way to combine the approaches. That is, we're still writing JavaScript to dynamically create content, but can use a syntax called [JSX](https://react.dev/learn/writing-markup-with-jsx) to ease the pain of writing markup (HTML tags). Let's compare a simple example of creating an unordered list using all 3 approaches.

HTML:
```html
<ul class="my-list">
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ul>
```

JavaScript:
```javascript

// Variables starting with "$" are DOM elements 
const $ul = document.createElement("ul");
$ul.classList.add("my-list")

$ul.innerHTML = `
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
`;

document.body.replaceChildren($ul);
```

JSX:
```jsx
<ul className="my-list">
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ul>
```

Note that the JSX version allows us to write something almost identical to the vanilla HTML version. The only difference is that `class` changed to `className`, and that's because at the end of the day, JSX is still JavaScript, and class is a reserved word, much like `while`, `for`, and `if`.

The JSX example isn't entirely equivalent to the vanilla JavaScript example, as JSX alone doesn't provide us an equivalent to `$document.body.replaceChildren($ul)`; For that, we need to create a React component, then render it.

In React, you typically create so-called components by defining a function that returns JSX. For example, we can turn the above JSX into a component with the following code:

```javascript
export const MyList = () => {
    return (
        <ul className="my-list">
            <li>First</li>
            <li>Second</li>
            <li>Third</li>
        </ul>
    )
}
```

Let's add the above component to our `froyo-orders-react` project and get it to render.

## Task 11

First, install the dependencies we need to write React:
```shell
npm install react react-dom
```

Next, copy the above `MyList` component into a new file located at `src/MyList.jsx`. 

Note that the `.jsx` extension is what tells us that the file includes some JSX code in it. Naming the file with a normal `.js` extension also works, but using `.jsx` makes it easier to distinguish between regular JavaScript modules.

Next, replace the contents of `src/index.js` with the following code:
```javascript
import { createRoot } from "react-dom/client";
import { MyList } from "./MyList";

const root = createRoot(document.querySelector("#app"));
root.render(<MyList />);
```

Finally, run your app and make sure you can see the unordered list:
```shell
npm run start
```

Pro-Tip: Before continuing, be sure to commit your work!

## Part III: Rendering Dynamic Content
It can be argued that for a simple, static unordered list, JavaScript, let alone React are overkill. Where JavaScript becomes useful is when we want to display dynamic content instead. Let's compare JavaScript and React again.

JavaScript:
```javascript
// Variables starting with "$" are DOM elements 
const FLAVOR = "Vanilla";

const $flavor = document.createElement("p");
$flavor.textContent = FLAVOR;

document.body.appendChild($flavor);
```

React:
```javascript
import { createRoot } from "react-dom/client";

const FLAVOR = "Vanilla";

const Flavor = () => {
  return (
    <p>{FLAVOR}</p>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<Flavor />);
```

In a way, the last example is still static, in so far as teh favor is hard-coded -- the flavor only changes if someone changes how `FLAVOR` is defined. Let's make flavors configurable. And render more than one of them.

JavaScript:
```javascript
// Variables starting with "$" are DOM elements 
const createFlavor = name => {
  // Let's use an li instead of a p tag this time since
  // we're rendering multiple of these
  const $flavor = document.createElement("li");
  $flavor.textContent = name;

  return $flavor;
}

const $div = document.createElement("ul");
$div.replaceChildren(
  createFlavor("Vanilla"),
  createFlavor("Chocolate"),
  createFlavor("Strawberry"),
);
```

React:
```javascript
import { createRoot } from "react-dom/client";

const Flavor = (props) => {
  return (
    <li>{props.name}</li>
  );
}

const App = () => {
  return (
    <ul>
      <Flavor name="Vanilla">
      <Flavor name="Chocolate">
      <Flavor name="Strawberry">
    </ul>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
```

In the vanilla JavaScript version, we created a function named `createFlavor` that took a single `name` argument and used that to fill out the text content for the `li` tag.

In react, components can only take a single argument, named [props](https://react.dev/learn/passing-props-to-a-component), which is an object. The keys of that argument are the prop names, and the values are the prop values. That is, the following:
```jsx
<Person name="Edwin" title="Mentor" location="Portland">
```

Translates to this object being passed to the component:
```javascript
{
  name: "Edwin",
  title: "Mentor",
  location: "Portland"
}
```

Inside of the component, it can be accessed like this:
```javascript
const Person = (props) => {
  return (
    <ul>
      <li>{props.name}</li>
      <li>{props.title}</li>
      <li>{props.location}</li>
    </ul>
  );
}
```

These code examples are starting to get messy. Let's add a `Flavor` component to our project and do a bit of organizing while we're at it.

### Task 12
1. Create a new file at `src/Flavor.jsx` and define a component in it that takes
a single `name` prop like our example above. Make sure to export that function.
It should render as a `<li>` tag, not a `<p>` tag
2. Create another component at `src/App.js` that does the following:
  - imports the `Flavor` component
  - it renders a `<ul>` tag with three children:
  - a `Flavor` with a name of "Vanilla"
  - a `Flavor` with a name of "Chocolate"
  - a `Flavor` with a name of "Strawberry"
3. Update `src/index.js` so that it does hte following:
  - no longer imports `MyList`
  - instead, imports `App`
  - renders the `App` component at the root instead of `MyList`

## Part IV: Responding to User Input
Now that we have a reusable component, it would be nice if we could create them on the fly. That is, we still have to update the source code if we want to see different (or more) flavors. What we would like to be able to do instead is show a flavor based on what a user types.

Before we do that, we need to take a brief detour to talk about events. In HTML, you can assign events to elements by using the appropriate attribute:
```html
<button onclick="alert('hi')">Hello</button>
```

Alternatively, we can attach even handlers in JavaScript. Given the following HTML:
```html
<button id="hello-button">Hello</button>
```

We can write the following JavaScript:
```javacript
document.querySelector("#hello").addEventListener("click", () => {
  alert("hi");
});
```

The former style is convenient because you don't have to leave HTML, but is cumbersome if you need more intricate behavior. The latter is more maintainable, but suffers from needing to select the element first and also remembering that `onclick` becomes `"click"` when adding the event listener.

In React, we can [resond to events](https://react.dev/learn/responding-to-events) with a syntax that combines the bets of both worlds:
```javascript
export const HelloButton = () => {
  return (
    <button 
      onClick={() => {
        alert("hi");
      }}
    >
      Hello
    </button>
  );
}
```
Three things to note:
1. The spelling for an event is camel case instead of all lowercase (`onClick`, not `onclick`)
2. Like vanilla JavaScript, we pass a callback rather than calling the `alert` function directly like we did in HTML
3. We had to wrap the callback in curly braces. This will be common theme in JSX -- if you want to use arbitrary JavaScript expressions in JSX markup, you have to surround it in `{}`.

### Task 13
1. Create another file, `./src/HelloButton.jsx` and add the contents of the `HelloButton` example above to it
2. Update your `App` component by wrapping the `<ul>` in a `<div>`, then add a `<HelloButton />` above the `<ul>`
3. Don't forget to import `HelloButton`!

Confirm that clicking the button shows the alert box.

## Part V: Keeping Track of State

Now that we can respond to input, we need a way to remember that input -- we
need to talk about state. In React, you save state by using a
[hook](https://react.dev/reference/react/hooks) called `useState`. Explaining
how hooks work and discussing the various other types of hooks that exist is
beyond the scope of this guide, but we will at least show you how to use them.
`useState` is a function that takes an optional argument and returns a list
containing exactly 2 elements:
- the first is the current state value
- the second is a function that can be used to update the state

The optional argument is the default value of your state. If you don't have a sane default, you can use `null`  or pass no arguments, which would make the default `undefined`.

That's a lot, so let's see it in action. Let's say we wanted to create a component that consists of a button that, when clicked, increases the count and displays that count in a span. You can implement that like this:
```javascript
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
    </div>
  );
}
```

Remember: For displaying arbitrary JavaScript expressions, you have to use `{}`. It's analogous to how we use template literals when setting a DOM nodes' `innerHTML` or `textContent`:
```javascript
const count = 2;
const span = document.createElement("span");
span.textContent = `${count}`;
```

Notice how it's almost the same, but we don't have a leading `$` in JSX?

### Task 14

1. Create another component at `src/Counter.jsx` with the contents of the previous example in it

2. Replace the `HelloButton` with the `Counter` inside of your `App` component

Confirm that the counter works.

### Part VI: Forms
Now that we have gotten the preliminaries out of the way, we can finally do something interesting with our Froyo App.

If we want to collect text input and then respond to it, we can use a form like we would in vanilla JavaScript. That is, if we would normally write the following HTML:

```html
<form>
  <label for="flavor">Flavor</label>
  <input id="flavor" type="text">  
  <button type="submit">Show Flavor</button>
  <output for="flavor"></output>
</form>
```

We could write the following in JavaScript:
```javascript
document.querySelector("form").addEventListener("submit", evt => {
  evt.preventDefault();

  const flavorInput = evt.target.flavor;
  document.querySelector("output").textContent = flavorInput.value;
  flavorInput.value = "";
});
```

In React, we'd write something like this instead:
```javascript
import { useState } from 'react';

export const FlavorForm = () => {
  const [flavor, setFlavor] = useState("");

  return (
    <form onSubmit={evt => {
        evt.preventDefault();
        const flavorInput = evt.target.flavor;
        setFlavor(flavorInput.value);
        flavorInput.value = ""
    }}>
      <label htmlFor="flavor">Flavor</label>
      <input id="flavor" type="text" />  
      <button type="submit">Show Flavor</button>
      <output htmlFor="flavor">{flavor}</output>
    </form>
  );
};
```

### Task 15
1. Create a new component at `./FlavorForm.jsx` with the following behavior:
  - imports the `Flavor` component
  - it uses a state variable named `flavor` with a default value of `"Vanilla"`
  - renders a form with a single input that, when submitted, uses `setFlavor` to change the state value
  - renders a `ul` with a single `Flavor` component inside of it, using the `flavor` state as a `name`
2. Update the App component so that it no longer includes the `Counter` component or `ul`. That is, the `App` component should end up rendering the following:
```jsx
<div>
  <CounterForm />
</div>
```

You should be able to change the flavor that shows up, but new flavors should *not* be added to the `ul` rendered by the `FlavorForm` component.

### Part VII: React Keys
Now that we can dynamically render a single flavor based on what the user types, let's render as many flavors as the user can enter. 

In React, we can dynamically render multiple elements by iterating over an array
with the `.map()` method. One peculiarity we have to deal with, however, is that
when using `.map()`, we have to add an extra prop named `key` to each rendered
element. This element should be unique for each item.  

For more information on why that's the case, feel free to check out the [official documentation on the subject](https://react.dev/learn/rendering-lists). For now though, just take our word for it that it's needed. 

Here's an example of how we can render an array of things dynamically:
```javascript
import { Flavor } from './Flavor';

export const FlavorList = (props) => {
  return (
    <ul>
      {props.flavors.map(flavor => (
        <li key={flavor}>{flavor}</li>
      ))}
    </ul>
  );
} 
```

Here' we use the flavor itself as a key. This is not very safe because flavors might not be unique. You might be tempted to use the index as a key, but [that is frowed upon](https://react.dev/learn/rendering-lists#why-does-react-need-keys). 

There are a few ways we could address this, but as our final app will guarantee that flavors are unique, we won't concern ourselves with the problem here. Just be sure to enter unique flavors for now!

Anyway, we can use our `FlavorList` component like this:
```
<FlavorList flavors={["Vanilla", "Chocolate", "Strawberry"]}>
```

We can of course use it in a full compoent and replace the hard-coded list with a variable:

```javascripot
const FLAVORS = ["Vanilla", "Chocolate", "Strawberry"];
export const ThreeFlavors = () => {
  return <FlavorList flavors={FLAVORS} />
}
```

### Task 16
1. Create a new component named `FlavorList` that takes a single prop named `flavors`, which should be a list of strings and returns a `<ul>` full of `<Flavor>`s where each flavor's `name` prop comes from the `flavors` prop. Don't forget to give each mapped `Flavor` a `key` prop!
2. Update the `FlavorForm` component to import and use the new `FlavorList` component instead of rendering a `ul` with exactly one item in it
3. Change the state used in `FlavorForm` from being a single string named
`flavor` to an array of strings named `flavors`, and similarly rename `setFlavor` to `setFlavors`
4. Instead of passing a default value of `"Vanilla"`, pass an empty array as the default value
5. Pass the `flavors` state value as a prop named `flavors` to the `FlavorList` component that `FlavorForm` now renders.
6. Update the `onSubmit` handler so that the entered flavor is added to the `flavors` state variable

Keep in mind that your `set` functions except new values, not mutated ones. That is, you might be tempted to do something like this in your event handler:
```javascript
const newFlavor = evt.target.flavor.value;
flavors.push(newFlavor);
```

That will not work due to how React observes changes. What you should do instead
is pass a *new* array. You can accomplish this rather easily by using 
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):
```javascript
const newFlavor = evt.target.flavor.value;
setFlavors([
  ...flavors,
  newFlavor
]);
```

### Part VII: Counting Flavors
Now that we have covered the basics, let's revisit an old friend, [Workshop 15](https://fullstack.instructure.com/courses/732/assignments/30854?module_item_id=229360). 

We've already rebuilt 90% of the functionality in React! All that's left to do is to update the state so that instead of keeping track of a list of flavors, it keeps track of unique flavors and how many times each one has been entered. That is, if a user enters the following into the form:
- Vanilla
- Chocolate
- Strawberry
- Chocolate
- Vanilla
- Vanilla
- Mint

Then we'd expect to see the following list:
- Vanilla: 3
- Chocolate: 2
- Strawberry: 1
- Mint: 1

### Task 17
Update the `froyo-orders-react` app so that instead of a list of all flavors entered, there is 1 list item per unique flavor, along with the number of times that flavor has been input.

If you can't remember the exact way to implement the above, remember that we do have solutions posted in our cohort repo. If you just want a hint, here's how it should work:

  - given a list of flavors
  - iterate over each flavor
  - if we've never seen the flavor before, updatet the state for that flavor to have a count of 1
  - if we've seen it before, increment the existing count by 1

The other tricky bit would be updating state, as again,  you should *not* mutate the old state. Here's an example of how to add a new flavor to an existing object:
```javascript
const [flavors, setFlavors] = useState({});

const flavor = "vanilla";

// Create a new object with all the key/value pairs of the old object,
// plus a new pair. 
// If we had { chocolate: 1 } before, this would produce 
// { chocolate: 1, vanilla: 1 }
setFlavors({
  ...flavors,
  [flavor]: 1
})

// Create a new object with all the key/value pairs of the old object, with the given key incremented by one.  
// If we had { chocolate: 1, vanilla: 1} before, this would
// produce { chocolate: 1, vanilla: 2 }
setFlavors({
  ...flavors,
  [flavor]: flavors[flavor] + 1
})
```

### Part IX: Make it Pretty
One thing we've been intentionally avoiding with all this talk about behavior is styling. In React, you can use inline styles with the `style` prop:

```
export const RedText = (props) => {
  return (
    <h2 style={{ color: "red", backgroundColor: "black" }}>{props.text}</h2>
  );
}
```

One thing to keep in mind when specifying styles this way is that the property names are camel case, much like when changing styles in vanilla JavaScript:
```javascript
const h2 = document.querySelector("red-text");
h2.style.text = "red";
h2.style.backgroundColor = "black";
```

With bundlers like Parcel, you can also include css directly. Let's say you had a CSS File named `RedText.css`:

```css
.red-text {
  color: red;
  background-color: black;
}
```

You could use it as follows:
```javascript
import './RedTxt.css';

export const RedText = (props) => {
  return (
    <h2 className="red-text">{props.text}</h2>
  );
}
```

### Task 18
Using the styling method you prefer, update your various components to make the page layout more pleasing to the eye. 

As style is very subjective, the solution provided is purely to help you check syntax if you run into issues.
