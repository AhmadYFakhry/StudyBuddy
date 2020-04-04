# Done.md

For each user story, our defition of done is if the feature works in three ways. These can also all be tested using the JEST test suite and Puppeteer (used for testing UIs).

## 1st: Model and Controller
We should be getting the expected output when just using the Model and Controller on its own. We can accomplish this by using programs like Postman to for example test the API for our product.

## 2nd: View and Controller
Using a static model as a placeholder, we should be getting the expected elements when we try to use the UI.

## 3rd: Full test with the full Model, View and Controller
Connecting everything together, the program should still work as expected, otherwise we must reassess what needs to be changed or tweaked in order to meet our expectations.

