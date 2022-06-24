const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = function(app, db){
    app.get('/api/test', function(req, res){
        res.json({
            name: 'Siweh'
        });
    });


    app.get('/api/users', async function(req, res){
        let users = [];
        const get_all_users = `select * from love_user`

        users = await db.any(get_all_users);

        res.json({
            data: users,
            message: 'Retrieved ALL users'
        });
    });

    app.get('/api/love_user', async function(req, res){
        const { token } = req.query;
            const userdata = jwt.decode(token)
            console.log(userdata);
            const username = userdata.username
            console.log(username);
        let userLoveCounter = [];
        const getUserLoveCounter = `select love_user from love_user where username = $1`

        userLoveCounter = await db.one(getUserLoveCounter, [username]);

        res.json({
            data: userLoveCounter
        });
    });

    app.post('/api/register', async function(req, res){
        try {
            const { username, email, hash_password} = req.body;

            const love_user = 0;

            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(hash_password, salt);

            let registered_users = `insert into love_user(username, hash_password, love_user, email) values($1, $2, $3, $4)`
            await db.one(registered_users, [username, hash, love_user, email]);
            console.log(registered_users);

            if (!username || !email || !hash_password || !love_user) {
                res.json({
                    status: 'error',
                    message: 'Please fill all required fields.',
                });
            }

            // const token = jwt.sign(
            //     { username: registered_users.username},
            //     process.env.ACCESS_TOKEN_SECRET,
            //     {
            //     expiresIn: "2h",
            //     }
            // );

            res.json({
				status: 'success',
                message: 'successfully registered'
			});
        } catch (error) {
            console.log(error);
            res.json({
				status: 'error',
				error: error.message
			});
        }
    });

    app.get('/api/login', async function(req, res){
        try{
    
            //console.log(req.query);
            const { username, password } = req.query;

            const get_user = await db.oneOrNone(`select * from love_user where username = $1`, [username]);
            console.log(get_user.data);
            if (get_user === null){
                throw Error('User is not available');
            }
            let results = await bcrypt.compare(password, get_user.hash_password);
            console.log({results});

            if (!results){
                throw Error('Invalid password');
            }

            // const access_token = jwt.sign(get_user, process.env.ACCESS_TOKEN_SECRET);
            console.log(get_user);

            // Create token
        const token = jwt.sign(
            { username: get_user.username},
            process.env.ACCESS_TOKEN_SECRET,
            {
            expiresIn: "2h",
            }
        );
      // save user token
    //   get_user.token = token;
  
      // return new user
    //   res.status(201).json(token);

            res.json({
                status: 'success',
			    data: {"token": token, "love_user": get_user.love_user}
		    });
        }catch(error){
            console.log(error);
            res.json({
				status: 'Can not find user',
				error : error.stack
			});
        }
    });

    app.put('/api/love_user', async function(req, res){
        try {
            const { token } = req.body;
            const userdata = jwt.decode(token)
            console.log(userdata);
            const username = userdata.username
            console.log(username);

            await db.oneOrNone(`update love_user set love_user = love_user + 1 where username = $1`, [username]);

            
            res.json({
                status: 'success'
            })
        } catch (error) {
            console.log(error);
        }
    });

    // app.put('/api/love_user', async function(req, res){
    //     try {
    //         const { love_counter, username } = req.body;

    //         let get_love_counter = await db.oneOrNone(`update love_user set love_user = love_user - $1 where username = $2`, [love_counter, username]);

    //         res.json({
    //             data: get_love_counter
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });

    app.delete('/api/users', async function (req, res) {

		try {
			const { username } = req.query;
			// delete a user with the specified username
			const result = await db.none(`delete from love_user where username = $1`, username);

			res.json({
				status: 'success',
				data: result
			})
		} catch (err) {
			// console.log(err);
			res.json({
				status: 'success',
				error : err.stack
			})
		}
	});
};