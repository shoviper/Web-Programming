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

    def getID(self):
        return self.id

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
        print(f"Course ID: {self.course.getID()} Course: {self.course.name}, credit {self.course.credit} Grade: {self.grade}")

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
        print("\tTranscript\n")
        print(f"ID: {self.id} Name: {self.name}")
        print("Course list")
        total_credit_points = 0
        total_grade_points = 0

        for enrollment in self.enrolls:
            enrollment.printDetail()
            total_credit_points += enrollment.getCourse().getCredit()
            total_grade_points += self.calculategrade(enrollment.getGrade(), enrollment.getCourse().getCredit())

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


storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

course1 = Course(4, 101, "Computer Programming")
course2 = Course(4, 201, "Web Programming")
course3 = Course(5, 202, "SE Principle")
course4 = Course(3, 301, "AI")

courses = persistent.list.PersistentList([course1, course2, course3, course4])

root.courses = courses

student1 = Student(1101, "Mr. Christian de Neuvillette")
student2 = Student(1102, "Mr. Zhong Li")
student3 = Student(1103, "Mr. Dvalinn Durinson")

students = persistent.list.PersistentList([student1, student2, student3])

root.students = students

#1
enrollment11 = student1.enrollCourse(course1)
enrollment11.setGrade('B')

enrollment12 = student1.enrollCourse(course2)
enrollment12.setGrade('B')

enrollment13 = student1.enrollCourse(course4)
enrollment13.setGrade('C')

#2
enrollment21 = student2.enrollCourse(course1)
enrollment21.setGrade('A')

enrollment22 = student2.enrollCourse(course2)
enrollment22.setGrade('B')

enrollment23 = student2.enrollCourse(course3)
enrollment23.setGrade('D')

#3
enrollment31 = student3.enrollCourse(course1)
enrollment31.setGrade('C')

enrollment32 = student3.enrollCourse(course2)
enrollment32.setGrade('A')

enrollment33 = student3.enrollCourse(course3)
enrollment33.setGrade('B')

enrollment34 = student3.enrollCourse(course4)
enrollment34.setGrade('C')


transaction.commit()
connection.close()
db.close()