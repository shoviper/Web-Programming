import ZODB, ZODB.FileStorage
import BTrees.OOBTree
import transaction

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root
root.students = BTrees.OOBTree.BTree()

# z_enrollment
import persistent

class Course(persistent.Persistent):
    
    def __init__(self, id, name="", credit=0):
        self.id = id
        self.name = name
        self.credit = credit
        self.gradeScheme = [{"Grade" : 'A', "min" : 80, "max" : 100},
                            {"Grade" : 'B', "min" : 70, "max" : 79},
                            {"Grade" : 'C', "min" : 60, "max" : 69},
                            {"Grade" : 'D', "min" : 50, "max" : 59},
                            {"Grade" : 'F', "min" : 0, "max" : 49},]
        
    
    def __str__(self):
        return "ID:" + str(self.id).rjust(8) + "  Course: " +  self.name.ljust(30) + ", Credit " + str(self.credit)
    
    def setName(self, name):
        self.name = name
        
    def printDetail(self):
        print(self.__str__())
        
    def scoreGrading(self, score):
        for grade in self.gradeScheme:
            if score >= grade["min"] and score <= grade["max"]:
                return grade["Grade"]
            
        return None
    
    def setGradeScheme(self, scheme):
        for i in range(101):
            if self.scoreGrading(i) == None:
                print("incomplete gradeScheme")
                return
        
        self.gradeScheme = scheme
        
class Student(persistent.Persistent):
    def __init__(self, id, name, pwd):
        self.enrolls = []
        self.id = id
        self.name = name
        self.password = pwd
        
    def __str__(self):
        return "ID: " + str(self.id).rjust(8) + " Name: " + self.name
    
    def login(self, id, password):
        return True if root.students[id].password == password else False
    
    def enrollCourse(self, course, grade):
        new_enroll = Enrollment(self, course, grade)
        self.enrolls.append(new_enroll)
        return new_enroll
        
    def getCourse(self, course):
        for c in self.enrolls:
            if course == c.getCourse():
                return c.getCourse()
            
    def getEnrollment(self, course):
        for c in self.enrolls:
            if course == c.getCourse():
                return c
            
        return None
    
    def printTranscript(self):
        print(f"    Transcript\n" + self.__str__() + "\nCourse List")
        gpa = 0
        credit = 0
        
        for e in self.enrolls:
            e.printDetail()
            match e.getGrade():
                case 'A':
                    gpa += 4* e.getCourse().credit
                case 'B':
                    gpa += 3* e.getCourse().credit
                case 'C':
                    gpa += 2* e.getCourse().credit
                case 'D':
                    gpa += 1* e.getCourse().credit
                case 'F':
                    pass
                
            credit += e.getCourse().credit
            
        print(f"Total GPA is: {gpa/credit:.2f}")
    
    def setName(self, name):
        self.name = name

class Enrollment(persistent.Persistent):
    def __init__(self, student, course, score=0):
        self.course = course
        self.student = student
        self.score = score
        
    def __str__(self):
        return f"{self.course} Score" + str(self.score).rjust(3) + " Grade:" + str(self.getGrade()).rjust(3)
        
    def getCourse(self):
        return self.course
    
    def getScore(self):
        return self.score
    
    def getGrade(self):
        return self.course.scoreGrading(self.score)
    
    def printDetail(self):
        print(self.__str__())
    
    def setScore(self, score):
        self.score = score

root.courses = BTrees.OOBTree.BTree()
root.courses[101] = Course(101, 'Computer Programming', 4)
root.courses[201] = Course(201, 'Web Programming', 4)
root.courses[202] = Course(202, 'Software Engineering Principle', 5)
root.courses[301] = Course(301, 'Artificial Intelligent', 3)