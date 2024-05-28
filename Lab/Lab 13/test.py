from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/login/", response_class = HTMLResponse)
async def get_html():
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form>
        <h5>ID:</h5>
        <input id="id" name="id" required>
        <h5>Password:</h5>
        <input id="password" name="password" required>
        <br>
        <br>
        <button type="submit" id="login">Log in</button>
    </form>
</body>
</html> """
    return html_content

