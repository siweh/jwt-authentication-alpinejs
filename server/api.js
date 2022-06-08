module.exports = function(app, db){
    app.get('/api/test', function(req, res){
        res.json({
            name: 'Siweh'
        });
    });

    app.get('/api/users', async function(){
        let users = [];
        const get_all_users = `select * from love_user`

        users = await db.many(get_all_users);

        res.json({
            data: users
        });
    });

    app.post('/api/registration', async function(req, res){
        try {
            const { username, email, password, love_user } = req.body;

            const register_user = `insert into love_user(username, password, love_user, email) values($1, $2, $3, $4)`
            await db.none(register_user, [username, password, love_user, email]);

            res.json({
				status: 'success',
			});
        } catch (error) {
            console.log(error);
            res.json({
				status: 'error',
				error: error.message
			});
        }
    })
};