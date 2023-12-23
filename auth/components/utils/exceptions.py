
"""
Represents an exception when user authentication fails
"""
class CredentialsException(Exception):
    pass

"""
Represents an exception when a user being created already exists
"""
class ExistsException(Exception):
    pass