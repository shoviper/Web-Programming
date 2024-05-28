import ZODB, ZODB.FileStorage
import persistent
import transaction
import hashlib

class Course(persistent.Persistent):
    def __init__(self, credit, course_id, name):
        self.credit = credit
        self.id = course_id
        self.name = name
        self.gradeScheme = [{"Grading": "A", "min": 80, "max": 100},
                            {"Grading": "B", "min": 70, "max": 79},
                            {"Grading": "C", "min": 60, "max": 69},
                            {"Grading": "D", "min": 50, "max": 59},
                            {"Grading": "F", "min": 0, "max": 49}]

    def getCredit(self):
        return self.credit

    def setName(self, name):
        self.name = name

    def getID(self):
        return self.id

    def setGradeScheme(self, scheme):
        if isinstance(scheme, list) and all(isinstance(entry, dict) for entry in scheme):
            self.gradeScheme = scheme
        else:
            print("Invalid grade scheme format.")

    def scoreGrading(self, score):
        for entry in self.gradeScheme:
            if entry["min"] <= score <= entry["max"]:
                return entry["Grading"]
        return "F"

    def printDetail(self):
        print(f"ID: {self.id} Course: {self.name}, credit {self.credit}")

class Enrollment(persistent.Persistent):
    def __init__(self, course, student):
        self.course = course
        self.score = None
        self.student = student

    def getCourse(self):
        return self.course

    def getScore(self):
        return self.score

    def getGrade(self):
        if self.score is not None:
            return self.course.scoreGrading(self.score)
        else:
            return None

    def setScore(self, score):
        self.score = score

    def printDetail(self):
        print(f"Course ID: {self.course.getID()} Course: {self.course.name}, credit {self.course.credit} Score: {self.score}")

class Student(persistent.Persistent):
    def __init__(self, student_id, name):
        self.enrolls = persistent.list.PersistentList()
        self.id = student_id
        self.name = name
        self.password = self._hash_password(password)

    def _hash_password(self, password):
        # Hash the password using SHA-256
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    def enrollCourse(self, course):
        enrollment = Enrollment(course, self)
        self.enrolls.append(enrollment)
        return enrollment

    def getEnrollment(self, course):
        for enrollment in self.enrolls:
            if enrollment.getCourse() == course:
                return enrollment
        return None

    def printTranscript(self):
        print("\tTranscript\n")
        print(f"ID: {self.id} Name: {self.name}")
        print("Course list")
        
        for enrollment in self.enrolls:
            course = enrollment.getCourse()
            print(f"Course ID: {course.getID()} Course: {course.name}, credit {course.getCredit()} Score: {enrollment.getScore()} Grade: {enrollment.getGrade()}")

        total_credit_points = sum(enrollment.getCourse().getCredit() for enrollment in self.enrolls)
        total_grade_points = sum(self.calculategrade(enrollment.getGrade(), enrollment.getCourse().getCredit()) for enrollment in self.enrolls)

        if total_credit_points > 0:
            gpa = total_grade_points / total_credit_points
            print(f"Total GPA is: {gpa:.2f}")
        else:
            print("Total GPA is: N/A")

    def calculategrade(self, grade, credit):
        if grade == 'A':
            return 4.0 * credit
        elif grade == 'B':
            return 3.0 * credit
        elif grade == 'C':
            return 2.0 * credit
        elif grade == 'D':
            return 1.0 * credit
        else:
            return 0.0

    def setName(self, name):
        self.name = name

    def login(self, entered_password):
        # Check if the entered password matches the stored hashed password
        entered_password_hash = self._hash_password(entered_password)
        return entered_password_hash == self.password


storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

course1 = Course(4, 101, "Computer Programming")
course2 = Course(4, 201, "Web Programming")
course3 = Course(5, 202, "SE Principle")
course4 = Course(3, 301, "AI")

# Set grade scheme for course1
course1.setGradeScheme([{"Grading": "A", "min": 90, "max": 100},
                        {"Grading": "B", "min": 80, "max": 89},
                        {"Grading": "C", "min": 70, "max": 79},
                        {"Grading": "D", "min": 60, "max": 69},
                        {"Grading": "F", "min": 0, "max": 59}])

courses = persistent.list.PersistentList([course1, course2, course3, course4])

root.courses = courses

student1 = Student(1101, "Mr. Inthat Sappipat")

student2 = Student(1102, "624463", "1234")


students = persistent.list.PersistentList([student1])

root.students = students

#student1
enrollment11 = student1.enrollCourse(course1)
enrollment11.setScore(75)

enrollment12 = student1.enrollCourse(course2)
enrollment12.setScore(81)

enrollment13 = student1.enrollCourse(course3)
enrollment13.setScore(81)

enrollment13 = student1.enrollCourse(course4)
enrollment13.setScore(57)

transaction.commit()
connection.close()
db.close()
