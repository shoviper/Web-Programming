let transcript = [];

function calculateGPA(grades) {
  let totalcredit = 0;
  let totalgradepoint = 0;

  for (const course of grades) {
    const credit = parseFloat(course.credit);
    const grade = course.grade;

    if (!isNaN(credit)) {
      totalcredit += credit;
      totalgradepoint += gradenumber(grade) * credit;
    }

  }
  return totalgradepoint / totalcredit;
}

function showtranscript(transcript) {
  document.getElementById('student_name').value = transcript.student_name;
  document.getElementById('date_of_birth').value = transcript.date_of_birth;
  document.getElementById('student_id').value = transcript.student_id;
  document.getElementById('date_of_admission').value = transcript.date_of_admission;
  document.getElementById('date_of_graduation').value = transcript.date_of_graduation;
  document.getElementById('degree').value = transcript.degree;
  document.getElementById('major').value = transcript.major;

  const contentbody = document.getElementById('content_body');
  contentbody.innerHTML = '';
  let totalcredit = 0;
  let totalgradepoint = 0;

  for (const year in transcript.credit) {
    for (const semester in transcript.credit[year]) {
        const courses = transcript.credit[year][semester];

        const semesterrow = document.createElement('tr');
        semesterrow.innerHTML = `<td><u><b>${semester}, ${year}</b></u></td><td></td><td></td>`;
        contentbody.appendChild(semesterrow);

        for (const course of courses) {
            const courserow = document.createElement('tr');
            courserow.innerHTML = `<td style="text-align: left;">${course.subject_id} ${course.name}</td>
              <td>${course.credit}</td>
              <td>${course.grade}</td>`;
            contentbody.appendChild(courserow);

            const credit = parseFloat(course.credit);
            const grade = gradenumber(course.grade);
            totalcredit += credit;
            totalgradepoint += credit * grade;
        }

        const GPA = calculateGPA(courses);
        const GPS = totalgradepoint / totalcredit;
        const GPArow = document.createElement('tr');
        GPArow.innerHTML = `<td>GPS: ${GPA.toFixed(2)} GPA: ${(GPS).toFixed(2)}</td><td></td><td></td>`;
        contentbody.appendChild(GPArow);
    }
  }
}

function gradenumber(grade) {
  switch (grade) {
    case 'A':
      return 4.0;
    case 'B+':
      return 3.5;
    case 'B':
      return 3.0;
    case 'C+':
      return 2.5;
    case 'C':
      return 2.0;
    case 'D+':
      return 1.5;
    case 'D':
      return 1.0;
    case 'F':
      return 0.0;
    default: 
      return 0.0;
  }
}

window.addEventListener('load', function () {
  const upload = document.getElementById('fileInput');
  if (upload) {
    upload.addEventListener('change', function () {
      if (upload.files.length > 0) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
          const result = JSON.parse(reader.result);
          transcript = result;
          showtranscript(transcript);
        });

        reader.readAsText(upload.files[0]);
      }
    });
  }
});
