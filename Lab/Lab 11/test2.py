import ZODB, ZODB.FileStorage
import persistent
import transaction

class Course(persistent.Persistent):
    def __init__(self, credit, course_id, name):
        self.credit = credit
        self.id = course_id
        self.name = name

    def getCredit(self):
        return self.credit

    def setName(self, name):
        self.name = name

    def printDetail(self):
        print(f"ID: {self.id} Course: {self.name}, credit {self.credit}")

class Enrollment(persistent.Persistent):
    def __init__(self, course, student):
        self.course = course
        self.grade = None
        self.student = student

    def getCourse(self):
        return self.course

    def getGrade(self):
        return self.grade

    def printDetail(self):
        print(f"Course: {self.course.name}, credit {self.course.credit} Grade: {self.grade}")

    def setGrade(self, grade):
        self.grade = grade

class Student(persistent.Persistent):
    def __init__(self, student_id, name):
        self.enrolls = persistent.list.PersistentList()
        self.id = student_id
        self.name = name

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
        print(f"\nID: {self.id} Name: {self.name}")
        print("Course list")
        total_credit_points = 0
        total_grade_points = 0

        for enrollment in self.enrolls:
            enrollment.printDetail()
            total_credit_points += enrollment.getCourse().getCredit()
            total_grade_points += self.calculateGradePoints(enrollment.getGrade())

        if total_credit_points > 0:
            gpa = total_grade_points / total_credit_points
            print(f"Total GPA is: {gpa:.2f}")
        else:
            print("Total GPA is: N/A")

    def calculateGradePoints(self, grade):
        if grade == 'A':
            return 4.0
        elif grade == 'B':
            return 3.0
        elif grade == 'C':
            return 2.0
        else:
            return 0.0

    def setName(self, name):
        self.name = name


# Sample Usage
storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

# Create Courses
course1 = Course(4, 101, "Web Programming")
course2 = Course(3, 102, "AI")

# Create a persistent list to store courses
courses = persistent.list.PersistentList([course1, course2])

# Assign the list to an attribute on the root object
root.courses = courses

# Create Students
student1 = Student(1101, "Mr. Inthat Sappipat")
student2 = Student(1102, "Mr. Jaranin Thammakosol")

# Create a persistent list to store students
students = persistent.list.PersistentList([student1, student2])

# Assign the list to an attribute on the root object
root.students = students

# Enroll Students in Courses
enrollment1 = student1.enrollCourse(course1)
enrollment1.setGrade('B')

enrollment2 = student1.enrollCourse(course2)
enrollment2.setGrade('C')

enrollment3 = student2.enrollCourse(course1)
enrollment3.setGrade('A')

# Print Transcript
student1.printTranscript()
student2.printTranscript()

# Commit and close the connection
transaction.commit()
connection.close()

