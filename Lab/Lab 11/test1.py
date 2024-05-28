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
        print("Transcript")
        print(f"\nID: {self.id} Name: {self.name}")
        print("Course list")
        total_credit_points = 0
        total_grade_points = 0

        for enrollment in self.enrolls:
            enrollment.printDetail()
            total_credit_points += enrollment.getCourse().getCredit()
            total_grade_points += self.calculategrade(enrollment.getGrade())

        if total_credit_points > 0:
            gpa = total_grade_points / total_credit_points
            print(f"Total GPA is: {gpa:.2f}")
        else:
            print("Total GPA is: N/A")

    def calculategrade(self, grade):
        if grade == 'A':
            return 4.0
        elif grade == 'B':
            return 3.0
        elif grade == 'C':
            return 2.0
        elif grade == 'D':
            return 1.0
        else:
            return 0.0

    def setName(self, name):
        self.name = name


if __name__ == "__main__":
    # Your existing code for initializing the ZODB connection
    storage = ZODB.FileStorage.FileStorage('mydata.fs')
    db = ZODB.DB(storage)
    connection = db.open()
    root = connection.root

    courses = root.courses
    for course in courses:
        course.printDetail()
    print()

    students = root.students
    for student in students:
        student.printTranscript()
        print()

    # Close the connection after usage
    transaction.commit()
    connection.close()