const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

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

    app.post('/api/register', async function(req, res){
        try {
            const { username, email, hash_password, love_user } = req.body;

            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(hash_password, salt);

            let registered_users = `insert into love_user(username, hash_password, love_user, email) values($1, $2, $3, $4)`
            await db.one(registered_users, [username, hash, love_user, email]);
            console.log(registered_users);

            // if (registered_users.includes(username, email)){
            //     res.json({
            //         status: 'Username already exists',
            //         message: 'Username already exists'
            //     })
            // }

            if (!username || !email || !hash_password || !love_user) {
                res.json({
                    status: 'error',
                    message: 'Please fill all required fields.',
                });
            }
            
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

            const get_user = await db.one(`select * from love_user where username = $1`, [username]);
            console.log(get_user);
            let results = await bcrypt.compare(password, [hash_password]);
            console.log(results);

            res.json({
                status: 'success',
			    data: get_user
		    });
        }catch(error){
            res.json({
				status: 'Can not find user',
				error : error.stack
			});
        }
    });

    // app.post('/api/login/', async function(req, res){
    //     try {
    //         const { username, hash_password, love_user } = req.body;

    //         const hash = await bcrypt.hash(hash_password, 10)

    //         const register_user = `insert into love_user(username, hash_password, love_user) values($1, $2, $3)`
    //         await db.none(register_user, [username, hash, love_user]);

    //         res.json({
	// 			status: 'success',
	// 		});
    //     } catch (error) {
    //         console.log(error);
    //         res.json({
	// 			status: 'error',
	// 			error: error.message
	// 		});
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