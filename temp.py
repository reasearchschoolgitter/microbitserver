from flask import Flask
from flask_frozen import Freezer

app = Flask(__name__)
freezer = Freezer(app)

# Use a dictionary to store the state
state = {
    'score': 0,
    'win': 0
}
@app.route("/seescore")
def scoresite():
    return str(state['score'])
@app.route("/")
def home():
    return "Welcome back! We are extremly excited to see you again!"

@app.route("/posta")
def posta():
    state['score'] -= 1
    return str(state['score'])

@app.route("/postb")
def postb():
    state['score'] += 1
    return str(state['score'])

@app.route("/win")
def winner():
    if state['win'] >= 1:
        return "b won"
    elif state['win'] <= -1:
        return "a won"
    else:
        return "No winner yet"

@app.route("/check")
def check():
    if state['score'] >= 100:
        state['win'] = 1
    elif state['score'] <= -100:
        state['win'] = -1
    return "Checked"



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
    
@freezer.register_generator
def url_generator():
    yield 'home', {}


