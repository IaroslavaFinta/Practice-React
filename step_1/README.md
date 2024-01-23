# Step 1: JavaScript Libraries

By the end of this step, you should understand how to:
- use CDN libraries to add JavaScript libraries to vanilla HTML/CSS/JavaScript Projects
- create a new NPM project
- search for JavaScript libraries to use in that project
- install and use those JavaScript libraries

## Part I: CDN
Up until now, you've been including a single JavaScript file in your
projects by using a `<script>` tag. If you want to use JavaScript
libraries, you can add more `<script>` tags to include them as global
variables. 

Say you want to create a simple page that displays a random name every 
time you reload the page. One library that will help you do that is 
[Faker](https://fakerjs.dev/).

The method `faker.name.firstName()` will generate a random name each time it's run. 

In order to add `Faker` to your page, you'll need to include it via [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN). The simple explanation is that a CDN a way to make content available to webpages in a convenient way. Imagine you want to add some feature to your web page, but don't want to spend hours writing the functionality yourself. Using a script tag pointing to a CDN will allow you to use pre-existing code to implement that feature. 

Once you decide to use a CDN, the next problem becomes finding a library that meets your needs. One easy way to find libraries exposed using a CDN is to search for them on [cdnjs](https://cdnjs.com/libraries).

For example, if you want to generate random names, you might do something like the following:
```javascript
const names = ["John", "Jill", "Bob", "Sarah", "LaTisha", "Marcus", "Damian"];
const randomName = names[Math.floor(Math.random() * names.length)]
```

The problem is that the more random you want your names to be, the more names
you have to come up with. Fortunately, there's a library called Faker.js that allows you to, once installed, write the following instead:

```
const randomName = faker.name.firstName();
```

In task 1 below, you'll learn how to install and use Faker.

### Task 1
1. Go to [cdnjs](https://cdnjs.com/libraries) and search for "Faker".
2. Click on the "Copy Script Tag" (</>) icon. 
3. Paste the copied code into the appropriate place in ./task_1/index.html
4. Preview the page and refresh. Notice how the name keeps changing! 

### Solution
You can find the solution on branch [task_1_solution](https://github.com/edwin-fsa/NPM-getting-started/tree/task_1_solution)

## Part II: NPM Projects
In modern projects, instead of using CDNs, we'll use NPM to create projects. Thus, before we can recreate the above
(albeit simple) app using NPM packages, we need to take a detour to talk briefly about NPM itself.

To create a NPM project, you need to call `npm init`. Passing the `-y` flag will choose some sane defaults for you.

### Task 2
Create a new project named `random-names` using the following commands:
```
mkdir -p task_2/random-names
cd task_2/random-names
npm init -y
```
If done successfully, you should see that a new file named [./task_2/random-names/package.json](./task_2/random-names/package.json)
```json
{
  "name": "random-names",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

This JSON file describes our package. For now, the most important parts are the `name` and the `scripts` sections, which tell us the name
of the project as well as scripts that can be run respectively. 

You can run scripts by using the command `npm run <script name>`, replacing `<script name>` with the keys of the `scripts` object. So for example,
you can run `npm run test` from inside of the [./task_2/random-names](./task_2/random-names) directory to see the Error message "Error: no test specified" printed to your console.

### Solution
You can find the solution on branch [task_2_solution](https://github.com/edwin-fsa/npm-getting-started/tree/task_2_solution)


## Part III: NPM Scripts
While we can get very far with CDNs, they eventually become rather unwieldy. If you take time to explore using different libraries by including them via CDN, you'll notice a few patterns start to emerge:

- More and more global variables are declared, meaning that no longer are they no 
  longer available for you to use in your own variables, but you have to be aware 
  of all of them
- The list of `<script>` tags in your html continues to grow, potentially   
  becoming unwieldy
- Your webpage loads slower as you add more libraries. If you include one library 
  via CDN and only use one function from it, your user still needs to install 
  the entire library, which may or may not be rather large
- The order of your script tags start to matter. Some libraries depend on others,
  which means that you have to make sure to include some libraries before others 
  when using a CDN

NPM aims to solve all of the above problems, and more. 

We still need to learn quite a few concepts before we can make a web app that mirrors the functionality of the app we made in part 1. For now,
let's create a similar app that works in our terminal. That is, running `NPM run` will print a new random name the terminal.

First, we need a Javascript file to run. While we could just create one
in the current directory, it's customary to put all the source code of
your NPM package in a directory named `src`, so let's create that, then put a file we will call `index.js` in that directory:
```shell
mkdir src
touch src/index.js
```

If you update the `src/index.js` file to have some simple code, say `console.log("Hello, world!")` you should be able to run it using node:
```shell
node ./src/index.js.
```

In our next task, we will instead show you how to use NPM to run your code.

### Task 3
1. Update `package.json` with a new script named `"start"` which executes the command `node src/index.js`
2. Run the command `NPM run start`
3. You should see the result of the simple command we ran!

### Solution
You can find the solution on branch [task_3_solution](https://github.com/edwin-fsa/NPM-getting-started/tree/task_3_solution)


## Part IV: NPM Libraries (Finally!)
As we hinted at above, NPM libraries give us a better way to add code other people have written to our projects. 

In our simple HTML page, we used the library Faker to generate fake names. We can use that same library (albiet a more up-to-date version) by installing it with NPM. 

In the next task, you'll learn how to install and use an NPM library.

### Task 4
Before this app will work, we'll need to install faker using NPM.

1. Go to [NPMjs.com](https://www.NPMjs.com/) and search for "faker"
2. Choose the second option named "@faker-js/faker"
3. On the right side of the page, you'll see a section called "install". Copy that command and run it in a terminal in your [./task_2/random-names](./task_2/random-names) directory.
4. Replace the contents of your `./src/index.js` file with the following:

    ```javascript
    const { faker } = require("@faker-js/faker");
    console.log(faker.person.firstName());
    ```
5. Run `NPM run start` from a terminal again.
6. Note that we have a program that displays a random name each time it is run!

Note: The `require` function is how we include modules in NPM projects. We'll talk about it and it's modern equivalent in the next part. For now, consider it eqivalent to `<script src="https://cdnjs.cloudflare.com/ajax/libs/react-is/18.2.0/umd/react-is.production.min.js"></script>` in HTML. 

### Solution
You can find the solution on branch [task_4_solution](https://github.com/edwin-fsa/NPM-getting-started/tree/task_4_solution)

## Part V: CommonJS and ES6 Modules
If you were to look at the contents of your `./task_2/random-names` directory after you ran the `NPM install` command from the previous task, you might have noticed a new directory, `node_modules`. This is where NPM downloads library code to. 

The `require()` function we glossed over takes a string as an argument and searches for a directory with the same name inside of that `node_modules` directory. 

In this course, however, we'll be using a more modern syntax to accomplish the same thing. In the next and final task of this section, we'll update our code to use the new `import` syntax. If you'd like to  
read more about the syntax, check out [MDN's article on the subject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

You'll notice a few changes:
- We added `"type": "module"` to the `package.json` file. This is needed in order to use modern import syntax (which we haven't talked about yet)

### Task 5
In order to use `import` syntax in your NPM projects, you need to enable ES6
modules. You can do that by adding the follwing key-value pair to
`./part-2/random-names/package.json`: `"type": "module"`. Make sure that it's
not nested in any other sections. That is, it should be defined at the same level as the keys `"name"`, `"version"`, etc.  

Next, you just need to update `./src/index.js` by replacing the line with `require()` with an equivalent import statement:

```diff
-const { faker } = require("@faker-js/faker");
+import { faker } from "@faker-js/faker";
console.log(faker.person.firstName());
```

If you run `npm run start`, your program should still function properly.

### Solution
You can find the solution on branch [task_5_solution](https://github.com/edwin-fsa/NPM-getting-started/tree/task_5_solution)


## Conclusion
In this step, we briefly explored the difference between using CDNs and NPM
libraries to add code other people wrote to our own projects. In future lessons, we'll work our way up to writing a very simple (and boring) [React](https://react.dev/) app. 

Yes, we'll go over React in much more detail during the course in Unit 3, but this is meant to give you prior exposure so you don't suffer culture shock from seeing so many new things at once!
