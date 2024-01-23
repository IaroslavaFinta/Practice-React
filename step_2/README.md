# Step 2: NPM and the Web
In [Step 1](../step_1/README.md), we discussed how JavaScript libraries can help us by giving us access
to code others have written in our own projects. We also converted a simple random name generator webpage into one that works in a terminal.

In this step, we aim to eventually turn that back into a proper web app!

By the end of this step, you should understand how to:
- organize your own code into separate ES6 modules
- use [Parcel](https://parceljs.org/) to bundle NPM projects into a web application
- use [React](https://react.dev/) to make simple web applications

## Part I: Named Imports and Exports
We last left off by asking you to add the following line to the top of your `index.js` file:

```javascript
import { faker } from "@faker-js/faker";
```

This syntax is using what is called [named imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import), so called because you are naming the specific things you want imported. 

That is, the `@faker-js/faker` module has exported an object named `faker`. You can create your own modules and create named exports by using the `export` keyword.


If you navigate to the `part_1` directory and run `npm run start` from a terminal, you should see the following output:
```
> part_1@1.0.0 start
> node src/index.js

Evens: [ 2, 4, 6, 8, 10 ]
Sum: 55
```

If you then take a look at the top of `./task_6/src/index.js`, you should see the following import line:
```javascript

import { evens, sum } from './numbers.js';
```

If you then look at `./task_6/src/numbers.js`, you should see a series of function definitions that look identical to functions we've written in the past, with 1 exception: the `export` keyword.

If you've been doing the [exercism](https://exercism.org/tracks/javascript) exercises, this might look familiar.

This keyword takes the definition that follows it and makes it a named export. 

Note that the `isEven` function is *not* preceded by an `export` keyword. That means that other modules *cannot* import this function.

The reason for doing such a thing is that in this case, having such a helper function made writing `evens` and `odds` easy without having to duplicate much code. However, we want (for our own selfish reasons, not any practical one) to only make available those functions that operate on arrays of numbers, so we choose not to export it.

### Task 6
1. Edit `index.js` and update the program to print out the product of the `numbers` variable, as well as which numbers are odd. Use similar formatting to what was used when printing out the sum of all numbers and which numbers were even.
2. Add `isEven` to your imports, uncomment the last line in `index.js` and try running the code. What happens?
3. Update `numbers.js` so that `isEven` is exported
4. Try running the code again, and it should work now

## Part 2: Default Imports and Exports
Another way to import code is with a default import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#default_import). The syntax is similar to named imports, except that it's restricted to importing a single item, and doesn't include curly braces. If you take a look at [./task_2/src/index.js](https://github.com/FullstackAcademy/npm-getting-started/blob/main/step_2/task_2/src/index.js) you'll see an example:

```
import Numbers from './numbers.js';
```

You'll also notice that rather than calling functions, we instantiate the class `Numbers` and call methods on it instead of calling functions. 

If you then take a look at `./task_7/src/index.js`, you'll see that we defined the `Numbers` class and converted all the functions into methods instead. The other thing to notice is that instead of `export class` as you might expect, we have `export default class`. This is what makes it a default export.

### Task 7
1. Remove the keyword `default` from the export in `./task_7/src/numbers.js`. 
2. Try to run the code again. What happens?
3. Update the import statement in `./task_7/src/index.js` so that it uses named imports for the `Numbers` class
4. Try running the code again

## Part 3: Bundling JavaScript
While we've gained something by being able to organize our code into separate files (instead of one large one) and use code other people have written, we've lost the ability to create web apps! 

The concept of converting JavaScript that works in node to code that works in browsers is a concept called "bundling", and has a long history. In our course, we'll be using [Vite](https://vitejs.dev/) (pronounced "veet") for this task. For our purposes, however, we're going to be using [Parcel](https://parceljs.org/) because it's simpler (both conceptually, and to get working) instead. 

### Task 8
We're going to take the random name generator from [Step 1](../step_1/) and make it a proper web app again.

1. Copy your solution from Step 1 to a new folder named `task_8`:
```
cp -r ../step_1/task_2/random-names task_8
```
2. Install Parcel as a [devDependecy](https://classic.yarnpkg.com/lang/en/docs/dependency-types/#toc-devdependencies):
```shell
npm intall --save-dev parcel
```
3. Create an `index.html` **inside** of your `src` directory and add some basic HTML along with the following script tag:
- `<script type="module" src="index.js"></script>`
4. Update your `package.json` file so that Parcel knows how to build your web app. You need to add the following key/value pairs:
- `"source": "src/index.html` at the top-level (e.g., under `"description"`)
- change `"start": "node src/index.js"` under `"scripts"` to `"start": "parcel"` 

If you now run your app (e.g., `npm run start`), you should see something like the following output:
![Parcel running](../screenshots/parcel.png)

If you visit the displayed URL (in this screenshot, http://localhost:1234) and open up dev tools, you should
see a random name in the terminal!

## Part 4: Final Touches
At this point, we're back to using a web app, but it's not quite satisfying, is it? We can come full circle by re-introducing DOM manipulation.

### Task 9
Let's update `index.js` to do DOM manipulation so that it works like our original app:

```diff
-console.log(faker.person.firstName());
+document.body.textContent = faker.person.firstName();
```

As soon as you save the file, you should see that the server automatically updates. In that way, it's just like
when you use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code to preview your static web pages!

More importantly though, you should now see that like our original version, refreshing the page automatically updates the page with a new random name!

## Conclusion
In this step, we built on top of the last lesson and learned to not only *use* modules, but define our own. We then learned how to use Parcel to take an NPM package and turn it into an app that can run in the browser. Finally, we updated our app that only worked with node and turned it into a web page that ran like our original
HTML + JavaScript version.

In the next step, we'll (finally) start playing with React!
