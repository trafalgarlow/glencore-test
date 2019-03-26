# Glencore Test

Clone the current repository:

```bash
git clone https://github.com/trafalgarlow/glencore-test.git
```

Install the dependencies:

```bash
yarn install
```

## Usage

You have the following scripts:

### **`yarn run-all`**

It executes the below scripts all at once, serving each task once it completes the execution.

It goes on executing the remaining scripts when one is completed.

It will take a while to run all the below scripts, but once a task ends up, it serves automatically the result on the browser and you can start to interact with it without waiting for the end of all the remaining scripts.

This command should go on automatically executing all, but if you might have any issue with this "all in one command", please try to execute them one by one through the below scripts.

### **`yarn test:e2e`**

It executes all the e2e tests created with cypress, running a browser which will show you the execution of the specs.

Unfortunately I did not have time to add all the e2e tests I would have loved, and to structure and work a bit more on that.

It will take a while for starting up the server and then running the electron browser of cypress for executing all the tests.

### **`yarn test:coverage`**

It executes all the unit tests, collects the coverage, and then serve the coverage reports on the browser.

There are around 500 tests so It may take a while to execute all of them, collect coverage data and serve the reports.

### **`yarn storybook`**

It creates the documentation and the demos for the components used inside the application and then serves the storybook application on the browser so that you can see the components and interact with them and with the props on real time.

At the moment, it does not display the prop tables within the documentation, because the module `react-docgen-typescript-loader` used for generating the prop types from the typescript components, makes storybook really slow because it takes a huge time for finishing its job.

You can anyway enable this feature uncommenting the file `webpack.config.js` inside the `.storybook` folder, running again the script, and you should be able to see the prop types table with the documentation of the component props.

### **`yarn start`**

It serves the application on the browser

### **`others`**

There are also other scripts, like the **`lint`** one and few others, which can be checked inside the `package.json` file.

## Assumptions

Reading the requirements, I assumed some points for developing the project, which are stated below.

### Business Requirements

The application has 3 main entities:

- **color**: It is composed by an *id* and a *name*, but it may have new additional useful properties, like the *value* of the color. (e.g. hex value)
- **dictionary**: It has an *id*, a *from* and a *to*, which represents the color to which the dictionary points.
- **product**: It is an object with an *id*, a *name*, a *price* and a *dictionary*, which points to the associated dictionary.

So in my understanding of the requirements, then in my implementation, a product is mapped to a dictionary, which is then mapped to a color. Through the **transformation dataset** functionality, you can either choose to display the color of the product as the *from* property of the dictionary or the *name* property of the color.

### Application

The application allows you to perform the following operations:

1. **Add Color** validating if you already have a color with the same name

2. **Add Dicitonary** associating it with a color and validating all the rules provided in the requirements, not allowing to have clones or multimple dictionaries with the same *from* mapped to different *colors*

3. **Update Dictionary** validating again the given rules

4. **Delete Dictionary** checking if you have products associated to a dictionary you are trying to remove

5. **Add a product** associating it with a dictionary

6. **Turn on/off the transformation dataset** for showing the products with the dictionary *from* or the color *name*

### Data Persistence

From the requirements, it looks like it was not needed to persist data, it was not indicated how/where to fetch some initial data either.

For a better user exeperience, I assumed in this case to use the **local storage** for saving the data automatically once you perform any kind of operation in the application.

When you run the application, it checks if you already have some data in the local storage: if you do, it loads that data from the local storage and it uses it as initial data, otherwise it creates some custom initial data.

### Styles

The application is fully responsive.

For implementing the styles, I used **SASS** and the **CSS in JS**, which is also used by **material-ui**.

From the requirements, I did not understand if it was allowed to use *CSS in JS*, so I added some *scss* as well for implementing the styles.

For the same reason, I did use **bootstrap** for creating a full responsive layout instead of relying on the solutions provided by **material-ui**.
