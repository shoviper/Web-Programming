from fastapi import FastAPI

app = FastAPI()

students = {
    29 : {"ID" : 29, "name" : "Kazuha", "Surname" : "Kaedehara"},
    30 : {"ID" : 30, "name" : "Albedo", "Surname" : "Rhinedottir"}
}

@app.get("/students/all")
async def getstudent():
    return students

# @app.post("/students/new")
# async def getstudent(index: int):
    
#     if index in student:
#         return {"error" : "Student already excists"}
#     else:
#         return {"message" : "Successful"}

@app.post("/students/new")
def create_person(person: dict):
   if person["ID"] in students or person["name"] in students or person["Surname"] in students:
       return {"Error": "Student already exists"}
   else:
       students[person["ID"]] = person
       return students[person["ID"]]

@app.post("/students/new/{name}/{surname}/{id}")
def create_person2(name: str, surname: str, id: int):
    if id in students or name in students or surname in students:
        return {"Error": "Student already exists"}
    else:
        students[id] = {"ID": id, "name": name, "Surname": surname}
        return students[id]
        
@app.post("/students/newForm")
def create_person3(name: str, surname: str, id: int):
    if id in students or name in students or surname in students:
        return {"Error": "Student already exists"}
    else:
        students[id] = {"ID": id, "name": name, "Surname": surname}
        return students[id]