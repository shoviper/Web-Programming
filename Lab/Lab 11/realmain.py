import ZODB, ZODB.FileStorage
import transaction
from realtest import *  

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

if __name__ == "__main__":
    courses = root.courses
    for course in courses:
        course.printDetail()
    print()

    students = root.students
    for student in students:
        student.printTranscript()
        print()

    transaction.commit()
    connection.close()
    db.close()
