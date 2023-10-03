const connection = require('../../Model/dbConnect');

const postTask = async (req, res) => {
    try {
        let userData = [req.body.task_id, req.body.user_id, req.body.task_description, req.body.assign_date, req.body.due_date];
        // console.log(userData);
        let sqlQuery = "INSERT INTO tasks(`task_id`,`user_id`,`task_description`,`assign_date`,`due_date`) VALUES(?, ?, ?, ?, ?)";
        // let sqlQuery1 = "INSERT INTO tasks(`task_id`,`user_id`,`task_description`,`assign_date`,`due_date`) VALUES(?, ?, ?, DATE_FORMAT(?, '%Y-%m-%d'), DATE_FORMAT(?, '%Y-%m-%d'))";

        await connection.query(sqlQuery, userData, function (error, result, field) {
            if (error) {
                console.log("Error:", error.sqlMessage);
            }
            else {
                res.json(result);
            }

        });
    } catch (error) {
        res.send(error.sqlMessage);
    }
}
const getUserId = async (req, res) => {
    try {
        let userData = req.cookies.id;
        // console.log(userData);
        let sqlQuery = `SELECT users.user_id, users.user_name, tasks.*, datediff(sysdate(), tasks.assign_date) days_left FROM users INNER JOIN tasks ON users.user_id = tasks.user_id WHERE users.user_id = ?`;

        await connection.query(sqlQuery, [userData], function (error, result, field) {
            if (error) {
                console.log("Error:", error.sqlMessage);
            }
            else {
                res.json(result);
            }

        });
    } catch (error) {
        res.send(error.sqlMessage);
    }
}

const updateTask = async (req, res) => {
    try {
        let userData = [req.body.task_description, req.body.assign_date, req.body.due_date, req.body.status, req.query.task_id];
        let sqlQuery = "UPDATE tasks SET task_description=?, assign_date=?, due_date=?, status=? WHERE task_id = ?";
        await connection.query(sqlQuery, userData, function (error, result, field) {
            if (error) {
                console.log("Error:", error.sqlMessage);
            }
            else {
                res.json(result);
            }

        });
    } catch (error) {
        res.send(error.sqlMessage);
    }
}


const deleteTask = async (req, res) => {
    try {
        let userData = req.query.task_id;
        let sqlQuery = "DELETE FROM tasks WHERE task_id=?";

        await connection.query(sqlQuery, userData, function (error, result, field) {
            if (error) {
                console.log("Error:", error.sqlMessage);
            }
            else {
                res.json(result);
            }

        });
    } catch (error) {
        res.send(error.sqlMessage)
    }
}
module.exports = { postTask, getUserId, deleteTask, updateTask };