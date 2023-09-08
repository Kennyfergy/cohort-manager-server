console.log("Hello World");
let studentCount = 0;

$(onReady); // "new" way to set onReady function

function onReady() {
  // Wire up our click handlers
  // Add Cohort Button
  $("#addCohort").on("click", addCohort);

  // Listen on #cohorts ul item, for clicks on children.
  // If an element (like a button) started the click event
  // that had a class of '.delete', THEN call deleteCohort()
  // Why? Because delete buttons do NOT exist when onReady
  // first fires, they're added later via user actions
  // so we have to add our listener to something else on the
  // DOM that's available now and is an ancestor of the
  // element we DO care about
  $("#cohorts").on("click", ".delete", deleteCohort);

  getCohorts();
}

function getCohorts() {
  // $.ajax({
  //   method: "GET",
  //   url: "/cohorts"
  // })

  // shortcut without referencing the ajax object
  $.get("/cohorts")
    .then((response) => {
      appendDOM(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function appendDOM(data) {
  studentCount = 0;
  $("#cohorts").empty();

  for (const cohort of data) {
    $("#cohorts").append(`<li class="cohort">
    <table>
       <tbody>
          <tr>
             <td><strong>Cohort Name:</strong></td>
             <td>${cohort.cohortName}</td>
          </tr>
          <tr>
             <td><strong># Students:</strong></td>
             <td class="current-count">${cohort.cohortCount}</td>
          </tr>
       </tbody>
    </table>
    <button class="delete">Delete</button>
 </li>`);

    studentCount += Number(cohort.cohortCount);
    $("#totalStudents").text(studentCount);
  }

  if (studentCount > 10) {
    $("#totalStudents").css("text-decoration", "underline");
  }
}

function addCohort(event) {
  const cohortName = $("#cohortName").val();
  const cohortCount = $("#cohortCount").val();

  // guard clause // validation
  if (!cohortName || !cohortCount || cohortCount < 0) {
    alert("Please fill all fields with proper values");
    return;
  }
  console.log(cohortName, cohortCount);

  // Clear the fields
  $("#cohortName").val("");
  $("#cohortCount").val("");

  // $.ajax({
  //   method: "POST",
  //   url: "/cohorts",
  //   data: { cohortName, cohortCount },
  // });

  // shortcut without referencing the ajax object
  $.post("/cohorts", { cohortName, cohortCount })
    .then(() => {
      getCohorts();
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCohort(event) {
  // Update the global count
  // Walk the DOM: Go from button (event.target) UP to the list-item (.cohort)
  // then search down for the td that has the current cohort count (.current-count)
  // then, grab the text value (number), convert it to a number, subtract
  // that value from the global count, and update the DOM
  const currentCount = $(event.target)
    .closest(".cohort")
    .find(".current-count")
    .text();
  studentCount -= Number(currentCount);
  $("#totalStudents").text(studentCount);

  // $(event.target).css('background-color', 'red');
  $(event.target).parent().remove(); // removes parent only
  $(event.target).closest(".cohort").remove(); // searches ancestors (preferred)

  // When there are more than 10 students, make it bold
  if (studentCount < 10) {
    $("#totalStudents").css("text-decoration", "none");
  }
}
