const express = require("express");
const { syncUser, getUser, updateUser } = require("../controllers/users.controller")
const checkJwt = require("../middleware/checkJwt");

const router = express.Router();

router.post("/sync", checkJwt, syncUser
	/* #swagger.tags = ['Users']
		#swagger.summary = 'Sync Auth0 user with database'
		#swagger.description = 'Creates a new user in the database if they do not already exist.'
		#swagger.parameters['user'] = {
			in: 'body',
			required: true,
			description: 'User info from Auth0 ID token',
			schema: {
				user: {
					sub: "auth0|example-sub",
					email: "example@example.com",
					nickname: "exampleUsername",
					given_name: "FirstName",
					family_name: "LastName"
				}
			}
		}
		#swagger.responses[201] = {
			description: 'User successfully created',
			schema: {
				message: "User added to database",
				user: {
					_id: "string",
					auth0Id: "auth0|example-sub",
					email: "example@example.com",
					firstName: "FirstName",
					lastName: "LastName",
					username: "exampleUsername"
				}
			}
		}
		#swagger.responses[200] = {
			description: 'User already exists',
			schema: {
				message: "User already exists",
				user: {
					_id: "string",
					auth0Id: "auth0|example-sub",
					email: "example@example.com",
					firstName: "FirstName",
					lastName: "LastName",
					username: "exampleUsername"
				}
			}
		}
		#swagger.responses[500] = {
			description: 'Internal server error',
			schema: {
				error: 'Internal server error while syncing user'
			}
		}
	*/
);

router.get("/me", checkJwt, getUser
	/*  #swagger.tags = ['Users']
		#swagger.summary = 'Fetch user by Auth0 sub'
		#swagger.description = 'Returns user profile data for the authenticated user'
		#swagger.responses[200] = {
			description: 'User found',
			schema: {
				user: {
					_id: "string",
					auth0Id: "auth0|example-sub",
					email: "example@example.com",
					firstName: "FirstName",
					lastName: "LastName",
					username: "exampleUsername"
				}
			}
		}
		#swagger.responses[404] = {
			description: 'User not found'
		}
		#swagger.responses[500] = {
			description: 'Internal server error',
			schema: {
				error: 'Internal server error while fetching user'
			}
		}
	*/
);

router.patch("/me/update-profile", checkJwt, updateUser
	/*  #swagger.tags = ['Users']
		#swagger.summary = 'Update user profile'
		#swagger.description = 'Updates allowed fields in the user profile. Allowed fields: email, firstName, lastName, username'
		#swagger.parameters['updates'] = {
			in: 'body',
			required: true,
			description: 'Fields to update',
			schema: {
				updates: {
					email: "updated@example.com",
					firstName: "UpdatedFirst",
					lastName: "UpdatedLast",
					username: "updatedUsername"
				}
			}
		}
		#swagger.responses[200] = {
			description: 'User updated',
			schema: {
				message: "User updated",
				user: {
					_id: "string",
					auth0Id: "auth0|example-sub",
					email: "updated@example.com",
					firstName: "UpdatedFirst",
					lastName: "UpdatedLast",
					username: "updatedUsername"
				}
			}
		}
		#swagger.responses[400] = {
			description: 'Missing or invalid updates payload.'
		}
		#swagger.responses[500] = {
			description: 'Internal server error',
			schema: {
				error: 'Internal server error while updating user'
			}
		}
  */
);

module.exports = router;
