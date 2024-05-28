import ZODB, ZODB.FileStorage
import persistent
import transaction
from test import *

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

if __name__ == "__main__":
    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
    print()

    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
        print() 

class Course(persistent.Persistent):
    def __init__(self, id, name="", credit=0):
        self.id = id
        self.name = name
        self.credit = credit
    
    def setName(self, name):
        self.name = name

    def printDetail(self):
        print(f"Course ID: {self.id}\nCourse Name: {self.name}\nCredit: {self.credit}")

    def getCredit(self):
        return self.credit
class Student(persistent.Persistent):
    def __init__(self, id, name=""):
        self.enrolls = persistent.list.PersistentList()
        self.id = id
        self.name = name

    def enrollCourse(self, course):
        enrollment = Enrollment(self, course, None)
        self.enrolls.append(enrollment)
        return enrollment
    
    def getEnrollment(self, course):
        for enrollment in self.enrolls:
            if enrollment.getCourse() == course:
                return enrollment
        return None
    
class Enrollment(persistent.Persistent):
    def __init__(self, course="", grade=0, student=""):
        self.course = course
        self.grade = grade
        self.student = student
    
    def getCourse(self):
        return self.course
    
    def getGrade(self):
        return self.grade
    
    def setGrade(self, grade):
        self.grade = grade

    def printDetail(self):
        print(f"Course: {self.course.name}\nGrade: {self.grade}\nStudent: {self.student.name}")
    
