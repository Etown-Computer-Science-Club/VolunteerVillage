from flask import Flask
from controllers.posts import bp as posts_bp
from controllers.badges import bp as badges_bp


def create_app():
    app = Flask(__name__)

    # Register the blueprints with the Flask application
    app.register_blueprint(posts_bp)
    app.register_blueprint(badges_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
