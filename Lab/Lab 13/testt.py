# main
from datatestt import *

from fastapi import FastAPI, Request, Body, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse

app = FastAPI()

@app.get("/html/", response_class=HTMLResponse)
async def get_html():
    html_content = """<html>
    <head> <title>HTMLResponse 1</title></head>
    <body> <h1>Hello HTML.</h1> </body> </html>"""
    return html_content

@app.get("/redirect", response_class=HTMLResponse)
async def redirect_to_another_url():
    redirect_url = "/target_url"
    return RedirectResponse(url=redirect_url)

@app.get("/target_url")
def target_url():
    return {"message": "You have been redirected to the target url"}

@app.post("/students/new/")
async def create_student(body = Body(...)):
    sid = int(body["ID"])
    root.students[sid] = Student(sid, body["name"], body["password"])
    transaction.commit()
    return root.students[sid]

@app.on_event("shutdown")
def shutdown_event():
    transaction.commit()
    db.close()
    storage.close()
    
@app.get("/login", response_class=HTMLResponse)
async def login_form():
    # You can use a template engine like Jinja2 for more complex HTML rendering.
    # For simplicity, we are using plain HTML here.
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h2>Login</h2>
        <form action="/login" method="post">
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required><br><br>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>

            <input type="submit" value="Login">
        </form>
    </body>
    </html>
    """
    
async def check_user(id: str = Form(...), password: str = Form(...)):
    if int(id) in root.students.keys():
        if root.students[int(id)].password == password:
            return root.students[int(id)]
    return None

@app.post("/login")
async def login(user_info: dict = Depends(check_user)):
    if user_info:
        return RedirectResponse(url="/transcript_form?id=" + str(user_info.id))
    return {"details": "Invalid"}

@app.post("/transcript_form", response_class=HTMLResponse)
async def transcript_form(request: Request, id: str = None):
    # You can use a template engine like Jinja2 for more complex HTML rendering.
    # For simplicity, we are using plain HTML here.
    
    root.students[int(id)].enrollCourse(root.courses[101], 2)
    root.students[int(id)].enrollCourse(root.courses[201], 4)
    root.students[int(id)].enrollCourse(root.courses[301], 3)
    root.students[int(id)].enrollCourse(root.courses[301], 2)
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Transcription Entry Form</title>
    </head>
    <body>
        <h2>Transcription Entry {id}</h2>
        <h3>{id} {root.students[int(id)].name}</h3>
        <form action="/submit_transcript" method="post">
        <table>
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
    """

    for entry in root.students[int(id)].enrolls:
        html_content += f"""
        <tr>
            <td>{entry.course.id}</td>
            <td>{entry.course.name}</td>
            <td>{entry.course.credit}</td>
            <td><input type="number" name="scores[{entry.course.id}]" required></td>
        </tr>
        """

    html_content += """
            </tbody>
        </table>
        <input type="submit" value="Submit">
        </form>
        </body>
        </html>
        """
    return html_content

@app.post("/submit_transcript", response_class=HTMLResponse)
async def submit_transcript(request: Request, id: int, scores: dict = Form(...)):
    # Retrieve the student and their enrollments
    student = root.students[id]
    enrollments = student.enrolls

    # Iterate through the submitted scores and update the corresponding Enrollment objects
    for course_id, score in scores.items():
        course_id = int(course_id)
        score = int(score)

        # Find the corresponding Enrollment object
        for enrollment in enrollments:
            if enrollment.course.id == course_id:
                enrollment.setScore(score)
                break

    # You may want to redirect the user to a confirmation page or perform further actions here
    # For simplicity, we'll just display a success message.
    success_message = "Transcript has been updated successfully!"
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Transcript Submission Confirmation</title>
    </head>
    <body>
        <h2>Transcript Submission Confirmation</h2>
        <p>{success_message}</p>
    </body>
    </html>
    """