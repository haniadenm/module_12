USE emp_track_db;

INSERT INTO
    department (id, name)
VALUES (100, "Marketing"), (101, "Sales"), (102, "HR"), (103, "Management"), (104, "Misc");

INSERT INTO
    role (title, salary, department_id)
VALUES ("Marketing Entry", 20000, 100), (
        "Marketing Advanced",
        40000,
        100
    ), ("Sales Entry", 10500, 101), ("Sales Advanced", 30500, 101), ("HR Entry", 40500, 102), ("HR Advanced", 50500, 102), ("Management", 80500, 103), ("Misc", 10000, 104);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("Sue", "Davis", 7, null), ("Dave", "Jimson", 7, 1), ("Zat", "Bo", 7, 1), ("Tim", "Wilson", 7, 1), ("Lily", "White", 1, 2), ("Bill", "Gil", 2, 2), ("Phil", "Wall", 3, 3), ("Quinn", "Ball", 4, 3), ("Al", "Zimlan", 5, 4), ("Cal", "Bim", 6, 4), ("John", "Zupperman", 8, 4);