const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "task_list";`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log("In /tasks POST with", req.body);

  const taskToAdd = req.body;
  const queryText = `INSERT INTO "task_list" ("task", "complete")
                         VALUES ($1, $2);`;
  pool
    .query(queryText, [taskToAdd.task, taskToAdd.complete])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const taskReadyToGo = req.body;
  const queryText = `UPDATE "task_list" SET "task"=$1, "complete"=$2 WHERE "id"=$3;`;
  pool
    .query(queryText, [taskReadyToGo.name, taskReadyToGo.age, taskID])
    .then((responseDB) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

module.exports = router;
