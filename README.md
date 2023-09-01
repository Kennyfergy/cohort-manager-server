# Cohort Manager (Koss)
This is a small review project for the koss cohort. The user can
add new cohorts and delete them. The total number of students is 
displayed on the page.

## Functionality
- [x] Create the files, set up the project
   - [x] index.html
   - [x] style.css
   - [x] bring in jQuery
   - [x] create our script javascript file
   - [x] Wire up the jQuery ready function
- [x] Take input from the user to create a cohort (name, size)
   - [x] Add inputs and button on the html page
   - [x] Wire up the button to append to the page when clicked
   - [x] Clear the form after submit
   - [x] Alert the user if any field blank
   - [x] Use a number field for the cohort number
- [ ] Each cohort can be displayed on a 'card' that is actually
   a list item (`<li>`) with a fancy hat
- [ ] Show the total number of students on the page somewhere
- [ ] User should be able to remove a cohort by clicking a delete button
- [ ] STRETCH: deleting a cohort will update the global student count


To get a form tag working:
   - wrap the inputs in a form tag
   - instead of an 'on click' handler for button, you hook into
      the 'submit' event of the form
   - in the handler, use `event.preventDefault()` to cancel 
      the page reload
   - why? `required` and other validation now work