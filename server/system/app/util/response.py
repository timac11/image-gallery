from rest_framework.response import Response


class ErrorResponse(Response):
    def __init__(self, error: str, status: int):
        super().__init__({'detail': error}, status)
