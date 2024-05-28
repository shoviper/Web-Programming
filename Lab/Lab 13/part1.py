from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/html/", response_class = HTMLResponse)
async def get_html():
    html_content = """<html>
    <head> <title>HTMLResponse 1</title> </head>
    <body> <h1>Hello HTML.</h1> </body> </html> """
    return html_content